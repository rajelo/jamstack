import React, { useEffect } from "react"
import { Grid, Typography, makeStyles, Button } from "@material-ui/core"

import { setUser } from "../../contexts/actions"

import checkmark from "../../images/Icons/checkmark-outline.svg"
import forward from "../../images/Icons/forward-outline.svg"

const useStyles = makeStyles(theme => ({
  completeIconText: {
    marginTop: "8rem",
  },
  textAccount: {
    color: theme.palette.secondary.main,
    fontSize: "2.25rem",
    fontWeight: 700,
    textTransform: "none",
    marginTop: "1rem",
  },
  textShop: {
    color: theme.palette.secondary.main,
    fontWeight: 700,
    fontSize: "2.25rem",
    textTransform: "none",
    paddingRight: "0.5rem",
  },
  shopContainer: {
    margin: "1rem",
  },
}))

export default function Complete({ user, dispatchUser }) {
  const classes = useStyles()

  useEffect(() => {
    // cleanup function - only executes on component unmount
    return () => {
      dispatchUser(setUser({ ...user, onboarding: true }))
    }
  }, [])

  // empty dependency array is equivalent of componentDidMount, because it runs just once
  // with return (cleanup) function it can also be used as componentWillUnmount

  return (
    <>
      <Grid
        item
        container
        direction="column"
        alignItems="center"
        classes={{ root: classes.completeIconText }}
      >
        <Grid item>
          <img src={checkmark} alt="sign up finished" />
        </Grid>
        <Grid item>
          <Typography variant="h3" classes={{ root: classes.textAccount }}>
            Account Created!
          </Typography>
        </Grid>
      </Grid>
      <Grid item container justifyContent="flex-end">
        <Grid item classes={{ root: classes.shopContainer }}>
          <Button>
            <Typography variant="h3" classes={{ root: classes.textShop }}>
              Shop
            </Typography>
            <img src={forward} alt="browse product" />
          </Button>
        </Grid>
      </Grid>
    </>
  )
}
