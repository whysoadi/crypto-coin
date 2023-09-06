import {
    AppBar,
    Container,
    MenuItem,
    Select,
    Toolbar,
    Typography,
  } from "@mui/material";
  import {
    createTheme,
    ThemeProvider,
  } from '@mui/material';
  import { makeStyles } from 'tss-react/mui';
  import { useNavigate} from "react-router-dom";
  import { CryptoState } from "../CryptoContext";
  
  const useStyles = makeStyles() ((theme) => {
    return {
    root: {
      flex: 1,
      color: "gold",
      fontFamily: "Montserrat",
      fontWeight: "bold",
      cursor: "pointer",
    },
  };
  });
  
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      mode: "dark",
    },
  });
  
  function Header() {
    const {classes} = useStyles();
    const { currency, setCurrency } = CryptoState();
  
    const navigate = useNavigate();
  
    return (
      <ThemeProvider theme={darkTheme}>
        <AppBar color="transparent" position="static">
          <Container>
            <Toolbar>
              <Typography
                onClick={() => navigate("/")}
                variant="h6"
                className={classes.root}
              >
                Crypto coin
              </Typography>
              {/* <Button color="inherit">Login</Button> */}
              <Select
                variant="outlined"
                
                value={currency}
                style={{ width: 100, height: 40, marginLeft: 15, color:'white' }}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <MenuItem value={"USD"}>USD</MenuItem>
                <MenuItem value={"INR"}>INR</MenuItem>
              </Select>
            </Toolbar>
          </Container>
        </AppBar>
      </ThemeProvider>
    );
  }
  
  export default Header;