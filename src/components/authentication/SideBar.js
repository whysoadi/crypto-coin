import React from 'react'
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { makeStyles } from 'tss-react/mui';
import Drawer from '@mui/material/Drawer';
import { CryptoState } from '../../CryptoContext';
import { signOut } from 'firebase/auth';
import { Button } from '@mui/material';

import { auth, db } from "../../firebase";
import { numberWithCommas } from "../CoinsTable";
import { AiFillDelete } from "react-icons/ai";
import { doc, setDoc } from "firebase/firestore";


const SideBar = () => {

    const useStyles = makeStyles()((theme) => {
        return {
            container: {
                width: 350,
                padding: 25,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                fontFamily: "monospace",
              },
              profile: {
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "20px",
                height: "92%",
              },
              picture: {
                width: 200,
                height: 200,
                cursor: "pointer",
                backgroundColor: "#EEBC1D",
                objectFit: "contain",
              },
              logout: {
                height: "8%",
                width: "100%",
                backgroundColor: "#EEBC1D",
                marginTop: 20,
              },
              watchlist: {
                flex: 1,
                width: "100%",
                backgroundColor: "grey",
                borderRadius: 10,
                padding: 15,
                paddingTop: 10,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 12,
                overflowY: "scroll",
              },
              coin: {
                padding: 10,
                borderRadius: 5,
                color: "black",
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#EEBC1D",
                boxShadow: "0 0 3px black",
              },
        };
      });

    const logOut =()=>{
        signOut(auth);
        toggleDrawer();
    }
    const [state, setState] = useState({
        right: false,
      });

      const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        setState({ ...state, [anchor]: open });
      };
      const removeFromWatchlist = async (coin) => {
        const coinRef = doc(db, "watchlist", user.uid);
        try {
          await setDoc(
            coinRef,
            { coins: watchlist.filter((wish) => wish !== coin?.id) },
            { merge: true }
          );
    
         alert("removed from watchlist!")
        } catch (error) {
          alert("error")
        }
      };

      const { classes } = useStyles();
    const {user, watchlist, coins, symbol} = CryptoState();
  return (
    <div>
      {[ 'right'].map((anchor) => (
        <React.Fragment key={anchor}>
         <Avatar onClick={toggleDrawer(anchor, true)} style={{height:38, width:38, marginLeft:15, cursor:'pointer', backgroundColor:'#EEBC1D'}} />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            src={user.photoURL}
            alt={user.displayName}
          >
        <div className={classes.container}>
            <div className={classes.profile}>
            <Avatar
                  className={classes.picture}
                  src={user.photoURL}
                  alt={user.displayName || user.email}
                />
                <span
                  style={{
                    width: "100%",
                    fontSize: 25,
                    textAlign: "center",
                    fontWeight: "bolder",
                    wordWrap: "break-word",
                  }}
                >
                  {user.displayName || user.email}
                </span>
                <div className={classes.watchlist}>
                <span style={{ fontSize: 15, textShadow: "0 0 5px black" }}>
                    Watchlist
                  </span>
                  {coins.map((coin) => {
                    if (watchlist.includes(coin.id))
                      return (
                        <div className={classes.coin}>
                          <span>{coin.name}</span>
                          <span style={{ display: "flex", gap: 8 }}>
                            {symbol}{" "}
                            {numberWithCommas(coin.current_price.toFixed(2))}
                            <AiFillDelete
                              style={{ cursor: "pointer" }}
                              fontSize="16"
                              onClick={() => removeFromWatchlist(coin)}
                            />
                          </span>
                        </div>
                      );
                    else return <></>;
                  })}
                </div>
            </div>
            <Button
                variant="contained"
                className={classes.logout}
                onClick={logOut}
              >
                Log Out
              </Button>
        </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  )
}

export default SideBar
