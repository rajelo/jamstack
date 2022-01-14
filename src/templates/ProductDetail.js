import React, { useState, useEffect } from "react"
import { useQuery } from "@apollo/client"
import { Grid, useMediaQuery } from "@material-ui/core"

import Layout from "../components/ui/layout"
import ProductImages from "../components/product-detail/ProductImages"
import ProductInfo from "../components/product-detail/ProductInfo"
import RecentlyViewed from "../components/product-detail/RecentlyViewed"

import { GET_DETAILS } from "../apollo/queries"

export default function ProductDetail({
  pageContext: { name, id, category, description, variants, product },
}) {
  // to keep track of selected variant, I build ProductDetail just for products, not for variants
  const [selectedVariant, setSelectedVariant] = useState(0)
  const [selectedImage, setSelectedImage] = useState(0)
  const [stock, setStock] = useState(null)

  const matchesMD = useMediaQuery(theme => theme.breakpoints.down("md"))

  // this will pull out query string parameters from url
  const params = new URLSearchParams(window.location.search)
  const style = params.get("style")

  const { loading, error, data } = useQuery(GET_DETAILS, {
    variables: { id },
  })

  useEffect(() => {
    if (error) {
      setStock(-1)
    } else if (data) {
      setStock(data.product.variants)
    }
  }, [error, data])

  // console.log(stock)

  useEffect(() => {
    const styledVariant = variants.filter(
      variant => variant.style === params.get("style")
    )[0]

    const variantIndex = variants.indexOf(styledVariant)

    // setting up recentlyViewed products in localeStorage
    // localeStorage supports only strings that's why we use JSON.parse and JSON.stringify
    let recentlyViewed = JSON.parse(
      window.localStorage.getItem("recentlyViewed")
    )

    // console.log(recentlyViewed)

    // console.log(JSON.parse(window.localStorage.getItem("recentlyViewed")))

    if (recentlyViewed) {
      if (recentlyViewed.length === 10) {
        // shift will remove the first element in array -> the oldest recentlyViewed product
        recentlyViewed.shift()
      }

      if (
        !recentlyViewed.some(
          product =>
            product.node.name === name &&
            product.selectedVariant === variantIndex
        )
      ) {
        recentlyViewed.push({ ...product, selectedVariant: variantIndex })
      }
    } else {
      recentlyViewed = [{ ...product, selectedVariant: variantIndex }]
    }

    window.localStorage.setItem(
      "recentlyViewed",
      JSON.stringify(recentlyViewed)
    )

    setSelectedVariant(variantIndex)
  }, [style])

  return (
    <Layout>
      <Grid container direction="column">
        <Grid item container direction={matchesMD ? "column" : "row"}>
          <ProductImages
            images={variants[selectedVariant].images}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
          />
          <ProductInfo
            name={name}
            description={description}
            variants={variants}
            selectedVariant={selectedVariant}
            setSelectedVariant={setSelectedVariant}
            stock={stock}
          />
        </Grid>
        <RecentlyViewed
          products={JSON.parse(window.localStorage.getItem("recentlyViewed"))}
        />
      </Grid>
    </Layout>
  )
}
