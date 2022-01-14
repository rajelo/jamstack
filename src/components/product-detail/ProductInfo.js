import React, { useState, useEffect } from "react"
import {
  Grid,
  Typography,
  makeStyles,
  Button,
  Chip,
  useMediaQuery,
} from "@material-ui/core"
import clsx from "clsx"

import Rating from "../home/Rating"
import Sizes from "../product-list/Sizes"
import Swatches from "../product-list/Swatches"
import QtyButton from "../product-list/QtyButton"
import { colorIndex } from "../product-list/ProductFrameGrid"

import favorite from "../../images/Icons/favorite.svg"
import subscribtion from "../../images/Icons/subscription.svg"

const useStyles = makeStyles(theme => ({
  background: {
    backgroundColor: theme.palette.secondary.main,
    height: "45rem",
    width: "35rem",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    [theme.breakpoints.down("xs")]: {
      height: "58rem",
    },
  },
  center: {
    backgroundColor: theme.palette.primary.main,
    height: "35rem",
    width: "45rem",
    // I need absolute position, when I want to place one element on top the other!
    position: "absolute",
    [theme.breakpoints.down("lg")]: {
      width: "40rem",
    },
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    [theme.breakpoints.down("xs")]: {
      height: "48rem",
    },
  },
  icon: {
    height: "4rem",
    width: "4rem",
    margin: "0.5rem 1rem",
  },
  sectionContainer: {
    height: "calc(100% / 3)",
  },
  descriptionContainer: {
    backgroundColor: theme.palette.secondary.main,
    // if super long description, I will scroll within the container, overflow in Y direction!
    overflowY: "auto",
    padding: "0.5rem 1rem",
  },
  name: {
    color: "#fff",
  },
  reviewButton: {
    textTransform: "none",
    marginLeft: -8,
  },
  detailsContainer: {
    padding: "0.5rem 1rem",
  },
  chipContainer: {
    marginTop: "1rem",
    [theme.breakpoints.down("xs")]: {
      marginTop: 0,
      marginBottom: "1rem",
    },
  },
  //   we style chip body in chipRoot class
  chipRoot: {
    height: "3rem",
    width: "auto",
    borderRadius: 50,
  },
  chipLabel: {
    fontSize: "2rem",
  },
  stock: {
    color: "#fff",
  },
  sizesAndSwatches: {
    maxWidth: "13rem",
  },
  actionsContainer: {
    padding: "0 1rem",
  },
  "@global": {
    ".MuiButtonGroup-groupedOutlinedVertical:not(:first-child)": {
      marginTop: 0,
    },
  },
}))

export const getStockDisplay = (stock, variant) => {
  switch (stock) {
    case undefined:
    case null:
      return "Loading Inventory..."
      break
    case -1:
      return "Error Loading Inventory"
      break
    default:
      if (stock[variant].qty === 0) {
        return "Out of Stock"
      } else return `${stock[variant].qty} Currently In Stock`
      break
  }
}

export default function ProductInfo({
  name,
  description,
  variants,
  selectedVariant,
  setSelectedVariant,
  stock,
}) {
  const classes = useStyles()

  const [selectedSize, setSelectedSize] = useState(
    null
    // variants[selectedVariant].size
  )
  const [selectedColor, setSelectedColor] = useState(
    variants[selectedVariant].color
  )

  const matchesXS = useMediaQuery(theme => theme.breakpoints.down("xs"))

  const imageIndex = colorIndex(
    { node: { variants } },
    selectedColor,
    variants[selectedVariant]
  )

  const sizes = []
  const colors = []

  variants.map(variant => {
    sizes.push(variant.size)

    if (
      !colors.includes(variant.color) &&
      variant.size === selectedSize &&
      variant.style === variants[selectedVariant].style
    ) {
      colors.push(variant.color)
    }
  })

  useEffect(() => {
    // setSelectedColor(null)
    // find will return actual variant object
    const newVariant = variants.find(
      variant =>
        variant.size === selectedSize &&
        variant.style === variants[selectedVariant].style &&
        variant.color === colors[0]
    )
    setSelectedVariant(variants.indexOf(newVariant))
  }, [selectedSize])

  useEffect(() => {
    if (imageIndex !== -1) {
      setSelectedVariant(imageIndex)
    }
  }, [imageIndex])

  const stockDisplay = getStockDisplay(stock, selectedVariant)

  return (
    <Grid
      item
      container
      direction="column"
      lg={6}
      justifyContent="center"
      alignItems="flex-end"
    >
      <Grid
        item
        container
        classes={{ root: classes.background }}
        justifyContent="flex-end"
      >
        <Grid item>
          <img
            src={favorite}
            alt="add item to favorites"
            className={classes.icon}
          />
        </Grid>
        <Grid item>
          <img
            src={subscribtion}
            alt="add item to subscriptions"
            className={classes.icon}
          />
        </Grid>
      </Grid>

      <Grid
        item
        container
        direction="column"
        classes={{ root: classes.center }}
      >
        <Grid
          item
          container
          direction={matchesXS ? "column" : "row"}
          justifyContent="space-between"
          classes={{
            root: clsx(classes.sectionContainer, classes.detailsContainer),
          }}
        >
          <Grid item>
            <Grid item container direction="column">
              <Grid item>
                <Typography variant="h1" classes={{ root: classes.name }}>
                  {name.split(" ")[0]}
                </Typography>
              </Grid>
              <Grid item>
                <Rating number={4.5} />
              </Grid>
              <Grid item>
                <Button>
                  <Typography
                    variant="body2"
                    classes={{ root: classes.reviewButton }}
                  >
                    Leave A Review {">"}
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <Grid item classes={{ root: classes.chipContainer }}>
            <Chip
              label={`€ ${variants[selectedVariant].price}`}
              classes={{ root: classes.chipRoot, label: classes.chipLabel }}
            />
          </Grid>
        </Grid>

        <Grid
          item
          container
          classes={{
            root: clsx(classes.sectionContainer, classes.descriptionContainer),
          }}
        >
          <Grid item>
            <Typography variant="h5">Description</Typography>

            <Typography variant="body2">{description}</Typography>
          </Grid>
        </Grid>

        <Grid
          item
          container
          justifyContent={matchesXS ? "space-around" : "space-between"}
          direction={matchesXS ? "column" : "row"}
          classes={{
            root: clsx(classes.sectionContainer, classes.actionsContainer),
          }}
          alignItems={matchesXS ? "flex-start" : "center"}
        >
          <Grid item>
            <Grid container direction="column">
              <Grid item classes={{ root: classes.sizesAndSwatches }}>
                <Sizes
                  sizes={sizes}
                  selectedSize={selectedSize}
                  setSelectedSize={setSelectedSize}
                />
                <Swatches
                  colors={colors}
                  selectedColor={selectedColor}
                  setSelectedColor={setSelectedColor}
                />
              </Grid>
              <Grid item>
                <Typography variant="h3" classes={{ root: classes.stock }}>
                  {stockDisplay}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <QtyButton stock={stock} selectedVariant={selectedVariant} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
