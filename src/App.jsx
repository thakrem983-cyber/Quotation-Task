import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import EditQuotation from "./pages/EditQuotation";
import View from "./pages/view";

import Header from "./components/Header";
// import ProductTable from "./components/ProductTable";
import QuotationForm from "./components/QuotationForm";
import ProductSection from "./components/ProductSection";
import TermsSection from "./components/Term";
import "@fontsource/poppins";
import "./App.css";

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

  const handleSave = () => {
    if (validateQuotation && !validateQuotation()) {
      alert("Please fill required details");
      return;
    }
    if (validateProducts && !validateProducts()) {
      return;
    }
    const quotation = {
      formData,
      products,
      summary,
      notes,
    };

    console.log(quotation);

    alert("Quotation Saved Successfully!");

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
      <Route
        path="/"
        element={
          <EditQuotation
            formData={formData}
            setFormData={setFormData}
            products={products}
            setProducts={setProducts}
            summary={summary}
            setSummary={setSummary}
            notes={notes}
            setNotes={setNotes}
            handleSave={handleSave}
            handleCancel={handleCancel}
            setValidateQuotation={setValidateQuotation}
            setValidateProducts={setValidateProducts}
          />
        }
      />

      <Route
        path="/view"
        element={
          <View
            formData={formData}
            products={products}
            summary={summary}
            notes={notes}
            setNotes={setNotes}
          />
        }
      />
    </Routes>
  );
}

export default App;
