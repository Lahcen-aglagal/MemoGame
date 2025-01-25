import React from 'react';
import classes from './Button.module.css';
import PropTypes from 'prop-types';
const GlitchButton = ({ text = 'Start', onClick }) => {
  return (
    <button className={classes.GlitchButton}
      onClick={onClick}
    >
    <span>{text}</span>
  </button>
  );
};

GlitchButton.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func
}
export default GlitchButton;