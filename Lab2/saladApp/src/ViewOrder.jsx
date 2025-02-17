import "bootstrap/dist/css/bootstrap.css";
import { useOutletContext } from "react-router-dom";
import { useParams } from "react-router-dom";
import { OrderContext } from "./App";

const ViewOrder = () => {
  const { shoppingCart } = useOutletContext(OrderContext);
  const { uuid } = useParams();

  return (
    <div>
      {uuid ? (
        <div>
          <h2>Order Confirmation</h2>
          <p>Your order has been placed successfully!</p>
          <p>Order ID: {uuid}</p>

          <h2>Order</h2>
          <ul>
            {shoppingCart.map((salad, index) => (
              <li key={index}>
                <h3>Sallad {index + 1}</h3>
                <p>Bas: {salad.foundation}</p>
                <p>Protein: {salad.protein}</p>
                <p>Extras: {Object.keys(salad.extras) + " "}</p>
                <p>Dressing: {salad.dressing}</p>
                <p>Pris: {salad.price}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default ViewOrder;
