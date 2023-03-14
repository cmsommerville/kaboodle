import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Feedback from "./pages/Feedback";
import Timeline from "./pages/Timeline";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/timeline",
        element: <Timeline />,
      },
      {
        path: "/feedback",
        element: <Feedback />,
      },
    ],
  },
]);

export default router;
