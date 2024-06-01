import React from 'react'
import PropertyList from '../Components/buyer/PropertyList'

function Home() {
  return (
    <div>
      <PropertyList/>
    </div>
  )
}

export default Home





// import React, { useState } from "react";

// function Home() {
//   const [formData, setFormData] = useState({
//     name: "",
//     contactNumber: "",
//     email: "",
//   });
//   const [records, setRecords] = useState([]);
//   const [isEditing, setIsEditing] = useState(false);
//   const [currentIndex, setCurrentIndex] = useState(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (isEditing) {
//       const updatedRecords = records.map((record, index) =>
//         index === currentIndex ? formData : record
//       );
//       setRecords(updatedRecords);
//       setIsEditing(false);
//       setCurrentIndex(null);
//     } else {
//       setRecords([...records, formData]);
//     }
//     setFormData({ name: "", contactNumber: "", email: "" });
//   };

//   const handleEdit = (index) => {
//     setFormData(records[index]);
//     setIsEditing(true);
//     setCurrentIndex(index);
//   };

//   const handleDelete = (index) => {
//     const updatedRecords = records.filter((_, i) => i !== index);
//     setRecords(updatedRecords);
//   };
//   return (
//     <div>
//       <h1>Add your Profile</h1>
//       <div className="">
//         {/* <h1>Data Management</h1> */}
//         <form onSubmit={handleSubmit} className="form">
//           <input
//             type="text"
//             name="name"
//             placeholder="Name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="text"
//             name="contactNumber"
//             placeholder="Contact Number"
//             value={formData.contactNumber}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//           <button type="submit">{isEditing ? "Update" : "Add"}</button>
//         </form>
//         <table className="table">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Contact Number</th>
//               <th>Email</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {records.map((record, index) => (
//               <tr key={index}>
//                 <td>{record.name}</td>
//                 <td>{record.contactNumber}</td>
//                 <td>{record.email}</td>
//                 <td>
//                   <button onClick={() => handleEdit(index)}>Edit</button>
//                   <button onClick={() => handleDelete(index)}>Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       {/* export default DataManagement; */}
//     </div>
//   );
// }

// export default Home;
