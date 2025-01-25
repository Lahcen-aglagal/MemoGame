import React from 'react';
import PropTypes from 'prop-types';
import { useGameContext } from '../../context/index.jsx';
import classes from './PageWrapper.module.css';
const PageWrapper = ({ children }) => {
  const { value } = useGameContext();
  const [controller] = value;
  const { darkMode, bgGameColor } = controller;

  return (
<div
  className={`fixed top-0 left-0 w-full h-full transition-colors duration-500 overflow-auto 
    ${darkMode ? classes.dark : bgGameColor}`}
>
  {children}
</div>
  );
};

PageWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageWrapper;