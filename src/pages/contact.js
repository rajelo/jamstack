import React, { useState } from "react"
import {
  Grid,
  Typography,
  makeStyles,
  Button,
  TextField,
  InputAdornment,
  useTheme,
  useMediaQuery,
} from "@material-ui/core"
// import { Link } from "gatsby"
import clsx from "clsx"

import address from "../images/Icons/address.svg"
import Email from "../images/EmailAdornment"
import send from "../images/Icons/send.svg"
import nameAdornment from "../images/Icons/name-adornment.svg"
import PhoneAdornment from "../images/PhoneAdornment"

import Layout from "../components/ui/layout"
import validate from "../components/ui/validate"

const useStyles = makeStyles(theme => ({
  mainContainer: {
    height: "45rem",
    backgroundColor: theme.palette.primary.main,
    marginBottom: "10rem",
    marginTop: "10rem",
    [theme.breakpoints.down("md")]: {
      marginTop: "8rem",
      height: "90rem",
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: "8rem",
      height: "80rem",
    },
  },
  formContainer: {
    height: "100%",
  },
  formWrapper: {
    height: "100%",
    [theme.breakpoints.down("md")]: {
      height: "50%",
      marginTop: "-8rem",
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  blockContainer: {
    backgroundColor: theme.palette.secondary.main,
    height: "8rem",
    width: "40rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      width: "30rem",
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  titleContainer: {
    marginTop: "-4rem",
  },
  buttonContainer: {
    marginBottom: "-4rem",
    textTransform: "none",
    borderRadius: 0,
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  sendIcon: {
    marginLeft: "2rem",
  },
  contactInfo: {
    fontSize: "1.5rem",
    marginLeft: "1rem",
  },
  contactIcon: {
    height: "3rem",
    width: "3rem",
    [theme.breakpoints.down("xs")]: {
      height: "2rem",
      width: "2rem",
    },
  },
  contactEmailIcon: {
    height: "2.5rem",
    width: "3.2rem",
    [theme.breakpoints.down("xs")]: {
      height: "2rem",
      width: "2rem",
    },
  },
  infoContainer: {
    height: "21.25rem",
    [theme.breakpoints.down("xs")]: {
      height: "10.8rem",
    },
  },
  middleInfo: {
    borderTop: "2px solid #fff",
    borderBottom: "2px solid #fff",
  },
  iconContainer: {
    borderRight: "2px solid #fff",
    height: "7rem",
    width: "8rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      height: "3.5rem",
      width: "4rem",
    },
  },
  textField: {
    width: "30rem",
    [theme.breakpoints.down("xs")]: {
      width: "20rem",
    },
  },
  input: {
    color: "#fff",
  },
  fieldContainer: {
    marginBottom: "1rem",
  },
  emailAdornment: {
    height: 18,
    width: 25,
    marginBottom: "7.5px",
  },
  phoneAdornment: {
    width: 25.173,
    height: 25.122,
  },
  multiline: {
    border: "2px solid #fff",
    borderRadius: "10px",
    margin: "1rem 0 0",
    padding: "1rem",
  },
  multilineError: {
    border: `2px solid ${theme.palette.error.main}`,
  },
  buttonDisabled: {
    backgroundColor: theme.palette.grey[500],
  },
  bigButtonText: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "2rem",
    },
  },
  "@global": {
    ".MuiInput-underline:before, .MuiInput-underline:hover:not(.Mui-disabled):before": {
      borderBottom: "2px solid #fff",
    },
    ".MuiInput-underline:after": {
      borderBottom: `2px solid ${theme.palette.secondary.main}`,
    },
  },
}))

const ContactPage = () => {
  const classes = useStyles()

  const theme = useTheme()

  const matchesMD = useMediaQuery(theme => theme.breakpoints.down("md"))
  const matchesXS = useMediaQuery(theme => theme.breakpoints.down("xs"))

  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [errors, setErrors] = useState({})

  const fields = {
    name: {
      helperText: "Yoy must enter a name!",
      placeholder: "Name",
      adornment: <img src={nameAdornment} alt="name" />,
    },
    email: {
      helperText: "Invalid email!",
      placeholder: "Email",
      adornment: (
        <div className={classes.emailAdornment}>
          <Email color={theme.palette.secondary.main} />
        </div>
      ),
    },
    phone: {
      helperText: "Invalid phone number!",
      placeholder: "Phone Number",
      adornment: (
        <div className={classes.phoneAdornment}>
          <PhoneAdornment color={theme.palette.secondary.main} />
        </div>
      ),
    },
    message: {
      helperText: "Yoy must enter a message!",
      placeholder: "Message",
      inputClasses: {
        multiline: classes.multiline,
        error: classes.multilineError,
      },
    },
  }

  const info = [
    {
      label: (
        <span>Laurinska 23,{matchesXS ? <br /> : " "}847 63 Bratislava</span>
      ),
      icon: <img className={classes.contactIcon} src={address} alt="address" />,
    },
    {
      label: "+421 907 473 151",
      icon: (
        <div className={classes.contactIcon}>
          <PhoneAdornment />
        </div>
      ),
    },
    {
      label: "miro.rajelo@gmail.com",
      icon: (
        <div className={classes.contactEmailIcon}>
          <Email color={"#fff"} />
        </div>
      ),
    },
  ]

  // for send button
  const disabled =
    Object.keys(errors).some(error => errors[error] === true) ||
    Object.keys(errors).length !== 4

  return (
    <Layout>
      <Grid
        container
        justifyContent="space-around"
        alignItems="center"
        classes={{ root: classes.mainContainer }}
        direction={matchesMD ? "column" : "row"}
      >
        {/* contact form */}
        <Grid item classes={{ root: classes.formWrapper }}>
          <Grid
            container
            classes={{ root: classes.formContainer }}
            direction="column"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid
              item
              classes={{
                root: clsx(classes.titleContainer, classes.blockContainer),
              }}
            >
              <Typography
                variant="h4"
                classes={{ root: classes.bigButtonText }}
              >
                Contact us
              </Typography>
            </Grid>

            <Grid item>
              <Grid container direction="column">
                {Object.keys(fields).map(field => {
                  const validateHelper = event => {
                    return validate({ [field]: event.target.value })
                  }

                  return (
                    <Grid
                      item
                      key={field}
                      classes={{
                        root:
                          field === "message"
                            ? classes.multilineContainer
                            : classes.fieldContainer,
                      }}
                    >
                      <TextField
                        value={values[field]}
                        onChange={e => {
                          const valid = validateHelper(e)

                          if (errors[field] || valid[field] === true) {
                            setErrors({ ...errors, [field]: !valid[field] })
                          }
                          setValues({ ...values, [field]: e.target.value })
                        }}
                        onBlur={e => {
                          const valid = validateHelper(e)
                          setErrors({ ...errors, [field]: !valid[field] })
                        }}
                        error={errors[field]}
                        helperText={errors[field] && fields[field].helperText}
                        placeholder={fields[field].placeholder}
                        classes={{ root: classes.textField }}
                        multiline={field === "message"}
                        rows={field === "message" ? 8 : undefined}
                        InputProps={{
                          classes: {
                            input: classes.input,
                            ...fields[field].inputClasses,
                          },
                          disableUnderline: field === "message",
                          startAdornment:
                            field === "message" ? undefined : (
                              <InputAdornment position="start">
                                {fields[field].adornment}
                              </InputAdornment>
                            ),
                        }}
                      />
                    </Grid>
                  )
                })}
              </Grid>
            </Grid>

            <Grid
              item
              component={Button}
              disabled={disabled}
              classes={{
                root: clsx(classes.buttonContainer, classes.blockContainer, {
                  [classes.buttonDisabled]: disabled,
                }),
              }}
            >
              <Typography
                variant="h4"
                classes={{ root: classes.bigButtonText }}
              >
                Send message
              </Typography>
              <img src={send} alt="send message" className={classes.sendIcon} />
            </Grid>
          </Grid>
        </Grid>

        {/* contact info */}
        <Grid item>
          <Grid
            container
            classes={{ root: classes.infoContainer }}
            direction="column"
            justifyContent="space-between"
          >
            {info.map((section, i) => (
              <Grid
                item
                key={section.label}
                container
                alignItems="center"
                classes={{ root: i === 1 ? classes.middleInfo : undefined }}
              >
                <Grid item classes={{ root: classes.iconContainer }}>
                  {section.icon}
                </Grid>
                <Grid item>
                  <Typography
                    variant="h2"
                    classes={{ root: classes.contactInfo }}
                  >
                    {section.label}
                  </Typography>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default ContactPage
