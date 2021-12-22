import React from "react"
import { Grid, Typography, makeStyles, IconButton } from "@material-ui/core"

import Sort from "./Sort"
import Filter from "./Filter"

import filter from "../../images/Icons/filter.svg"
import sort from "../../images/Icons/sort.svg"

const useStyles = makeStyles(theme => ({
  functionContainer: {
    backgroundColor: theme.palette.primary.main,
    minHeight: "6rem",
    height: "auto",
    // I can use props to directly customize my style in MUI
    borderRadius: ({ option }) => (option !== null ? "10px" : "10px 10px 0 0"),
  },
}))

export default function FunctionContainer({
  filterOptions,
  option,
  setOption,
}) {
  // passing option state to customize description container, when filter or sort is selected
  const classes = useStyles({ option })

  const content = () => {
    switch (option) {
      case "sort":
        return <Sort setOption={setOption} />

      case "filter":
        return <Filter setOption={setOption} filterOptions={filterOptions} />

      default:
        const items = [
          { icon: filter, alt: "filter" },
          { icon: sort, alt: "sort" },
        ]
        return (
          <Grid
            item
            container
            justifyContent="space-around"
            alignItems="center"
          >
            {items.map(item => (
              <Grid item key={item.alt}>
                <IconButton onClick={() => setOption(item.alt)}>
                  <img src={item.icon} alt={item.alt} />
                </IconButton>
              </Grid>
            ))}
          </Grid>
        )
    }
  }

  return (
    <Grid item container classes={{ root: classes.functionContainer }}>
      {content()}
    </Grid>
  )
}
