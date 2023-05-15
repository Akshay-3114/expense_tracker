import { useContext } from "react";
import { ExpenseTrackerContext } from "./Context/context";
import { incomeCategories, expenseCategories , resetCategories } from "./constants/categories";

const useTransaction  = (props) =>{
    resetCategories();
    //console.log(props.title);
    const { transactions } = useContext(ExpenseTrackerContext);
    const transactionsPerType = transactions.filter((t) => t.type === props.title);
    const total = transactionsPerType.reduce((acc,curVal) => acc += curVal.amount,0);    // calls a specific function for each item of the array. Can be used to get a sum of array.
    const categories = props.title === 'Income' ? incomeCategories : expenseCategories;
    //console.log({ transactionsPerType, total ,categories});

    transactionsPerType.forEach((t) => {
        const category = categories.find((c) => c.type === t.category)
        if(category) category.amount += t.amount; 
    });

    const filteredCategory = categories.filter((c) => c.amount > 0);

    const chartData = {
        labels: filteredCategory.map((c) => c.type),
        datasets :[{
            data : filteredCategory.map((c) => c.amount),
            backgroundColor: filteredCategory.map((c) => c.color),
        }],
    }
    return { total, chartData };
}

export default useTransaction;