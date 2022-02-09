import React, { useState } from "react"
import {
  Grid,
  Typography,
  makeStyles,
  TextField,
  InputAdornment,
  Button,
  IconButton,
  CircularProgress,
} from "@material-ui/core"
import clsx from "clsx"
import axios from "axios"

import Fields from "./Fields"
import { EmailPassword } from "./LoginOptimized"
import { setUser, setSnackbar } from "../../contexts/actions"

import addUserIcon from "../../images/Icons/add-user.svg"
import nameAdornment from "../../images/Icons/name-adornment.svg"
import forward from "../../images/Icons/forward-outline.svg"
import backward from "../../images/Icons/backwards-outline.svg"

const useStyles = makeStyles(theme => ({
  addUserIcon: {
    height: "10rem",
    width: "11rem",
    marginTop: "5rem",
  },
  facebookSignUp: {
    minWidth: "12rem",
    borderRadius: 50,
    marginTop: "-3rem",
  },
  facebookText: {
    textTransform: "none",
    fontSize: "1.5rem",
  },
  navigation: {
    height: "4rem",
    width: "4rem",
  },
  emailAdorment: {
    height: 17,
    width: 22,
    marginBottom: 10,
  },
  visibleIcon: {
    padding: 0,
  },
  removeButtonMargin: {
    marginTop: 0,
  },
}))

export default function SignUp({
  steps,
  setSelectedStep,
  dispatchUser,
  dispatchFeedback,
}) {
  const classes = useStyles()

  const [values, setValues] = useState({
    email: "",
    password: "",
    name: "",
  })
  const [errors, setErrors] = useState({})
  const [visible, setVisible] = useState(false)
  const [info, setInfo] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleNavigate = direction => {
    if (direction === "forward") {
      setInfo(true)
    } else {
      if (info) {
        setInfo(false)
      } else {
        const login = steps.find(step => step.label === "Login")
        setSelectedStep(steps.indexOf(login))
      }
    }
  }

  const handleComplete = () => {
    setLoading(true)

    axios
      .post(process.env.GATSBY_STRAPI_URL + "/auth/local/register", {
        username: values.name,
        email: values.email,
        password: values.password,
      })
      .then(response => {
        setLoading(false)
        // console.log("User Profile", response.data.user)
        // console.log("JWT", response.data.jwt)

        dispatchUser(setUser({ ...response.data.user, jwt: response.data.jwt }))

        const complete = steps.find(step => step.label === "Complete")
        setSelectedStep(steps.indexOf(complete))
      })
      .catch(error => {
        const { message } = error.response.data.message[0].messages[0]
        setLoading(false)
        console.error(error)
        dispatchFeedback(setSnackbar({ status: "error", message }))
      })
  }

  const nameField = {
    name: {
      helperText: "You must enter a name",
      placeholder: "Name",
      startAdornment: <img src={nameAdornment} alt="name" />,
    },
  }

  const fields = info
    ? EmailPassword(classes, false, false, visible, setVisible)
    : nameField

  const disabled =
    Object.keys(errors).some(error => errors[error] === true) ||
    Object.keys(errors).length !== Object.keys(values).length

  return (
    <>
      <Grid item>
        <img src={addUserIcon} alt="new user" className={classes.addUserIcon} />
      </Grid>

      <Fields
        fields={fields}
        errors={errors}
        setErrors={setErrors}
        values={values}
        setValues={setValues}
      />

      <Grid item>
        <Button
          variant="contained"
          color="secondary"
          component={!info ? "a" : undefined}
          href={
            !info
              ? `${process.env.GATSBY_STRAPI_URL}/connect/facebook`
              : undefined
          }
          disabled={loading || (info && disabled)}
          onClick={() => (info ? handleComplete() : null)}
          classes={{
            root: clsx(classes.facebookSignUp, {
              [classes.removeButtonMargin]: info,
            }),
          }}
        >
          {loading ? (
            <CircularProgress />
          ) : (
            <Typography variant="h5" classes={{ root: classes.facebookText }}>
              {info ? "Sign up" : "Sign up with Facebook"}
            </Typography>
          )}
        </Button>
      </Grid>

      <Grid item container justifyContent="space-between">
        <Grid item>
          <IconButton onClick={() => handleNavigate("backward")}>
            <img
              src={backward}
              alt="back to login"
              className={classes.navigation}
            />
          </IconButton>
        </Grid>
        {/* I don't want to display forward button on the last step of authentification */}
        {info ? null : (
          <Grid item>
            <IconButton onClick={() => handleNavigate("forward")}>
              <img
                src={forward}
                alt="continue registration"
                className={classes.navigation}
              />
            </IconButton>
          </Grid>
        )}
      </Grid>
    </>
  )
}
