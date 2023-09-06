import { Container , Typography } from "@mui/material";
import { makeStyles } from 'tss-react/mui';
import Carousel from "./Carousel";
import ggs from "../assets/ggs.jpg"

const useStyles = makeStyles()((theme) => {
  return {

  banner: {
    backgroundImage: "url(./banner2.jpg)",
  },
  bannerContent: {
    height: 400,
    display: "flex",
    flexDirection: "column",
    paddingTop: 25,
    justifyContent: "space-around",
  },
  tagline: {
    display: "flex",
    height: "40%",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },
  carousel: {
    height: "50%",
    display: "flex",
    alignItems: "center",
  },
};
});

function Banner() {
  const {classes} = useStyles();

  return (
    <div className={classes.banner} style={{backgroundImage:`url(${ggs})`}}>
      <Container className={classes.bannerContent}>
        <div className={classes.tagline}>
          <Typography
            variant="h2"
            style={{
              fontWeight: "bold",
              marginBottom: 15,
              fontFamily: "Montserrat",
            }}
          >
            Crypto coin
          </Typography>
          <Typography
            variant="subtitle2"
            style={{
              color: "darkgrey",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
            }}
          >
            Get the regular updates of your favorite Crypto Currency!
          </Typography>
        </div>
        <Carousel />
      </Container>
    </div>
  );
}

export default Banner;