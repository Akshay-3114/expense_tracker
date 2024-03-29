import React, { useState,useEffect, useContext} from 'react'
import { TextField, Typography, Grid, Button, FormContent, InputLabel, Select, MenuItem, FormControl } from '@material-ui/core';
import useStyles from './styles';
import { ExpenseTrackerContext } from '../../../Context/context';
import { v4 as uuidv4 } from 'uuid';
import { incomeCategories,expenseCategories } from '../../../constants/categories';
import CustomizedSnackbar from '../../Snackbar/Snackbar';
import formatDate from '../../../utils/formatDate'; 
import { useSpeechContext } from '@speechly/react-client';

const initialState = {
  amount: " ",
  category: " ",
  type: "Income",
  date: formatDate(new Date()),
}

const Form = () => {
    const classes = useStyles();
    const [formData, setformData] = useState(initialState);
    const { addTransaction } = useContext(ExpenseTrackerContext); 
    const { segment } = useSpeechContext();
    const [open , setOpen] =  useState(false);
    //console.log(typeof(setOpen));

    const createTransaction = () => {
      if(Number.isNaN(Number(formData.amount)) || !formData.date.includes('-')) return;
      
      const transaction = {...formData, amount:Number(formData.amount),id: uuidv4()}
      
      setOpen(true);
      addTransaction(transaction);
      setformData(initialState);
    }
    //console.log(formData);
    useEffect(() => {
      // The function passed to useEffect will run after the render is committed to the screen. 
      if(segment){
          console.log("Speechly data :" + segment);
          if(segment.intent.intent === 'add_expense'){
            setformData({ ...formData, type:'Expense'});
          }else if(segment.intent.intent === 'add_income'){
            setformData({ ...formData,type: 'Income'});
          }
          else if (segment.isFinal && segment.intent.intent === "create_transaction"){
            return createTransaction();
          }
          else if (segment.isFinal && segment.intent.intent === "cancel-transaction"){
            return setformData(initialState);
          }

          segment.entities.forEach((e) => {
            const category = `${e.value.charAt(0)}${e.value.slice(1).toLowerCase()}`
            switch (e.type) {
              case 'amount': 
                    setformData({...formData,amount: e.value})                
                break;
              case 'category': 
              if(incomeCategories.map((ic) => ic.type).includes(category)){
                setformData({...formData,type:'Income', category})
              }
              else if(expenseCategories.map((ic) => ic.type).includes(category)){
                setformData({...formData,type:'Expense',category})
              }
            break;
              
            case 'date': 
                    setformData({...formData, date: e.value})     
                    console.log(formData);
                break;
              default:
                break;
            }
          });
          if(segment.isFinal && formData.amount !== ' ' && formData.category !== ' ' && formData.type !== ' ' && formData.date !==' '){
            //console.log(formData);
            createTransaction();
          } 
        }
    }, [segment])  ///dependency array i.e., if this componenet is rendered
    
    const selectedCategories = formData.type === 'Income' ? incomeCategories : expenseCategories
  return (
    <Grid container spacing={2}>
        <CustomizedSnackbar open={open} setOpen={setOpen} />
        <Grid item xs={12}>
            <Typography align="center" variant='subtitle2' gutterBottom /*adds margin or padding at the bottom of the typography*/>
                {segment && segment.words.map((w) => w.value).join(" ")}
                </Typography>     
       </Grid>
       <Grid item xs={6}>
         <FormControl fullWidth>
            <InputLabel>Type</InputLabel>
            <Select value={formData.type} onChange={(e) => setformData( {...formData, type :e.target.value})}>
                <MenuItem value="Income">Income</MenuItem>
                <MenuItem value="Expense">Expense</MenuItem>
            </Select>
         </FormControl>
       </Grid>
       <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel> Category</InputLabel>
            <Select value={formData.category} onChange={(e) => setformData( {...formData, category:e.target.value})}>
                  {selectedCategories.map((c) => <MenuItem key={c.type} value={c.type}>{c.type}</MenuItem>)}
            </Select>
          </FormControl>
       </Grid>
       <Grid item xs={6}>
        <TextField type="number" label="Amount" fullwidth  value={formData.amount} onChange={(e) => setformData( {...formData, amount:e.target.value})}/>
       </Grid>
       <Grid item xs={6}>
        <TextField type="date" label="Date" fullwidth  value={formData.date} onChange={(e) => setformData( {...formData,  date: formatDate(e.target.value)})}/>
       </Grid>
       <Button className={classes.button} variant="outlined" color="primary" fullwidth onClick={ createTransaction }>Create</Button>
    </Grid>
  )
}

export default Form