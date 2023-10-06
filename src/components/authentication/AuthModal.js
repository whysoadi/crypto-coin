import GoogleButton from "react-google-button";
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AppBar from '@mui/material/AppBar';
import Login from './Login';
import Signup from './Signup';
import { auth } from "../../firebase";
import { makeStyles } from 'tss-react/mui';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";


const useStyles = makeStyles()((theme) => {
    return {
        google: {
            padding: 24,
            paddingTop: 0,
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            gap: 20,
            fontSize: 20,
          },
    };
  });
 
  




const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  color:'white',
  boxShadow: 24,
//   p: 4,
};


export default function AuthModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  console.log(value)
  const { classes } = useStyles();
  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
       alert("Success!")

        handleClose();
      })
      .catch((error) => {
      alert("Error")
        return;
      });
  };

  return (
    <div>
      <Button variant='contained' onClick={handleOpen} style={{marginLeft:20, backgroundColor:'#eebc1d',  }}>Login</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} style={{}}>
         <AppBar position='static' style={{backgroundColor:'transparent', color:'white'}}>
            <Tabs
            value={value}
            onChange={handleChange}
            variant='fullWidth'
           >

                <Tab label="LogIn" />
                <Tab label="Sign Up" />

            </Tabs>
         </AppBar>
              {value===0 && <Login handleClose={handleClose}/>}
              {value===1 && <Signup handleClose={handleClose}/>}
             <Box className={classes.google}>
              <span>OR</span>
              <GoogleButton
                style={{ width: "100%", outline: "none" }}
                onClick={signInWithGoogle}
              />
            </Box>
        </Box>
      </Modal>
    </div>
  );
}