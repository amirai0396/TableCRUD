import React from "react";

const AddEditModal = ({
  showModal,
  handleModalToggle,
  handleInputChange,
  handleModalSubmit,
  formData,
  isEditing,
}) => {


  return (
    <div
      className={`modal ${showModal ? "show" : ""}`}
      style={{ display: showModal ? "block" : "none" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{isEditing ? "Edit Record" : "Add Record"}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleModalToggle}
            ></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleModalToggle}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleModalSubmit}
            >
              {isEditing ? "Update" : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEditModal;
