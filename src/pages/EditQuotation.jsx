import Header from "../components/Header";
// import ProductTable from "./components/ProductTable";
import QuotationForm from "../components/QuotationForm";
import ProductSection from "../components/ProductSection";
import TermsSection from "../components/Term";
import "@fontsource/poppins";
import "../App.css";


function EditQuotation({
  formData,
  setFormData,
  products,
  setProducts,
  summary,
  setSummary,
  notes,
  setNotes,
  handleSave,
  handleCancel,
  setValidateQuotation,
  setValidateProducts,
}) {
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
        handleSave={handleSave}
        handleCancel={handleCancel}
      />
    </div>
  );
}

export default EditQuotation;