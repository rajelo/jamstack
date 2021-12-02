import React from "react"
import {Grid, Typography} from '@material-ui/core'
import Lottie from 'react-lottie'

import animationData from '../../images/Icons/data.json'

export default function HeroBlock() {
    const defaultOptions = {
        loop: true,
        autoplay: false,
        animationData
    }

    return (
        <Grid container justifyContent='space-around' alignItems='center' >

            <Grid item>
                <Grid container direction='column'>

                    <Grid item>
                        <Typography variant='h1' align='center'>
                            The Premier
                            <br />
                            Developer Clothing Line
                        </Typography>
                    </Grid>

                    <Grid item>
                        <Typography variant='h3' align='center'>
                            high quality, custom-designed shirts, hats and hoodies
                        </Typography>
                    </Grid>


                </Grid>
            </Grid>

            <Grid item>
                <Lottie isStopped options={defaultOptions} width='30rem' /> {/* originally 50rem */}
            </Grid>

        </Grid>
    )
}