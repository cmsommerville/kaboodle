import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Feedback from "./pages/Feedback";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/feedback",
        element: <Feedback />,
      },
    ],
  },
]);

export default router;
