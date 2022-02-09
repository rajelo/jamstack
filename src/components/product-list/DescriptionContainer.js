import React from "react"
import {
  Grid,
  Typography,
  makeStyles,
  ButtonGroup,
  Button,
  useMediaQuery,
} from "@material-ui/core"
import clsx from "clsx"

import background from "../../images/Icons/toolbar-background.svg"
import ListIcon from "../../images/List"
import GridIcon from "../../images/Grid"

const useStyles = makeStyles(theme => ({
  description: {
    color: "#fff",
  },
  descriptionContainer: {
    backgroundColor: theme.palette.primary.main,
    height: "15rem",
    width: "60%",
    borderRadius: 25,
    padding: "1rem",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    [theme.breakpoints.down("xs")]: {
      borderRadius: 0,
    },
  },
  mainContainer: {
    padding: "3rem",
    backgroundImage: `url(${background})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    position: "relative",
    [theme.breakpoints.down("xs")]: {
      padding: "3rem 0",
    },
  },
  button: {
    border: `2px solid ${theme.palette.primary.main}`,
    borderRightColor: `${theme.palette.primary.main} !important`,
    borderRadius: 25,
    backgroundColor: "#fff",
    padding: "0.5rem 1.5rem",
    "&:hover": {
      backgroundColor: "#fff",
    },
  },
  selected: {
    backgroundColor: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
    },
  },
  buttonGroup: {
    position: "absolute",
    right: 0,
    bottom: 0,
    marginRight: "3rem",
    marginBottom: "3rem",
    [theme.breakpoints.down("md")]: {
      position: "relative",
      display: "flex",
      marginTop: "3rem",
      alignSelf: "flex-end",
      marginRight: 0,
      marginBottom: 0,
    },
    [theme.breakpoints.down("xs")]: {
      marginRight: "1.5rem",
    },
  },
}))

export default function DescriptionContainer({
  name,
  description,
  layout,
  setLayout,
}) {
  const classes = useStyles()
  const matchesMD = useMediaQuery(theme => theme.breakpoints.down("md"))

  // when changing the layout I have to set it to page 1, because they have different products per page
  // and therefore different number of pages
  const changeLayout = option => {
    setLayout(option)
  }

  return (
    <Grid
      item
      container
      direction={matchesMD ? "column" : "row"}
      classes={{ root: classes.mainContainer }}
      justifyContent="center"
      alignItems={matchesMD ? "center" : undefined}
    >
      <Grid item classes={{ root: classes.descriptionContainer }}>
        <Typography variant="h4" align="center">
          {name}
        </Typography>
        <Typography
          variant="body1"
          classes={{ root: classes.description }}
          align="center"
        >
          {description}
        </Typography>
      </Grid>

      <Grid item classes={{ root: classes.buttonGroup }}>
        <ButtonGroup>
          <Button
            onClick={() => changeLayout("list")}
            classes={{
              outlined: clsx(classes.button, {
                [classes.selected]: layout === "list",
              }),
            }}
          >
            <ListIcon color={layout === "list" ? "#fff" : undefined} />
          </Button>
          <Button
            onClick={() => changeLayout("grid")}
            classes={{
              outlined: clsx(classes.button, {
                [classes.selected]: layout === "grid",
              }),
            }}
          >
            <GridIcon color={layout === "grid" ? "#fff" : undefined} />
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  )
}
