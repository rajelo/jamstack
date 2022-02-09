import React from "react"
import {
  Grid,
  Typography,
  makeStyles,
  TextField,
  InputAdornment,
} from "@material-ui/core"

import validate from "../ui/validate"

const useStyles = makeStyles(theme => ({
  textField: {
    // width should be 30rem, but for settings details is now 20rem
    width: "20rem",
    [theme.breakpoints.down("md")]: {
      width: "25rem",
    },
    [theme.breakpoints.down("xs")]: {
      width: "18rem",
    },
  },
  input: {
    color: theme.palette.secondary.main,
  },
}))

export default function Fields({
  fields,
  errors,
  setErrors,
  values,
  setValues,
}) {
  const classes = useStyles()

  return Object.keys(fields).map(field => {
    const validateHelper = event => {
      return validate({ [field]: event.target.value })
    }
    return !fields[field].hidden ? (
      <Grid item key={field}>
        <TextField
          value={values[field]}
          type={fields[field].type}
          onChange={e => {
            const valid = validateHelper(e)

            if (errors[field] || valid[field] === true) {
              setErrors({ ...errors, [field]: !valid[field] })
            }
            setValues({ ...values, [field]: e.target.value })
          }}
          classes={{ root: classes.textField }}
          onBlur={e => {
            const valid = validateHelper(e)
            setErrors({ ...errors, [field]: !valid[field] })
          }}
          error={errors[field]}
          helperText={errors[field] && fields[field].helperText}
          placeholder={fields[field].placeholder}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {fields[field].startAdornment}
              </InputAdornment>
            ),
            endAdornment: fields[field].endAdornment ? (
              <InputAdornment position="end">
                {fields[field].endAdornment}
              </InputAdornment>
            ) : undefined,
            classes: { input: classes.input },
          }}
        />
      </Grid>
    ) : null
  })
}
