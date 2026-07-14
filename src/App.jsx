import { Routes, Route } from "react-router-dom";
import AddProductItems from "./components/AddProductItems";
import ApproveQuotation from "./components/ApproveQuotation";
import CustomerService from "./components/CustomerService";
import AddTankyProduct from "./components/AddTankyProduct";
import AddService from "./components/AddService";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AddProductItems />} />
      <Route path="/approve-quotation" element={<ApproveQuotation />} />
      <Route path="/customer-service" element={<CustomerService />} />
      <Route path="/add-tanky-product" element={<AddTankyProduct />} />
      <Route path="/add-service" element={<AddService />} />
    </Routes>
  );
}

export default App;
