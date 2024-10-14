import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
import omikujiBoxImage from './omikuji-box.png'; // 画像のインポート

function App() {
  const [omikujiData, setOmikujiData] = useState(null);
  const [animationKey, setAnimationKey] = useState(0);
  const [previousData, setPreviousData] = useState(null);
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/get-last-data');
        const newData = response.data;

        if (JSON.stringify(newData) !== JSON.stringify(previousData)) {
          setPreviousData(newData);
          setIsShaking(true);

          // Shake animation duration
          setTimeout(() => {
            setIsShaking(false);
            setOmikujiData(newData);
            setAnimationKey((prev) => prev + 1);
          }, 2000); // Adjust this value to match your shake animation duration
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [previousData]);

  const boxAnimation = {
    shake: {
      rotate: [-160, -165, -160, -155, -160, -165],
      transition: {
        duration: 0.5,
        repeat: 2,
        ease: "easeInOut",
      },
    },
  };

  const omikujiAnimation = {
    initial: { y: -1000, opacity: 0, rotate: 5 },
    animate: {
      y: [-1000, -100, -80, -90, -85, 0],
      opacity: [0, 1],
      rotate: [-5, 5, -3, 2, 0],
      transition: {
        y: {
          duration: 2,
          times: [0, 0.6, 0.7, 0.8, 0.9, 1],
          ease: "easeOut"
        },
        opacity: {
          duration: 0.5,
          delay: 0.5
        },
        rotate: {
          duration: 2,
          yoyo: Infinity,
          ease: "easeInOut"
        }
      }
    },
    exit: { y: 1000, opacity: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="app-wrapper">
      <AnimatePresence mode="wait">
        {isShaking ? (
          <motion.div
            key="box"
            variants={boxAnimation}
            animate="shake"
            className="omikuji-box"
          >
            <img src={omikujiBoxImage} alt="おみくじ箱" className="omikuji-box-image" />
          </motion.div>

        ) : omikujiData ? (
          <motion.div
            key={animationKey}
            variants={omikujiAnimation}
            initial="initial"
            animate="animate"
            exit="exit"
            className="omikuji-container"
          >
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
          </motion.div>
        ) : (
          <div>Loading...</div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
