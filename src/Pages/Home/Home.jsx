import { useState, useCallback, useEffect } from 'react';
import { MainContainer } from '../../components';
import classes from './Home.module.css';
import { FlipBox, Config, PageWrapper } from '../../components/';
import { useGameContext } from '../../context/index.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setOpenConfigurator, setCardCount } from '../../context/index.jsx';

const ConfigToggle = () => {
  const { value } = useGameContext();
  const [controller, dispatch] = value;
  const { openConfigurator, fixedNavbar } = controller;

  if (fixedNavbar) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={() => setOpenConfigurator(dispatch, !openConfigurator)}
        className={`rounded-full p-3 text-white shadow-lg transition-transform duration-500 ${
          openConfigurator
            ? 'bg-green-500 rotate-180 hover:bg-green-400'
            : 'bg-blue-500 hover:bg-blue-400'
        }`}
      >
        <i className={`fas fa-cogs text-2xl ${openConfigurator ? 'rotate-90' : ''}`}></i>
      </button>
    </div>
  );
};

const Home = () => {
  const { data, setData, loading, error, value, allData } = useGameContext();
  const [controller] = value;
  const { cardCount } = controller;
  const [flippedCards, setFlippedCards] = useState({});
  const [selectedCards, setSelectedCards] = useState([]); 
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [initialReveal, setInitialReveal] = useState(true);

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    let timer;
    if (isGameStarted) {
      timer = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isGameStarted]);

  
  useEffect(() => {
    const cardnumber = cardCount / 2;
    if (allData.length >= cardnumber) {
      const shuffledData = shuffleArray([...allData]);
      const slicedData = shuffledData.slice(0, cardnumber);
      setData([...slicedData, ...slicedData]);
    } else {
      console.error('Not enough data available to match the card count');
    }
  }, [cardCount, allData]);

  const resetGame = () => {
    setFlippedCards({});
    setSelectedCards([]);
    setMoves(0);
    setTime(0);
    setMatchedPairs(0);
    setIsGameStarted(false);
    setInitialReveal(true);
    const cardnumber = cardCount / 2;
    if (allData.length >= cardnumber) {
      const shuffledData = shuffleArray([...allData]);
      const slicedData = shuffledData.slice(0, cardnumber);
      setData([...slicedData, ...slicedData]);
    }
  };

  useEffect(() => {
    let loadingToast;
    if (loading) {
      loadingToast = toast.info('Loading game cards...', {
        position: 'top-right',
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        isLoading: true,
      });
    } else {
      if (loadingToast) {
        toast.dismiss(loadingToast);
      }
      if (!error) {
        toast.success('Game cards loaded successfully!', {
          position: 'top-right',
          autoClose: 2000,
        });
      }
    }

    if (error) {
      toast.error('Failed to load game data. Please try again later.', {
        position: 'top-right',
        autoClose: 5000,
      });
    }

    return () => {
      if (loadingToast) {
        toast.dismiss(loadingToast);
      }
    };
  }, [loading, error]);

  useEffect(() => {
    if (initialReveal && data.length > 0) {
      // Flip all cards initially
      const initialFlippedCards = data.reduce((acc, _, index) => {
        acc[index] = true;
        return acc;
      }, {});
      
      setFlippedCards(initialFlippedCards);
      const timer = setTimeout(() => {
        setFlippedCards({});
        setInitialReveal(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [data, initialReveal]);

  const createHandleClick = useCallback(
    (index, name) => {
      return (e) => {

        if (initialReveal) return;
        e.preventDefault();
        if (!isGameStarted) {
          setIsGameStarted(true);
        }

        if (flippedCards[index] || selectedCards.length === 2) return;
        setMoves(prevMoves => prevMoves + 1);
        setFlippedCards((prev) => ({
          ...prev,
          [index]: true,
        }));

        setSelectedCards((prev) => [...prev, { index, name }]);
        
        if (selectedCards.length === 1) {
          const [firstCard] = selectedCards;

          if (firstCard.name === name) {
            toast.success('Match found!' , {
              position: 'top-right',
              autoClose: 2000,
            });
            
            setMatchedPairs(prev => prev + 1);
            if (matchedPairs + 1 === cardCount / 2) {
              setTimeout(() => {
                const playAgain = window.confirm(
                  `Congratulations! 🎉\n\nYou completed the game in ${moves} moves and ${time} seconds.\n\nDo you want to play again?`
                );
                
                if (playAgain) {
                  resetGame();
                }
                
                setIsGameStarted(false);
                setInitialReveal(true);
                setTime(0);
                setMoves(0);
                setMatchedPairs(0);
                setFlippedCards({});
              }, 1000);
            }
            
            setSelectedCards([]);
          } else {
            setTimeout(() => {
              setFlippedCards((prev) => ({
                ...prev,
                [firstCard.index]: false,
                [index]: false,
              }));
              setSelectedCards([]); 
            }, 1000); 
          }
        }
      };
    },
    [flippedCards, selectedCards, isGameStarted, moves, time, matchedPairs, cardCount]
  );

  return (
    <PageWrapper>
      <ToastContainer />
      <ConfigToggle />
      <Config restartGame={resetGame} />
      <MainContainer Moves={moves} Time={time}>
        {data && data.length > 0 ? (
          data?.map((item, index) => (
            <FlipBox
              key={index}
              handleClick={createHandleClick(index, item.name)}
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
          ))
        ) : (
          <div className="text-center text-gray-500">No items available.</div>
        )}
      </MainContainer>
    </PageWrapper>
  );
};

export default Home;