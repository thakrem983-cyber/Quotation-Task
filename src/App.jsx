import { Routes, Route } from "react-router-dom";
import { useState } from "react";
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
  const [products, setProducts] = useState([
    {
      id: 1,
      productName: "",
      code: "",
      unit: "",
      price: 0,
      quantity: 1,
      amount: 0,
      image: null,
      isEditing: true,
    },
  ]);
  const [summary, setSummary] = useState({
    discount: 0,
    cgst: 0,
    sgst: 0,
    other: 0,
  });
  const [notes, setNotes] = useState("");
  const [validateProducts, setValidateProducts] = useState(null);

  // Ye function backend me data save karega
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
      clientName: formData.clientName,
      subject: formData.subject,
      products: products,
      discount: summary.discount,
      cgst: summary.cgst,
      sgst: summary.sgst,
      other: summary.other,
      notes: notes,
      grandTotal: summary.grandTotal || products.reduce((acc, p) => acc + (p.amount || 0), 0)
    };

    console.log("Sending data to backend:", payloadForBackend);

    try {
      const response = await api.post("/quotations", payloadForBackend);
      console.log("Backend response:", response.data);
      
      // Form clear karo
      setFormData({
        quotationType: "GST",
        quotationNumber: "",
        quotationName: "",
        date: "",
        title: "MR",
        clientName: "",
        subject: "",
      });

      setProducts([
        {
          id: 1,
          productName: "",
          code: "",
          unit: "",
          price: 0,
          quantity: 1,
          amount: 0,
          image: null,
          isEditing: true,
        },
      ]);

      setSummary({
        discount: 0,
        cgst: 0,
        sgst: 0,
        other: 0,
      });

      setNotes("");

      // 🔴 SABSE ZAROORI LINE: Yeh response return karega taaki AddQuot me file upload ho sake
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

    setProducts([
      {
        id: 1,
        productName: "",
        code: "",
        unit: "",
        price: 0,
        quantity: 1,
        amount: 0,
        image: null,
        isEditing: true,
      },
    ]);

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
            handleCreate={handleSave} // <-- Yahan se handleSave call hoga jo response return karega
            handleCancel={handleCancel}
            setValidateQuotation={setValidateQuotation}
            setValidateProducts={setValidateProducts}
          />
        } 
      />
      <Route path="/quotation-template" element={<QuotationTemplate />} />

      {/* 🔴 EDIT QUOTATION */}
      <Route path="/editquotation/:id" element={<EditQuotation />} />

      {/* View Quotation */}
      <Route path="/view/:id" element={<View />} />

      {/* Other routes */}
      <Route path="/addproduct" element={<AddProductItems />} />
      <Route path="/approve-quotation" element={<ApproveQuotation />} />
      <Route path="/customer-service" element={<CustomerService />} />
      <Route path="/add-tanky-product" element={<AddTankyProduct />} />
      <Route path="/add-service" element={<AddService />} />

      {/* Typo theek kiya (// ki jagah / kar diya) */}
      <Route
        path="/client-financeMain/create"
        element={<ClientFinanceMain />}
      />

      <Route
        path="/client-finance"
        element={<ClientFinance />}
      />

    </Routes>
  );
}

export default App;