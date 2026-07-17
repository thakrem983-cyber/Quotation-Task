// import { useState } from "react";
// import { FaPlusCircle, FaPlus, FaEdit, FaUpload, FaTrash } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./AddQuot.css";

// function AddQuot() {
//   const navigate = useNavigate();

//   const saved = JSON.parse(localStorage.getItem("quotationTemplate"));
//   const [files, setFiles] = useState([]);
//   const [quotationName, setQuotationName] = useState("");
//   const [clientName, setClientName] = useState("");
//   const [products, setProducts] = useState([]);
//   const [quotationType, setQuotationType] = useState("GST");

//   const [discount, setDiscount] = useState(0);
//   const [cgst, setCgst] = useState(9);
//   const [sgst, setSgst] = useState(9);
//   const [other, setOther] = useState(0);
//   const [terms, setTerms] = useState([
//     "The above quotation is based on our recent discussion and is subject to change as per the final site requirements.",
//     "Supply will be made within 2 to 3 weeks from the date of confirmed PO and full payment.",
//     "In case of any damage during transit or travel, Milestone Enterprises will not be held responsible.",
//     "Milestone Enterprises reserves the right to subcontract part or full scope of work but will supervise the execution.",
//     "Any deviations from standard conditions may lead to revised pricing and timeline."
//   ]);

//   const [editingIndex, setEditingIndex] = useState(null);

//   const handleFileChange = (e) => {
//     setFiles(Array.from(e.target.files));
//   };

//   const productsTotal = products.reduce(
//     (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 0),
//     0
//   );

//   const discountAmount = productsTotal * (discount / 100);

//   const taxable = productsTotal - discountAmount;

//   const cgstAmount =
//     quotationType === "Cash"
//       ? 0
//       : taxable * (cgst / 100);

//   const sgstAmount =
//     quotationType === "Cash"
//       ? 0
//       : taxable * (sgst / 100);

//   const otherAmount = taxable * (other / 100);

//   const grandTotal =
//     taxable + cgstAmount + sgstAmount + otherAmount;

//   return (
//     <div className="container bg-white">

//       <div className="row align-items-center mb-5">

//         <div className="col-lg-2">
//           <img
//             src="https://milestoneenterprises.in/wp-content/uploads/2024/06/cropped-cropped-Group-6-3.png"
//             className="img-fluid"
//             alt="Banner"
//             style={{ height: "100px" }}
//           />
//         </div>

//         <div className="col-lg-6">
//           <span style={{ color: "orange", fontSize: "40px", fontWeight: "bold" }}>
//             Milestone
//           </span>

//           <span style={{ fontSize: "40px", fontWeight: "bold", marginLeft: "8px" }}>
//             Enterprises
//           </span>
//         </div>

//         <div className="col-lg-4 text-end">
//           <img
//             src="src/assets/WhatsApp Image 2026-07-09 at 12.36.42 PM.jpeg"
//             className="img-fluid"
//             style={{ height: "150px" }}
//             alt="Design"
//           />
//         </div>

//       </div>

//       <h2 className="mb-4">Create Quotation</h2>

//       <div className="row g-4">

//         <div className="col-md-4">

//           <label className="form-label">Quotation Number</label>

//           <div className="input-group">

//             <select
//               className="form-select"
//               style={{ maxWidth: "90px" }}
//               value={quotationType}
//               onChange={(e) => {
//                 const value = e.target.value;
//                 setQuotationType(value);

//                 if (value === "Cash") {
//                   setCgst(0);
//                   setSgst(0);
//                 } else {
//                   setCgst(9);
//                   setSgst(9);
//                 }
//               }}
//             >
//               <option value="GST">GST</option>
//               <option value="Cash">Cash</option>
//             </select>
//             <input
//               type="text"
//               className="form-control"
//               defaultValue="ME202627-034"
//             />

//           </div>

//         </div>

//         <div className="col-md-4">

//           <label className="form-label">
//             Quotation Name
//           </label>

//           <input
//             type="text"
//             className="form-control"
//             placeholder="Enter quotation name"
//             value={quotationName}
//             onChange={(e) => {
//               if (/^[A-Za-z ]*$/.test(e.target.value)) {
//                 setQuotationName(e.target.value);
//               }
//             }}
//           />

//         </div>

//         <div className="col-md-4">

//           <label className="form-label">Date</label>

//           <input
//             type="date"
//             className="form-control"
//           />

//         </div>

//       </div>

//       <div className="row mt-3 g-4">

//         <div className="col-md-6">

//           <label className="form-label">
//             Client Name
//           </label>

//           <div className="input-group">

//             <select
//               className="form-select"
//               style={{ maxWidth: "90px" }}
//             >
//               <option>Mr.</option>
//               <option>Mrs.</option>
//             </select>

//             <input
//               type="text"
//               className="form-control"
//               placeholder="Enter Client"
//               value={clientName}
//               onChange={(e) => {
//                 if (/^[A-Za-z ]*$/.test(e.target.value)) {
//                   setClientName(e.target.value);
//                 }
//               }}
//             />

//           </div>

//         </div>

//         <div className="col-md-6">

//           <label className="form-label">
//             Subject
//           </label>

//           <input
//             type="text"
//             className="form-control"
//             placeholder="Enter Subject"
//           />

//         </div>

//       </div>

//       <hr className="my-4" />

//       <h5 className="fw-bold mb-3">
//         Products
//       </h5>

//       <div className="table-responsive">

//         <table className="table text-center cstabe">

//           <thead className="table-light">

//             <tr>

//               <th>S.NO</th>
//               <th>IMAGE</th>
//               <th>PRODUCT NAME</th>
//               <th>CODE</th>
//               <th>UNIT</th>
//               <th>PRICE</th>
//               <th>QUANTITY</th>
//               <th>AMOUNT</th>
//               <th>ACTION</th>

//             </tr>

//           </thead>

//           <tbody>

//             {products.length === 0 ? (

//               <tr>

//                 <td
//                   colSpan="9"
//                   className="py-5 text-center"
//                 >
//                   No products added
//                 </td>

//               </tr>

//             ) : (

//               products.map((item, index) => (

//                 <tr key={item.id}>

//                   <td>{index + 1}</td>

//                   <td>
//                     <label
//                       htmlFor={`image-${index}`}
//                       style={{
//                         width: "30px",
//                         height: "30px",
//                         borderRadius: "8px",
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         cursor: "pointer",
//                         overflow: "hidden",
//                         background: "#fafafa",
//                         marginBottom: "5px"
//                       }}
//                     >
//                       {item.image ? (
//                         <img
//                           src={item.image}
//                           alt="Product"
//                           style={{
//                             width: "45%",
//                             height: "45%",
//                             objectFit: "cover",
//                           }}
//                         />
//                       ) : (
//                         <FaPlus />
//                       )}
//                     </label>

//                     <input
//                       id={`image-${index}`}
//                       type="file"
//                       accept="image/*"
//                       hidden
//                       onChange={(e) => {
//                         const file = e.target.files[0];
//                         if (!file) return;

//                         const updated = [...products];
//                         updated[index].image = URL.createObjectURL(file);
//                         setProducts(updated);
//                       }}
//                     />
//                   </td>

//                   <td>

//                     <input
//                       className="form-control"
//                       value={item.name}
//                       onChange={(e) => {
//                         const updated = [...products];
//                         updated[index].name = e.target.value;
//                         setProducts(updated);
//                       }}
//                     />

//                   </td>

//                   <td>

//                     <input
//                       className="form-control"
//                       value={item.code}
//                       onChange={(e) => {
//                         const updated = [...products];
//                         updated[index].code = e.target.value;
//                         setProducts(updated);
//                       }}
//                     />

//                   </td>

//                   <td>

//                     <input
//                       className="form-control"
//                       value={item.unit}
//                       onChange={(e) => {
//                         const updated = [...products];
//                         updated[index].unit = e.target.value;
//                         setProducts(updated);
//                       }}
//                     />

//                   </td>

//                   <td>

//                     <input
//                       type="number"
//                       className="form-control"
//                       value={item.price}
//                       onChange={(e) => {
//                         const updated = [...products];
//                         updated[index].price = e.target.value;
//                         setProducts(updated);
//                       }}
//                     />

//                   </td>

//                   <td>

//                     <input
//                       type="number"
//                       className="form-control"
//                       value={item.quantity}
//                       onChange={(e) => {
//                         const updated = [...products];
//                         updated[index].quantity = e.target.value;
//                         setProducts(updated);
//                       }}
//                     />

//                   </td>

//                   <td>
//                     ₹{(
//                       Number(item.price) *
//                       Number(item.quantity)
//                     ).toFixed(2)}
//                   </td>

//                   <td>

//                     <button
//                       className="btn btn-danger btn-sm"
//                       onClick={() =>
//                         setProducts(
//                           products.filter((_, i) => i !== index)
//                         )
//                       }
//                     >
//                       <FaTrash />
//                     </button>

//                   </td>

//                 </tr>

//               ))

//             )}

//           </tbody>

//         </table>
//         <hr className="my-4" />

//       </div>
//       <div className="row mt-4">

//         <div className="col-lg-7 btn-box">

//           <button
//             className="btn btn-light shadow-sm me-3 mb-3"
//             onClick={() =>
//               setProducts([
//                 ...products,
//                 {
//                   id: Date.now(),
//                   image: "",
//                   name: "",
//                   code: "",
//                   unit: "",
//                   price: "",
//                   quantity: 1,
//                 },
//               ])
//             }
//           >
//             <FaPlusCircle className="plusIcon" />
//             Add Product Items
//           </button>

//           <button className="btn btn-light shadow-sm me-3 mb-3">
//             <FaPlusCircle className="plusIcon" />
//             Custom Service
//           </button>

//           <button className="btn btn-light shadow-sm mb-3">
//             <FaPlusCircle className="plusIcon" />
//             Add Tanky Product
//           </button>

//         </div>

//         <div className="col-lg-5">
//           <div className="card border-0  rounded-4 overflow-hidden">

//             <div className="summary-row d-flex justify-content-between align-items-center px-4 py-4 border-bottom">
//               <span className="summary-title">Products Total</span>
//               <span className="summary-value fw-bold">
//                 ₹ {productsTotal.toFixed(2)}
//               </span>
//             </div>

//             <div className="summary-row">
//               <span className="summary-title">Discount</span>

//               <div className="summary-center">
//                 <div className="input-group input-group-sm">
//                   <input
//                     type="number"
//                     className="form-control text-center"
//                     value={discount}
//                     onChange={(e) => setDiscount(Number(e.target.value))}
//                   />
//                   <span className="input-group-text">%</span>
//                 </div>
//               </div>

//               <span className="text-danger fw-semibold">
//                 - ₹ {discountAmount.toFixed(2)}
//               </span>
//             </div>

//             <div className="summary-row">
//               <span className="summary-title">CGST</span>

//               <div className="summary-center">
//                 <div className="input-group input-group-sm">
//                   <input
//                     type="number"
//                     className="form-control text-center"
//                     value={cgst}
//                     disabled={quotationType === "Cash"}
//                     onChange={(e) => setCgst(Number(e.target.value))}
//                   />
//                   <span className="input-group-text">%</span>
//                 </div>
//               </div>

//               <span className="text-success fw-semibold">
//                 + ₹ {cgstAmount.toFixed(2)}
//               </span>
//             </div>

//             <div className="summary-row">
//               <span className="summary-title">SGST</span>

//               <div className="summary-center">
//                 <div className="input-group input-group-sm">
//                   <input
//                     type="number"
//                     className="form-control text-center"
//                     value={sgst}
//                     disabled={quotationType === "Cash"}
//                     onChange={(e) => setSgst(Number(e.target.value))}
//                   />
//                   <span className="input-group-text">%</span>
//                 </div>
//               </div>

//               <span className="text-success fw-semibold">
//                 + ₹ {sgstAmount.toFixed(2)}
//               </span>
//             </div>

//             <div className="summary-row">
//               <span className="summary-title">Other</span>

//               <div className="summary-center">
//                 <div className="input-group input-group-sm">
//                   <input
//                     type="number"
//                     className="form-control text-center"
//                     value={other}
//                     onChange={(e) => setOther(Number(e.target.value))}
//                   />
//                   <span className="input-group-text">%</span>
//                 </div>
//               </div>

//               <span className="text-success fw-semibold">
//                 + ₹ {otherAmount.toFixed(2)}
//               </span>
//             </div>

//             <div className="summary-total">
//               <span>Total Amount</span>
//               <span>₹ {grandTotal.toFixed(2)}</span>
//             </div>

//           </div>
//         </div>

//         <hr className="my-4" />

//         <div className="row">

//           <div className="col-lg-6">

//             <h5 className="fw-bold mb-3">Terms & Conditions</h5>

//             {terms.map((term, index) => (
//               <div
//                 key={index}
//                 className="d-flex justify-content-between align-items-start mb-3"
//               >
//                 <div style={{ width: "90%" }}>
//                   {editingIndex === index ? (
//                     <textarea
//                       className="form-control"
//                       value={term}
//                       rows={2}
//                       onChange={(e) => {
//                         const updated = [...terms];
//                         updated[index] = e.target.value;
//                         setTerms(updated);
//                       }}
//                     />
//                   ) : (
//                     <p className="mb-0">
//                       {index + 1}. {term}
//                     </p>
//                   )}
//                 </div>

//                 {editingIndex === index ? (
//                   <button
//                     className="btn btn-warning text-white btn-sm ms-2"
//                     onClick={() => setEditingIndex(null)}
//                   >
//                     Save
//                   </button>
//                 ) : (
//                   <FaEdit
//                     className="edit-icon ms-2"
//                     style={{ cursor: "pointer" }}
//                     onClick={() => setEditingIndex(index)}
//                   />
//                 )}
//               </div>
//             ))}

//             <textarea
//               className="form-control"
//               rows="4"
//               placeholder="Add extra notes"
//             />

//           </div>

//           <div className="col-lg-6">

//             <h5 className="fw-bold mb-3">
//               Attach File
//             </h5>

//             <input
//               type="file"
//               id="fileUpload"
//               multiple
//               hidden
//               onChange={handleFileChange}
//             />

//             <label
//               htmlFor="fileUpload"
//               className="uploadBtn"
//             >
//               <FaUpload className="me-2" />
//               Upload Files
//             </label>

//             <p className="small text-muted mt-2">
//               {files.length > 0
//                 ? `${files.length} file(s) selected`
//                 : "You can upload a maximum of 5 files, 10MB each"}
//             </p>

//           </div>

//         </div>

//         <div className="d-flex justify-content-between align-items-center flex-wrap">

//           <div className="form-check">

//             <input
//               className="form-check-input"
//               type="checkbox"
//               id="saveTemplate"
//             />

//             <label
//               className="form-check-label ms-2 mt-4"
//               htmlFor="saveTemplate"
//             >
//               Save as template
//             </label>

//             <button
//               className="btn btn-warning text-white px-4 me-3 ms-3 mt-3"
//               onClick={() => navigate("/quotation-template")}
//             >
//               Create
//             </button>
//             <button
//               className="btn btn-warning text-white px-4 mt-3"
//               onClick={() => {
//                 const quotation = {
//                   quotationName,
//                   clientName,
//                   quotationType,
//                   products,
//                   discount,
//                   cgst,
//                   sgst,
//                   other,
//                   grandTotal,
//                   terms,
//                 };

//                 localStorage.setItem(
//                   "quotationTemplate",
//                   JSON.stringify(quotation)
//                 );

//                 navigate("/addquotation");
//               }}
//             >
//               Cancel
//             </button>

//           </div>

//         </div>

//       </div>
//     </div>

//   );
// }


// export default AddQuot;

import { useNavigate } from "react-router-dom"; // 1. useNavigate import kiya
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
  const navigate = useNavigate(); // 2. Navigate hook initialize kiya

  // 3. Create click hone par pehle functional logic chalega fir navigate hoga
  const customCreateHandler = async (e) => {
    if (handleCreate) {
      await handleCreate(e); 
    }
    navigate("/quotation-template"); 
  };

  // 4. Cancel click hone par pehle cancel logic chalega fir navigate hoga
  const customCancelHandler = (e) => {
    if (handleCancel) {
      handleCancel(e); // Purana cancel logic chalega
    }
    navigate(-1); // 👈 Yeh use piche wale page par bhej dega, ya fir tum fixed path bhi de sakte ho jaise "/home"
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

      {/* 5. Humne bina niche ka code chhede custom functions inject kar diye */}
      <TermsSection
        notes={notes}
        setNotes={setNotes}
        handleSave={customCreateHandler} 
        handleCancel={customCancelHandler}
        saveButtonText="Create" 
        cancelButtonText="Cancel"
      />
    </div>
  );
}

export default AddQuot;