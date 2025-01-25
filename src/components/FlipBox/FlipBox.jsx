import React from 'react'
import classes from './FlipBox.module.css'
import ReactCardFlip from 'react-card-flip'
import PropTypes from 'prop-types'  // Changed this import

const FlipBox = ({
    Front, 
    ClassFront,
    ClassBack, 
    handleClick , 
    isFlipped ,
    flipDirection
}) => {
  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection={flipDirection}>
      <div 
        onClick={handleClick} 
        className={ClassBack} 
        style={{height: '7em', width: '7em'}}
      />
      <div 
        onClick={handleClick} 
        className={ClassFront} 
        style={{height: '7em', width: '7em'}}
      >
        {Front}
      </div>
    </ReactCardFlip>
  )
}

FlipBox.propTypes = {
    Front: PropTypes.node.isRequired,
    ClassFront: PropTypes.string,
    ClassBack: PropTypes.string,
    handleClick: PropTypes.func,
    isFlipped: PropTypes.bool,
    flipDirection: PropTypes.oneOf(['horizontal', 'vertical'])
}

FlipBox.defaultProps = {
    ClassFront: classes.frontCard,
    ClassBack: classes.backCard,
    handleClick: null,
    isFlipped: false,
    flipDirection: 'horizontal'
}

export default React.memo(FlipBox)