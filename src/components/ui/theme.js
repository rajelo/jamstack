import { createTheme } from '@material-ui/core/styles'

// this is jss file (css inside JavaScript)

const green = "#99B898"
const darkGreen = "#708670"
const tan = "#FECEA8"
const lightRed = "#FF847C"
const red = "#E84A5F"
const offBlack = "#2A363B"
const grey = "#747474"
const white = "#fff"

const theme = createTheme({
    palette: {
        primary: {
            main: green
        },
        secondary: {
            main: darkGreen
        },
        common: {
            tan,
            lightRed,
            red,
            offBlack
            // if property name is the same as value, shorthand is just a value
        }
    },
    typography: {
        h1: {
            // fontSize: "4.5rem", - original size
            fontSize: "4rem",
            fontFamily: "Philosopher",
            fontStyle: "italic",
            fontWeight: 700,
            color: green
        },
        h2: {
            fontFamily: "Montserrat",
            fontSize: '3rem',
            fontWeight: 500,
            color: white
        },
        h3: {
            fontFamily: "Montserrat",
            fontSize: '2rem',
            fontWeight: 300,
            color: green
        },
        h4: {
            fontFamily: "Philosopher",
            fontStyle: "italic",
            fontSize: '3rem',
            fontWeight: 700,
            color: white
        },
        h5: {
            fontFamily: "Philosopher",
            fontStyle: "italic",
            fontSize: '2rem',
            fontWeight: 700,
            color: white
        },
        body1: {
            fontFamily: "Montserrat",
            fontSize: '1.5rem',
            color: grey
        },
        body2: {
            fontFamily: "Montserrat",
            fontSize: '1.5rem',
            color: white
        }
    },
    overrides: {

    }
})

export default theme