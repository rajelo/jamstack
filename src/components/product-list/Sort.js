import React from "react"
import {
  Grid,
  Typography,
  IconButton,
  Chip,
  makeStyles,
  useMediaQuery,
} from "@material-ui/core"

import sort from "../../images/Icons/sort.svg"
import close from "../../images/Icons/close-outline.svg"

const useStyles = makeStyles(theme => ({
  chipContainer: {
    [theme.breakpoints.down("md")]: {
      margin: "0.5rem",
    },
  },
}))

export default function Sort({ setOption }) {
  const classes = useStyles()
  const matchesXS = useMediaQuery(theme => theme.breakpoints.down("xs"))
  const sortOptions = [
    { label: "A-Z" },
    { label: "Z-A" },
    { label: "NEWEST" },
    { label: "OLDEST" },
    { label: "PRICE ↑" },
    { label: "PRICE ↓" },
    { label: "REVIEWS" },
  ]

  return (
    <Grid item container justifyContent="space-between" alignItems="center">
      <Grid item>
        <IconButton onClick={() => setOption(null)}>
          <img src={sort} alt="sort" />
        </IconButton>
      </Grid>

      <Grid item xs>
        <Grid
          container
          direction={matchesXS ? "column" : "row"}
          justifyContent={matchesXS ? "center" : "space-evenly"}
          alignItems={matchesXS ? "center" : undefined}
        >
          {sortOptions.map(option => (
            <Grid
              item
              key={option.label}
              classes={{ root: classes.chipContainer }}
            >
              <Chip label={option.label} />
            </Grid>
          ))}
        </Grid>
      </Grid>

      <Grid item>
        <IconButton onClick={() => setOption(null)}>
          <img src={close} alt="close" />
        </IconButton>
      </Grid>
    </Grid>
  )
}
