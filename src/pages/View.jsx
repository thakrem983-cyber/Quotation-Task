import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // URL se ID nikalne ke liye
import Header from "../components/Header";
import QuotationForm from "../components/QuotationForm";
import ProductSection from "../components/ProductSection";
import TermsSection from "../components/Term";
import api from "../api/api"; // Apni API file ka path check kar lena

function View() {
  const { id } = useParams(); // URL me jo ID aayegi wo yahan milegi
  const [loading, setLoading] = useState(true);

  // Local state banayenge API se aaye hue data ko store karne ke liye
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

  // Page load hote hi backend se data mangwayenge
  useEffect(() => {
    if (id) {
      fetchQuotationDetails();
    }
  }, [id]);

  const fetchQuotationDetails = async () => {
    try {
      const response = await api.get(`/quotations/${id}`);
      const backendData = response.data.data;

      // 1. Form Data Set karna (Backend ke data ko Frontend Format me)
      setFormData({
        quotationType: backendData.quotationType || "GST",
        quotationNumber: backendData.quotationNumber || "",
        quotationName: "",
        date: new Date(backendData.createdAt).toISOString().split("T")[0], // YYYY-MM-DD
        title: "MR", // Default title
        clientName: backendData.clientName || "",
        subject: backendData.subject || "",
      });

      // 2. Products Set karna
      const mappedProducts = backendData.products.map((p, index) => ({
        id: index + 1,
        productName: p.productName,
        code: "", 
        unit: p.unit || "Nos",
        price: p.price,
        quantity: p.quantity,
        amount: p.total,
        isEditing: false, // View mode me ye hamesha false hoga
        image: null,
      }));
      setProducts(mappedProducts);

      // 3. Summary Set karna
      setSummary({
        discount: backendData.discount || 0,
        cgst: backendData.cgst || 0,
        sgst: backendData.sgst || 0,
        other: backendData.other || 0,
      });

      // 4. Notes Set karna
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
        isView={true} // Ye tere form ko read-only (disable) kar dega
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