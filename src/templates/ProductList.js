import React from "react"
import { Grid } from "@material-ui/core"
import { graphql } from "gatsby"

import Layout from "../components/ui/layout"
import DynamicToolbar from "../components/product-list/DynamicToolbar"

export default function ProductList({
  pageContext: { filterOptions, name, description },
  data: {
    allStrapiProduct: { edges: products },
    // destructuring edges and renaming them to products
  },
}) {

  // console.log(data)
  // data.allStrapiProduct.edges

  return (
    <Layout>
      <Grid container direction="column" alignItems="center">
        <DynamicToolbar
          filterOptions={filterOptions}
          name={name}
          description={description}
        />
      </Grid>
    </Layout>
  )
}

export const query = graphql`
  query GetCategoryProducts($id: String!) {
    allStrapiProduct(filter: { category: { id: { eq: $id } } }) {
      edges {
        node {
          strapiId
          name
          variants {
            color
            id
            price
            size
            style
            images {
              url
            }
          }
        }
      }
    }
  }
`
