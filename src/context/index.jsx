/**
 * @file index.jsx
 * @module ContextAPI
 * @version 1.0.0
 * @description This module provides the GameProvider component, which is a context provider for managing game state.
 * @requires react, createContext, useContext, useEffect, useReducer, useMemo
 * @requires PropTypes
 * @requires ApiCall
 */

import React, { useState, createContext, useContext, useEffect , useReducer , useMemo } from 'react';
import PropTypes from 'prop-types';
import { ApiCall } from '../Utils';

const GameContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "CARD_COUNT": {
      return { ...state, cardCount: action.value };
    }
    case "SIDENAV_COLOR": {
      return { ...state, sidenavColor: action.value };
    }
    case "BACKGROUND_COLOR": {
      return { ...state, bgGameColor: action.value };
    }
    case "FIXED_NAVBAR": {
      return { ...state, fixedNavbar: action.value };
    }
    case "OPEN_CONFIGURATOR": {
      return { ...state, openConfigurator: action.value };
    }
    case "DIRECTION": {
      return { ...state, direction: action.value };
    }
    case "DARKMODE": {
      return { ...state, darkMode: action.value };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

export default function GameProvider ({ children }){
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allData, setAllData] = useState([]);

  const initialState = {
    cardCount : 16,
    transparentNavbar: true,
    darkMode: false,
    sidenavColor: "shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]",
    bgGameColor : "bg-gradient-to-r from-[#f83600] to-[#f9d423]",
    fixedNavbar: false,
    openConfigurator: false,
    direction: "left",

  };
  const [controller, dispatch] = useReducer(reducer, initialState);
  
  // Pour eviter le recalcul des composants (controller et dispatch) chaque fois que le composant est monté 
  const value = useMemo(() => [controller, dispatch], [controller, dispatch]);
  useEffect(() => {
    ApiCall.get('Fruits.json')
      .then((res) => {
        setData(res.data);
        setAllData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  return (
    <GameContext.Provider value={{ 
      setData,
      data, 
      loading, 
      error,
      value,
      allData,

    }}>
      {children}
    </GameContext.Provider>
  );
};

GameProvider.propTypes = {
  children: PropTypes.node.isRequired,
};


function useGameContext() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
}
const setOpenConfigurator = (dispatch , value) => dispatch({ type: "OPEN_CONFIGURATOR", value });
const setSidenavColor = (dispatch , value) => dispatch({ type: "SIDENAV_COLOR", value });
const setDirection = (dispatch , value) => dispatch({ type: "DIRECTION", value });
const setDarkMode = (dispatch , value) => dispatch({ type: "DARKMODE", value });
const setTransparentNavbar =  (dispatch , value) => dispatch({type : "TRANSPARENT_NAVBAR", value});
const setCardCount =  (dispatch , value) => dispatch({type : "CARD_COUNT", value});
const setBgGameColor =  (dispatch , value) => dispatch({type : "BACKGROUND_COLOR", value});
const setFixedNavbar =  (dispatch , value) => dispatch({type : "FIXED_NAVBAR", value});

export  {
  useGameContext,
  setOpenConfigurator,
  setSidenavColor,
  setDirection,
  setDarkMode,
  setTransparentNavbar,
  setCardCount,
  setFixedNavbar,
  setBgGameColor
};