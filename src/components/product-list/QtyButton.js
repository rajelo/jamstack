import React, { useState } from "react"
import {
  Grid,
  Typography,
  makeStyles,
  Button,
  ButtonGroup,
  Badge,
} from "@material-ui/core"
import clsx from "clsx"

import Cart from "../../images/Cart"

const useStyles = makeStyles(theme => ({
  qtyText: {
    color: "#fff",
  },
  mainGroup: {
    height: "3.5rem",
    // marginTop: "2.5rem",
  },
  editButtons: {
    height: "1.8rem",
    borderRadius: 0,
    backgroundColor: theme.palette.secondary.main,
    borderLeft: "2px solid #fff",
    borderRight: "2px solid #fff",
    borderBottom: "none",
    borderTop: "none",
  },
  endButtons: {
    borderRadius: 50,
    backgroundColor: theme.palette.secondary.main,
    border: "none",
    // width: "4rem",
  },
  cartButton: {
    // to make that right inner border has the same width as left one,
    // the problem was negative margin of cart button
    marginLeft: "0 !important",
  },
  minusButton: {
    borderTop: "2px solid #fff",
  },
  minus: {
    marginTop: "-0.2rem",
  },
  plus: {
    marginTop: "-0.1rem",
  },
  qtyButton: {
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
    },
    minWidth: "3.5rem",
  },
  badge: {
    color: "#fff",
    fontSize: "1.5rem",
    backgroundColor: theme.palette.secondary.main,
    padding: 0,
  },
}))

export default function QtyButton() {
  const classes = useStyles()

  const [qty, setQty] = useState(1)

  return (
    <Grid item>
      <ButtonGroup classes={{ root: classes.mainGroup }}>
        <Button classes={{ root: clsx(classes.endButtons, classes.qtyButton) }}>
          <Typography variant="h3" classes={{ root: classes.qtyText }}>
            {qty}
          </Typography>
        </Button>

        <ButtonGroup orientation="vertical">
          <Button
            onClick={() => setQty(qty + 1)}
            classes={{ root: classes.editButtons }}
          >
            <Typography
              variant="h3"
              classes={{ root: clsx(classes.qtyText, classes.plus) }}
            >
              +
            </Typography>
          </Button>
          <Button
            onClick={() => setQty(qty - 1)}
            classes={{ root: clsx(classes.editButtons, classes.minusButton) }}
          >
            <Typography
              variant="h3"
              classes={{ root: clsx(classes.qtyText, classes.minus) }}
            >
              -
            </Typography>
          </Button>
        </ButtonGroup>

        <Button
          classes={{ root: clsx(classes.endButtons, classes.cartButton) }}
        >
          <Badge
            overlap="circle"
            badgeContent="+"
            classes={{ badge: classes.badge }}
          >
            <Cart color="#fff" />
          </Badge>
        </Button>
      </ButtonGroup>
    </Grid>
  )
}
