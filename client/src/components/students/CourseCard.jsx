import React, { useContext } from 'react';
import { assets } from '../../assets/assets';
import { AppContext } from '../../context/AppContext';
import { useUser } from '@clerk/clerk-react';

const CourseCard = ({ course }) => {
  const { currency } = useContext(AppContext);
  const { user } = useUser();

  // ✅ Calculate discounted price
  const discountedPrice = (
    course.courseprice - (course.discount * course.courseprice) / 100
  ).toFixed(2);

  // ✅ Calculate average rating
  const getAvgRating = () => {
    if (!Array.isArray(course.courseRating) || course.courseRating.length === 0) return 0;

    const validRatings = course.courseRating.filter(r => typeof r.rating === 'number');
    if (validRatings.length === 0) return 0;

    const total = validRatings.reduce((sum, r) => sum + r.rating, 0);
    return (total / validRatings.length).toFixed(1);
  };

  const avgRating = getAvgRating();
  const totalRatings = course.courseRating?.length || 0;

  const handleClick = () => {
    if (user) {
      scrollTo(0, 0);
      window.location.href = `/course/${course._id}`;
    } else {
      alert("Please login to access this course.");
    }
  };

  return (
    <>
      <style>{`
        .course-card {
          background-color: #ffffff;
          border-radius: 12px;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.05);
          overflow: hidden;
          transition: transform 0.2s ease, box-shadow 0.3s ease;
          cursor: pointer;
          text-align: left;
        }

        .course-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }

        .course-card img {
          width: 100%;
          height: 180px;
          object-fit: cover;
        }

        .course-info {
          padding: 16px;
        }

        .course-info h3 {
          font-size: 1.25rem;
          color: #1e293b;
          margin-bottom: 8px;
          font-weight: 600;
        }

        .course-info p {
          font-size: 0.95rem;
          color: #6b7280;
          margin-bottom: 6px;
        }

        .rating {
          display: flex;
          align-items: center;
          gap: 8px;
          margin: 12px 0;
        }

        .stars {
          display: flex;
          gap: 4px;
        }

        .stars img {
          width: 16px;
          height: 16px;
        }

        .course-info > p:last-child {
          font-weight: bold;
          color: #2563eb;
          font-size: 1.1rem;
          margin-top: 10px;
        }
      `}</style>

      <div className="course-card" onClick={handleClick}>
        <img src={course.courseThumbnail} alt="Course Thumbnail" />

        <div className="course-info">
          <h3>{course.courseTitle}</h3>
          <p>{course.educator?.name || "Aditya Educator"}</p>

          <div className="rating">
            <p>{avgRating}</p>
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <img
                  key={i}
                  src={i < Math.round(avgRating) ? assets.star : assets.star_blank}
                  alt="star"
                />
              ))}
            </div>
            <p>({totalRatings})</p>
          </div>

          <p>
            {currency}
            {discountedPrice}
          </p>
        </div>
      </div>
    </>
  );
};

export default CourseCard;
