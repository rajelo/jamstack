import React from "react"
import { makeStyles } from "@material-ui/core"

import fullStar from "../../images/Icons/full-star.svg"
import halfStar from "../../images/Icons/half-star.svg"
import emptyStar from "../../images/Icons/empty-star.svg"
import { mergeClasses } from "@material-ui/styles"

const useStyles = makeStyles(theme => ({
    size: {
        height: '2rem',
        width: '2rem'
    }
}))

export default function Rating({ number }) {

    const diff = 5 - Math.ceil(number)
    const classes = useStyles()
    

    return (
        <>
            {[...Array(Math.floor(number))].map((e, i) => (
                <img src={fullStar} alt='full star' key={i} className={classes.size} />
            ))}
            {number % 1 !== 0 ? <img src={halfStar} alt='half-star' className={classes.size} /> : null }
            {[...Array(diff)].map((e, i) => (
                <img src={emptyStar} alt='empty star' key={`${i}-empty`} className={classes.size} />
            ))}
        </>
    )
}
