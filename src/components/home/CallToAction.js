import React from "react"
import {
  Grid,
  Typography,
  makeStyles,
  Button,
  useMediaQuery,
} from "@material-ui/core"
import { Link } from "gatsby"

import quality from "../../images/Icons/quality.svg"

const useStyles = makeStyles(theme => ({
  account: {
    color: "#fff",
    marginLeft: "1rem",
  },
  body: {
    maxWidth: "45rem",
    marginBottom: "2rem",
    padding: "0 1rem",
  },
  container: {
    marginBottom: "15rem",
    [theme.breakpoints.down("md")]: {
      marginBottom: "10rem",
    },
    [theme.breakpoints.down("sm")]: {
      marginBottom: "5rem",
    },
  },
  headingContainer: {
    marginTop: "2rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "3rem",
      marginBottom: '1rem',
      padding: '0 1rem'
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "2.5rem",
    },
  },
  icon: {
    [theme.breakpoints.down("sm")]: {
      height: "25rem",
    },
    [theme.breakpoints.down("xs")]: {
      height: "18rem",
    },
  },
}))

export default function CallToAction() {
  const classes = useStyles()
  const matchesMD = useMediaQuery(theme => theme.breakpoints.down("md"))

  return (
    <Grid
      container
      justifyContent="space-around"
      alignItems="center"
      classes={{ root: classes.container }}
      direction={matchesMD ? "column" : "row"}
    >
      <Grid item>
        <img src={quality} alt="proof of quality" className={classes.icon} />
      </Grid>

      <Grid item>
        <Grid container direction="column">
          <Grid item>
            <Typography
              align={matchesMD ? "center" : undefined}
              variant="h1"
              classes={{ root: classes.headingContainer }}
            >
              Committed to Quality
            </Typography>
          </Grid>

          <Grid item classes={{ root: classes.body }}>
            <Typography
              align={matchesMD ? "center" : undefined}
              variant="body1"
            >
              At VAR X our mission is to provide comfortable, durable, premium
              designer clothing and clothing accessories to developers and
              technology enthusiasts.
            </Typography>
          </Grid>

          <Grid item container justifyContent="center">
            <Grid item>
              <Button
                variant="outlined"
                color="primary"
                component={Link}
                to="/contact"
              >
                Contact us
              </Button>
            </Grid>

            <Grid item>
              <Button
                variant="contained"
                color="primary"
                classes={{ root: classes.account }}
                component={Link}
                to="/account"
              >
                Create Account
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
