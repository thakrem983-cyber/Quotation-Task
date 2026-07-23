import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header";
import QuotationForm from "../components/QuotationForm";
import ProductSection from "../components/ProductSection";
import TermsSection from "../components/Term";
import "@fontsource/poppins";
import "../App.css";

// 🔴 Zaroori: Apni API file import karna mat bhoolna
import api from "../api/api"; 

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

  // 🔴 CREATE, TEMPLATE SAVE & UPLOAD HANDLER
  // Yahan hum (e) ke sath (uploadedFiles) array bhi receive kar rahe hain
  const customCreateHandler = async (e, uploadedFiles = []) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    // 1. Proper Checkbox Check (Testing wala true hata diya)
    const isSaveAsTemplate = formData?.isSaveAsTemplate === true;

    // 2. Sirf tabhi Template save hoga jab tick laga hoga
    if (isSaveAsTemplate) {
      console.log("Saving Template... Data:", { formData, products, summary, notes });
      const newTemplate = {
        id: Date.now(),
        quotationName: formData?.quotationName || formData?.quotation_name || formData?.quotationNumber || "Custom Quotation",
        formData: formData || {},
        products: products || [],
        summary: summary || {},
        notes: notes || "",
      };

      try {
        const existingTemplates = JSON.parse(localStorage.getItem("quotationTemplates")) || [];
        existingTemplates.push(newTemplate);
        localStorage.setItem("quotationTemplates", JSON.stringify(existingTemplates));
        console.log("Successfully saved in LocalStorage!");
      } catch (error) {
        console.error("LocalStorage Error:", error);
      }
    }

    // 3. Asli Quotation aur Files Backend par Save karne ka Logic
    try {
      let newQuotationId = null;

      // A) Pehle Quotation save karo (handleCreate ke through)
      if (handleCreate) {
        // Bhai, dhyan rakhna ki aapka parent component mein jo handleCreate hai, 
        // wo backend se Quotation save hone ke baad uska ID return kare.
        const response = await handleCreate(e);
        
        // Response se ID nikalne ka fallback logic
       newQuotationId = response?.data?._id || response?.data?.id || response?.data?.data?._id;
      }

      // B) Agar Quotation save ho gaya aur user ne files daali hain, toh File Upload chalao
      if (newQuotationId && uploadedFiles.length > 0) {
        console.log(`Uploading ${uploadedFiles.length} files to backend...`);
        console.log("Extracted Quotation ID:", newQuotationId);
        
        // Loop chala kar ek-ek file backend bhejenge (Kyunki backend pe upload.single hai)
        for (let i = 0; i < uploadedFiles.length; i++) {
          const formPayload = new FormData();
          formPayload.append("attachment", uploadedFiles[i]); // "attachment" naam backend se match karna chahiye

          try {
            await api.post(`/upload/${newQuotationId}`, formPayload, {
              headers: {
                "Content-Type": "multipart/form-data", // Files ke liye zaroori header
              },
            });
            console.log(`File ${i + 1} uploaded successfully!`);
          } catch (uploadError) {
            console.error(`File ${i + 1} upload fail:`, uploadError);
          }
        }
      }

      // 4. Sab successful hone ke baad Explicitly Navigate karo
      alert("Quotation saved successfully!");
      navigate("/quotation-template"); // Ya jahan bhi aap bhejte ho

    } catch (err) {
      console.error("Save karte time error aayi:", err);
      alert("Failed to save Quotation.");
    }
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
        handleSave={customCreateHandler} // Yahan se file receive hongi upar wale function me
        handleCancel={customCancelHandler}
        saveButtonText="Create" 
        cancelButtonText="Cancel"
      />
    </div>
  );
}

export default AddQuot;