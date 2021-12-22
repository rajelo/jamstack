import React from "react"
import { Grid, Typography, useMediaQuery, makeStyles } from "@material-ui/core"
import Lottie from "react-lottie"

import animationData from "../../images/Icons/data.json"

const useStyles = makeStyles(theme => ({
  textContainer: {
    padding: "2rem",
  },
  [theme.breakpoints.down('xs')]: {
    fontSize: '1rem'
  },
  heading: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '3.5rem'
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '3rem'
    }
  }
}))

export default function HeroBlock() {

  const classes = useStyles()

  const matchesMD = useMediaQuery(theme => theme.breakpoints.down("md"))
  const matchesLG = useMediaQuery(theme => theme.breakpoints.down("lg"))
  const matchesXS = useMediaQuery(theme => theme.breakpoints.down("xs"))

  const defaultOptions = {
    loop: true,
    autoplay: false,
    animationData,
  }

  return (
    <Grid container justifyContent="space-around" alignItems="center">
      <Grid item classes={{ root: classes.textContainer }}>
        <Grid container direction="column">
          <Grid item>
            <Typography
              variant="h1"
              align="center"
              classes={{ root: classes.heading }}
            >
              The Premier
              <br />
              Developer Clothing Line
            </Typography>
          </Grid>

          <Grid item>
            <Typography variant="h3" align="center">
              high quality, custom-designed shirts, hats and hoodies
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid item>
        <Lottie
          isStopped
          options={defaultOptions}
          width={
            matchesXS
              ? "20rem"
              : matchesMD
              ? "30rem"
              : matchesLG
              ? "40rem"
              : "50rem"
          }
        />
      </Grid>
    </Grid>
  )
}
