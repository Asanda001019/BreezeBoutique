import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRating, setNote, submitFeedback } from '../features/rateUsSlice'; // Adjust import based on file structure
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const RateUs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigate
  const { rating, note, feedbackSubmitted } = useSelector((state) => state.rateUs);

  const handleRatingClick = (selectedRating) => {
    dispatch(setRating(selectedRating));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(submitFeedback());

    // Show thank you alert and navigate to home after a delay
    alert('Thank you for your feedback!'); // Show alert
    setTimeout(() => {
      navigate('/'); // Change this path to your home route
    }, 2000); // Delay navigation for 2 seconds (2000 milliseconds)
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Rate Us</h2>
      
      {/* Rating stars */}
      <div className="flex space-x-2 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            onClick={() => handleRatingClick(star)}
            xmlns="http://www.w3.org/2000/svg"
            fill={star <= rating ? 'gold' : 'none'}
            viewBox="0 0 24 24"
            stroke="currentColor"
            className={`w-10 h-10 cursor-pointer ${star <= rating ? 'text-yellow-500' : 'text-gray-400'}`}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 17.27l6.18 3.73-1.64-7.19 5.46-4.73-7.27-.62L12 2l-2.73 6.46-7.27.62 5.46 4.73-1.64 7.19L12 17.27z" />
          </svg>
        ))}
      </div>

      {/* Feedback text area */}
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full p-2 border border-gray-300 rounded mb-4"
          rows="5"
          placeholder="Leave your feedback here..."
          value={note}
          onChange={(e) => dispatch(setNote(e.target.value))}
          required
        />

        {/* Submit button */}
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Submit
        </button>
      </form>

      {/* Feedback submission confirmation */}
      {feedbackSubmitted && (
        <div className="mt-4 text-green-500 font-semibold">
          Thank you for your feedback!
        </div>
      )}
    </div>
  );
};

export default RateUs;
