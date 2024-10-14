import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  console.log('App component rendering');
  const [omikujiData, setOmikujiData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/get-last-data');
        setOmikujiData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, []);

  if (!omikujiData) {
    console.log('Dat not loaded yet');
    return <div>Loading...</div>;
  }

  const secondColumnItems = ['旅立', '学問', '病気', '開運物', '開運色'];
  const firstColumnItems = ['願事', '恋愛', '待人', '商売'];

  return (
    <div className="omikuji-container">
      <div className="omikuji-header">
        <h1 className="omikuji-title">TE3 AIおみくじ</h1>
      </div>
      <div className="omikuji-paper">
        <div className="omikuji-result">
          <h2>{omikujiData['運勢']}</h2>
          <p>{omikujiData['助言']}</p>
        </div>
        <div className="omikuji-content">
          <div className="omikuji-column">
            {secondColumnItems.map(key => (
              <div key={key} className="category">
                <span className="category-name">{key}</span>
                <span className="category-fortune">{omikujiData[key]}</span>
              </div>
            ))}
          </div>
          <div className="omikuji-column">
            {firstColumnItems.map(key => (
              <div key={key} className="category">
                <span className="category-name">{key}</span>
                <span className="category-fortune">{omikujiData[key]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );


}

export default App;
