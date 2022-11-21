import React from 'react'
import { useContext, useEffect } from 'react'
import PokeContext from './PokeContext'
import moment from 'moment/moment'

function CardDetails(card) {
  const { currentCards, showCardDetails, setShowCardDetails, showModal, hideModal, selectedCard, setSelectedCard, parseDate, collection, setCollection, saveLocalCollection, formatCardVariation, getCardVariations, addVariations, addZeroes, collectionMounted, cardTotalValue, showCollectionAmount, totalVariationValue, removeFromLocalCollection, decrementCardVariation, isCardVarInCollection} = useContext(PokeContext)

  // when card is added to collection, show popup that says card added to collection and fadeout within 2s
  // when selected card is in collection, show things that indicate to user that they own it and how many

    // If the market price isn't formatted correctly as currency, this adds the correct amount of 0's.

   
  
  return (
    <>
      <div className='modal'>
        <span id='close' onClick={() => hideModal()}>&times;</span>
        <div className="cardDetails">
          <p className='modaltext'>{currentCards[selectedCard].supertype}</p>
            <p className='modaltext'>{currentCards[selectedCard].name}</p>
            <p className='modaltext'>{currentCards[selectedCard].rarity}</p>
            <p className='modaltext'>{currentCards[selectedCard].set.name}</p>
            <p className='modaltext'>{moment(currentCards[selectedCard].set.releaseDate, 'YYYY/MM/DD').format('MMMM Do YYYY')}</p>
            {/* if collection component is mounted, show the total value of that card in your collection */}
            
            {<button onClick={() => removeFromLocalCollection(currentCards[selectedCard])}>REMOVE CARD FROM COLLECTION</button>}
            {/* map through currentcards to display that cards pricing info */}
            {selectedCard && Object.keys(currentCards[selectedCard].tcgplayer.prices).map(v => (
              <React.Fragment key={`${v}Fragment`}>
                {/* vv takes the variation from the card object, splits up each word, trims off excess space at the ends, then capitalizes the first letter of each word ( REWORK INTO SEPARATE FUNCTION vvv )*/}
                  <p className='modaltext' key={v}>{formatCardVariation(v)}</p>
                  <p className='modaltext' key={`${v}Price`}>{addZeroes(currentCards[selectedCard].tcgplayer.prices[v].market)}</p>
                  {isCardVarInCollection(currentCards[selectedCard], v) && 
                  <>
                      <p> 
                      <span>You Own: </span><span className='addOrRemoveBtn' onClick={() => decrementCardVariation(currentCards[selectedCard], v)}>-</span>{showCollectionAmount(currentCards[selectedCard].id, v)}<span className='addOrRemoveBtn' onClick={() => saveLocalCollection(currentCards[selectedCard], v)}>+</span>
                    </p>
                    <p>Value: {totalVariationValue(currentCards[selectedCard], v)}</p>
                    </>
                  }
                  {/* if collection component isn't mounted, show the 'add to collection' button */}
                  {!isCardVarInCollection(currentCards[selectedCard], v) &&
                    <button className='addToCollection' key={`${v}Btn`} onClick={() => saveLocalCollection(currentCards[selectedCard], v)}>Add to Collection</button>
                  }
              </React.Fragment>
            )
            )}
            {}
        </div>
        <img src={currentCards[selectedCard].images.small} alt="" /> 
        {collectionMounted && <p>Total Card Value: {cardTotalValue(currentCards[selectedCard])}</p>}
      </div>
      <div className="modal-bg" onClick={() => hideModal()}>
      </div>
    </>
  )
}

export default CardDetails 