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
  mainContainer: {
    padding: "1rem 0",
  },
  checkbox: {
    color: "#fff",
  },
  filterOption: {
    display: "flex",
    alignSelf: "center",
  },
  optionsContainer: {
    [theme.breakpoints.down("xs")]: {
      // for all except the last child element
      "& > :not(:last-child)": {
        marginBottom: "2rem",
      },
    },
  },
}))

export default function Filter({ setOption, filterOptions, setFilterOptions }) {
  const classes = useStyles()

  const handleFilter = (option, i) => {
    // copying filterOptions into a new object so I can override the values
    const newFilters = { ...filterOptions }

    // I am basically toggling the value of checked (checkbox) between true and false
    newFilters[option][i].checked = !newFilters[option][i].checked

    // and updating the filterOptions with new values of filters
    setFilterOptions(newFilters)
  }

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
        <Grid
          container
          justifyContent="space-evenly"
          classes={{ root: classes.optionsContainer }}
        >
          {Object.keys(filterOptions)
            .filter(option => filterOptions[option] !== null)
            .map(option => (
              <Grid item key={option}>

                <Grid container direction="column">

                  <Grid item classes={{ root: classes.filterOption }}>
                    <Chip label={option} />
                  </Grid>

                  <Grid item>
                    <FormControl>
                      <FormGroup>
                      {/* when mapping over array I can also grab an index as second argument */}
                        {filterOptions[option].map(({ label, checked }, i) => (
                          <FormControlLabel
                            classes={{ label: classes.checkbox }}
                            key={label}
                            label={label}
                            control={
                              <Checkbox
                                checked={checked}
                                name={label}
                                classes={{ root: classes.checkbox }}
                                onChange={() => handleFilter(option, i)}
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
