import { ChangeEvent, useState } from "react";
import ExpenseList from "./components/ExpenseList";
import ExpenseFilter from "./components/ExpenseFilter";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseSearch from "./components/ExpenseSearch";

function App() {
  const [expenses, setExpenses] = useState(
    localStorage.getItem("expenses") != null
      ? JSON.parse(localStorage.getItem("expenses") || "[]")
      : []
  );

  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleDelte = (id: number) => {
    const updatedExpenses = expenses.filter(
      (expense: any) => expense.id !== id
    );
    setExpenses(updatedExpenses);
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
  };

  const handleDelteAll = () => {
    setExpenses([]);
    localStorage.clear();
  };

  const handleSelect = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredExpenses = selectedCategory
    ? expenses.filter((expense: any) => expense.category === selectedCategory)
    : expenses;

  const searchedExpense = searchQuery
    ? filteredExpenses.filter((expense: any) =>
        Object.keys(expense).some((key) =>
          expense[key]
            .toString()
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      )
    : filteredExpenses;

  return (
    <div>
      <div className="header-section">
        <h1 className="flicker">Expense Tracker</h1>
        <p>Made expense tracking easier</p>
      </div>
      <ExpenseForm
        onSubmit={(expense) => {
          setExpenses([
            ...expenses,
            { ...expense, id: Math.random().toString(16).slice(2) },
          ]);
          localStorage.setItem("expenses", JSON.stringify(expenses));
        }}
      />
      <div className="expense-section">
      <div className="filter-section">
        <ExpenseFilter onSelectCategory={handleSelect} />
        <ExpenseSearch value={searchQuery} onTextChange={handleSearch} />
      </div>
      <ExpenseList
        expenses={searchedExpense}
        onDelete={handleDelte}
        onDeleteAll={handleDelteAll}
      />
    </div>
    </div>
  );
}

export default App;
