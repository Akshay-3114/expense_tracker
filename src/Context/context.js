import React ,{useReducer, createContext} from "react";
import contextReducer from'./contextReducer';

const initialState = JSON.parse(localStorage.getItem('transactions')) || [{"amount":100,"category":"Food","type":"Expense","date":"2023-02-13","id":"20cac475-f590-4562-b41e-4e30edde7e0a"},{"amount":70,"category":"Travel","type":"Expense","date":"2023-02-13","id":"3b10fa59-a0d8-4a14-839d-129bce0eb9c8"},{"amount":50,"category":"Business","type":"Income","date":"2023-02-16","id":"9586b80f-c58c-4691-b8c3-bbbdcb4792d4"},{"amount":500,"category":"Salary","type":"Income","date":"2023-02-13","id":"f7ee0c02-4707-4088-8d10-014e343250a0"}];


export const ExpenseTrackerContext = createContext(initialState);

export const Provider = ({children}) => {
    const [transactions, dispatch] = useReducer(contextReducer, initialState);

    //Action Creators => functions that are dispatching something i.e, changing the state
    const deleteTransaction = (id) =>{
        dispatch({type: 'DELETE_TRANSACTION', payload : id});
    }
    const addTransaction = (transaction) =>{
        dispatch({type: 'ADD_TRANSACTION', payload : transaction});
    }
    const balance = transactions.reduce((acc, currVal) => {
        return (currVal.type === 'Expense' ? acc - currVal.amount : acc + currVal.amount)
    } ,0);
    //console.log(transactions)
    return(
        <ExpenseTrackerContext.Provider value={{
            deleteTransaction,addTransaction,transactions, balance,
        }}>
            {children} 
        </ExpenseTrackerContext.Provider>
    )
}