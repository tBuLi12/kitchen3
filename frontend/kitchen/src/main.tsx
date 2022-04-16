import React from "react";
import * as ReactDOMClient from "react-dom/client";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import About from "./About";
import LoginForm, { WithUser } from "./Login";
import Dishes from "./Dishes/Dishes";
import RecipeCard from "./Recipes/RecipeCard";
import RecipeEditor from "./Recipes/RecipeEditor";

ReactDOMClient.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<div>Dupa</div>}></Route>
          <Route path="dupa" element={<div>dupa</div>}></Route>
          <Route path="login" element={<LoginForm />}></Route>
          <Route
            path="dishes"
            element={<WithUser>{(user) => <Dishes user={user} />}</WithUser>}
          ></Route>
          <Route path="recipe" element={<RecipeEditor />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
