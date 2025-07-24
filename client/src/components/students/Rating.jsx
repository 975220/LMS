import React, { useEffect, useState } from 'react';

const Rating = ({ intinalRating, onRate }) => {
  const [rating, setRating] = useState(intinalRating || 0);

  const handleRating = (value) => {
    setRating(value);
    if (onRate) onRate(value);
  };

  useEffect(() => {
    if (intinalRating) {
      setRating(intinalRating);
    }
  }, [intinalRating]);

  return (
    <>
      <style>{`
        .rating-container {
          display: flex;
          gap: 0.5rem;
        }

        .star {
          font-size: 1.75rem;
          color: #9ca3af; /* gray-400 */
          cursor: pointer;
          transition: color 0.3s;
        }

        .star.active {
          color: #f59e0b; /* amber-500 */
        }

        .star:hover {
          color: #fbbf24; /* amber-400 */
        }

        @media (min-width: 640px) {
          .star {
            font-size: 2rem;
          }
        }
      `}</style>

      <div className="rating-container">
        {Array.from({ length: 5 }, (_, index) => {
          const starValue = index + 1;
          return (
            <span
              key={index}
              className={`star ${starValue <= rating ? 'active' : ''}`}
              onClick={() => handleRating(starValue)}
            >
              &#9733;
            </span>
          );
        })}
      </div>
    </>
  );
};

export default Rating;
