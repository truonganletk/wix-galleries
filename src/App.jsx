import * as React from "react";
import {
  RouterProvider,
  createBrowserRouter,
  useRouteError
} from "react-router-dom";
import ListGalleries from "./Components/ListGalleries";
import CreateGallery from "./Components/CreateGallery";

function ErrorPage() {
  const error = useRouteError();

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <ListGalleries />,
    errorElement: <ErrorPage />,
  },
  {
    path: "create",
    element: <CreateGallery />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
