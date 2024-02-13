import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import User from "./components/getuser/User";
import Add from "./components/adduser/Add";
import Edit from "./components/updateuser/Edit";
import { Provider } from "react-redux";
import { store } from "./redux/store"; // Import the store you configured

function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <User />,
    },
    {
      path: "/add",
      element: <Add />,
    },
    {
      path: "/edit/:id",
      element: <Edit />,
    },
    
  ]);

  return (
    <>
      <Provider store={store}>
        <div className="App">
          <RouterProvider router={route}></RouterProvider>
        </div>
      </Provider>
    </>
  );
}

export default App;
