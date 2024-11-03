import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addSearchHistory } from '../redux/actions';
import Banner from './Banner'; // Import Banner

const Home = () => {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();
  const username = localStorage.getItem('username');

  useEffect(() => {
    fetchResults();
  }, [page, query]);

  const fetchResults = async () => {
    const response = await axios.get(`https://hn.algolia.com/api/v1/search`, {
      params: { query, page },
    });
    setResults(response.data.hits);
  };

  const handleSearch = () => {
    dispatch(addSearchHistory(query));
    fetchResults();
  };

  return (
    <>
      <Banner /> {/* Add Banner at the top */}
      <div>
        <h2>Welcome, {username}</h2>
        <input
          type="text"
          placeholder="Search Hacker News"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>

        <ul>
          {results.map((item) => (
            <li key={item.objectID}>
              <a href={item.url} target="_blank" rel="noopener noreferrer">{item.title}</a>
            </li>
          ))}
        </ul>

        <button onClick={() => setPage(page > 0 ? page - 1 : 0)}>Previous</button>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </>
  );
};

export default Home;

