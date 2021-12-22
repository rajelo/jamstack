import React, { useState } from "react"
import { Grid, Typography, Button, IconButton } from "@material-ui/core"
import Loadable from "@loadable/component"
import clsx from "clsx" // to conditionally apply classnames - included in MUI
import { useStaticQuery, graphql } from "gatsby"
import { makeStyles, useMediaQuery } from "@material-ui/core"

// background image
import promoAdornment from "../../images/Icons/promo-adornment.svg"
// explore button icon
import explore from "../../images/Icons/explore.svg"

const Carousel = Loadable(() => import("react-spring-3d-carousel"))

const useStyles = makeStyles(theme => ({
  mainContainer: {
    backgroundImage: `url(${promoAdornment})`,
    backgroundPosition: "top",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "100%",
    height: "70rem",
    padding: "30rem 10rem 10rem 10rem",
    [theme.breakpoints.down('lg')]: {
      padding: '20rem 2rem 2rem 2rem'
    },
    [theme.breakpoints.down('xs')]: {
      height: '50rem',
      overflow: 'hidden',
      padding: '5rem 0 2rem'
    }

  },
  productName: {
    color: "#fff",
    [theme.breakpoints.down('xs')]: {
      fontSize: '3rem'
    },
  },
  iconButton: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  carouselImage: {
    height: "30rem",
    width: "25rem",
    backgroundColor: "#fff",
    borderRadius: 20,
    boxShadow: theme.shadows[5],
    [theme.breakpoints.down('sm')]: {
      height: '25rem',
      width: '20rem'
    },
    [theme.breakpoints.down('xs')]: {
      height: '23rem',
      width: '17rem'
    }
  },
  carouselContainer: {
    marginLeft: "20rem",
    [theme.breakpoints.down('md')]: {
      marginLeft: 0,
      height: '30rem'
    },
    [theme.breakpoints.down('xs')]: {
      marginLeft: 0,
      height: '20rem'
    }
  },
  space: {
    margin: '0 15rem 10rem',
    [theme.breakpoints.down('sm')]: {
      margin: '0 8rem 10rem'
    },
    [theme.breakpoints.down('xs')]: {
      margin: '0 4rem 5rem'
    }
  },
  explore: {
    textTransform: 'none',
    marginRight: '2rem'
  },
  descriptionContainer: {
    textAlign: 'right',
    [theme.breakpoints.down('md')]: {
      textAlign: 'center'
    }
  },
  description: {
    [theme.breakpoints.down('xs')]: {
      fontSize: '2.5rem'
    }
  }
}))

export default function PromotionalProducts() {
  const classes = useStyles()

  const [selectedSlide, setSelectedSlide] = useState(0)

  const matchesMD = useMediaQuery(theme => theme.breakpoints.down('md'))

  const data = useStaticQuery(graphql`
    query GetPromo {
      allStrapiProduct(filter: { promo: { eq: true } }) {
        edges {
          node {
            name
            strapiId
            description
            variants {
              images {
                url
              }
            }
          }
        }
      }
    }
  `)

  let slides = []

  data.allStrapiProduct.edges.map(({ node }, i) =>
    slides.push({
      key: i,
      content: (
        <Grid container direction="column" alignItems="center">
          <Grid item>
            <IconButton
              disableRipple
              onClick={() => setSelectedSlide(i)}
              classes={{ root: clsx(classes.iconButton, {
                [classes.space]: selectedSlide !== i
              }) }}
            >
              <img
                src={
                  process.env.GATSBY_STRAPI_URL + node.variants[0].images[0].url
                }
                alt={`image-${i}`}
                className={classes.carouselImage}
              />
            </IconButton>
          </Grid>

          <Grid item>
            {selectedSlide === i ? (
              <Typography variant="h1" classes={{ root: classes.productName }}>
                {node.name.split(" ")[0]}
              </Typography>
            ) : null}
          </Grid>
        </Grid>
      ),
      description: node.description,
    })
  )

  // console.log(process.env.GATSBY_STRAPI_URL)

  return (
    <Grid
      container
      justifyContent={matchesMD ? 'space-around' : "space-between"}
      alignItems="center"
      classes={{ root: classes.mainContainer }}
      direction={matchesMD ? 'column' : 'row'}
    >
      <Grid item classes={{ root: classes.carouselContainer }}>
        <Carousel slides={slides} goToSlide={selectedSlide} />
      </Grid>

      <Grid item classes={{root: classes.descriptionContainer}}>
        <Typography variant='h2' paragraph classes={{root: classes.description}}>
          {slides[selectedSlide].description}
        </Typography>
        <Button>
          <Typography variant='h4' classes={{root: classes.explore}}>
            Explore
          </Typography>
          <img src={explore} alt='go to product page' />
        </Button>
      </Grid>

    </Grid>
  )
}
