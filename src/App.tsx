import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Board from "./pages/Board/Board.page";

const routers = createBrowserRouter([{ path: "/", element: <Board /> }]);

function App() {
  return <RouterProvider router={routers} />;
}

export default App;
