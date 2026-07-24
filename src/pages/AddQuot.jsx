import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header";
import QuotationForm from "../components/QuotationForm";
import ProductSection from "../components/ProductSection";
import TermsSection from "../components/Term";
import "@fontsource/poppins";
import "../App.css";


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

  
  useEffect(() => {
    if (location.state && location.state.templateData) {
      const { templateData } = location.state;
      
      
      let formattedDate = "";
      if (templateData.date) {
        formattedDate = templateData.date.split("T")[0];
      } else if (templateData.createdAt) {
        formattedDate = templateData.createdAt.split("T")[0];
      }

      
      setFormData((prev) => ({
        ...prev,
        quotationType: templateData.quotationType || "",
        quotationNumber: templateData.quotationNumber || "", 
        date: formattedDate, 
        quotationDate: formattedDate, 
        clientName: templateData.clientName || templateData.customerName || "", 
        subject: templateData.subject || "",
       
        quotationName: templateData.quotationName || "", 
        termsAndConditions: templateData.termsAndConditions || "",
      }));

      
      if (templateData.products && templateData.products.length > 0) {
        setProducts(templateData.products);
      }

      
      setSummary({
        discount: templateData.discount || 0,
        cgst: templateData.cgst || 0,
        sgst: templateData.sgst || 0,
        other: templateData.other || 0,
        subTotal: templateData.subTotal || 0,
        grandTotal: templateData.grandTotal || 0,
      });

      
      if (templateData.notes) {
        setNotes(templateData.notes);
      }
    }
  }, [location.state, setFormData, setProducts, setSummary, setNotes]);

  
  const customCreateHandler = async (e, uploadedFiles = []) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    const isSaveAsTemplate = formData?.isSaveAsTemplate === true;

    if (isSaveAsTemplate) {
      console.log("Saving Template to Database...");
      
     
      const templatePayload = {
        ...formData,          
        ...summary,           
        products: products || [],
        notes: notes || "",
        saveAsTemplate: true,    
        quotationName: formData?.quotationName || formData?.quotation_name || formData?.quotationNumber || "Custom Quotation"
      };

      try {
        await api.post("/quotations", templatePayload);
        console.log("Successfully saved Template in Database!");
      } catch (error) {
        
        console.error("Database Template Error:", error.response?.data || error.message);
        alert(`Template save nahi hua: ${error.response?.data?.message || "Format mismatch"}`);
      }
    }
    
    
    try {
      let newQuotationId = null;

      
      if (handleCreate) {
        const response = await handleCreate(e);
        newQuotationId = response?.data?._id || response?.data?.id || response?.data?.data?._id;
      }

      
      if (newQuotationId && uploadedFiles.length > 0) {
        console.log(`Uploading ${uploadedFiles.length} files to backend...`);
        for (let i = 0; i < uploadedFiles.length; i++) {
          const formPayload = new FormData();
          formPayload.append("attachment", uploadedFiles[i]);

          try {
            await api.post(`/upload/${newQuotationId}`, formPayload, {
              headers: {
                "Content-Type": "multipart/form-data", 
              },
            });
            console.log(`File ${i + 1} uploaded successfully!`);
          } catch (uploadError) {
            console.error(`File ${i + 1} upload fail:`, uploadError);
          }
        }
      }

      
      alert("Quotation saved successfully!");
      navigate("/quotation-template"); 

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
        handleSave={customCreateHandler} 
        handleCancel={customCancelHandler}
        saveButtonText="Create" 
        cancelButtonText="Cancel"
      />
    </div>
  );
}

export default AddQuot;