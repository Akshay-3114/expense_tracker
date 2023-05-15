import React, {useRef, useEffect} from 'react'
import { Grid } from '@material-ui/core';
import Details  from './components/Details/Details';
import Main  from './components/Main/Main';
import { SpeechState, useSpeechContext } from '@speechly/react-client';
import useStyles from './styles.js';
import { PushToTalkButton, PushToTalkButtonContainer, ErrorPanel } from '@speechly/react-ui';

const App = () => {
  const classes = useStyles();
  const { speechState } = useSpeechContext();
  const main = useRef(null);
  const executeScroll = () => main.current.scrollIntoView();
  //console.log(SpeechState);
  // useEffect(() =>{
  //     if(speechState === SpeechState.Recording){
  //      executeScroll();
  //   }
  // },[speechState]);

  return (
    <div>
       <Grid className={classes.grid} container spacing={0} alignItems="center" justifyContent="center" style = {{height : '100vh'}}>
        <Grid item xs= {12} sm = {4} className = {classes.mobile}>
            <Details title="Income" />
        </Grid>
        <Grid ref={main} item xs= {12} sm = {3} className = {classes.main}>
          <Main />
        </Grid>
        <Grid item xs= {12} sm = {4} className ={classes.desktop}>
            <Details title="Expense" />
        </Grid>
        <Grid item xs= {12} sm = {4} className = {classes.last}>
        
            <Details title="Income" />
       </Grid>
       <PushToTalkButtonContainer>
         <PushToTalkButton />
         {/* <ErrorPanel /> */}
       </PushToTalkButtonContainer>
       </Grid>
    </div>
  )
}

export default App