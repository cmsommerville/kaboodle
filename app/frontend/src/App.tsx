import { RouterProvider } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import router from "./router";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />;
    </QueryClientProvider>
  );
}

export default App;
