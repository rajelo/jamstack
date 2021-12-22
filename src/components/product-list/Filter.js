import React from "react"
import {
  Grid,
  Typography,
  IconButton,
  makeStyles,
  Chip,
  FormControl,
  FormControlLabel,
  FormGroup,
  Checkbox,
} from "@material-ui/core"

import filter from "../../images/Icons/filter.svg"
import close from "../../images/Icons/close-outline.svg"

const useStyles = makeStyles(theme => ({
  chipRoot: {
    backgroundColor: theme.palette.secondary.main,
  },
  chipLabel: {
    ...theme.typography.body1,
    color: "#fff",
    fontWeight: 500,
  },
  mainContainer: {
    padding: "1rem 0",
  },
  checkbox: {
    color: "#fff",
  },
}))

export default function Filter({ setOption, filterOptions }) {
  const classes = useStyles()

  // {Color: [{label: "white", checked: false}], Style: null, Size: null}

  // console.log(filterOptions)

  return (
    <Grid
      item
      container
      justifyContent="space-between"
      alignItems="center"
      classes={{ root: classes.mainContainer }}
    >
      <Grid item>
        <IconButton onClick={() => setOption(null)}>
          <img src={filter} alt="filter" />
        </IconButton>
      </Grid>

      <Grid item xs>
        <Grid container justifyContent="space-evenly">
          {Object.keys(filterOptions)
            .filter(option => filterOptions[option] !== null)
            .map(option => (
              <Grid item key={option}>
                <Grid container direction="column">
                  <Grid item>
                    <Chip
                      label={option}
                      classes={{
                        root: classes.chipRoot,
                        label: classes.chipLabel,
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <FormControl>
                      <FormGroup>
                        {filterOptions[option].map(({ label, checked }) => (
                          <FormControlLabel
                            classes={{ label: classes.checkbox }}
                            key={label}
                            label={label}
                            control={
                              <Checkbox
                                checked={checked}
                                name={label}
                                classes={{ root: classes.checkbox }}
                              />
                            }
                          />
                        ))}
                      </FormGroup>
                    </FormControl>
                  </Grid>
                </Grid>
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
