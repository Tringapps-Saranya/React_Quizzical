import { Box,Button } from "@mui/material"
export default function StartQuiz(){
    return(
        <Box sx = {{textAlign:'center',marginTop:'280px'}} >
            <h1>Quizzical</h1>
            <Button variant="contained" href = '/quiz'>START QUIZ</Button>

        </Box>
    )
}
