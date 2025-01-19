import React, { useState, useCallback, useEffect } from 'react'
import { MainContainer } from '../../components'
import classes from './Home.module.css'
import FlipBox from '../../components/FlipBox/FlipBox'
import { useGameContext } from '../../context/GameContext'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Home = () => {
  const { data, loading, error } = useGameContext();
  const [flippedCards, setFlippedCards] = useState({});
  useEffect(() => {
    let loadingToast;
    
    if (loading) {
      loadingToast = toast.info('Loading game cards...', {
        position: "top-right",
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        isLoading: true
      });
    } else {
      if (loadingToast) {
        toast.dismiss(loadingToast);
      }
      if (!error) {
        toast.success('Game cards loaded successfully!', {
          position: "top-right",
          autoClose: 2000,
        });
      }
    }

    if (error) {
      toast.error('Failed to load game data. Please try again later.', {
        position: "top-right",
        autoClose: 5000,
      });
    }

    return () => {
      if (loadingToast) {
        toast.dismiss(loadingToast);
      }
    };
  }, [loading, error]);

  const createHandleClick = useCallback((index) => {
    return (e) => {
      e.preventDefault();
      setFlippedCards(prev => ({
        ...prev,
        [index]: !prev[index]
      }));
    };
  }, []);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <MainContainer>
        {data?.map((item, index) => (
          <FlipBox
            key={index}
            handleClick={createHandleClick(index)}
            isFlipped={flippedCards[index] || false}
            Front={
              <div className={classes.item}>
                <img
                  src={item.path}
                  alt={item.name}
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
              </div>
            }
          />
        ))}
      </MainContainer>
    </>
  );
};

export default Home;