import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ComposeSalad from "./ComposeSalad";
import ViewOrder from "./ViewOrder";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "compose-salad",
        Component: ComposeSalad,
      },
      {
        path: "view-order",
        Component: ViewOrder,
        children: [
          {
            path: "confirm/:uuid",
            Component: ViewOrder,
          },
        ],
      },
      {
        index: true,
        Component: <p>Welcome to my own salad bar</p>,
      },
    ],
  },
]);

export default router;
