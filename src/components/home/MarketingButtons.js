import React from "react"
import { Grid, Typography, makeStyles } from "@material-ui/core"
import { Link } from "gatsby"

import marketingAdornment from "../../images/Icons/marketing-adornment.svg"
import moreByUs from "../../images/Icons/more-by-us.svg"
import store from "../../images/Icons/store.svg"

const useStyle = makeStyles(theme => ({
  button: {
    backgroundImage: `url(${marketingAdornment})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "45rem",
    width: "45rem",
    transition: "transform 0.5s ease",
    "&:hover": {
      transform: "scale(1.1)",
    },
    [theme.breakpoints.down("lg")]: {
      height: "35rem",
      width: "35rem",
      margin: '3rem'
    },
    [theme.breakpoints.down("sm")]: {
      height: "25rem",
      width: "25rem",
      margin: '1.5rem 0'
    },
    [theme.breakpoints.down("xs")]: {
      height: "20rem",
      width: "20rem",
      margin: '1.2rem 0'
    },
  },
  container: {
    margin: "15rem 0",
    [theme.breakpoints.down('sm')]: {
      margin: "8rem 0",
    }
  },
  icon: {
    [theme.breakpoints.down("sm")]: {
      height: "6rem",
      width: "6rem",
    },
    [theme.breakpoints.down("xs")]: {
      height: "5rem",
      width: "5rem",
    },
  },
  label: {
    fontSize: '3.5rem',
    [theme.breakpoints.down("lg")]: {
      fontSize: '3rem'
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: '2rem'
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: '1.5rem'
    }
  }
}))

export default function MarketingButtons() {
  const classes = useStyle()

  const buttons = [
    { label: "Store", icon: store, link: "/hoodies" },
    { label: "More By Us", icon: moreByUs, href: "https://www.google.com" },
  ]

  return (
    <Grid
      container
      justifyContent="space-around"
      classes={{ root: classes.container }}
    >
      {buttons.map(button => (
        <Grid item key={button.label}>
          <Grid
            container
            direction="column"
            classes={{ root: classes.button }}
            alignItems="center"
            justifyContent="center"
            component={button.link ? Link : "a"}
            to={button.link ? button.link : undefined}
            href={button.href ? button.href : undefined}
          >
            <Grid item>
              <img className={classes.icon} src={button.icon} alt={button.label} />
            </Grid>

            <Grid item>
              <Typography classes={{root: classes.label}} variant="h3">{button.label}</Typography>
            </Grid>
          </Grid>
        </Grid>
      ))}
    </Grid>
  )
}
