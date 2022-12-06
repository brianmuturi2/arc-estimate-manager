import * as React from 'react';
import Typography from '@mui/material/Typography';
import {Grid} from '@mui/material';

export default function Index() {
    return (
        <Grid container direction='column'>
            <Grid item>
                <Typography variant='h1'>Projects</Typography>
            </Grid>
        </Grid>
    )
}
