import React from "react"
import {
  Grid,
  Typography,
  makeStyles,
  IconButton,
  useMediaQuery,
} from "@material-ui/core"
import { Link } from "gatsby"

import facebook from "../../images/Icons/facebook.svg"
import twitter from "../../images/Icons/twitter.svg"
import instagram from "../../images/Icons/instagram.svg"

const useStyles = makeStyles(theme => ({
  footer: {
    backgroundColor: theme.palette.primary.main,
    padding: "2rem",
  },
  link: {
    color: "#fff",
    fontSize: "1.25rem",
  },
  linkColumn: {
    width: "20rem",
  },
  linkContainer: {
    [theme.breakpoints.down("md")]: {
      marginBottom: "3rem",
    },
  },
  icon: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  "@global": {
    body: {
      margin: 0,
    },
    a: {
      textDecoration: "none",
    },
  },
}))

export default function Footer() {
  const classes = useStyles()

  const matchesMD = useMediaQuery(theme => theme.breakpoints.down("md"))

  const socialMedia = [
    { icon: facebook, alt: "facebook", link: "https://facebook.com" },
    { icon: twitter, alt: "twitter", link: "https://twitter.com" },
    { icon: instagram, alt: "instagram", link: "https://instagram.com" },
  ]

  const routes = {
    "Contact Us": [
      { label: "0907 473 151", href: "tel: 0907 473 151" },
      { label: "miro.rajelo@gmail.com", href: "mailto:miro.rajelo@gmail.com" },
    ],
    "Customer Service": [
      { label: "Contact Us", link: "/contact" },
      { label: "My Account", link: "/account" },
    ],
    Information: [
      { label: "Privacy Policy", link: "/privacy-policy" },
      { label: "Terms & Conditions", link: "/terms-conditions" },
    ],
  }

  return (
    <footer className={classes.footer}>
      <Grid
        container
        direction={matchesMD ? "column" : "row"}
        justifyContent="space-between"
      >
        {/* Links */}
        <Grid item classes={{ root: classes.linkContainer }}>
          <Grid container>
            {Object.keys(routes).map(category => (
              <Grid
                item
                container
                direction="column"
                classes={{ root: classes.linkColumn }}
                key={category}
              >
                <Grid item>
                  <Typography variant="h5">{category}</Typography>
                </Grid>

                {routes[category].map(route => (
                  <Grid item key={route.label}>
                    <Typography
                      component={route.link ? Link : "a"}
                      to={route.link ? route.link : undefined}
                      href={route.href ? route.href : undefined}
                      variant="body1"
                      classes={{ body1: classes.link }}
                    >
                      {route.label}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Social Media Icons */}
        <Grid item>
          <Grid
            container
            direction={matchesMD ? "row" : "column"}
            alignItems="center"
            justifyContent="center"
          >
            {socialMedia.map(platform => (
              <Grid item key={platform.alt}>
                <IconButton
                  component="a"
                  href={platform.link}
                  classes={{ root: classes.icon }}
                  disableRipple
                >
                  <img src={platform.icon} alt={platform.alt} />
                </IconButton>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </footer>
  )
}
