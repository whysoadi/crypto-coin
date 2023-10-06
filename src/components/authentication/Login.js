import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';


const Login = ({handleClose}) => {

    const [email, setEmail]= useState('');
    const [password, setPassword]= useState('');

  const handleSubmit = async ()=>{
    if(!email || !password){
    alert("Error! Check again.")
    }

    try{
    const result = await signInWithEmailAndPassword(auth, email, password)
    console.log(result);
    handleClose();
}
catch(error){
    alert(error)
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
         
    <Button fullWidth style={{backgroundColor:'#eebc1d', color:'black'}}onClick={handleSubmit}>
   Log IN
    </Button>
    
    </Box>
  )
}

export default Login
