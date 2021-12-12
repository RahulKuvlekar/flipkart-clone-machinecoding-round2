import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Header from "./Component/Header/Header";
import ContextProvider from "./Context/Context";
// import ProductSection from "./Components/ProductSection/ProductSection";
// import { ContextProvider } from "./Context/Context";

function App() {
  const Home = lazy(() => import("./Pages/Home"));
  const CartPage = lazy(() => import("./Pages/CartPage"));
  return (
    <ContextProvider>
      <div className="App">
        <Suspense fallback={<h2>Loading ... </h2>}>
          <Router>
            <Header />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/CartPage" component={CartPage} />
              <Route>
                <h1 style={{ margin: "6rem" }}>Error Page Not Found</h1>
              </Route>
            </Switch>
          </Router>
        </Suspense>
      </div>
    </ContextProvider>
  );
}

export default App;
