import axios from 'axios';
import React, { useState, useEffect } from 'react';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    axios.post('http://localhost:4000/images/filter', { fil: query }).then((res) => {
        setResults(res.data);
    });
  }, [query]);

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar..."
        className="border border-gray-300 p-2 rounded-lg"
        value={query}
        onChange={handleChange}
      />
      <div>
        {results.map((result) => (
          <div key={result._id} className="p-2">
            {/* Renderiza los resultados aquí */}
            {result.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
