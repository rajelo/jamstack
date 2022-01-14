import React from "react"
import { Grid, makeStyles, Button } from "@material-ui/core"
import clsx from "clsx"

const useStyles = makeStyles(theme => ({
  swatch: {
    border: "3px solid #fff",
    height: "3rem",
    width: "3rem",
    minWidth: 0,
    borderRadius: 50,
  },
  swatchesContainer: {
    marginTop: "0.5rem",
    "&:not(:first-child)": {
      marginLeft: "-0.5rem",
    },
  },
  selected: {
    borderColor: "#212529",
  },
}))

export default function Swatches({ colors, selectedColor, setSelectedColor }) {
  const classes = useStyles()

  const possibleColors = ["#FFF", "#FECEA8", "#E84A5F", "#99B898", "#2A363B"]

  const actualColors = []

  for (let color of possibleColors) {
    if (actualColors.includes(color) && colors.includes(color)) continue
    else actualColors.push(color)
  }
  //   console.log(actualColors)

  return (
    <Grid item container>
      {actualColors.sort().map(color => (
        <Grid item classes={{ root: classes.swatchesContainer }} key={color}>
          <Button
            onClick={() => setSelectedColor(color)}
            style={{ backgroundColor: color }}
            classes={{
              root: clsx(classes.swatch, {
                [classes.selected]: selectedColor === color,
              }),
            }}
          />
        </Grid>
      ))}
    </Grid>
  )
}
