import "bootstrap/dist/css/bootstrap.css";
import inventory from "./inventory.mjs";
import { useState, createContext } from "react";
import { Outlet, Link } from "react-router-dom";

export const OrderContext = createContext();

function App() {
  const [order, setOrder] = useState([]);

  const handleSetOrder = (newOrder) => {
    setOrder(newOrder);
  };

  const handleSetSalad = (salad) => {
    setOrder((prevCart) => [
      ...prevCart,
      {
        foundation: salad.foundation,
        protein: salad.protein,
        extras: salad.extras,
        dressing: salad.dressing,
      },
    ]);
  };

  const Navbar = () => {
    {
      return (
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <Link className="nav-link" to="/compose-salad">
              Komponera en sallad
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/view-order">
              Visa order
            </Link>
          </li>
        </ul>
      );
    }
  };

  return (
    <div className="container py-4">
      <header className="pb-3 mb-4 border-bottom">
        <span className="fs-4">Min egen salladsbar</span>
      </header>
      <Navbar />
      <OrderContext.Provider value={{ order, handleSetOrder }}>
        <Outlet context={{ inventory, handleSetSalad, shoppingCart: order }} />
      </OrderContext.Provider>
      <footer className="pt-3 mt-4 text-muted border-top">
        EDAF90 - webprogrammering
      </footer>
    </div>
  );
}

export default App;
