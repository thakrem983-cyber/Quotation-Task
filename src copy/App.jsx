import { BrowserRouter, Routes, Route } from "react-router-dom";
import Quotation from "./Quotation";
import AddQuot from "./AddQuot";
import QuotationTemplate from "./QuotationTemplate";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Quotation />} />
        <Route path="/addquotation" element={<AddQuot />} />
        <Route path="/quotation-template" element={<QuotationTemplate />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;