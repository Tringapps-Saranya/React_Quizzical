import { Button,Box,Chip,} from '@mui/material'
import  Quiz_Result  from './Quiz_Result'
import axios from 'axios'
import React, { useState,useEffect } from 'react'
import '../assets/Quiz.css'
export default function Quiz(){
    const [data,setData] = useState([])
    const [checkAnswer,setCheckAnswer] = useState(false)
    useEffect(()=>{ 
        axios.get('https://opentdb.com/api.php?amount=5')
        .then(response=>{
            let data = response.data.results;
            data.forEach(eachData=>{
                eachData.options = []
                eachData.incorrect_answers.map(incorrectOption=>{
                    let allOptions = {
                        option:incorrectOption,
                        isClicked:false,
                    }
                    eachData.options.push(allOptions);
                })
                eachData.options.push({
                    option:eachData.correct_answer,
                    isClicked:false,
                });
            })
      console.log(data);
    setData(data);
    })
    },[])

    function handleUserAnswer(options,clickedOption){
        {
            options.map((eachOption)=>{
                return eachOption.isClicked = false;
            })
        }
        clickedOption.isClicked = !clickedOption.isClicked;
        setData([...data]);

    }

    return(
        <div className='mainDiv'>
           { !checkAnswer && <Box sx = {{border:'1px solid black',width:'50%',padding:'10px'}}>
                {data.map((questionOption) =>{
                    const {question,options} = questionOption;
                    return(
                        <div>
                            <h3>{question}</h3>
                            {
                                options.map((eachOption)=>{
                                            return(
                                                <div>
                                                    <Chip label={eachOption.option} variant="outlined" onClick = {()=>handleUserAnswer(options,eachOption)} color = {eachOption.isClicked ? 'success' : 'primary'}  />
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