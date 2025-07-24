import React, { useEffect, useRef, useState } from 'react';
import uniqid from 'uniqid';
import Quill from 'quill';
import { assets } from '../../assets/assets';

const AddCourse = () => {
  const quillRef = useRef(null);
  const editorRef = useRef(null);

  const [courseTitle, setCourseTitle] = useState('');
  const [coursePrice, setCoursePrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [image, setImage] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [currentChapterId, setCurrentChapterId] = useState(null);

  const [lectureDetails, setLectureDetails] = useState({
    lectureTitle: '',
    lectureDuration: '',
    lectureUrl: '',
    isPreviewFree: false,
  });

  const handleChapter = (action, chapterId = null) => {
    if (action === 'add') {
      const title = prompt('Enter Chapter Name:');
      if (title) {
        const newChapter = {
          chapterId: uniqid(),
          chapterTitle: title,
          chapterContent: [],
          collapsed: false,
          chapterOrder: chapters.length > 0 ? chapters.slice(-1)[0].chapterOrder + 1 : 1,
        };
        setChapters([...chapters, newChapter]);
      }
    } else if (action === 'remove') {
      setChapters(chapters.filter((chapter) => chapter.chapterId !== chapterId));
    } else if (action === 'toggle') {
      setChapters(
        chapters.map((chapter) =>
          chapter.chapterId === chapterId ? { ...chapter, collapsed: !chapter.collapsed } : chapter
        )
      );
    }
  };

  const handleLecture = (action, chapterId, lectureIndex = null) => {
    if (action === 'add') {
      setCurrentChapterId(chapterId);
      setShowPopup(true);
    } else if (action === 'remove') {
      setChapters(
        chapters.map((chapter) => {
          if (chapter.chapterId === chapterId) {
            const updatedContent = [...chapter.chapterContent];
            updatedContent.splice(lectureIndex, 1);
            return { ...chapter, chapterContent: updatedContent };
          }
          return chapter;
        })
      );
    }
  };

  const addLecture = () => {
    setChapters(
      chapters.map((chapter) => {
        if (chapter.chapterId === currentChapterId) {
          const newLecture = {
            ...lectureDetails,
            lectureOrder:
              chapter.chapterContent.length > 0
                ? chapter.chapterContent.slice(-1)[0].lectureOrder + 1
                : 1,
            lectureId: uniqid(),
          };
          return {
            ...chapter,
            chapterContent: [...chapter.chapterContent, newLecture],
          };
        }
        return chapter;
      })
    );
    setShowPopup(false);
    setLectureDetails({
      lectureTitle: '',
      lectureDuration: '',
      lectureUrl: '',
      isPreviewFree: false,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submit Course:', { courseTitle, coursePrice, discount, chapters });
  };

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
      });
    }
  }, []);

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label>Course Title</label>
          <input
            type="text"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label>Course Description</label>
          <div ref={editorRef} style={styles.quillEditor}></div>
        </div>

        <div style={styles.flexRow}>
          <div style={styles.inputGroup}>
            <label>Course Price</label>
            <input
              type="number"
              value={coursePrice}
              onChange={(e) => setCoursePrice(Number(e.target.value))}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label>Discount (%)</label>
            <input
              type="number"
              value={discount}
              onChange={(e) => setDiscount(Number(e.target.value))}
              min={0}
              max={100}
              required
              style={styles.input}
            />
          </div>
        </div>

        <div style={styles.inputGroup}>
          <label>Course Thumbnail</label>
          <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
          {image && <img src={URL.createObjectURL(image)} alt="Preview" style={styles.thumbnail} />}
        </div>

        <div>
          {chapters.map((chapter, chapterIndex) => (
            <div key={chapterIndex} style={styles.chapter}>
              <div style={styles.chapterHeader}>
                <span
                  onClick={() => handleChapter('toggle', chapter.chapterId)}
                  style={styles.iconButton}
                  title="Toggle Collapse"
                >
                  ▶
                </span>
                <strong>
                  {chapterIndex + 1}. {chapter.chapterTitle}
                </strong>
                <span>{chapter.chapterContent.length} Lectures</span>
                <span
                  onClick={() => handleChapter('remove', chapter.chapterId)}
                  style={styles.iconButton}
                  title="Delete Chapter"
                >
                  🗑️
                </span>
              </div>

              {!chapter.collapsed && (
                <div style={styles.lectureList}>
                  {chapter.chapterContent.map((lecture, lectureIndex) => (
                    <div key={lectureIndex} style={styles.lectureItem}>
                      <span>
                        {lectureIndex + 1}. {lecture.lectureTitle} - {lecture.lectureDuration} mins -{' '}
                        <a href={lecture.lectureUrl} target="_blank" rel="noreferrer">
                          Link
                        </a>{' '}
                        - {lecture.isPreviewFree ? 'Free Preview' : 'Paid'}
                      </span>
                      <span
                        onClick={() => handleLecture('remove', chapter.chapterId, lectureIndex)}
                        style={styles.iconButton}
                        title="Remove Lecture"
                      >
                        ❌
                      </span>
                    </div>
                  ))}
                  <span
                    onClick={() => handleLecture('add', chapter.chapterId)}
                    style={styles.iconButton}
                  >
                    ➕ Add Lecture
                  </span>
                </div>
              )}
            </div>
          ))}
          <span onClick={() => handleChapter('add')} style={styles.iconButton}>
            ➕ Add Chapter
          </span>
        </div>

        {showPopup && (
          <div style={styles.popup}>
            <h2>Add Lecture</h2>
            <div style={styles.inputGroup}>
              <label>Lecture Title</label>
              <input
                type="text"
                value={lectureDetails.lectureTitle}
                onChange={(e) =>
                  setLectureDetails({ ...lectureDetails, lectureTitle: e.target.value })
                }
                style={styles.input}
              />
            </div>

            <div style={styles.inputGroup}>
              <label>Duration (minutes)</label>
              <input
                type="text"
                value={lectureDetails.lectureDuration}
                onChange={(e) =>
                  setLectureDetails({ ...lectureDetails, lectureDuration: e.target.value })
                }
                style={styles.input}
              />
            </div>

            <div style={styles.inputGroup}>
              <label>Lecture URL</label>
              <input
                type="text"
                value={lectureDetails.lectureUrl}
                onChange={(e) =>
                  setLectureDetails({ ...lectureDetails, lectureUrl: e.target.value })
                }
                style={styles.input}
              />
            </div>

            <div style={styles.inputGroup}>
              <label>Is Preview Free?</label>
              <input
                type="checkbox"
                checked={lectureDetails.isPreviewFree}
                onChange={(e) =>
                  setLectureDetails({ ...lectureDetails, isPreviewFree: e.target.checked })
                }
              />
            </div>

            <div>
              <button onClick={addLecture} type="button" style={styles.iconButton}>
                ✅ Add
              </button>
              <button onClick={() => setShowPopup(false)} type="button" style={styles.iconButton}>
                ❌ Close
              </button>
            </div>
          </div>
        )}

        <button type="submit" style={styles.submitButton}>
          Submit Course
        </button>
      </form>
    </div>
  );
};

export default AddCourse;

// ---------------- Internal Styles ----------------
const styles = {
  container: {
    padding: '2rem',
    fontFamily: 'Arial, sans-serif',
    maxWidth: '800px',
    margin: 'auto',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '6px',
    border: '1px solid #ccc',
  },
  thumbnail: {
    marginTop: '10px',
    width: '100px',
    height: 'auto',
  },
  flexRow: {
    display: 'flex',
    gap: '2rem',
  },
  chapter: {
    marginBottom: '1rem',
    padding: '1rem',
    border: '1px solid #ccc',
    borderRadius: '6px',
    backgroundColor: '#f9f9f9',
  },
  chapterHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '1rem',
    fontSize: '18px',
  },
  lectureList: {
    marginTop: '10px',
    paddingLeft: '1rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  lectureItem: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '10px',
    alignItems: 'center',
  },
  iconButton: {
    fontSize: '20px',
    cursor: 'pointer',
    padding: '5px 12px',
    backgroundColor: '#eee',
    borderRadius: '6px',
    transition: '0.2s',
    border: 'none',
  },
  quillEditor: {
    height: '150px',
    backgroundColor: '#fff',
  },
  popup: {
    backgroundColor: '#fff',
    padding: '1.5rem',
    border: '1px solid #ccc',
    borderRadius: '6px',
    marginTop: '1rem',
  },
  submitButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '10px',
    borderRadius: '6px',
    fontSize: '16px',
    border: 'none',
    cursor: 'pointer',
  },
};
