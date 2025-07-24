import React, { useState } from 'react';
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';

const Searchbar = ({ data }) => {
  const navigate = useNavigate();
  const [input, setInput] = useState(data ? data : '');

  const onSearchHandler = (e) => {
    e.preventDefault();
    navigate('/course-list/' + input);
  };

  return (
    <>
      <style>
        {`
          .search-form {
            display: flex;
            align-items: center;
            justify-content: center;
            background: white;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            border-radius: 10px;
            padding: 20px;
            max-width: 900px;
            margin: 32px auto 0 auto;
          }

          .search-icon {
            width: 44px;
            padding-right: 14px;
          }

          .search-input {
            border: 1px solid #d1d5db;
            border-radius: 8px;
            padding: 12px 16px;
            flex: 1;
            font-size: 1.1rem;
            outline: none;
          }

          .search-button {
            background-color: #2563eb;
            color: white;
            border: none;
            border-radius: 8px;
            padding: 12px 20px;
            margin-left: 10px;
            cursor: pointer;
            font-size: 1.05rem;
            font-weight: 500;
          }

          .search-button:hover {
            background-color: #1d4ed8;
          }
        `}
      </style>

      <form onSubmit={onSearchHandler} className="search-form">
        <img src={assets.search_icon} alt="search_icon" className="search-icon" />
        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          type="text"
          placeholder="Search for Courses..."
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>
    </>
  );
};

export default Searchbar;
