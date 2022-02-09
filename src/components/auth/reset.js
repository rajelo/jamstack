import React, { useState, useEffect } from "react"
import axios from "axios"
import {
  Grid,
  Typography,
  makeStyles,
  Button,
  CircularProgress,
} from "@material-ui/core"

import Fields from "./Fields"
import { EmailPassword } from "./LoginOptimized"
import { setSnackbar } from "../../contexts/actions"

import accountIcon from "../../images/Icons/account.svg"

const useStyles = makeStyles(theme => ({
  reset: {
    width: "20rem",
    borderRadius: 50,
    textTransform: "none",
    marginBottom: "4rem",
  },
  icon: {
    marginTop: "2rem",
  },
}))

export default function Reset({ steps, setSelectedStep, dispatchFeedback }) {
  const classes = useStyles()

  const [visible, setVisible] = useState(false)
  const [values, setValues] = useState({ password: "", confirmation: "" })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  // I destructure password straight away, because I don't need email
  const { password } = EmailPassword(classes, true, false, visible, setVisible)

  //   confirmation has to have the same properties -> ... spread operator
  //   and I want to overwrite placeholder
  const fields = {
    password,
    confirmation: { ...password, placeholder: "Confirm Password" },
  }

  const handleReset = () => {
    setLoading(true)
    // this will take the params from URL
    const params = new URLSearchParams(window.location.search)
    const code = params.get("code")

    axios
      .post(process.env.GATSBY_STRAPI_URL + "/auth/reset-password", {
        // this is from Strapi documentation to reset the password
        code,
        password: values.password,
        passwordConfirmation: values.confirmation,
      })
      .then(res => {
        setLoading(false)
        setSuccess(true)

        dispatchFeedback(
          setSnackbar({
            status: "success",
            message: "Password Reset Succesfully",
          })
        )
      })
      .catch(error => {
        setLoading(false)
        const { message } = error.response.data.message[0].messages[0]
        console.error(error)
        dispatchFeedback(setSnackbar({ status: "error", message }))
      })
  }

  const disabled =
    Object.keys(errors).some(error => errors[error] === true) ||
    Object.keys(errors).length !== Object.keys(values).length ||
    values.password !== values.confirmation

  useEffect(() => {
    if (!success) return

    const timer = setTimeout(() => {
      // to clear the url - remove that code string from url bar
      window.history.replaceState(null, null, window.location.pathname)
      const login = steps.find(step => step.label === "Login")
      setSelectedStep(steps.indexOf(login))
    }, 6000)

    return () => clearTimeout(timer)
  }, [success])

  return (
    <>
      <Grid item classes={{ root: classes.icon }}>
        <img src={accountIcon} alt="reset password page" />
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
          disabled={disabled}
          onClick={handleReset}
          className={classes.reset}
        >
          {loading ? (
            <CircularProgress />
          ) : (
            <Typography variant="h5">Reset Password</Typography>
          )}
        </Button>
      </Grid>
    </>
  )
}
