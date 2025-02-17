import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ComposeSalad from "./ComposeSalad";
import ViewOrder from "./ViewOrder";
import visaBest from "./visaBest";

function safeFetchJson(url) {
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error(`${url} returned status ${response.status}`);
    }
    return response.json();
  });
}

async function fetchIngredients(type, arrayOfIngredients) {
  const data = await Promise.all(
    arrayOfIngredients.map(async (ingredient) => {
      const response = await fetch(
        `http://localhost:8080/${type}/${ingredient}`
      );
      const ingredientData = await response.json();
      return { [ingredient]: ingredientData };
    })
  );
  return data;
}

async function inventoryLoader() {
  const foundations = await safeFetchJson("http://localhost:8080/foundations/");
  const protein = await safeFetchJson("http://localhost:8080/proteins/");
  const dressing = await safeFetchJson("http://localhost:8080/dressings/");
  const extra = await safeFetchJson("http://localhost:8080/extras/");
  const promises = [
    fetchIngredients("foundations", foundations),
    fetchIngredients("proteins", protein),
    fetchIngredients("dressings", dressing),
    fetchIngredients("extras", extra),
  ];

  const test1 = await Promise.all(promises);
  const arraysToOne = test1.flat();
  const inventory = Object.assign({}, ...arraysToOne);
  await new Promise((resolve) => setTimeout(resolve, 500));
  return inventory;
}

const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        path: "compose-salad",
        loader: inventoryLoader,
        Component: ComposeSalad,
      },
      {
        index: true,
        element: <p>Welcome to my own salad bar</p>,
      },
      {
        path: "view-order",
        Component: ViewOrder,
        children: [
          {
            path: "confirm/:saladId",
            Component: ViewOrder,
          },
        ],
      },
      {
        path: "visa-best",
        Component: visaBest,
      },
      {
        path: "*",
        element: <p>Page not found</p>,
      },
    ],
  },
]);
export default router;
