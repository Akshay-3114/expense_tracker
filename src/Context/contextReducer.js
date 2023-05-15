//Reducer =>  function that takes in the old state, and an action  and returns a new state.......

const contextReducer = (state, action) =>{
    let transactions;
    switch (action.type) {
        case 'DELETE_TRANSACTION':
            console.log(action.payload);
            transactions = state.filter((t) => t.id !== action.payload);// accepts a callback function and loops through the transactions to delete the transaction that is specified transaction
            
            localStorage.setItem('transactions',JSON.stringify(transactions));
            
            return transactions;
        case 'ADD_TRANSACTION':
             transactions =[action.payload, ...state]; //appends the transaction send by the action creator in the front of the array
            
             localStorage.setItem('transactions',JSON.stringify(transactions));
            
             return transactions;
        default:
            return state;
    }
}

export default contextReducer;