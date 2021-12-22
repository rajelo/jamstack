/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import Footer from "./footer"
import { makeStyles } from "@material-ui/styles"

const useStyles = makeStyles(theme => ({
  spacer: {
    marginBottom: '5rem',
    [theme.breakpoints.down('md')]: {
      marginBottom: '2rem'
    }
  }
}))

// static query - GraphQL - to get categories and passing it as a props to header
const Layout = ({ children }) => {
  const classes = useStyles()
  const data = useStaticQuery(graphql`
    query GetCategories {
      allStrapiCategory {
        edges {
          node {
            name
            strapiId
          }
        }
      }
    }
  `)

  return (
    <>
      <Header categories={data.allStrapiCategory.edges} />
      <div className={classes.spacer} />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default Layout
