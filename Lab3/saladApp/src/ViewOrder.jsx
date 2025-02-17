import "bootstrap/dist/css/bootstrap.css";
import { useOutletContext } from "react-router-dom";
import { useParams } from "react-router-dom";
import { OrderContext } from "./App";

const ViewOrder = () => {
  const { shoppingCart } = useOutletContext(OrderContext);
  const { uuid } = useParams();
  const addedSalad = shoppingCart[0];

  return (
    <div>
      {uuid ? (
        <div>
          <h2>Order Confirmation</h2>
          <p>Your order has been placed successfully!</p>
          <p>Order ID: {uuid}</p>

          <h2>Order</h2>
          <ul>
            <li>Foundation: {addedSalad.foundation}</li>
            <li>Protein: {addedSalad.protein}</li>
            <li>Extras: {addedSalad.extras.join(", ")}</li>
            <li>Dressing: {addedSalad.dressing}</li>
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default ViewOrder;
