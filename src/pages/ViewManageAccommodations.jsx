// ViewManageAccommodations.js
import React, { useEffect, useState } from 'react';
import { db } from './Firebase'; // Adjust the import based on your Firebase setup
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const ViewManageAccommodations = () => {
  const [accommodations, setAccommodations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccommodations = async () => {
      const accommodationsRef = collection(db, 'accommodations'); // Use your collection name
      const accommodationDocs = await getDocs(accommodationsRef);
      const accommodationsData = accommodationDocs.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAccommodations(accommodationsData);
    };

    fetchAccommodations();
  }, []);

  const handleDelete = async (id) => {
    const accommodationRef = doc(db, 'accommodations', id);
    await deleteDoc(accommodationRef);
    setAccommodations(accommodations.filter(acc => acc.id !== id));
  };

  const handleEdit = (id) => {
    navigate(`/edit-accommodation/${id}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Accommodations</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Accommodation Name</th>
            <th className="py-2 px-4 border-b">Price</th>
            <th className="py-2 px-4 border-b">Address</th>
            <th className="py-2 px-4 border-b">Image</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {accommodations.map((accommodation) => (
            <tr key={accommodation.id}>
              <td className="py-2 px-4 border-b">{accommodation.name}</td>
              <td className="py-2 px-4 border-b">R{accommodation.price}</td>
              <td className="py-2 px-4 border-b">{accommodation.address}</td>
              <td className="py-2 px-4 border-b">
                {accommodation.imageUrl ? (
                  <img
                    src={accommodation.imageUrl}
                    alt={accommodation.name}
                    className="w-20 h-20 object-cover"
                  />
                ) : (
                  <span>No image available</span>
                )}
              </td>
              <td className="py-2 px-4 border-b">
                <button onClick={() => handleEdit(accommodation.id)} className="text-blue-600 hover:underline">Edit</button>
                <button onClick={() => handleDelete(accommodation.id)} className="ml-4 text-red-600 hover:underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewManageAccommodations;
