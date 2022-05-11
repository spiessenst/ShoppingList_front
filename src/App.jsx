import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Logo from "./components/Logo";
import Main from "./pages/Main";
import AddProduct from "./pages/AddProduct";
const App = () => {
  return (
    <Router>
      <div className="container">
        <Logo />
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/AddProduct" element={<AddProduct />}></Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
