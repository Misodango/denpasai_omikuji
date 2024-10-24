import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDatabase, ref, get } from 'firebase/database';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

function OmikujiViewer() {
  const { omikujiId } = useParams();
  const [omikujiData, setOmikujiData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOmikuji = async () => {
      try {
        const docRef = doc(db, 'omikuji', omikujiId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setOmikujiData(docSnap.data());
        } else {
          setError('おみくじが見つかりませんでした。');
        }
      } catch (error) {
        setError('エラーが発生しました。');
        console.error('Error fetching omikuji:', error);
      }
    };

    fetchOmikuji();
  }, [omikujiId]);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!omikujiData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="omikuji-viewer">
      <div className="omikuji-container">
        {/* 既存のおみくじ表示コードを再利用 */}
        <div className="omikuji-paper">
          <div className="omikuji-header">
            <h1 className="omikuji-title">TE3 AIおみくじ</h1>
          </div>
          <div className="omikuji-result">
            <h2>{omikujiData['運勢']}</h2>
            <p>{omikujiData['助言']}</p>
          </div>
          <div className="omikuji-content">
            <div className="omikuji-column">
              {['旅立', '学問', '病気', '開運物', '開運色'].map((key) => (
                <div key={key} className="category">
                  <span className="category-name">{key}</span>
                  <span className="category-fortune">{omikujiData[key]}</span>
                </div>
              ))}
            </div>
            <div className="omikuji-column">
              {['願事', '恋愛', '待人', '商売'].map((key) => (
                <div key={key} className="category">
                  <span className="category-name">{key}</span>
                  <span className="category-fortune">{omikujiData[key]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OmikujiViewer;
