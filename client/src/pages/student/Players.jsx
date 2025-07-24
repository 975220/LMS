import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { useParams } from 'react-router-dom';
import { assets } from '../../assets/assets';
import humanizeDuration from 'humanize-duration';
import YouTube from 'react-youtube';
import Footer from '../../components/students/Footer';
import Rating from '../../components/students/Rating';

const Players = () => {
  const { enrolledCourses, calculateChapterTime } = useContext(AppContext);
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState(undefined);
  const [openSection, setOpenSection] = useState({});
  const [playerData, setPlayerData] = useState(null);
  const [completedLectures, setCompletedLectures] = useState([]);

  useEffect(() => {
    if (Array.isArray(enrolledCourses)) {
      const found = enrolledCourses.find(course => course._id == courseId);
      setCourseData(found || null);
    }
  }, [enrolledCourses, courseId]);

  const toggleSection = (index) => {
    setOpenSection((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const markLectureComplete = () => {
    if (playerData) {
      const key = `${playerData.chapter}-${playerData.lecture}`;
      setCompletedLectures((prev) => [...new Set([...prev, key])]);
    }
  };

  const isLectureCompleted = (chapter, lecture) => {
    return completedLectures.includes(`${chapter}-${lecture}`);
  };

  if (courseData === undefined) return <div style={{ padding: '2rem' }}>Loading course...</div>;
  if (courseData === null) return <div style={{ padding: '2rem', color: 'red' }}>No course found with this ID.</div>;

  return (
    <>
      <style>{`
        .player-container {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          padding: 2rem;
        }

        @media (min-width: 768px) {
          .player-container {
            flex-direction: row;
            align-items: flex-start;
            gap: 2rem;
          }

          .left-pane,
          .right-pane {
            flex: 1;
          }
        }

        .left-pane h2 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: #1f2937;
        }

        .chapter-box {
          background-color: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 1rem;
          margin-bottom: 1rem;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.03);
        }

        .chapter-header {
          display: flex;
          justify-content: space-between;
          cursor: pointer;
          font-weight: 500;
          color: #111827;
        }

        .chapter-title-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .arrow-icon {
          width: 1rem;
          transition: transform 0.3s ease;
        }

        .arrow-icon.rotate {
          transform: rotate(180deg);
        }

        .lecture-list {
          margin-top: 1rem;
          padding-left: 1.5rem;
        }

        .lecture-item {
          display: flex;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
          align-items: flex-start;
          border-left: 2px solid #e5e7eb;
          padding-left: 0.75rem;
        }

        .play-icon {
          width: 1.25rem;
          margin-top: 0.25rem;
        }

        .lecture-info {
          font-size: 0.875rem;
          color: #6b7280;
          display: flex;
          gap: 1rem;
          margin-top: 0.25rem;
        }

        .preview-link {
          color: #2563eb;
          cursor: pointer;
          font-weight: 500;
        }

        .video-frame {
          width: 100%;
          aspect-ratio: 16 / 9;
          border-radius: 8px;
          overflow: hidden;
        }

        .video-description {
          font-weight: 500;
          margin-top: 0.5rem;
          color: #374151;
        }

        .complete-btn {
          margin-top: 0.75rem;
          padding: 0.5rem 1rem;
          background-color: #10b981;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
          transition: background-color 0.2s ease;
        }

        .complete-btn:hover {
          background-color: #059669;
        }

        .completed {
          background-color: #16a34a;
        }

        .course-thumb {
          width: 100%;
          aspect-ratio: 16 / 9;
          border-radius: 8px;
          object-fit: cover;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        }

        .rating-row {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-top: 2rem;
          font-size: 1rem;
          font-weight: 500;
          color: #111827;
        }
      `}</style>

      <div className="player-container">
        <div className="left-pane">
          <h2>Course Structure</h2>
          {courseData.courseContent.map((chapter, index) => (
            <div key={chapter.chapterId} className="chapter-box">
              <div onClick={() => toggleSection(index)} className="chapter-header">
                <div className="chapter-title-row">
                  <img
                    className={`arrow-icon ${openSection[index] ? 'rotate' : ''}`}
                    src={assets.down_arrow_icon}
                    alt="arrow"
                  />
                  <p>{chapter.chapterTitle}</p>
                </div>
                <p>{chapter.chapterContent.length} Lectures - {calculateChapterTime(chapter)}</p>
              </div>

              {openSection[index] && (
                <ul className="lecture-list">
                  {chapter.chapterContent.map((lecture, lecIndex) => {
                    const isCompleted = isLectureCompleted(index + 1, lecIndex + 1);
                    return (
                      <li key={lecture.lectureId} className="lecture-item">
                        <img
                          src={isCompleted ? assets.blue_tick_icon : assets.play_icon}
                          alt="icon"
                          className="play-icon"
                        />
                        <div>
                          <p className="font-medium">{lecture.lectureTitle}</p>
                          <div className="lecture-info">
                            {lecture.lectureUrl && (
                              <p
                                className="preview-link"
                                onClick={() =>
                                  setPlayerData({
                                    ...lecture,
                                    chapter: index + 1,
                                    lecture: lecIndex + 1,
                                  })
                                }
                              >
                                Watch
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
                    );
                  })}
                </ul>
              )}
            </div>
          ))}

          <div className="rating-row">
            <h1>Rate this course:</h1>
            <Rating intinalRating={0} />
          </div>
        </div>

        <div className="right-pane">
          {playerData ? (
            <>
              <YouTube
                videoId={playerData.lectureUrl.split('/').pop()}
                iframeClassName="video-frame"
              />
              <p className="video-description">
                {playerData.chapter}.{playerData.lecture} — {playerData.lectureTitle}
              </p>
              <button
                className={`complete-btn ${isLectureCompleted(playerData.chapter, playerData.lecture) ? 'completed' : ''}`}
                onClick={markLectureComplete}
              >
                {isLectureCompleted(playerData.chapter, playerData.lecture) ? 'Completed' : 'Mark Complete'}
              </button>
            </>
          ) : (
            <img
              src={courseData.courseThumbnail}
              alt="Course Thumbnail"
              className="course-thumb"
            />
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Players;
