import { useEffect } from "react";
import { RouterProvider } from "./routes";
import { useAuthStore } from "./store/authStore";

function App() {
  const bootstrapAuth = useAuthStore((state) => state.bootstrapAuth);

  useEffect(() => {
    bootstrapAuth();
  }, [bootstrapAuth]);

  return <RouterProvider />;
}

export default App;
