import Header from "../components/Header";
import QuotationForm from "../components/QuotationForm";
import ProductSection from "../components/ProductSection";
import TermsSection from "../components/Term";

function View({
  formData,
  products,
  summary,
  notes,
  setNotes,
}) {
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