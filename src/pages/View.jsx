import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; 
import Header from "../components/Header";
import QuotationForm from "../components/QuotationForm";
import ProductSection from "../components/ProductSection";
import TermsSection from "../components/Term";
import api from "../api/api"; 

function View() {
  const { id } = useParams(); 
  const [loading, setLoading] = useState(true);

  
  const [formData, setFormData] = useState({
    quotationType: "",
    quotationNumber: "",
    quotationName: "",
    date: "",
    title: "",
    clientName: "",
    subject: "",
  });

  const [products, setProducts] = useState([]);
  
  const [summary, setSummary] = useState({
    discount: 0,
    cgst: 0,
    sgst: 0,
    other: 0,
  });
  
  const [notes, setNotes] = useState("");

  
  useEffect(() => {
    if (id) {
      fetchQuotationDetails();
    }
  }, [id]);

  const fetchQuotationDetails = async () => {
    try {
      const response = await api.get(`/quotations/${id}`);
      const backendData = response.data.data;

      
      setFormData({
        quotationType: backendData.quotationType || "GST",
        quotationNumber: backendData.quotationNumber || "",
        quotationName:   backendData.quotationName||"",
        date: new Date(backendData.createdAt).toISOString().split("T")[0], 
        title: "MR", 
        clientName: backendData.clientName || "",
        subject: backendData.subject || "",
      });

    
      // 🟢 Is naye code se replace karein:
      const mappedProducts = backendData.products.map((p, index) => ({
        id: index + 1,
        productName: p.productName,
        
        // 1. Code ab backend se aayega
        code: p.code || p.productCode || "-", 
        
        unit: p.unit || "Nos",
        price: p.price,
        quantity: p.quantity,
        amount: p.total,
        
        // 2. Image ab backend se aayegi
        image: p.image && p.image !== "null" ? p.image : null, 
        
        isEditing: false, 
      }));
      setProducts(mappedProducts);

     
      setSummary({
        discount: backendData.discount || 0,
        cgst: backendData.cgst || 0,
        sgst: backendData.sgst || 0,
        other: backendData.other || 0,
      });

      
      setNotes(backendData.notes || "");
      
      setLoading(false);
    } catch (error) {
      console.error("View page data laane me error:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return <h2 className="text-center mt-5">Loading Quotation Details...</h2>;
  }

  return (
    <div className="container py-4">
      <Header />

      <QuotationForm
        heading="View Quotation"
        formData={formData}
        isView={true} 
      />

      <ProductSection
        products={products}
        summary={summary}
        formData={formData}
        isView={true}
      />

      <TermsSection
        notes={notes}
        setNotes={setNotes}
        isView={true}
      />
    </div>
  );
}

export default View;