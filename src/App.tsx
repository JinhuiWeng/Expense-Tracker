import { useEffect, useState } from "react";
import ExpenseList from "./components/ExpenseList";
import ExpenseFilter from "./components/ExpenseFilter";
import ExpenseForm from "./components/ExpenseForm";
import categories from "./components/categories";



function App() {

  const [expenses, setExpenses] = useState(
    localStorage.getItem("expenses") != null
      ? JSON.parse(localStorage.getItem("expenses") || "[]")
      : []
  );

  const [selectedCategory, setSelectedCategory] = useState("");

  const handleDelte = (id: number) => {
    const updatedExpenses = expenses.filter((expense: any) => expense.id !== id);
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

  const filteredExpenses = selectedCategory
    ? expenses.filter((expense: any) => expense.category === selectedCategory)
    : expenses;

  return (
    <div>
      <ExpenseForm
        onSubmit={(expense) => {
          setExpenses([
            ...expenses,
            { ...expense, id: Math.random().toString(16).slice(2) },
          ]);
          localStorage.setItem("expenses", JSON.stringify(expenses));
        }}
      />
      <ExpenseFilter onSelectCategory={handleSelect} />
      <ExpenseList
        expenses={filteredExpenses}
        onDelete={handleDelte}
        onDeleteAll={handleDelteAll}
      />
    </div>
  );
}

export default App;
