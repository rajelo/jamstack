import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Grid, Typography, IconButton, Button, Chip } from "@material-ui/core"
import { makeStyles, useMediaQuery } from "@material-ui/core"
import clsx from "clsx"

import featuredAdornment from "../../images/Icons/featured-adornment.svg"
import frame from "../../images/Icons/product-frame-grid.svg"
import explore from "../../images/Icons/explore.svg"

import Rating from "./Rating"

const useStyles = makeStyles(theme => ({
  background: {
    backgroundImage: `url(${featuredAdornment})`,
    backgroundPosition: "top",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "100%",
    height: "180rem",
    padding: "0 2.5rem",
    [theme.breakpoints.down('md')]: {
      height: '260rem'
    },
    [theme.breakpoints.down('xs')]: {
      height: '220rem'
    }
  },
  featured: {
    height: "20rem",
    width: "20rem",
    [theme.breakpoints.down("xs")]: {
      height: "15rem",
      width: "15rem",
    },
  },
  frame: {
    backgroundImage: `url(${frame})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    borderRadius: 0,
    height: "24.83rem",
    width: "25rem",
    boxSizing: "border-box",
    boxShadow: theme.shadows[5],
    position: "absolute",
    zIndex: 1,
    [theme.breakpoints.down("xs")]: {
      height: "19.8rem",
      width: "20rem",
    },
  },
  slide: {
    backgroundColor: theme.palette.primary.main,
    height: "20rem",
    width: "24.5rem",
    zIndex: 0,
    transition: "transform 0.5s ease",
    // transition: 'z-index 0.5s',
    padding: "1rem 2rem",
    [theme.breakpoints.down("md")]: {
      height: "15.2rem",
      width: "24.5rem",
    },
    [theme.breakpoints.down("xs")]: {
      height: "15.2rem",
      width: "19.5rem",
    },
  },
  slideLeft: {
    transform: "translate(-24.5rem, 0px)",
  },
  slideRight: {
    transform: "translate(24.5rem, 0px)",
  },
  slideDown: {
    transform: "translate(0px, 20rem)",
    [theme.breakpoints.down("xs")]: {
      transform: "translate(0px, 17rem)",
    },
  },
  productContainer: {
    margin: "5rem 0",
  },
  exploreContainer: {
    marginTop: "5rem",
    [theme.breakpoints.down("md")]: {
      marginTop: "1rem",
    },
  },
  exploreButton: {
    textTransform: "none",
  },
  exploreIcon: {
    height: "1.5rem",
    marginLeft: "1rem",
  },
  chipLabel: {
    ...theme.typography.h5,
  },
  chipRoot: {
    backgroundColor: theme.palette.secondary.main,
    marginTop: "0.5rem",
  },
}))

export default function FeaturedProducts() {
  const classes = useStyles()
  const [expanded, setExpanded] = useState(null)

  const matchesMD = useMediaQuery(theme => theme.breakpoints.down("md"))

  const data = useStaticQuery(graphql`
    query GetFeatured {
      allStrapiProduct(filter: { featured: { eq: true } }) {
        edges {
          node {
            name
            strapiId
            variants {
              price
              images {
                url
              }
            }
          }
        }
      }
    }
  `)

  // console.log(data)

  return (
    <Grid
      container
      direction="column"
      classes={{ root: classes.background }}
      justifyContent={matchesMD ? "space-around" : "center"}
    >
      {data.allStrapiProduct.edges.map(({ node }, i) => {
        const alignment = matchesMD
          ? "center"
          : i === 0 || i === 3
          ? "flex-start"
          : i === 1 || i === 4
          ? "center"
          : "flex-end"

        return (
          <Grid
            item
            container
            key={node.strapiId}
            justifyContent={alignment}
            classes={{ root: classes.productContainer }}
            alignItems="center"
          >
            <IconButton
              onClick={() =>
                expanded === i ? setExpanded(null) : setExpanded(i)
              }
              classes={{ root: classes.frame }}
            >
              <img
                src={
                  process.env.GATSBY_STRAPI_URL + node.variants[0].images[0].url
                }
                alt={node.name}
                className={classes.featured}
              />
            </IconButton>

            <Grid
              container
              direction="column"
              classes={{
                root: clsx(classes.slide, {
                  [classes.slideLeft]:
                    !matchesMD && expanded === i && alignment === "flex-end",
                  [classes.slideRight]:
                    !matchesMD &&
                    expanded === i &&
                    (alignment === "flex-start" || alignment === "center"),
                  [classes.slideDown]: matchesMD && expanded === i,
                }),
              }}
            >
              <Grid item>
                <Typography variant="h4">{node.name.split(" ")[0]}</Typography>

                <Grid item>
                  <Rating number={3.5} />
                </Grid>

                <Grid item>
                  <Chip
                    label={`$${node.variants[0].price}`}
                    classes={{
                      root: classes.chipRoot,
                      label: classes.chipLabel,
                    }}
                  />
                </Grid>

                <Grid item classes={{ root: classes.exploreContainer }}>
                  <Button classes={{ root: classes.exploreButton }}>
                    <Typography variant="h5">Details</Typography>
                    <img
                      src={explore}
                      alt="go to product details"
                      className={classes.exploreIcon}
                    />
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        )
      })}
    </Grid>
  )
}
