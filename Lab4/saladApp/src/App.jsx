import "bootstrap/dist/css/bootstrap.css";
import { useState } from "react";
import { Outlet, Link, useNavigation } from "react-router-dom";
import Salad from "./lab1.mjs";

function App() {
  const [shoppingCart, setShoppingCart] = useState(() => {
    const storedCart = window.localStorage.getItem("shoppingCart");
    return storedCart ? Salad.parse(storedCart) : [];
  });
  const navigation = useNavigation();
  const [bestallning, setBestallning] = useState(null);

  function addSaladToCart(salad) {
    const updatedCart = [...shoppingCart, salad];
    setShoppingCart(updatedCart);

    window.localStorage.setItem("shoppingCart", JSON.stringify(updatedCart));
  }

  function bootstrapSpinner() {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  function Navbar() {
    return (
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <Link className="nav-link" to="/compose-salad">
            {" "}
            Komponera en sallad{" "}
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/view-order">
            {" "}
            Visa varukorgen{" "}
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/visa-best">
            {" "}
            Visa beställningen{" "}
          </Link>
        </li>
      </ul>
    );
  }

  return (
    <div className="container py-4">
      <header className="pb-3 mb-4 border-bottom">
        <span className="fs-4">Min egen salladsbar</span>
      </header>
      <Navbar />
      {navigation.state === "loading" ? (
        bootstrapSpinner()
      ) : (
        <Outlet
          context={{
            addSaladToCart,
            setShoppingCart,
            shoppingCart,
            bestallning,
            setBestallning,
          }}
        />
      )}

      <footer className="pt-3 mt-4 text-muted border-top">
        EDAF90 - webprogrammering
      </footer>
    </div>
  );
}

export default App;
