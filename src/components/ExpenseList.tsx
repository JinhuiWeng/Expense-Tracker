import { MouseEventHandler, useCallback, useState } from "react";
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";
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

type SortKeys = keyof Expense;
type SortOrder = "ascn" | "desc";

function SortExpense({
  tableData,
  sortKey,
  reverse,
}: {
  tableData: Expense[];
  sortKey: SortKeys;
  reverse: boolean;
}) {
  if (!sortKey) return tableData;
  const sortedTableData = tableData.sort((a, b) => {
    return a[sortKey] > b[sortKey] ? 1 : -1;
  });

  if (reverse) {
    return sortedTableData.reverse();
  }
  return sortedTableData;
}

function SortButton({
  sortOrder,
  columnKey,
  sortKey,
  onClick,
}: {
  sortOrder: SortOrder;
  columnKey: SortKeys;
  sortKey: SortKeys;
  onClick: MouseEventHandler<HTMLButtonElement>;
}) {
  return sortKey === columnKey && sortOrder === "desc" ? (
    <AiFillCaretDown onClick={onClick}></AiFillCaretDown>
  ) : (
    <AiFillCaretUp onClick={onClick}></AiFillCaretUp>
  );
}

const ExpenseList = ({ expenses, onDelete, onDeleteAll }: Props) => {
  const [sortKey, setSortKey] = useState<SortKeys>("description");
  const [sortOrder, setSortOrder] = useState<SortOrder>("ascn");

  const headers: { key: SortKeys; label: string }[] = [
    {
      key: "description",
      label: "Description",
    },
    {
      key: "amount",
      label: "Amount",
    },
    {
      key: "category",
      label: "Category",
    },
    {
      key: "date",
      label: "Date",
    },
  ];

  function changeSort(key: SortKeys) {
    setSortOrder(sortOrder === "ascn" ? "desc" : "ascn");
    setSortKey(key);
  }

  const sortedExpenses = useCallback(
    () =>
      SortExpense({
        tableData: expenses,
        sortKey,
        reverse: sortOrder === "desc",
      }),
    [expenses, sortKey, sortOrder]
  );

  if (expenses.length === 0) return <p>No expenses</p>;

  return (
    <>
      <p className="mt-3">Showing {expenses.length} Expenses</p>
      <table className="table table-striped table-bordered ">
        <thead>
          <tr>
            {headers.map((row) => (
              <td key={row.key}>
                {row.label}
                <SortButton
                  columnKey={row.key}
                  onClick={() => changeSort(row.key)}
                  {...{
                    sortKey,
                    sortOrder,
                  }}
                />
              </td>
            ))}
            <td />
          </tr>
        </thead>
        <tbody>
          {sortedExpenses().map((expense) => (
            <tr key={expense.id}>
              <td>{expense.description}</td>
              <td>${expense.amount.toFixed(2)}</td>
              <td>{expense.category}</td>
              <td>{moment(expense.date).format("YYYY-MM-DD")}</td>
              <td>
                {/* <td className="col-sm-4">{expense.description}</td>
              <td className="col-sm-2">${expense.amount.toFixed(2)}</td>
              <td className="col-sm-2">{expense.category}</td>
              <td className="col-sm-2">{moment(expense.date).format("YYYY-MM-DD")}</td>
              <td className="col-sm-1"> */}
                <button
                  className="btn btn-outline-danger delete-btn"
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
              {sortedExpenses()
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
    </>
  );
};

export default ExpenseList;
