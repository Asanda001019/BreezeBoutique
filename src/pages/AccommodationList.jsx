import React, { useEffect, useState } from 'react';
import { db } from './Firebase'; // Adjust this path based on your Firebase configuration location
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function AccommodationsList() {
  const [accommodations, setAccommodations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize navigation

  useEffect(() => {
    // Fetch accommodations from Firestore
    const fetchAccommodations = async () => {
      try {
        const accommodationsCollection = collection(db, 'accommodations'); // Ensure collection name matches Firestore
        const accommodationsSnapshot = await getDocs(accommodationsCollection);
        const accommodationsList = accommodationsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAccommodations(accommodationsList);
      } catch (error) {
        console.error("Error fetching accommodations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAccommodations();
  }, []);

  const handleReadMore = (id) => {
    // Navigate to the accommodation details page with the accommodation ID
    navigate(`/accommodation/${id}`);
  };
  

  if (loading) {
    return <p>Loading accommodations...</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Available Accommodations</h2>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {accommodations.map((accommodation) => (
          <div key={accommodation.id} className="border p-4 rounded-lg shadow-md">
            <img src={accommodation.imageUrl} alt={accommodation.name} className="w-full h-40 object-cover rounded-md mb-4" />
            <h3 className="text-xl font-semibold">{accommodation.name}</h3>
            <p className="text-sm text-gray-500 mb-1">Price: {accommodation.price ? `R${accommodation.price}` : 'Not available'}</p>
            <p className="text-sm text-gray-500 mb-1">Address: {accommodation.address || 'Not available'}</p>
            <p>{accommodation.description}</p>
            <p className="text-sm text-gray-500">
              Amenities: {accommodation.amenities ? accommodation.amenities.join(', ') : 'Not available'}
            </p>
            {/* Read More Button */}
            <button
              onClick={() => handleReadMore(accommodation.id)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Read More
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AccommodationsList;
