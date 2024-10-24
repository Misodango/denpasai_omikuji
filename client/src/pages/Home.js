import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-container">
      <h1>TE3 AIおみくじ</h1>
      <div className="navigation-links">
        <Link to="/generate" className="nav-button">
          おみくじを引く（現地でのみ利用可能）
        </Link>
        <div className="view-section">
          <h2>過去のおみくじを見る</h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            const id = e.target.omikujiId.value;
            window.location.href = `/view/${id}`;
          }}>
            <input
              type="text"
              name="omikujiId"
              placeholder="おみくじIDを入力"
              required
            />
            <button type="submit">表示</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Home;
