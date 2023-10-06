import React, { createContext, useContext, useEffect, useState } from "react";
import { CoinList } from "./config/api";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from './firebase';
import { onSnapshot, doc } from "firebase/firestore";


const Crypto = createContext();

const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");
  const [coins, setCoins] = useState([]);
  const [user, setUser]= useState(null);
  const [loading, setLoading] = useState(false);
  const [watchlist, setWatchlist] = useState([]);

useEffect(() => {
  onAuthStateChanged(auth, user=>{
    if(user)setUser(user)
    else{
  setUser(null);
  }
  })
 
}, []);

useEffect(() => {
  if (user) {
    const coinRef = doc(db, "watchlist", user?.uid);
    var unsubscribe = onSnapshot(coinRef, (coin) => {
      if (coin.exists()) {
        console.log(coin.data().coins);
        setWatchlist(coin.data().coins);
      } else {
        console.log("No Items in Watchlist");
      }
    });

    return () => {
      unsubscribe();
    };
  }
}, [user]);

  useEffect(() => {
    if (currency === "INR") setSymbol("₹");
    else if (currency === "USD") setSymbol("$");
  }, [currency]);

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    console.log(data);

    setCoins(data);
    setLoading(false);
  };


  return (
    <Crypto.Provider value={{ currency, setCurrency, symbol, coins, loading, fetchCoins, user, watchlist }}>
      {children}
    </Crypto.Provider>
  );
};

export default CryptoContext;

export const CryptoState = () => {
  return useContext(Crypto);
};