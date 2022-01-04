import React, { useState, useRef } from "react"
import { Grid, Fab, makeStyles, useMediaQuery } from "@material-ui/core"
import Pagination from "@material-ui/lab/Pagination"
import { graphql } from "gatsby"

import Layout from "../components/ui/layout"
import DynamicToolbar from "../components/product-list/DynamicToolbar"
import ListOfProducts from "../components/product-list/ListOfProducts"

const useStyles = makeStyles(theme => ({
  fab: {
    alignSelf: "flex-end",
    marginRight: "2rem",
    marginBottom: "2rem",
    color: "#fff",
    fontFamily: "Montserrat",
    fontSize: "5rem",
    width: "5rem",
    height: "5rem",
  },
  pagination: {
    alignSelf: "flex-end",
    marginRight: "2%",
    marginTop: "-3rem",
    marginBottom: "4rem",
    // there is overlapping with last product and pagination on the medium breakpoint
    [theme.breakpoints.only("md")]: {
      marginTop: "1rem",
    },
  },

  // to target specific CSS class
  "@global": {
    ".MuiPaginationItem-root": {
      fontFamily: "Montserrat",
      fontSize: "2rem",
      color: theme.palette.primary.main,
      "&.Mui-selected": {
        color: "#fff",
      },
    },
  },
}))

export default function ProductList({
  // renaming filterOptions to options, because I want to use filterOptions for my state variable
  pageContext: { filterOptions: options, name, description },
  data: {
    // destructuring edges and renaming them to products
    allStrapiProduct: { edges: products },
  },
}) {
  // console.log(products)
  // data.allStrapiProduct.edges

  const classes = useStyles()
  const [layout, setLayout] = useState("grid")
  const [page, setPage] = useState(1)
  const [filterOptions, setFilterOptions] = useState(options)
  const scrollRef = useRef(null)

  const matchesLG = useMediaQuery(theme => theme.breakpoints.down('lg'))
  const matchesMD = useMediaQuery(theme => theme.breakpoints.down('md'))
  const matchesSM = useMediaQuery(theme => theme.breakpoints.down('sm'))

  const scroll = () => {
    scrollRef.current.scrollIntoView({ behavior: "smooth" })
  }

  // pagination
  let gridProductsPerPage
  if (matchesLG) gridProductsPerPage = 12
  else if (matchesMD) gridProductsPerPage = 10
  else if (matchesSM) gridProductsPerPage = 8
  else gridProductsPerPage = 16

  const productsPerPage = layout === "grid" ? gridProductsPerPage : 6
  let numVariants = 0
  products.map(product => (numVariants += product.node.variants.length))
  const numPages = Math.ceil(numVariants / productsPerPage)

  return (
    <>
      <div ref={scrollRef} />
      <Layout>
        <Grid container direction="column" alignItems="center">
          <DynamicToolbar
            filterOptions={filterOptions}
            setFilterOptions={setFilterOptions}
            name={name}
            description={description}
            layout={layout}
            setLayout={setLayout}
            setPage={setPage}
          />
          <ListOfProducts
            products={products}
            filterOptions={filterOptions}
            layout={layout}
            page={page}
            productsPerPage={productsPerPage}
          />
          <Pagination
            count={numPages}
            page={page}
            onChange={(e, newPage) => setPage(newPage)}
            color="primary"
            classes={{ root: classes.pagination }}
          />
          <Fab onClick={scroll} color="primary" classes={{ root: classes.fab }}>
            ^
          </Fab>
        </Grid>
      </Layout>
    </>
  )
}

export const query = graphql`
  query GetCategoryProducts($id: String!) {
    allStrapiProduct(filter: { category: { id: { eq: $id } } }) {
      edges {
        node {
          strapiId
          name
          category {
            name
          }
          variants {
            color
            id
            price
            size
            style
            colorLabel
            images {
              url
            }
          }
        }
      }
    }
  }
`
