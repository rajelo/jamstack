import React from "react"
import { Grid, Typography, makeStyles } from "@material-ui/core"

import frame from "../../images/Icons/product-frame-grid.svg"

const useStyles = makeStyles(theme => ({
    frame: {
        backgroundImage: `url(${frame})`,
        backgroundPosition: 'center',
        
    }
}))

export default function ProductFrameGrid({ product }) {
  const classes = useStyles()

  return (
    <Grid item>
      <Grid container direction="column">
        <Grid item classes={{ root: classes.frame }}>
        
        </Grid>
      </Grid>
    </Grid>
  )
}
