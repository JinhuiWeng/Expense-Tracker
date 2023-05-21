import React from "react";
import moment from "moment";

interface Expense {
  id: number;
  description: string;
  amount: number;
  category: string;
  date: Date;
}

interface Props {
  expenses: Expense[];
  onDelete: (id: number) => void;
  onDeleteAll: () => void;
}

const ExpenseList = ({ expenses, onDelete, onDeleteAll }: Props) => {
  if (expenses.length === 0) return <p>No expenses</p>;

  return (
    <table className="table table-striped table-bordered">
      <thead>
        <tr>
          <th scope="col">Description</th>
          <th scope="col">Amount</th>
          <th scope="col">Date</th>
          <th scope="col">Category</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((expense) => (
          <tr key={expense.id}>
            <td>{expense.description}</td>
            <td>${expense.amount.toFixed(2)}</td>
            <td>{expense.category}</td>
            <td>{moment(expense.date).format("YYYY-MM-DD")}</td>
            <td>
              <button
                className="btn btn-outline-danger"
                onClick={() => onDelete(expense.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td>Total</td>
          <td>
            $
            {expenses
              .reduce((acc, expense) => expense.amount + acc, 0)
              .toFixed(2)}
          </td>
          <td colSpan={3}>
            <button className="btn btn-danger" onClick={() => onDeleteAll()}>
              Delete All Expenses!
            </button>
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export default ExpenseList;
