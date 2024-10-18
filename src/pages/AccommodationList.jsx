import React, { useEffect, useState } from 'react';
import { db, auth } from './Firebase'; // Adjust this path based on your Firebase configuration
import { collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { FaHeart, FaRegHeart } from 'react-icons/fa'; // Heart icons for favorite

function AccommodationsList() {
  const [accommodations, setAccommodations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

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

    // Fetch user's favorite accommodations
    const fetchFavorites = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const favoritesCollection = collection(db, 'users', user.uid, 'favorites');
          const favoritesSnapshot = await getDocs(favoritesCollection);
          const favoriteList = favoritesSnapshot.docs.map((doc) => doc.id);
          setFavorites(favoriteList);
        }
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchAccommodations();
    fetchFavorites();
  }, []);

  const handleReadMore = (id) => {
    navigate(`/accommodation/${id}`);
  };

  const toggleFavorite = async (accommodation) => {
    const user = auth.currentUser;
    if (!user) {
      alert('You need to log in to save favorites');
      return;
    }

    const favoriteDocRef = doc(db, 'users', user.uid, 'favorites', accommodation.id);

    if (favorites.includes(accommodation.id)) {
      // If already a favorite, remove from Firestore
      await deleteDoc(favoriteDocRef);
      setFavorites(favorites.filter((favId) => favId !== accommodation.id));
    } else {
      // If not a favorite, add to Firestore
      await setDoc(favoriteDocRef, {
        id: accommodation.id,
        name: accommodation.name,
        imageUrl: accommodation.imageUrl,
      });
      setFavorites([...favorites, accommodation.id]);
    }
  };

  if (loading) {
    return <p>Loading accommodations...</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Available Accommodations</h2>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {accommodations.map((accommodation) => (
          <div key={accommodation.id} className="border p-4 rounded-lg shadow-md relative">
            <img
              src={accommodation.imageUrl}
              alt={accommodation.name}
              className="w-full h-40 object-cover rounded-md mb-4"
            />

            {/* Flex container for name and heart icon */}
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-semibold">{accommodation.name}</h3>
              <button
                onClick={() => toggleFavorite(accommodation)}
                className="text-red-500"
              >
                {favorites.includes(accommodation.id) ? (
                  <FaHeart className="text-2xl" />
                ) : (
                  <FaRegHeart className="text-2xl" />
                )}
              </button>
            </div>
            
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
