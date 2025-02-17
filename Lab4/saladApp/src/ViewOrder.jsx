import React, { useState } from "react";
import { useOutletContext, useParams, useNavigate } from "react-router-dom";

function ViewOrder() {
  const { shoppingCart, setShoppingCart, bestallning, setBestallning } =
    useOutletContext();
  const { saladId } = useParams();
  const orderedSalad = shoppingCart.find((salad) => salad.uuid === saladId);
  const navigate = useNavigate();

  function removeShoppingCart() {
    setShoppingCart([]);
    window.localStorage.setItem("shoppingCart", []);
  }

  async function placeOrder() {
    if (shoppingCart.length != 0) {
      const order = shoppingCart.map((salad) =>
        Object.keys(salad.ingredients).flat()
      );

      const response = await fetch("http://localhost:8080/orders/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });
      if (response.ok) {
        const data = await response.json();
        setBestallning(data);
        removeShoppingCart();
        navigate("/visa-best", { state: { bestallning } });
      }
    }
  }

  return (
    <div className="mt-5">
      <h2>Varukorgen</h2>
      {saladId && orderedSalad && (
        <div className="alert alert-success">
          En sallad har lagts till i varukorgen:
          {Object.keys(orderedSalad.ingredients).join(" ")}, pris:{" "}
          {orderedSalad.getPrice()} kr
        </div>
      )}
      <ul>
        {shoppingCart.map((salad) => (
          <li key={salad.uuid}>
            {Object.keys(salad.ingredients).join(" ")}, pris: {salad.getPrice()}{" "}
            kr
          </li>
        ))}
      </ul>
      <br></br>
      <br></br>
      <button className="btn btn-primary mt-4" onClick={placeOrder}>
        Place Order
      </button>
    </div>
  );
}

export default ViewOrder;
