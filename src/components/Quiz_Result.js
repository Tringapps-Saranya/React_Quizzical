import { Box,Chip,Button } from "@mui/material";
import '../assets/Quiz.css'
import StartQuiz from './StartQuiz'
import React,{useState} from "react";
export default function Quiz_Result({data}){
    let score  = 0;
    const [playAgain,setPlayAgain] = useState(true);
    return(
        <div className='mainDiv'>
        {!playAgain && <Box sx = {{border:'1px solid black',width:'50%',padding:'10px'}}>
            {data.data.map((questionOption) =>{
                const {question,options,correct_answer} = questionOption;
                return(
                    <div>
                        <h3>{question}</h3>
                        {
                            options.map((eachOption)=>{
                                if((eachOption.option === correct_answer)&&(eachOption.isClicked === true))
                                    score += 1;
                                        return(
                                            <div>
                                                <Chip label={eachOption.option} variant="outlined" color = {eachOption.option === correct_answer ? 'success' : eachOption.isClicked ? 'error' : 'primary'}  />
                                            </div>
                                        )
                                    })
                        }
                        <hr/>   
                    </div>
                )
                            
            })

            }
                      
            <label>YOUR SCORE -- {score}/{data.length}</label>
            <Button variant="contained" sx = {{padding:'10px',borderRadius:'15px',maxWidth:'max-content',float:'right'}} onClick = {()=>setPlayAgain(!playAgain)} >PLAY AGAIN</Button>
        </Box>}
        {playAgain && <StartQuiz />}

        </div>
    )
}
