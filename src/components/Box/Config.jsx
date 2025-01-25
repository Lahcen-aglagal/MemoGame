import React, { useState, useEffect } from 'react';
import { setBgGameColor, useGameContext } from '../../context/index.jsx';
import PropTypes from 'prop-types';
import {
  setSidenavColor,
  setDirection,
  setDarkMode,
  setFixedNavbar,
  setCardCount
} from '../../context/index.jsx';

const Config = ({ children , restartGame }) => {
  const { value } = useGameContext();
  const [controller, dispatch] = value;
  const { openConfigurator, direction, sidenavColor, fixedNavbar, darkMode } = controller;
  const [openClass, setOpenClass] = useState('');
  const [Moves , setMoves] = useState(0);
  const [Time , setTime] = useState(0);

  const baseClasses = `fixed ${fixedNavbar ? 'top-14' : 'top-0'} top-10 bottom-10 h-[calc(100vh-5rem)] w-80 ${darkMode ? 'bg-gradient-to-r from-gray-500 to-black backdrop-blur-sm' : sidenavColor} shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] p-4 transition-transform duration-300 ease-out rounded-xl`;
  const positionClasses = {
    left: "left-0 transform -translate-x-full",
    right: "right-0 transform translate-x-full"
  };

  const colorsClasses = [
    'bg-gradient-to-r from-red-500 to-pink-500 backdrop-blur-sm',
    'bg-gradient-to-r from-green-500 to-teal-500 backdrop-blur-sm',
    'bg-gradient-to-r from-blue-500 to-indigo-500 backdrop-blur-sm',
    'bg-gradient-to-r from-yellow-500 to-orange-500 backdrop-blur-sm',
    'bg-gradient-to-r from-purple-500 to-indigo-500 backdrop-blur-sm',
    'bg-gradient-to-r from-pink-500 to-rose-500 backdrop-blur-sm',
    'bg-gradient-to-r from-gray-500 to-black backdrop-blur-sm',
    'bg-transparent backdrop-blur-sm'
  ];

  const CardCountOptions = [4, 16 , 32];

  useEffect(() => {
    openConfigurator ? setOpenClass(direction === "left" ? "translate-x-5" : "-translate-x-3") : setOpenClass('');
  }, [openConfigurator, direction]);

  return (
    <div
      className={`
        ${baseClasses}
        ${positionClasses[direction]}
        ${openClass}
      `}
    >
      <div className="text-white">
        <h2 className={`text-2xl font-semibold mb-5 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Game Configuration</h2>
        <div className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200/30'} mb-6 drop-shadow-xl`}></div>

        <div className="mb-6">
          <label className={`block mb-3 text-base font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
            Change Sidenav Color
          </label>
          <div className="space-y-3">
            {colorsClasses.map((colorClass, index) => (
              <button
                key={index}
                className={`rounded-md ${colorClass} m-1 p-2.5 border-2 border-white/50 text-center text-sm text-white transition-all shadow-sm hover:shadow-lg transition-all duration-300`}
                type="button"
                onClick={() => {
                  setSidenavColor(dispatch, colorClass)
                  setBgGameColor(dispatch, colorClass)
                }
                  
                }
              />
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className={`block mb-3 text-base font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}> Card Count</label>
          <div className="space-x-3">
            {CardCountOptions.map((count, index) => (
              <button
                key={index}
                className={`rounded-md m-1 p-2.5 border-2 border-white/50 text-center text-sm text-white transition-all shadow-sm hover:shadow-lg transition-all duration-300`}
                type="button"
                onClick={() => {
                  restartGame()
                  setCardCount(dispatch, count)
                }}
              >
                {count}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between">
            <span className={`text-base font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              Dark Mode
            </span>
            <div className="relative inline-block w-12 h-6">
              <input
                type="checkbox"
                className={`
                  peer appearance-none w-12 h-6 rounded-full cursor-pointer transition-colors duration-300
                  ${darkMode 
                    ? 'bg-gray-700 checked:bg-slate-300' 
                    : 'bg-gray-200 checked:bg-slate-800'
                  }
                `}
                checked={darkMode}
                onChange={() => setDarkMode(dispatch, !darkMode)}
              />
              <label
                htmlFor="dark-mode-switch"
                className="absolute top-0 left-0 w-6 h-6 bg-white rounded-full border border-gray-300 shadow-sm transition-transform duration-300 peer-checked:translate-x-6 peer-checked:border-slate-800 cursor-pointer"
              />
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between">
            <span className={`text-base font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Fixed Sidebar</span>
            <div className="relative inline-block w-12 h-6">
              <input
                id="fixed-sidebar-switch"
                type="checkbox"
                className="peer appearance-none w-12 h-6 bg-gray-200 rounded-full checked:bg-slate-800 cursor-pointer transition-colors duration-300"
                checked={fixedNavbar}
                onChange={() => setFixedNavbar(dispatch, !fixedNavbar)}
              />
              <label
                htmlFor="fixed-sidebar-switch"
                className="absolute top-0 left-0 w-6 h-6 bg-white rounded-full border border-gray-300 shadow-sm transition-transform duration-300 peer-checked:translate-x-6 peer-checked:border-slate-800 cursor-pointer"
              />
            </div>
          </div>
        </div>

        <div className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200/30'} my-6 drop-shadow-xl`}></div>

        <div className="mb-6">
          <label className={`block mb-3 text-base font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Sidebar Direction</label>
          <div className="space-x-3">
            <button
              className={`
                px-4 py-2 rounded-md 
                border-2 
                ${direction === 'left' 
                  ? `${darkMode ? 'border-gray-300 bg-gray-300 text-black' : 'border-gray-800 bg-gray-800 text-white'}` 
                  : `${darkMode ? 'border-gray-300 text-gray-300 hover:bg-gray-700' : 'border-gray-800 text-gray-800 hover:bg-gray-100'}`
                }
                ${fixedNavbar ? 'opacity-50 cursor-not-allowed' : ''}
                transition-colors duration-300
              `}
              onClick={() => !fixedNavbar && setDirection(dispatch, 'left')}
              disabled={fixedNavbar}
            >
              Left
            </button>
            <button
              className={`
                px-4 py-2 rounded-md 
                border-2 
                ${direction === 'right' 
                  ? `${darkMode ? 'border-gray-300 bg-gray-300 text-black' : 'border-black bg-black text-white'}` 
                  : `${darkMode ? 'border-gray-300 text-gray-300 hover:bg-gray-700' : 'border-black text-black hover:bg-gray-100'}`
                }
                ${fixedNavbar ? 'opacity-50 cursor-not-allowed' : ''}
                transition-colors duration-300
              `}
              onClick={() => !fixedNavbar && setDirection(dispatch, 'right')}
              disabled={fixedNavbar}
            >
              Right
            </button>
          </div>
        </div>
      </div>
      {/* footer div this is the footer  contain my info */}
      <div className="p-6 border-t border-gray-200 dark:border-gray-700">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023{" "}
          <a
            href="https://www.linkedin.com/in/lahcen-aglagal-38b158214/m"
            className="text-blue-500 hover:underline"
          >
            LAHCEN AGLAGAL
          </a>. All Rights Reserved.
        </span>

      </div>

    </div>
  );
};

Config.propTypes = {
  children: PropTypes.node
};

export default Config;