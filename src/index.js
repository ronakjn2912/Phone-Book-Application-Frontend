import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ContactForm from "./Pages/ContactForm/ContactForm";
import OneContact from "./Pages/OneContact/OneContact";
import Login from "./Pages/LoginPage/Login";
import { AuthProvider } from "./components/contact/AuthContext";
import Home from "./Pages/Home/Home";
import ErrorPage from "./Pages/ErrorPage/ErrorPage";
import { Provider } from "react-redux";
import { store } from "./app/store";
import Register from "./Pages/Register/Register";

// todo -  use react.portal to give alert for deleting something, make button/input pure functions,filter by date
//All the components wrapped within DataProvider can access the context.
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },

  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: (
      <AuthProvider>
        <Login />
      </AuthProvider>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/WelcomeBack",
    element: <App type="module" />, //why use type
    errorElement: <ErrorPage />,
  },
  {
    path: "/ContactForm", //Form which should get routed by clicking on 'Add Contact'
    element: <ContactForm type="module" />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/Contact", //Displays one contact details in separate page
    element: <OneContact type="module" />,
    errorElement: <ErrorPage />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
