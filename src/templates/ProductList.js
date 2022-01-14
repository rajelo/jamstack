import React, { useState, useRef, useEffect } from "react"
import { Grid, Fab, makeStyles, useMediaQuery } from "@material-ui/core"
import Pagination from "@material-ui/lab/Pagination"
import { graphql } from "gatsby"

import Layout from "../components/ui/layout"
import DynamicToolbar from "../components/product-list/DynamicToolbar"
import ListOfProducts from "../components/product-list/ListOfProducts"
// when export is not default I have to destructure import
import {
  alphabetic,
  time,
  price,
} from "../components/product-list/SortFunctions"

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
  const [sortOptions, setSortOptions] = useState([
    { label: "A-Z", active: true, function: data => alphabetic(data, "asc") },
    { label: "Z-A", active: false, function: data => alphabetic(data, "desc") },
    { label: "NEWEST", active: false, function: data => time(data, "asc") },
    { label: "OLDEST", active: false, function: data => time(data, "desc") },
    { label: "PRICE ↑", active: false, function: data => price(data, "asc") },
    { label: "PRICE ↓", active: false, function: data => price(data, "desc") },
    { label: "REVIEWS", active: false, function: data => data },
  ])

  const scrollRef = useRef(null)

  const matchesLG = useMediaQuery(theme => theme.breakpoints.down("lg"))
  const matchesMD = useMediaQuery(theme => theme.breakpoints.down("md"))
  const matchesSM = useMediaQuery(theme => theme.breakpoints.down("sm"))

  const scroll = () => {
    scrollRef.current.scrollIntoView({ behavior: "smooth" })
  }

  // useEffect will run only when filterOptions changes, it is in dependency array
  // when we select select a new filter, we want to go to fist page
  useEffect(() => {
    setPage(1)
  }, [filterOptions, layout])

  // pagination
  let gridProductsPerPage
  if (matchesLG) gridProductsPerPage = 12
  else if (matchesMD) gridProductsPerPage = 10
  else if (matchesSM) gridProductsPerPage = 8
  else gridProductsPerPage = 16

  const productsPerPage = layout === "grid" ? gridProductsPerPage : 6

  // slicing for pagination
  let content = []

  // sorting function
  // returns active sort option, filter returns array -> [0]
  const selectedSort = sortOptions.filter(option => option.active)[0]
  const sortedProducts = selectedSort.function(products)

  sortedProducts.map((product, i) =>
    product.node.variants.map(variant => content.push({ product: i, variant }))
  )

  {
    /* setup for products filtering */
  }

  let isFiltered = false
  // master list of active filters: { Size: [{label: 'S'}, {label: 'M'}], Style: [{label: 'Male'}] }
  let filters = {}
  let filteredProducts = []

  // implemented for filtering the products

  Object.keys(filterOptions)
    .filter(option => filterOptions[option] !== null)
    .map(option => {
      filterOptions[option].forEach(value => {
        if (value.checked) {
          isFiltered = true

          if (filters[option] === undefined) {
            filters[option] = []
          }

          if (!filters[option].includes(value)) {
            filters[option].push(value)
          }

          content.forEach(item => {
            if (option === "Color") {
              if (
                item.variant.colorLabel === value.label &&
                !filteredProducts.includes(item)
              ) {
                filteredProducts.push(item)
              }
            } else if (
              item.variant[option.toLowerCase()] === value.label &&
              !filteredProducts.includes(item)
            ) {
              filteredProducts.push(item)
            }
          })
        }
      })
    })

  Object.keys(filters).forEach(filter => {
    filteredProducts = filteredProducts.filter(item => {
      let valid

      filters[filter].some(value => {
        if (filter === "Color") {
          if (item.variant.colorLabel === value.label) {
            valid = item
          }
        } else if (item.variant[filter.toLowerCase()] === value.label) {
          valid = item
        }
      })

      return valid
    })
  })

  if (isFiltered) {
    content = filteredProducts
  }

  // console.log(filteredProducts)
  // console.log(content)

  // setting the correct number of displayed products for correct pagination count
  const numPages = Math.ceil(content.length / productsPerPage)

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
            sortOptions={sortOptions}
            setSortOptions={setSortOptions}
          />
          <ListOfProducts
            products={products}
            content={content}
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
          createdAt
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
