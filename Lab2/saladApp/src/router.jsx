import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ComposeSalad from "./ComposeSalad";
import ViewOrder from "./ViewOrder";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "compose-salad",
        element: <ComposeSalad />,
      },
      {
        path: "view-order",
        element: <ViewOrder />,
        children: [
          {
            path: "confirm/:uuid",
            element: <ViewOrder />,
          },
        ],
      },
      {
        index: true,
        element: <p>Welcome to my own salad bar</p>,
      },
    ],
  },
]);

export default router;
