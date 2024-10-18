import React, { useEffect, useState } from 'react';
import { db, auth } from './Firebase'; // Ensure correct Firebase setup
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';

function Favourites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the user's favorite accommodations from Firestore
    const fetchFavorites = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const favoritesCollection = collection(db, 'users', user.uid, 'favorites');
          const favoritesSnapshot = await getDocs(favoritesCollection);
          const favoriteList = favoritesSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setFavorites(favoriteList);
        }
      } catch (error) {
        console.error("Error fetching favorites:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const handleRemoveFavorite = async (id) => {
    const user = auth.currentUser;
    if (user) {
      try {
        const favoriteDocRef = doc(db, 'users', user.uid, 'favorites', id);
        await deleteDoc(favoriteDocRef);
        setFavorites(favorites.filter((fav) => fav.id !== id));
      } catch (error) {
        console.error("Error removing favorite:", error);
      }
    }
  };

  const handleReadMore = (id) => {
    navigate(`/accommodation/${id}`);
  };

  if (loading) {
    return <p>Loading favorites...</p>;
  }

  if (favorites.length === 0) {
    return <p>No favorite accommodations found.</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Your Favorite Accommodations</h2>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {favorites.map((accommodation) => (
          <div key={accommodation.id} className="border p-4 rounded-lg shadow-md">
            <img
              src={accommodation.imageUrl}
              alt={accommodation.name}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold">{accommodation.name}</h3>
            <p className="text-sm text-gray-500 mb-1">Price: {accommodation.price ? `R${accommodation.price}` : 'Not available'}</p>
            <p className="text-sm text-gray-500 mb-1">Address: {accommodation.address || 'Not available'}</p>
            <p>{accommodation.description}</p>
            <p className="text-sm text-gray-500">
              Amenities: {accommodation.amenities ? accommodation.amenities.join(', ') : 'Not available'}
            </p>

            {/* Remove from favorites */}
            <button
              onClick={() => handleRemoveFavorite(accommodation.id)}
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Remove from Favorites <FaHeart className="inline-block ml-2 text-white" />
            </button>

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

export default Favourites;
