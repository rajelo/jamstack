import React from "react"
import {
  Grid,
  Typography,
  IconButton,
  Chip,
  makeStyles,
  useMediaQuery,
} from "@material-ui/core"
import clsx from "clsx"

import sort from "../../images/Icons/sort.svg"
import close from "../../images/Icons/close-outline.svg"

const useStyles = makeStyles(theme => ({
  chipContainer: {
    [theme.breakpoints.down("md")]: {
      margin: "0.5rem",
    },
  },
  notActive: {
    backgroundColor: theme.palette.primary.main,
  },
}))

export default function Sort({ setOption, sortOptions, setSortOptions }) {
  const classes = useStyles()
  const matchesXS = useMediaQuery(theme => theme.breakpoints.down("xs"))

  // function that will handle our sorting
  const handleSort = i => {
    const newOptions = [...sortOptions]

    // first step - we will turn off all of the other options
    newOptions.map(option => (option.active = false))

    // then we will set selected option to active
    newOptions[i].active = true

    setSortOptions(newOptions)
  }

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
          {sortOptions.map((option, i) => (
            <Grid
              item
              key={option.label}
              classes={{ root: classes.chipContainer }}
            >
              <Chip
                label={option.label}
                onClick={() => handleSort(i)}
                color={option.active ? "secondary" : "primary"}
                classes={{
                  root: clsx({
                    [classes.notActive]: option.active === false,
                  }),
                }}
              />
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
