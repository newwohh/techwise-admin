import { Route, Routes } from "react-router-dom";
import WebDrawer from "./components/Drawer/WebDrawer";
import Product from "./pages/Product";
import User from "./pages/User";
import Seller from "./pages/Seller";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <WebDrawer>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Product />} />
          <Route path="/users" element={<User />} />
          <Route path="/sellers" element={<Seller />} />
        </Routes>
      </WebDrawer>
    </>
  );
}

export default App;
