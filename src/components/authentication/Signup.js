import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';



const Signup = ({handleClose}) => {

    const [email, setEmail]= useState("");
    const [password, setPassword]= useState("");
    const [confirm, setConfirm]= useState("");

    const handleSubmit = async()=>{
        if(password!==confirm){
            alert("Passwords do not match");
            return;
        }
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password)
            console.log(result);
            handleClose();
        } catch (error) {
            alert("Could not sign up!");
            return
        }
    }

  return (
    <Box p={3} style={{diplay:'flex', flexDirection:'column', gap:'4rem'}}>
     <TextField style={{marginBottom:'1.5rem'}}
     variant="outlined"
     fullWidth
     label="Enter Email"
     type="email"
     value={email}
     onChange={(e)=>{setEmail(e.target.value)}}/>
          <TextField style={{marginBottom:'1.5rem'}}
     variant="outlined"
     fullWidth
     label="Set Password"
     type="password"
     value={password}
     onChange={(e)=>{setPassword(e.target.value)}}/>
          <TextField style={{marginBottom:'1.5rem'}}
     variant="outlined"
     fullWidth
     label="Confirm Password"
     type="password"
     value={confirm}
     onChange={(e)=>{setConfirm(e.target.value)}}/>

    <Button fullWidth style={{backgroundColor:'#eebc1d', color:'black'}} onClick={handleSubmit}>
   SIgn up
    </Button>
    
    </Box>
  )
}

export default Signup
