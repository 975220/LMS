import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import Loading from '../../components/students/Loading';
import { assets } from '../../assets/assets';
import Footer from '../../components/students/Footer';
import humanizeDuration from 'humanize-duration';
import YouTube from 'react-youtube';

const CourseDetails = () => {
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [openSection, setOpenSection] = useState({});
  const [playerData, setPlayerData] = useState(null);

  const {
    allCourses,
    calculateRating,
    calculateTotalLectures,
    calculateCourseDuration,
    calculateChapterTime,
    currency,
  } = useContext(AppContext);

  useEffect(() => {
    if (allCourses.length > 0) {
      const findCourse = allCourses.find((course) => course._id === id);
      setCourseData(findCourse);
    }
  }, [allCourses, id]);

  const toggleSection = (index) => {
    setOpenSection((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const calculateDiscountPrice = (price, discount) => {
    return (price - (discount * price) / 100).toFixed(2);
  };

  if (!courseData || !courseData.courseContent) return <Loading />;

  return (
    <>
      <div className="course-details-container">
        {/* Left Column */}
        <div className="left-column">
          <h1 className="course-title">{courseData.courseTitle}</h1>
          <p
            className="course-short-desc"
            dangerouslySetInnerHTML={{ __html: courseData.courseDescription.slice(0, 200) }}
          />

          {/* Rating */}
          <div className="rating-section">
            <div className="rating-top">
              <p>{calculateRating(courseData).toFixed(1)}</p> 
              <div className="rating-stars">
                {[...Array(5)].map((_, i) => (
                  <img
                    key={i}
                    src={
                      i < Math.round(calculateRating(courseData))
                        ? assets.star
                        : assets.star_blank
                    }
                    alt="star"
                    className="star-icon"
                  />
                ))}
              </div>
              <p>
                ({courseData.courseRatings.length}{' '}
                {courseData.courseRatings.length > 1 ? 'Reviews' : 'Rating'})
              </p>
            </div>
            <p>
              {courseData.enrolledStudents.length}{' '}
              {courseData.enrolledStudents.length > 1 ? 'Students' : 'Student'}
            </p>
          </div>

          <p className="course-instructor">
            Course by <span className="bold">Divyansh Kaurav</span>
          </p>

          {/* Course Structure */}
          <div>
            <h2 className="section-heading">Course Structure</h2>
            {courseData.courseContent.map((chapter, index) => (
              <div key={chapter.chapterId} className="chapter-box">
                <div
                  onClick={() => toggleSection(index)}
                  className="chapter-header"
                >
                  <div className="chapter-title-row">
                    <img
                      className={`arrow-icon ${openSection[index] ? 'rotate' : ''}`}
                      src={assets.down_arrow_icon}
                      alt="arrow icon"
                    />
                    <p className="bold">{chapter.chapterTitle}</p>
                  </div>
                  <p>
                    {chapter.chapterContent.length} Lectures -{' '}
                    {calculateChapterTime(chapter)}
                  </p>
                </div>
                {openSection[index] && (
                  <ul className="lecture-list">
                    {chapter.chapterContent.map((lecture) => (
                      <li key={lecture.lectureId} className="lecture-item">
                        <img
                          src={assets.play_icon}
                          alt="play icon"
                          className="play-icon"
                        />
                        <div>
                          <p className="bold">{lecture.lectureTitle}</p>
                          <div className="lecture-info">
                            {lecture.isPreviewFree && (
                              <p
                                className="preview-link"
                                onClick={() =>
                                  setPlayerData({
                                    videoId: lecture.lectureUrl.split('/').pop(),
                                  })
                                }
                              >
                                Preview
                              </p>
                            )}
                            <p>
                              {humanizeDuration(lecture.lectureDuration * 60000, {
                                units: ['h', 'm'],
                                round: true,
                              })}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* Full Description */}
          <div className="full-description">
            <h3 className="section-heading">Course Description</h3>
            <div
              dangerouslySetInnerHTML={{ __html: courseData.courseDescription }}
              className="prose"
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="right-column">
          {playerData ? (
            <YouTube
              videoId={playerData.videoId}
              opts={{ playerVars: { autoplay: 1 } }}
              iframeClassName="video-frame"
            />  
          ) : (
            <img
              src={courseData.courseThumbnail}
              alt="Course Thumbnail"
              className="thumbnail"
            />
          )}

          <div className="time-offer">
            <img
              className="icon"
              src={assets.time_left_clock_icon}
              alt="Time left"
            />
            <p>
              <span>5 days</span> left at this price!
            </p>
          </div>

          <div className="price-info">
            <p className="discounted-price">
              {currency}
              {calculateDiscountPrice(courseData.coursePrice, courseData.discount)}
            </p>
            <p className="original-price">
              {currency}
              {courseData.coursePrice}
            </p>
            <p className="discount-text">{courseData.discount}% off</p>
          </div>

          <div className="course-meta">
            <div className="meta-row">
              <img src={assets.star} className="icon" alt="rating" />
              <p>{calculateRating(courseData).toFixed(1)} Rating</p>
            </div>
            <div className="meta-row">
              <img src={assets.time_clock_icon} className="icon" alt="duration" />
              <p>{calculateCourseDuration(courseData)}</p>
            </div>
            <div className="meta-row">
              <img src={assets.lesson_icon} className="icon" alt="lessons" />
              <p>{calculateTotalLectures(courseData)} Lessons</p>
            </div>
          </div>

          <button className="enroll-btn"> Enroll Now</button>

          <div className="course-features">
            <p className="bold mb-2">What's in the course?</p>
            <ul>
              <li>Lifetime access & updates</li>
              <li>Hands-on project guidance</li>
              <li>Downloadable resources</li>
              <li>Quizzes for revision</li>
              <li>Completion certificate</li>
            </ul>
          </div>
        </div>
      </div>

      <Footer />

      {/* INTERNAL CSS */}
  <style>
{`
  :root {
    --primary: #2563eb;
    --primary-dark: #1d4ed8;
    --accent: #9333ea;
    --bg-light: #f3f4f6;
    --bg-dark: #ffffff;
    --text-dark: #1f2937;
    --text-light: #6b7280;
    --success: #16a34a;
    --danger: #dc2626;
  }

  .course-details-container {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background: linear-gradient(145deg, #f9fafb, #e5e7eb);
    min-height: 100vh;
  }

  @media (min-width: 768px) {
    .course-details-container {
      flex-direction: row;
    }
  }

  .left-column {
    flex: 1;
    background: var(--bg-dark);
    border-radius: 1.25rem;
    padding: 2rem;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.05);
    backdrop-filter: blur(10px);
    animation: fadeInUp 0.6s ease forwards;
  }

  .right-column {
    width: 100%;
  }

  @media (min-width: 768px) {
    .right-column {
      width: 33%;
    }
  }

  .course-title {
    font-size: 2.25rem;
    font-weight: 800;
    margin-bottom: 1rem;
    color: var(--text-dark);
  }

  .course-short-desc {
    font-size: 1rem;
    color: var(--text-light);
    margin-bottom: 1rem;
  }

  .rating-section {
    margin-bottom: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .rating-top {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .rating-stars {
    display: flex;
    gap: 0.2rem;
  }

  .star-icon {
    width: 1rem;
    transition: transform 0.3s;
  }

  .star-icon:hover {
    transform: scale(1.2);
  }

  .chapter-box {
    margin-bottom: 1.5rem;
    border: 1px solid #e5e7eb;
    border-radius: 1rem;
    padding: 1rem;
    background: #f9fafb;
    transition: transform 0.3s, box-shadow 0.3s;
  }

  .chapter-box:hover {
    transform: scale(1.01);
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.08);
  }

  .chapter-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
  }

  .chapter-title-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .arrow-icon {
    width: 1rem;
    transition: transform 0.3s;
  }

  .rotate {
    transform: rotate(180deg);
  }

  .lecture-item {
    display: flex;
    gap: 0.75rem;
    margin-top: 0.75rem;
    padding-top: 0.5rem;
    border-top: 1px solid #e5e7eb;
  }

  .play-icon {
    width: 1.2rem;
    margin-top: 0.2rem;
  }

  .lecture-info {
    font-size: 0.875rem;
    color: var(--text-light);
    display: flex;
    gap: 1rem;
  }

  .preview-link {
    color: var(--primary);
    font-weight: 600;
    cursor: pointer;
  }

  .preview-link:hover {
    text-decoration: underline;
  }

  .section-heading {
    font-size: 1.5rem;
    font-weight: 700;
    margin-top: 2rem;
    margin-bottom: 0.75rem;
    color: var(--text-dark);
  }

  .full-description {
    color: var(--text-dark);
    line-height: 1.8;
  }

  .thumbnail, .video-frame {
    width: 100%;
    aspect-ratio: 16/9;
    object-fit: cover;
    border-radius: 1rem;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  }

  .time-offer {
    margin-top: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--danger);
    font-weight: 500;
    animation: pulse 2s infinite;
  }

  .price-info {
    margin-top: 1rem;
  }

  .discounted-price {
    font-size: 2rem;
    color: var(--success);
    font-weight: 800;
  }

  .original-price {
    text-decoration: line-through;
    color: #9ca3af;
  }

  .discount-text {
    font-size: 0.9rem;
    color: var(--danger);
    font-weight: 600;
  }

  .course-meta {
    margin-top: 1.5rem;
    font-size: 0.9rem;
    color: var(--text-light);
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }

  .meta-row {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }

  .enroll-btn {
    margin-top: 2rem;
    width: 100%;
    background: linear-gradient(to right, var(--primary), var(--accent));
    color: white;
    padding: 0.75rem;
    border-radius: 0.75rem;
    font-size: 1.1rem;
    font-weight: 600;
    border: none;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .enroll-btn:hover {
    transform: scale(1.03);
    box-shadow: 0 10px 20px rgba(147, 51, 234, 0.25);
  }

  .course-features {
    margin-top: 2rem;
    color: var(--text-light);
    font-size: 0.9rem;
  }

  .course-features ul {
    list-style: disc;
    padding-left: 1.5rem;
    margin-top: 0.5rem;
  }

  .course-features li {
    margin-bottom: 0.3rem;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.6;
    }
  }
`}
</style>


    </>
  );
};

export default CourseDetails;
