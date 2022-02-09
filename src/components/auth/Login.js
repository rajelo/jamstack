import React, { useState } from "react"
import {
  Grid,
  Typography,
  makeStyles,
  Button,
  IconButton,
  TextField,
  InputAdornment,
} from "@material-ui/core"

import accountIcon from "../../images/Icons/account.svg"
import EmailAdorment from "../../images/EmailAdornment"
import passwordAdornment from "../../images/Icons/password-adornment.svg"
import hidePassword from "../../images/Icons/hide-password.svg"
import showPassword from "../../images/Icons/show-password.svg"
import addUserIcon from "../../images/Icons/add-user.svg"
import forgotPasswordIcon from "../../images/Icons/forgot.svg"

const useStyles = makeStyles(theme => ({
  emailAdorment: {
    height: 17,
    width: 22,
    marginBottom: 10,
  },
  accountIcon: {
    marginTop: "2rem",
  },
  textField: {
    width: "30rem",
  },
  input: {
    color: theme.palette.secondary.main,
  },
  login: {
    width: "10rem",
    borderRadius: 50,
    textTransform: "none",
  },
  facebookButton: {
    marginTop: "-0.75rem",
  },
  facebookText: {
    fontSize: "1.5rem",
    fontWeight: 700,
    textTransform: "none",
  },
  visibleIcon: {
    padding: 0,
  },
  "@global": {
    ".MuiInput-underline:before, .MuiInput-underline:hover:not(.Mui-disabled):before": {
      borderBottom: `2px solid ${theme.palette.primary.main}`,
    },
    ".MuiInput-underline:after": {
      borderBottom: `2px solid ${theme.palette.secondary.main}`,
    },
  },
}))

export default function Login() {
  const classes = useStyles()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [visible, setVisible] = useState(false)

  return (
    <>
      <Grid item classes={{ root: classes.accountIcon }}>
        <img src={accountIcon} />
      </Grid>
      <Grid item>
        <TextField
          value={email}
          onChange={e => setEmail(e.target.value)}
          classes={{ root: classes.textField }}
          placeholder="Email"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <span className={classes.emailAdorment}>
                  <EmailAdorment />
                </span>
              </InputAdornment>
            ),
            classes: { input: classes.input },
          }}
        />
      </Grid>

      <Grid item>
        <TextField
          value={password}
          type={visible ? "text" : "password"}
          onChange={e => setPassword(e.target.value)}
          classes={{ root: classes.textField }}
          placeholder="Password"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <img src={passwordAdornment} alt="password" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setVisible(!visible)}
                  classes={{ root: classes.visibleIcon }}
                >
                  <img
                    src={visible ? showPassword : hidePassword}
                    alt={`${visible ? "show password" : "hide password"}`}
                  />
                </IconButton>
              </InputAdornment>
            ),
            classes: { input: classes.input },
          }}
        />
      </Grid>

      <Grid item>
        <Button variant="contained" color="secondary" className={classes.login}>
          <Typography variant="h5">login</Typography>
        </Button>
      </Grid>

      <Grid item>
        <Button className={classes.facebookButton}>
          <Typography variant="h3" classes={{ root: classes.facebookText }}>
            Login with Facebook
          </Typography>
        </Button>
      </Grid>

      <Grid item container justifyContent="space-between">
        <Grid item>
          <IconButton>
            <img src={addUserIcon} alt="sign up" />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton>
            <img src={forgotPasswordIcon} alt="forgot password" />
          </IconButton>
        </Grid>
      </Grid>
    </>
  )
}
