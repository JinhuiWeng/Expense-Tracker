// import Alert from "./components/Alert";
// import ListGroup from "./components/ListGroup";
// import Buttons from "./components/Buttons";
// import Like from "./components/Like/Like";
// import NavBar from "./components/NavBar";
// import Cart from "./components/Cart";
// import ExpandableText from "./components/ExpandableText";
import { useEffect, useState } from "react";
import ExpenseList from "./components/ExpenseList";
import ExpenseFilter from "./components/ExpenseFilter";
import ExpenseForm from "./components/ExpenseForm";
import categories from "./components/categories";

// const items = ["New York", "San Francisco", "Tokyo", "London", "Paris"];
// const handleSelectItem = (item: string) => {
//   console.log(item);
// };

function App() {
  // const [showStatus, setShowStatus] = useState(false);
  // const [cartItems, setCartItems] = useState(["Products1", "Product2"]);
  // const handleClose = () => setShowStatus(false);
  // const [isExpanded, setIsExpanded] = useState(false);


  const [expenses, setExpenses] = useState(
    localStorage.getItem("expenses") != null
      ? JSON.parse(localStorage.getItem("expenses") || "[]")
      : []
  );

  const [selectedCategory, setSelectedCategory] = useState("");

  const handleDelte = (id: number) => {
    setExpenses(expenses.filter((expense: any) => expense.id !== id));
    localStorage.setItem("expenses", JSON.stringify(expenses));
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
      {/* <ExpandableText isExpanded={isExpanded} onExpand={() => setIsExpanded(true)} onClose={() => setIsExpanded(false)}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat iure
        accusamus ipsa dolore provident possimus at culpa commodi aliquid alias
        molestias hic laudantium dolores ad, illum quaerat perspiciatis,
        eligendi pariatur, similique asperiores delectus mollitia perferendis
        blanditiis! Quisquam nulla dolorum ducimus cumque, deleniti laudantium
        nemo alias eius dolorem mollitia nesciunt animi ipsam aliquam, incidunt
        libero blanditiis voluptate? Sint ducimus nobis molestiae officia, iusto
        neque porro quisquam fuga dolorum minima veniam sequi, corporis sapiente
        omnis voluptate ipsa tenetur voluptates assumenda tempora quos, illum
        obcaecati? Nihil optio sapiente sed magnam, labore blanditiis inventore
        ipsum minima aliquid minus. Eos soluta optio laboriosam sint, aperiam
        quas similique maxime ducimus adipisci dolore qui aut perspiciatis
        molestias error esse dolorum excepturi consequuntur provident, voluptate
        distinctio reiciendis! Quaerat nobis in, atque id eos dicta nihil
        impedit voluptates assumenda porro iste voluptas aut sint provident enim
        at fugit tempora ducimus nostrum voluptate suscipit ab architecto vitae?
        Vitae fugiat iure cumque earum blanditiis repellat qui aspernatur iste
        pariatur debitis cupiditate quas officia ratione, dolores beatae,
        impedit, iusto modi ex commodi nostrum minus reiciendis sit! Quae ipsa
        deserunt harum reiciendis amet nobis laborum quis numquam assumenda
        earum adipisci illo, incidunt a officia corporis facilis tempora
        architecto excepturi itaque rem quo molestias!
      </ExpandableText> */}
      {/* <game games={games} onUpdate={setGame({...games, player: {...games.player, name: "Rob"}})} /> */}

      {/* <NavBar cartItemsCount={cartItems.length} />
      <Cart cartItems={cartItems} onClear={() => setCartItems([])} /> */}

      {/* <Like onClick={() => console.log('clicked')} /> */}

      {/* {showStatus && <Alert onClick = {handleClose}>My Alert</Alert>}
      <Buttons onClick={() => setShowStatus(true)}>My Button</Buttons> */}

      {/* <ListGroup
        items={items}
        heading="Cities"
        onSelectItem={handleSelectItem}
      /> */}
    </div>
  );
}

export default App;
