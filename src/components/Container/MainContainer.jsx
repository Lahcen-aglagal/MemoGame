import React from 'react';
import PropTypes from 'prop-types';
import classes from './MainContainer.module.css';
import { useGameContext } from '../../context/index.jsx';
import GlitchButton from '../Button/Button';
const MainContainer = ({ children , Moves , Time }) => {
  const {  value } = useGameContext();
  const [controller , dispatch] = value;
  const { darkMode , cardCount } = controller;
  const getGridDimensions = (count) => {
    const gridConfigs = {
      4: { columns: 2, rows: 2 },
      16: { columns: 4, rows: 4 },
      32: { columns: 8, rows: 4 }
    };
    return gridConfigs[count] || { columns: 0, rows: 0 };
  };

  const { columns, rows } = React.useMemo(
    () => getGridDimensions(cardCount),
    [cardCount]
  );

  if (!columns || !rows) {
    console.warn(`Invalid card count: ${cardCount}`);
    return null;
  }

  return (
    <>
      <div className={classes.Spacer} >
        <GlitchButton text="Reset" onClick={() => window.location.reload()} />
        <div className="p-2">
          <div className={`text-3xl font-bold ${ darkMode ? 'text-white' : 'text-black'}`}>
            Moves : {Moves}
          </div>
          <div className={`text-3xl font-bold ${ darkMode ? 'text-white' : 'text-black'}`}>
            Time  : {Time}
          </div>
        </div>
      </div>
      <div
        className={`${classes.Container}`}
        style={{
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
          backgroundImage : darkMode 
          ? "linear-gradient(to right, #434343 0%, black 100%)" 
          : "linear-gradient(to right, #f9d423 0%, #ff4e50 100%)"
        }}
        >
        {children}
      </div>
      </>
  );
};

MainContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainContainer;