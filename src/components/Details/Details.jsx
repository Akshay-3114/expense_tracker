import React from 'react'
import {Card, CardHeader , CardContent ,Typography} from '@material-ui/core';
import { Doughnut } from 'react-chartjs-2';
import UseStyles from './styles';

const detils = () => {
    const classes = UseStyles();
  return (
    <Card className={classes.income}>
        <CardHeader title="Income" />
        <CardContent>
            <Typography variant="h5">$ 50</Typography>
           {/* <Doughnut data="DATA"/> */}
        </CardContent>
    </Card>  )
} 
export default detils