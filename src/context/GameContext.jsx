// GameContext.jsx
import React, { useState, createContext, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ApiCall } from '../Utils';

const GameContext = createContext();
export const useGameContext = () => useContext(GameContext);

const GameProvider = ({ children }) => {
  const [allData, setAllData] = useState([]); 
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cardCount, setCardCount] = useState(4);

  useEffect(() => {
    ApiCall.get('Fruits.json')
      .then((res) => {
          setAllData(res.data);
          setData(res.data.slice(0, cardCount));
          setLoading(false);
      })
      .catch((err) => {
          setError(err);
          setLoading(false);
      });
  }, []); 

  const updateCardCount = (count) => {
    setCardCount(count);
    setData(allData.slice(0, count));
  };

  return (
    <GameContext.Provider value={{ 
      data, 
      loading, 
      error, 
      cardCount, 
      updateCardCount,
      maxCards: allData.length 
    }}>
      {children}
    </GameContext.Provider>
  );
};

GameProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GameProvider;