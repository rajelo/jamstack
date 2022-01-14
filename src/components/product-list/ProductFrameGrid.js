import React, { useState } from "react"
import { Grid, Typography, makeStyles, useMediaQuery } from "@material-ui/core"
import clsx from "clsx"
import { navigate } from "gatsby"

import frame from "../../images/Icons/product-frame-grid.svg"
import Quickview from "./QuickView"

const useStyles = makeStyles(theme => ({
  frame: {
    backgroundImage: `url(${frame})`,
    backgroundPosition: "center",
    // contain makes sure that borders appear correctly
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    height: "25rem",
    width: "25rem",
    // it is grid item, but I can use display flex to get access to justifyContent and alignItems
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      height: "20rem",
      width: "20rem",
    },
    [theme.breakpoints.up("xs")]: {
      height: ({ small }) => (small ? "15rem" : undefined),
      width: ({ small }) => (small ? "15rem" : undefined),
    },
  },
  product: {
    height: "20rem",
    width: "20rem",
    [theme.breakpoints.down("xs")]: {
      height: "15rem",
      width: "15rem",
    },
    [theme.breakpoints.up("xs")]: {
      height: ({ small }) => (small ? "12rem" : undefined),
      width: ({ small }) => (small ? "12rem" : undefined),
    },
  },
  title: {
    backgroundColor: theme.palette.primary.main,
    height: "5rem",
    width: "25rem",
    // it is grid item, but I can use display flex to get access to justifyContent and alignItems
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "-0.1rem",
    [theme.breakpoints.down("xs")]: {
      height: "3.5rem",
      width: "20rem",
    },
    [theme.breakpoints.up("xs")]: {
      width: ({ small }) => (small ? "15rem" : undefined),
    },
  },
  invisibility: {
    // the space will be taken up, but we won't see it
    visibility: "hidden",
  },
  frameContainer: {
    "&:hover": {
      cursor: "pointer",
    },
  },
}))

// filter returns array and I want the object of that array - that's why [] at the end
export const colorIndex = (product, color, variant) => {
  return product.node.variants.indexOf(
    product.node.variants.filter(
      item =>
        item.color === color &&
        item.style === variant.style &&
        item.size === variant.size
    )[0]
  )
}

export default function ProductFrameGrid({
  product,
  variant,
  sizes,
  colors,
  selectedSize,
  selectedColor,
  setSelectedSize,
  setSelectedColor,
  hasStyles,
  disableQuickView,
  small,
  stock,
}) {
  const classes = useStyles({ small })
  const [open, setOpen] = useState(false)
  const matchesMD = useMediaQuery(theme => theme.breakpoints.down("md"))

  if (matchesMD && open) setOpen(false)

  const imageIndex = colorIndex(product, selectedColor, variant)

  const imgURL =
    process.env.GATSBY_STRAPI_URL +
    (imageIndex !== -1
      ? product.node.variants[imageIndex].images[0].url
      : variant.images[0].url)
  const productName = product.node.name.split(" ")[0]

  return (
    <Grid
      item
      classes={{
        root: clsx(classes.frameContainer, {
          [classes.invisibility]: open === true,
        }),
      }}
    >
      <Grid
        container
        direction="column"
        onClick={() =>
          matchesMD || disableQuickView
            ? navigate(
                hasStyles
                  ? `/${product.node.category.name.toLowerCase()}/${product.node.name
                      .split(" ")[0]
                      .toLowerCase()}?style=${variant.style}`
                  : `/${product.node.category.name.toLowerCase()}/${product.node.name
                      .split(" ")[0]
                      .toLowerCase()}`
              )
            : setOpen(true)
        }
      >
        <Grid item classes={{ root: classes.frame }}>
          <img
            src={imgURL}
            alt={product.node.name}
            className={classes.product}
          />
        </Grid>
        <Grid item classes={{ root: classes.title }}>
          <Typography variant="h5">{productName}</Typography>
        </Grid>
      </Grid>
      {/* Dialog can be anywhere - but inside some component - pop up element */}
      <Quickview
        url={imgURL}
        open={open}
        setOpen={setOpen}
        name={productName}
        price={variant.price}
        product={product}
        variant={variant}
        sizes={sizes}
        colors={colors}
        selectedColor={selectedColor}
        selectedSize={selectedSize}
        setSelectedColor={setSelectedColor}
        setSelectedSize={setSelectedSize}
        hasStyles={hasStyles}
        stock={stock}
        imageIndex={imageIndex}
      />
    </Grid>
  )
}
