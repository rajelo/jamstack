import React, { useState, useEffect } from "react"
import {
  Grid,
  Typography,
  makeStyles,
  Button,
  IconButton,
  CircularProgress,
  useMediaQuery,
} from "@material-ui/core"
import clsx from "clsx"
import axios from "axios"

import Fields from "./Fields"
// here I will change state of user (login) so I need to import action (action creator)
import { setUser, setSnackbar } from "../../contexts/actions"

import accountIcon from "../../images/Icons/account.svg"
import EmailAdornment from "../../images/EmailAdornment"
import passwordAdornment from "../../images/Icons/password-adornment.svg"
import hidePasswordIcon from "../../images/Icons/hide-password.svg"
import showPasswordIcon from "../../images/Icons/show-password.svg"
import addUserIcon from "../../images/Icons/add-user.svg"
import forgotPasswordIcon from "../../images/Icons/forgot.svg"
import close from "../../images/Icons/close.svg"

const useStyles = makeStyles(theme => ({
  emailAdornment: {
    height: 17,
    width: 22,
    marginBottom: 10,
  },
  accountIcon: {
    marginTop: "2rem",
  },
  login: {
    minWidth: "12rem",
    // width: "auto",
    borderRadius: 50,
    textTransform: "none",
  },
  facebookButton: {
    marginTop: "-0.75rem",
  },
  facebookText: {
    fontSize: "1.5rem",
    fontWeight: 600,
    textTransform: "none",
  },
  visibleIcon: {
    padding: 0,
  },
  close: {
    paddingTop: 5,
  },
  reset: {
    marginTop: "-4rem",
  },
  forgotPasswordIcon: {
    marginLeft: "1rem",
  },
}))

export const EmailPassword = (
  classes,
  hideEmail,
  hidePassword,
  visible,
  setVisible
) => ({
  email: {
    helperText: "Invalid Email",
    placeholder: "Email",
    type: "text",
    hidden: hideEmail,
    startAdornment: (
      <span className={classes.emailAdornment}>
        <EmailAdornment />
      </span>
    ),
  },
  password: {
    helperText:
      "Your password must be at least 8 characters long and includes 1 uppercase letter, 1 number and 1 special character.",
    placeholder: "Password",
    hidden: hidePassword,
    type: visible ? "text" : "password",
    startAdornment: <img src={passwordAdornment} alt="password" />,
    endAdornment: (
      <IconButton
        onClick={() => setVisible(!visible)}
        classes={{ root: classes.visibleIcon }}
      >
        <img
          src={visible ? showPasswordIcon : hidePasswordIcon}
          alt={`${visible ? "show password" : "hide password"}`}
        />
      </IconButton>
    ),
  },
})

export default function Login({
  steps,
  setSelectedStep,
  user,
  dispatchUser,
  dispatchFeedback,
}) {
  const classes = useStyles()

  const matchesSM = useMediaQuery(theme => theme.breakpoints.down("sm"))

  const [values, setValues] = useState({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState({})
  const [visible, setVisible] = useState(false)
  const [forgot, setForgot] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  // object containing specifics of each field
  const fields = EmailPassword(classes, false, forgot, visible, setVisible)

  const navigateSignUp = () => {
    const signUp = steps.find(step => step.label === "Sign Up")

    setSelectedStep(steps.indexOf(signUp))
  }

  const handleLogin = () => {
    setLoading(true)

    axios
      .post(process.env.GATSBY_STRAPI_URL + "/auth/local", {
        identifier: values.email,
        password: values.password,
      })
      .then(response => {
        setLoading(false)
        // console.log("User Profile", response.data.user)
        // console.log("JWT", response.data.jwt)

        dispatchUser(
          setUser({
            ...response.data.user,
            jwt: response.data.jwt,
            onboarding: true,
          })
        )
      })
      .catch(error => {
        // in error.reponse.data.message[0].messages[0] I find error log from strapi
        const { message } = error.response.data.message[0].messages[0]
        setLoading(false)
        console.error(error)
        dispatchFeedback(setSnackbar({ status: "error", message }))
      })
  }

  const handleForgot = () => {
    setLoading(true)

    axios
      .post(process.env.GATSBY_STRAPI_URL + "/auth/forgot-password", {
        email: values.email,
      })
      .then(response => {
        setLoading(false)
        setSuccess(true)

        dispatchFeedback(
          setSnackbar({ status: "success", message: "Reset Code Sent" })
        )
      })
      .catch(error => {
        setLoading(false)
        console.error(error)
        const { message } = error.response.data.message[0].messages[0]
        dispatchFeedback(setSnackbar({ status: "error", message }))
      })
  }

  const disabled =
    Object.keys(errors).some(error => errors[error] === true) ||
    Object.keys(errors).length !== Object.keys(values).length

  useEffect(() => {
    // if success is false, we are still waiting - nothing will happen - return (nothing)
    if (!success) return

    const timer = setTimeout(() => {
      setForgot(false)
    }, 6000)

    // this will cancel the timer if running
    return () => clearTimeout(timer)
  }, [success])

  return (
    <>
      <Grid item classes={{ root: classes.accountIcon }}>
        <img src={accountIcon} alt="account image" />
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
          onClick={() => (forgot ? handleForgot() : handleLogin())}
          disabled={loading || (!forgot && disabled)}
          className={clsx(classes.login, {
            [classes.reset]: forgot,
          })}
        >
          {loading ? (
            <CircularProgress />
          ) : (
            <Typography variant="h5">
              {forgot ? "Reset Password" : "Login"}
            </Typography>
          )}
        </Button>
      </Grid>

      {forgot ? null : (
        <Grid item>
          <Button
            className={classes.facebookButton}
            component="a"
            href={`${process.env.GATSBY_STRAPI_URL}/connect/facebook`}
          >
            <Typography variant="h3" classes={{ root: classes.facebookText }}>
              Login with Facebook
            </Typography>
          </Button>
        </Grid>
      )}

      <Grid item container justifyContent="space-between">
        <Grid item>
          <IconButton onClick={navigateSignUp}>
            <img src={addUserIcon} alt="sign up" />
          </IconButton>
        </Grid>
        <Grid
          item
          classes={{
            root: clsx({
              [classes.close]: forgot,
            }),
          }}
        >
          <IconButton onClick={() => setForgot(!forgot)}>
            {forgot ? null : (
              <Typography
                variant={matchesSM ? "body3" : "body2"}
                color="secondary"
              >
                Forgot Password
              </Typography>
            )}

            <img
              className={classes.forgotPasswordIcon}
              src={forgot ? close : forgotPasswordIcon}
              alt={forgot ? "back to login" : "forgot password"}
            />
          </IconButton>
        </Grid>
      </Grid>
    </>
  )
}
