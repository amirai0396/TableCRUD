import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AddEditModal from "../component/popupmodal";
import initialData from "../data/data.json";

const TableComponent = () => {
  const [data, setData] = useState(initialData);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDelete = (id) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
  };

  const handleEdit = (item) => {
    setFormData({
      id: item.id,
      name: item.name,
      description: item.description,
    });
    setIsEditing(true);
    setShowModal(true);
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value
    setSearchTerm(searchTerm);
    
    const filteredData = initialData.filter((item) =>
      item.name.includes(searchTerm)
    );
  
    setData(filteredData);
  };

  const handleModalToggle = () => {
    setShowModal(!showModal);
    setFormData({ id: "", name: "", description: "" });
    setIsEditing(false);
  };

  const handleModalSubmit = () => {
    if (isEditing) {
      // Editing functionality
      const updatedData = data.map((item) =>
        item.id === formData.id
          ? { ...item, name: formData.name, description: formData.description }
          : item
      );
      setData(updatedData);
      setShowModal(false);
      setIsEditing(false); // Reset editing state
    } else {
      // Adding new record
      const newRecord = {
        id: data.length + 1,
        name: formData.name,
        description: formData.description,
      };
      setData([...data, newRecord]);
      setShowModal(false);
    }
    setFormData({ id: "", name: "", description: "" }); // Reset form data
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Helper function to perform sorting based on a key and direction
  const sortedData = () => {
    const sortableData = [...data];
    if (sortConfig.key) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  };

  const handleHeaderClick = (key) => {
    handleSort(key);
  };

  const columns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "description", label: "Description" },
  ];

  return (
    <div className="container mt-4">
      <div className="row align-items-center">
        <div className="col-md-4 mb-3">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search by Name "
            className="form-control form-control-sm"
          />
        </div>
        <div className="col-md-4 mb-3">
          <button
            className="btn btn-primary"
            onClick={() => {
              setShowModal(true);
              setIsEditing(false);
            }}
          >
            Add Record
          </button>
        </div>
        <div className="col-md-4"></div>
      </div>
      <table className="table table-striped table-dark">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                onClick={() => handleHeaderClick(column.key)}
              >
                {column.label}
                {sortConfig.key === column.key && (
                  <span>
                    {sortConfig.direction === "ascending" ? " 🔽" : " 🔼"}
                  </span>
                )}
              </th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedData().map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>
                <button
                  className="btn btn-info btn-sm mr-2"
                  onClick={() => handleEdit(item)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AddEditModal
        showModal={showModal}
        handleModalToggle={handleModalToggle}
        handleInputChange={handleInputChange}
        handleModalSubmit={handleModalSubmit}
        formData={formData}
        isEditing={isEditing}
      />
    </div>
  );
};

export default TableComponent;
