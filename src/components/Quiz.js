import { Button,Box,Chip,} from '@mui/material'
import Quiz_Result from '../components/Quiz_Result';
import axios from 'axios'
import React, { useState,useEffect } from 'react'
import '../assets/Quiz.css'
import { decode } from 'html-entities';
export default function Quiz(){
    const [data,setData] = useState([])
    const [checkAnswer,setCheckAnswer] = useState(false)
    const {REACT_APP_DOMAIN_NAME} = process.env
    useEffect(()=>{ 
        axios.get(`${REACT_APP_DOMAIN_NAME}/api.php?amount=5`)
        .then(response=>{
            let data = response.data.results;
            data.forEach(eachData=>{
                eachData.allOptions = []
                eachData.incorrect_answers.map(incorrectOption=>{
                    let wrong_options = {
                        option:incorrectOption,
                        isClicked:false,
                    }
                    eachData.allOptions.push(wrong_options);
                })
                eachData.allOptions.push({
                    option:eachData.correct_answer,
                    isClicked:false,
                });
            })
      console.log(data);
    setData(data);
    })
    },[])

    function handleUserAnswer(allOptions,clickedOption){
        allOptions.map((eachOption)=>{
                return eachOption.isClicked = false;
            })
        clickedOption.isClicked = !clickedOption.isClicked;
        setData([...data]);

    }
    return(
        <div className='mainDiv'>
           { !checkAnswer && <Box sx = {{border:'1px solid black',width:'50%',padding:'10px'}}>
                {data.map((questionOption) =>{
                    const {question,allOptions} = questionOption;
                    return(
                        <div>
                            <h3>{decode(question)}</h3>
                            {
                                allOptions.map((eachOption)=>{
                                            return(
                                                <div>
                                                    <Chip label={eachOption.option} variant="outlined" onClick = {()=>handleUserAnswer(allOptions,eachOption)} color = {eachOption.isClicked ? 'success' : 'primary'}  />
                                                </div>
                                            )
                                        })
                            }
                            
                        </div>
                    )              
                })
                }
                
                
                <hr/>
                <Button variant="contained" sx = {{padding:'10px',borderRadius:'15px',maxWidth:'max-content',float:'right'}} onClick = {()=>setCheckAnswer(true)}>Check Answer</Button>
            </Box>}

            {checkAnswer && <Quiz_Result data = {data} />}
           

        </div>
    )

}
