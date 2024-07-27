import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./RootLayout";
import HomePage from "./pages/HomePage";
import EditPage from "./pages/EditPage";
import NewPost from "./pages/NewPost";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />
      },
      {
        path: "/edit/:id",
        element: <EditPage />
      },
      {
        path: "/newpost",
        element: <NewPost />
      }
    ]
  }
])
function App() {
  return (
    <RouterProvider router={router}>
    </RouterProvider>
  )
}

export default App;
