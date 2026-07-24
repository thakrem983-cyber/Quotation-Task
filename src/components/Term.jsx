import { useState } from "react";
import { FaRegEdit, FaUpload, FaTrash } from "react-icons/fa";

import "./term.css";

function TermsSection({
  notes,
  setNotes,
  handleSave,
  handleCancel,
  formData = {},
  setFormData,
  isView = false,
  saveButtonText = "Save",
  cancelButtonText = "Cancel",
}) {
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    if (selectedFiles.length + files.length > 5) {
      alert("You can upload maximum 5 files.");
      return;
    }

    const validFiles = [];

    for (const file of selectedFiles) {
      if (file.size > 10 * 1024 * 1024) {
        alert(`${file.name} is larger than 10MB.`);
      } else {
        validFiles.push(file);
      }
    }

    setFiles([...files, ...validFiles]);
    e.target.value = "";
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const [terms, setTerms] = useState([
    "In case of any damage during transit or travel, Milestone Enterprises will not be held responsible.",
    "Supply will be made within 2 to 3 Weeks from the date of confirmed PO and full payment.",
    "The above quotation is based on our recent discussion and is subject to change as per final site requirements.",
    "Any deviations from standard conditions may lead to revised pricing and timeline.",
    "Milestone Enterprises reserves the right to subcontract part or full scope of work.",
  ]);
  const [editingIndex, setEditingIndex] = useState(null);

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-7">
          <h5 className="mb-3">Terms & Conditions</h5>

          <div className="term-row">
            {editingIndex === 0 ? (
              <textarea
                className="form-control"
                value={terms[0]}
                onChange={(e) => {
                  const updated = [...terms];
                  updated[0] = e.target.value;
                  setTerms(updated);
                }}
              />
            ) : (
              <p>1. {terms[0]}</p>
            )}

            <FaRegEdit
              className="term-icon"
              onClick={() => setEditingIndex(editingIndex === 0 ? null : 0)}
              style={{ cursor: "pointer" }}
            />
          </div>

          <div className="term-row">
            {editingIndex === 1 ? (
              <textarea
                className="form-control"
                value={terms[1]}
                onChange={(e) => {
                  const updated = [...terms];
                  updated[1] = e.target.value;
                  setTerms(updated);
                }}
              />
            ) : (
              <p>2. {terms[1]}</p>
            )}

            <FaRegEdit
              className="term-icon"
              onClick={() => setEditingIndex(editingIndex === 1 ? null : 1)}
              style={{ cursor: "pointer" }}
            />
          </div>

          <div className="term-row">
            {editingIndex === 2 ? (
              <textarea
                className="form-control"
                value={terms[2]}
                onChange={(e) => {
                  const updated = [...terms];
                  updated[2] = e.target.value;
                  setTerms(updated);
                }}
              />
            ) : (
              <p>3. {terms[2]}</p>
            )}

            <FaRegEdit
              className="term-icon"
              onClick={() => setEditingIndex(editingIndex === 2 ? null : 2)}
              style={{ cursor: "pointer" }}
            />
          </div>

          <div className="term-row">
            {editingIndex === 3 ? (
              <textarea
                className="form-control"
                value={terms[3]}
                onChange={(e) => {
                  const updated = [...terms];
                  updated[3] = e.target.value;
                  setTerms(updated);
                }}
              />
            ) : (
              <p>4. {terms[3]}</p>
            )}

            <FaRegEdit
              className="term-icon"
              onClick={() => setEditingIndex(editingIndex === 3 ? null : 3)}
              style={{ cursor: "pointer" }}
            />
          </div>

          <div className="term-row">
            {editingIndex === 4 ? (
              <textarea
                className="form-control"
                value={terms[4]}
                onChange={(e) => {
                  const updated = [...terms];
                  updated[4] = e.target.value;
                  setTerms(updated);
                }}
              />
            ) : (
              <p>5. {terms[4]}</p>
            )}

            <FaRegEdit
              className="term-icon"
              onClick={() => setEditingIndex(editingIndex === 4 ? null : 4)}
              style={{ cursor: "pointer" }}
            />
          </div>

          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="form-control mt-3"
            rows="4"
            placeholder="Add extra notes (optional)"
            disabled={isView}
          />

          <div className="mt-4 d-flex align-items-center gap-3">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="save"
                disabled={isView}
                // Checkbox formData se connect ho gaya
                checked={formData?.isSaveAsTemplate || false}
                onChange={(e) =>
                  setFormData &&
                  setFormData({
                    ...formData,
                    isSaveAsTemplate: e.target.checked,
                  })
                }
              />
              <label className="form-check-label" htmlFor="save">
                Save as template
              </label>
            </div>

            <button
              className="btn btn-warning text-white rounded-3 px-4 py-2"
              onClick={(e) => handleSave(e, files)}
              disabled={isView}
            >
              {saveButtonText}
            </button>

            <button
              className="btn btn-outline-warning rounded-3 px-4 py-2"
              onClick={handleCancel}
              disabled={isView}
            >
              {cancelButtonText}
            </button>
          </div>
        </div>

        <div className="col-md-5">
          <h5>Attach File</h5>
          <label htmlFor="fileUpload" className="upload-btn">
            <FaUpload className="me-2" />
            Upload Files
          </label>

          <input
            id="fileUpload"
            type="file"
            multiple
            className="d-none"
            onChange={handleFileChange}
            disabled={isView}
          />

          <small className="text-muted d-block mt-2">
            You can upload a maximum of 5 files, 10MB each
          </small>

          {files.length > 0 && (
            <div className="mt-3">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="border rounded p-2 mb-2 d-flex justify-content-between align-items-center"
                >
                  <div>
                    <strong>{file.name}</strong>
                    <br />
                    <small className="text-muted">
                      {(file.size / 1024).toFixed(1)} KB
                    </small>
                  </div>

                  {!isView && (
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => removeFile(index)}
                    >
                      <FaTrash />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TermsSection;
