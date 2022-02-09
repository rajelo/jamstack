import React from "react"
import { Grid, Typography, makeStyles } from "@material-ui/core"

import Details from "./Details"

const useStyles = makeStyles(theme => ({}))

export default function Settings() {
  const classes = useStyles()

  return (
    <Grid container>
      <Details />
    </Grid>
  )
}
