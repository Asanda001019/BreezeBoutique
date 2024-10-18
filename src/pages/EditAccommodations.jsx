// EditAccommodation.js
import React, { useEffect, useState } from 'react';
import { db } from './Firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useParams, useNavigate } from 'react-router-dom';

const EditAccommodation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [accommodation, setAccommodation] = useState({
    name: '',
    price: '',
    address: '',
    imageUrl: '',
  });

  useEffect(() => {
    const fetchAccommodation = async () => {
      const accommodationRef = doc(db, 'accommodations', id);
      const accommodationDoc = await getDoc(accommodationRef);
      if (accommodationDoc.exists()) {
        setAccommodation(accommodationDoc.data());
      } else {
        console.log("No such document!");
      }
    };

    fetchAccommodation();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccommodation((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const accommodationRef = doc(db, 'accommodations', id);
    await updateDoc(accommodationRef, accommodation);
    navigate.push('/view-manage-accommodations'); // Navigate back after editing
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Edit Accommodation</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium">Accommodation Name</label>
          <input
            type="text"
            name="name"
            value={accommodation.name}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Price</label>
          <input
            type="text"
            name="price"
            value={accommodation.price}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Address</label>
          <input
            type="text"
            name="address"
            value={accommodation.address}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Update Accommodation</button>
      </form>
    </div>
  );
};

export default EditAccommodation;
