import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import QuotationForm from "../components/QuotationForm";
import ProductSection from "../components/ProductSection";
import TermsSection from "../components/Term";
import api from "../api/api";
import "@fontsource/poppins";
import "../App.css";

function EditQuotation() {
  const { id } = useParams(); // URL se Quotation ID milegi
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // States
  const [formData, setFormData] = useState({
    quotationType: "GST",
    quotationNumber: "",
    quotationName: "",
    date: "",
    title: "MR",
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

  const [validateQuotation, setValidateQuotation] = useState(null);
  const [validateProducts, setValidateProducts] = useState(null);

  // 1. Page load hote hi backend se current quotation load karo
  useEffect(() => {
    if (id) {
      fetchQuotationDetails();
    }
  }, [id]);

  const fetchQuotationDetails = async () => {
    try {
      const response = await api.get(`/quotations/${id}`);
      const backendData = response.data.data;

      // Form Data Load
      setFormData({
        quotationType: backendData.quotationType || "GST",
        quotationNumber: backendData.quotationNumber || "",
        quotationName: backendData.quotationName || "",
        date: backendData.createdAt ? new Date(backendData.createdAt).toISOString().split("T")[0] : "",
        title: "MR",
        clientName: backendData.clientName || "",
        subject: backendData.subject || "",
      });

      // Products Load (Editable Mode me isEditing: true or false standard according)
      const mappedProducts = (backendData.products || []).map((p, index) => ({
        id: p._id || index + 1,
        productName: p.productName || "",
        code: p.code || "", 
        unit: p.unit || "Nos",
        price: p.price || 0,
        quantity: p.quantity || 1,
        amount: p.total || p.amount || 0,
        isEditing: true, // Edit mode me editable rakhne ke liye
        image: p.image || null,
      }));
      setProducts(mappedProducts);

      // Summary Load
      setSummary({
        discount: backendData.discount || 0,
        cgst: backendData.cgst || 0,
        sgst: backendData.sgst || 0,
        other: backendData.other || 0,
      });

      // Notes Load
      setNotes(backendData.notes || "");
      setLoading(false);
    } catch (error) {
      console.error("Error fetching quotation for edit:", error);
      alert("Failed to load quotation details!");
      setLoading(false);
    }
  };

  // 2. Data Update (PUT API Call)
  const handleUpdate = async () => {
    if (validateQuotation && !validateQuotation()) {
      alert("Please fill required form fields!");
      return;
    }
    if (validateProducts && !validateProducts()) {
      return;
    }

    const updatePayload = {
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
      grandTotal: summary.grandTotal || products.reduce((acc, p) => acc + (p.amount || 0), 0),
    };

    try {
      await api.put(`/quotations/${id}`, updatePayload);
      alert("Quotation Updated Successfully!");
      navigate(-1); // Back to list
    } catch (error) {
      console.error("Update failed:", error.response?.data || error.message);
      alert("Failed to update quotation.");
    }
  };

  const handleCancel = () => {
    if (window.confirm("Are you sure you want to cancel editing?")) {
      navigate(-1);
    }
  };

  if (loading) {
    return <h2 className="text-center mt-5">Loading Quotation for Editing...</h2>;
  }

  return (
    <div className="container py-4">
      <Header />

      <QuotationForm
        heading="Edit Quotation"
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
        handleSave={handleUpdate}
        handleCancel={handleCancel}
        saveButtonText="save"
      />
    </div>
  );
}

export default EditQuotation;