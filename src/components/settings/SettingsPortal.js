import React, { useContext, useState, useEffect } from "react"
import { Grid, Typography, makeStyles, Button } from "@material-ui/core"
import { useSpring, useSprings, animated } from "react-spring"
import useResizeAware from "react-resize-aware"
import clsx from "clsx"

import { UserContext } from "../../contexts"
import Settings from "./Settings"

import accountIcon from "../../images/Icons/account.svg"
import settingsIcon from "../../images/Icons/settings.svg"
import orderHistoryIcon from "../../images/Icons/order-history.svg"
import favoritesIcon from "../../images/Icons/favorite.svg"
import subscriptionIcon from "../../images/Icons/subscription.svg"
import backround from "../../images/Icons/repeating-smallest.svg"

const useStyles = makeStyles(theme => ({
  dashboard: {
    width: "100%",
    minHeight: "30rem",
    height: "auto",
    backgroundImage: `url(${backround})`,
    // backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "repeat",
    borderTop: `0.5rem solid ${theme.palette.primary.main}`,
    borderBottom: `0.5rem solid ${theme.palette.primary.main}`,
    margin: "5rem 0",
  },
  icon: {
    height: "12rem",
    width: "12rem",
  },
  button: {
    backgroundColor: theme.palette.primary.main,
  },
  hover: {
    "&:hover": {
      cursor: "pointer",
      backgroundColor: theme.palette.secondary.main,
    },
  },
}))

const AnimatedButton = animated(Button)
const AnimatedGrid = animated(Grid)

export default function SettingsPortal() {
  const classes = useStyles()
  const { user } = useContext(UserContext)
  const [selectedSetting, setSelectedSetting] = useState(null)
  //   we render resizeListener inside a component and it will update sizes state
  const [resizeListener, sizes] = useResizeAware()
  const [showComponent, setShowComponent] = useState(false)

  const buttons = [
    { label: "Settings", icon: settingsIcon, component: Settings },
    { label: "Order History", icon: orderHistoryIcon },
    { label: "Favorites", icon: favoritesIcon },
    { label: "Subscriptions", icon: subscriptionIcon },
  ]

  const handleClick = setting => {
    if (selectedSetting === setting) {
      setSelectedSetting(null)
    } else {
      setSelectedSetting(setting)
    }
  }

  //   arguments: number of springs we need, properties that we want to animate
  const springs = useSprings(
    buttons.length,
    buttons.map(button => ({
      //   transform - CSS property, I want other buttons to disappear - scale(0)
      //   React Spring will animate in between property values
      //   for chaining animations I also has to pass to property
      to: async (next, cancel) => {
        const scale = {
          transform:
            selectedSetting === button.label || selectedSetting === null
              ? "scale(1)"
              : "scale(0)",
          // delays in miliseconds
          delay: selectedSetting !== null ? 0 : 600,
        }

        const size = {
          height: selectedSetting === button.label ? "60rem" : "22rem",
          width:
            selectedSetting === button.label ? `${sizes.width}px` : "352px",
          borderRadius: selectedSetting === button.label ? 0 : 25,
          delay: selectedSetting !== null ? 600 : 0,
        }

        const hide = {
          display:
            selectedSetting === button.label || selectedSetting === null
              ? "flex"
              : "none",
          delay: 150,
        }

        await next(selectedSetting !== null ? scale : size)
        await next(hide)
        await next(selectedSetting !== null ? size : scale)
      },
    }))
  )

  const styles = useSpring({
    // shorthand for to={opacity: 1} from={opacity: 0}
    opacity: selectedSetting === null || showComponent ? 1 : 0,
    delay: selectedSetting === null || showComponent ? 0 : 1350,
  })

  useEffect(() => {
    if (selectedSetting === null) {
      setShowComponent(false)
      return
    } else {
      const timer = setTimeout(() => {
        setShowComponent(true)
        return () => clearTimeout(timer)
      }, 2000)
    }
  }, [selectedSetting])

  return (
    <Grid container direction="column" alignItems="center">
      {resizeListener}
      <Grid item>
        <img src={accountIcon} alt="settings page" />
      </Grid>
      <Grid item>
        <Typography variant="h4" color="secondary">
          Welcome back, {user.username}
        </Typography>
      </Grid>
      <Grid
        item
        container
        justifyContent="space-around"
        alignItems="center"
        classes={{ root: classes.dashboard }}
      >
        {springs.map((prop, i) => {
          const button = buttons[i]

          return (
            <AnimatedGrid
              item
              key={i}
              onClick={() => (showComponent ? null : handleClick(button.label))}
              style={prop}
              classes={{
                root: clsx(classes.button, {
                  [classes.hover]: selectedSetting === null,
                }),
              }}
            >
              <AnimatedGrid
                container
                direction="column"
                style={styles}
                alignItems="center"
                justifyContent="center"
              >
                {selectedSetting === button.label && showComponent ? (
                  <button.component />
                ) : (
                  <>
                    <Grid item>
                      <img
                        src={button.icon}
                        alt={button.label}
                        className={classes.icon}
                      />
                    </Grid>
                    <Grid item>
                      <Typography variant="h5">{button.label}</Typography>
                    </Grid>
                  </>
                )}
              </AnimatedGrid>
            </AnimatedGrid>
          )
        })}
      </Grid>
    </Grid>
  )
}
