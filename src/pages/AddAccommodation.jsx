import React, { useState } from 'react';
import { db, storage } from './Firebase'; // import your Firebase configuration
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function AddAccommodation() {
  // State variables for form fields
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState('');
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate(); // Initialize navigate function

  // Reference to the Firebase collection
  const accommodationsRef = collection(db, 'accommodations');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Upload image to Firebase Storage
      let imageUrl = '';
      if (image) {
        const imageRef = ref(storage, `accommodations/${image.name}-${Date.now()}`);
        await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(imageRef);
      }

      // Add accommodation data to Firestore
      await addDoc(accommodationsRef, {
        name,
        imageUrl,
        price: parseFloat(price),
        address,
        createdAt: new Date(),
      });

      toast.success("Accommodation added successfully!");
      
      // Reset form fields
      setName('');
      setImage(null);
      setPrice('');
      setAddress('');

      // Navigate to View and Manage Accommodations page
      navigate('/view-manage-accommodations');

    } catch (error) {
      console.error("Error adding accommodation:", error);
      toast.error("Failed to add accommodation");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">Add New Accommodation</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Accommodation Name */}
        <div>
          <label className="block text-gray-600">Accommodation Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-gray-600">Image</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            accept="image/*"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-gray-600">Price per Night ($)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-gray-600">Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {isLoading ? "Adding..." : "Add Accommodation"}
        </button>
      </form>
    </div>
  );
}

export default AddAccommodation;
