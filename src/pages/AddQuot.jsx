import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header";
import QuotationForm from "../components/QuotationForm";
import ProductSection from "../components/ProductSection";
import TermsSection from "../components/Term";
import "@fontsource/poppins";
import "../App.css";

function AddQuot({
  formData,
  setFormData,
  products,
  setProducts,
  summary,
  setSummary,
  notes,
  setNotes,
  handleCreate, 
  handleCancel, 
  setValidateQuotation,
  setValidateProducts,
}) {
  const navigate = useNavigate();
  const location = useLocation();

  // 🔴 AGAR TEMPLATE CARD PAR CLICK KARKE AAYE HAIN TOH DATA AUTOFILL KARO
  useEffect(() => {
    if (location.state && location.state.templateData) {
      const { templateData } = location.state;
      if (templateData.formData) setFormData(templateData.formData);
      if (templateData.products) setProducts(templateData.products);
      if (templateData.summary) setSummary(templateData.summary);
      if (templateData.notes) setNotes(templateData.notes);
    }
  }, [location.state]);

  // 🔴 CREATE & TEMPLATE SAVE HANDLER
  const customCreateHandler = async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    // 1. Safe Checkbox Check (Aapke checkbox ki key jo bhi ho)
    const isSaveAsTemplate = 
      formData?.isSaveAsTemplate || 
      formData?.isTemplate || 
      formData?.saveAsTemplate || 
      formData?.template || 
      formData?.check ||
      true; // 👈 FOR TESTING: Agar checkbox nahi mila toh bhi forced save karega

    console.log("Saving Template... Data:", { formData, products, summary, notes });

    // 2. Naya Template Data Object Banao
    const newTemplate = {
      id: Date.now(),
      quotationName: formData?.quotationName || formData?.quotation_name || formData?.quotationNumber || "Custom Quotation",
      formData: formData || {},
      products: products || [],
      summary: summary || {},
      notes: notes || "",
    };

    // 3. LocalStorage me Push karo
    try {
      const existingTemplates = JSON.parse(localStorage.getItem("quotationTemplates")) || [];
      existingTemplates.push(newTemplate);
      localStorage.setItem("quotationTemplates", JSON.stringify(existingTemplates));
      console.log("Successfully saved in LocalStorage!");
    } catch (error) {
      console.error("LocalStorage Error:", error);
    }

    // 4. External Save Handler Call Karo (if provided)
    if (handleCreate) {
      try {
        await handleCreate(e);
      } catch (err) {
        console.log("handleCreate optional error handled");
      }
    }

    // 5. Explicitly Navigate
    navigate("/quotation-template");
  };

  const customCancelHandler = (e) => {
    if (handleCancel) {
      handleCancel(e);
    }
    navigate(-1);
  };

  return (
    <div className="container py-4">
      <Header />

      <QuotationForm
        heading="Create Quotation"
        formData={formData}
        setFormData={setFormData}
        setValidateQuotation={setValidateQuotation}
      />

      <ProductSection
        products={products}
        setProducts={setProducts}
        summary={summary}
        setSummary={setSummary}
        formData={formData}
        setValidateProducts={setValidateProducts}
      />
      <hr />

      <TermsSection
        notes={notes}
        setNotes={setNotes}
        formData={formData}
        setFormData={setFormData}
        handleSave={customCreateHandler} 
        handleCancel={customCancelHandler}
        saveButtonText="Create" 
        cancelButtonText="Cancel"
      />
    </div>
  );
}

export default AddQuot;