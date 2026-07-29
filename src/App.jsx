import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import EditQuotation from "./pages/EditQuotation";
import View from "./pages/view";

import Header from "./components/Header";
import QuotationForm from "./components/QuotationForm";
import ProductSection from "./components/ProductSection";
import TermsSection from "./components/Term";
import "@fontsource/poppins";
import "./App.css";
import api from "./api/api";

//mansi
import AddProductItems from "./modal/AddProductItems";
import ApproveQuotation from "./modal/ApproveQuotation";
import CustomerService from "./modal/CustomerService";
import AddTankyProduct from "./modal/AddTankyProduct";
import AddService from "./modal/AddService";

//chaitali
import Quotation from "./pages/Quotation";
import AddQuot from "./pages/AddQuot";
import QuotationTemplate from "./pages/QuotationTemplate";

//client finance
import ClientFinanceMain from "./pages/ClientFinanceMain";
import ClientFinance from "./pages/ClientFinance";
import EditClientFinance from "./pages/EditClientFinance";
import ViewClientFinance from "./pages/ViewClientFinance";

function App() {
  const [validateQuotation, setValidateQuotation] = useState(null);

  const [formData, setFormData] = useState({
    quotationType: "GST",
    quotationNumber: "",
    quotationName: "",
    date: "",
    title: "MR",
    clientName: "",
    subject: "",
  });
  
  // 🔴 CHANGE 1: Yahan se default dummy row hata di gayi hai. Array ab completely empty hai.
  const [products, setProducts] = useState([]);
  
  const [summary, setSummary] = useState({
    discount: 0,
    cgst: 0,
    sgst: 0,
    other: 0,
  });
  const [notes, setNotes] = useState("");
  const [validateProducts, setValidateProducts] = useState(null);

  useEffect(() => {
    const fetchQuotationNumber = async () => {
      try {
        // Dropdown se jo bhi type select hoga (GST ya Non-GST), wo yahan aayega
        const type = formData.quotationType || "GST";
        
        const response = await api.get(`/quotations/preview-number?quotationType=${type}`);
        
        if (response.data && response.data.currentQuotationNumber) {
          // Backend se aaya number formData mein set kar do
          setFormData((prev) => ({
            ...prev,
            quotationNumber: response.data.currentQuotationNumber,
          }));
        }
      } catch (error) {
        console.error("Error fetching quotation number:", error);
      }
    };

    // Jaise hi page khulega ya quotationType badlega, ye function chalega
    fetchQuotationNumber();
  }, [formData.quotationType]);

  
  const handleSave = async () => {
    if (validateQuotation && !validateQuotation()) {
      alert("Please fill required details");
      return;
    }
    if (validateProducts && !validateProducts()) {
      return;
    }

    const payloadForBackend = {
      quotationType: formData.quotationType,
      quotationNumber: formData.quotationNumber,
      quotationName:formData.quotationName,
      clientName: formData.clientName,
      subject: formData.subject,
      products: products,
      discount: summary.discount,
      cgst: summary.cgst,
      sgst: summary.sgst,
      other: summary.other,
      notes: notes,
      grandTotal:
        summary.grandTotal ||
        products.reduce((acc, p) => acc + (p.amount || 0), 0),
    };

    console.log("Sending data to backend:", payloadForBackend);

    try {
      const response = await api.post("/quotations", payloadForBackend);
      console.log("Backend response:", response.data);

      
      setFormData({
        quotationType: "GST",
        quotationNumber: "",
        quotationName: "",
        date: "",
        title: "MR",
        clientName: "",
        subject: "",
      });

      // 🔴 CHANGE 2: Form save hone ke baad list ko waapas empty set karein
      setProducts([]);

      setSummary({
        discount: 0,
        cgst: 0,
        sgst: 0,
        other: 0,
      });

      setNotes("");

      
      return response;
    } catch (error) {
      console.error("Backend error:", error.response?.data || error.message);
      alert("Error saving quotation in database.");
      throw error;
    }
  };

  const handleCancel = () => {
    const confirmCancel = window.confirm("Are you sure you want to cancel?");
    if (!confirmCancel) return;

    setFormData({
      quotationType: "GST",
      quotationNumber: "",
      quotationName: "",
      date: "",
      title: "MR",
      clientName: "",
      subject: "",
    });

    // 🔴 CHANGE 3: Cancel dabane par bhi array empty ho jaye
    setProducts([]);

    setSummary({
      discount: 0,
      cgst: 0,
      sgst: 0,
      other: 0,
    });

    setNotes("");
  };

  return (
    <Routes>
      <Route path="/" element={<Quotation />} />
      <Route
        path="/addquotation"
        element={
          <AddQuot
            formData={formData}
            setFormData={setFormData}
            products={products}
            setProducts={setProducts}
            summary={summary}
            setSummary={setSummary}
            notes={notes}
            setNotes={setNotes}
            handleCreate={handleSave} 
            handleCancel={handleCancel}
            setValidateQuotation={setValidateQuotation}
            setValidateProducts={setValidateProducts}
          />
        }
      />
      <Route path="/quotation-template" element={<QuotationTemplate />} />

      
      <Route path="/editquotation/:id" element={<EditQuotation />} />

    
      <Route path="/view/:id" element={<View />} />

      
      <Route path="/addproduct" element={<AddProductItems />} />
      <Route path="/approve-quotation" element={<ApproveQuotation />} />
      <Route path="/customer-service" element={<CustomerService />} />
      <Route path="/add-tanky-product" element={<AddTankyProduct />} />
      <Route path="/add-service" element={<AddService />} />

     
      <Route
        path="/client-financeMain/create"
        element={<ClientFinanceMain />}
      />

      <Route path="/client-finance" element={<ClientFinance />} />

      <Route path="/edit-client-finance/:id" element={<EditClientFinance />} />
      <Route path="/view-client-finance" element={<ViewClientFinance />} />

      <Route path="/client-finance-main" element={<ClientFinanceMain />} />
    </Routes>
  );
}

export default App;