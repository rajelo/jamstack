import React, { useState } from "react"
import {
  Grid,
  Typography,
  makeStyles,
  Button,
  useMediaQuery,
} from "@material-ui/core"
import clsx from "clsx"

import ProductFrameGrid from "../product-list/ProductFrameGrid"

const useStyles = makeStyles(theme => ({
  recentContainer: {
    margin: "10rem 0",
    "& > :not(:last-child)": {
      marginRight: "2.5rem",
    },
    // [theme.breakpoints.down("xs")]: {
    //   margin: "5rem 0rem",
    // },
  },
  arrow: {
    minWidth: 0,
    height: "4rem",
    width: "4rem",
    fontSize: "4rem",
    color: theme.palette.primary.main,
    borderRadius: 50,
    [theme.breakpoints.down("xs")]: {
      height: "1rem",
      width: "1rem",
      fontSize: "2rem",
    },
  },
  recentItem: {
    [theme.breakpoints.down("xs")]: {
      marginRight: 0,
    },
  },
  backwardArrow: {
    [theme.breakpoints.down("xs")]: {
      marginRight: "-1rem",
    },
  },
  forwardArrow: {
    [theme.breakpoints.down("xs")]: {
      marginLeft: "-1rem",
    },
  },
}))

export default function RecentlyViewed({ products }) {
  const classes = useStyles()
  const [firstIndex, setFirstIndex] = useState(0)

  const matchesMD = useMediaQuery(theme => theme.breakpoints.down("md"))
  const matchesSM = useMediaQuery(theme => theme.breakpoints.down("sm"))

  const displayNum = matchesSM ? 1 : matchesMD ? 2 : 4

  const handleNavigation = direction => {
    if (firstIndex === 0 && direction === "backward") return 0
    else if (
      firstIndex + displayNum === products.length &&
      direction === "forward"
    )
      return null
    setFirstIndex(direction === "forward" ? firstIndex + 1 : firstIndex - 1)
  }

  if (products !== null) {
    return (
      <Grid
        item
        container
        justifyContent="center"
        alignItems="center"
        classes={{ root: classes.recentContainer }}
      >
        <Grid item>
          <Button
            onClick={() => handleNavigation("backward")}
            classes={{ root: clsx(classes.arrow, classes.backwardArrow) }}
          >
            {"<"}
          </Button>
        </Grid>
        {products.slice(firstIndex, firstIndex + displayNum).map(product => {
          let sizes = []
          let colors = []
          product.node.variants.map(variant => {
            sizes.push(variant.size)
            colors.push(variant.color)
          })
          const hasStyles = product.node.variants.some(
            variant => variant.style !== null
          )

          return (
            <Grid item classes={{ root: classes.recentItem }}>
              <ProductFrameGrid
                key={product.node.variants[product.selectedVariant].id}
                product={product}
                variant={product.node.variants[product.selectedVariant]}
                disableQuickView
                sizes={sizes}
                colors={colors}
                hasStyles={hasStyles}
                small
              />
            </Grid>
          )
        })}
        <Grid item>
          <Button
            onClick={() => handleNavigation("forward")}
            classes={{ root: clsx(classes.arrow, classes.forwardArrow) }}
          >
            {">"}
          </Button>
        </Grid>
      </Grid>
    )
  } else return null
}
