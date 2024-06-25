import { createBrowserRouter } from "react-router-dom";
import Intents from "./pages/Intents";
import Classify from "./pages/Classify";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Intents />,
  },
  {
    path: "/intents",
    element: <Intents />,
  },
  {
    path: "/classify",
    element: <Classify />,
  },
]);

export default router;
