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
}))

export default function Login() {
  const classes = useStyles()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [visible, setVisible] = useState(false)

  return (
    <>
      <Grid item>
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
          //   type="password"
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
                <img
                  src={visible ? hidePassword : showPassword}
                  alt={`${visible ? "hide password" : "show password"}`}
                />
              </InputAdornment>
            ),
            classes: { input: classes.input },
          }}
        />
      </Grid>

      <Grid item>
        <Button variant="contained" color="secondary">
          <Typography variant="h5">login</Typography>
        </Button>
      </Grid>

      <Grid item>
        <Button>
          <Typography variant="h3">login with facebook</Typography>
        </Button>
      </Grid>

      <Grid item container justifyContent="space-between">
        <Grid item>
          <IconButton>
            <img src={addUserIcon} alt="sign up" />
          </IconButton>
        </Grid>
        <Grid item>
          <img src={forgotPasswordIcon} alt="forgot password" />
        </Grid>
      </Grid>
    </>
  )
}
