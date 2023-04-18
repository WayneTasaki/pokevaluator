import React from 'react'
import { useContext, useEffect, useState } from 'react'
import PokeContext from './PokeContext'
import moment from 'moment/moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { faCircleMinus } from '@fortawesome/free-solid-svg-icons'


function CardDetails(card) {
  const { currentCards, showCardDetails, setShowCardDetails, showModal, hideModal, selectedCard, setSelectedCard, parseDate, collection, setCollection, saveLocalCollection, formatCardVariation, getCardVariations, addVariations, addZeroes, collectionMounted, collectionValue, cardTotalValue, showCollectionAmount, totalVariationValue, removeFromLocalCollection, decrementCardVariation, isCardVarInCollection, hasValueChanged, setHasValueChanged} = useContext(PokeContext)

  // when card is added to collection, show popup that says card added to collection and fadeout within 2s
  // when selected card is in collection, show things that indicate to user that they own it and how many

    // If the market price isn't formatted correctly as currency, this adds the correct amount of 0's.


  
  return (
    <>
      <div className='modal'>
        <span id='close' onClick={() => hideModal()}>&times;</span>
        {collectionMounted && <span className='remove' onClick={() => removeFromLocalCollection(selectedCard)}>REMOVE FROM COLLECTION</span>}

        <div className='selected-card-image-wrapper'>
        <img src={selectedCard.images.large} alt="" className='selected-card-image'/> 
        </div>

        <div className="cardDetails">
            <p className='modaltext' id='card-name'>{selectedCard.name.toUpperCase()}</p>
            <span className='divider'></span>
            <p className='modaltext' id='supertype'>{selectedCard.supertype} - {selectedCard.subtypes[0]}</p>
            <p className='modaltext' id='rarity'>{selectedCard.rarity}</p>
            <p className='modaltext'><span className='detail'>Set - </span>{selectedCard.set.name}</p>
            <p className='modaltext' id='released'><span className='detail'>Released - </span>{moment(selectedCard.set.releaseDate, 'YYYY/MM/DD').format('MMMM Do YYYY')}</p>
            <span className='divider'></span>
            {/* if collection component is mounted, show the total value of that card in your collection */}
            
            
            {/* map through currentcards to display that cards pricing info */}
            {selectedCard && Object.keys(selectedCard.tcgplayer.prices).map(v => (
              <React.Fragment key={`${v}Fragment`}>
                <div className='variation-wrapper'>
                {/* vv takes the variation from the card object, splits up each word, trims off excess space at the ends, then capitalizes the first letter of each word ( REWORK INTO SEPARATE FUNCTION vvv )*/}
                  <p className='variation' key={v}>{formatCardVariation(v)}</p>
                  <p className='price' key={`${v}Price`}><span className='detail'>Market Price: </span>{addZeroes(selectedCard.tcgplayer.prices[v].market)}</p>
                  <span className='divider variation-divider'></span>
                  {isCardVarInCollection(selectedCard, v) && 
                  <>
                      <div className='collection-amount-wrapper'>
                      <span className='detail'>In Your Collection: </span>

                      
                        <FontAwesomeIcon icon={faCircleMinus} className='add-buttons subtract-buttons' onClick={() => decrementCardVariation(selectedCard, v)}/>
                        <span className='collection-amount'>{showCollectionAmount(selectedCard.id, v)}</span>
                        <FontAwesomeIcon icon={faCirclePlus} className='add-buttons' onClick={() => saveLocalCollection(selectedCard, v)}/>
                      

                     

                      
                      
                    
                    <p className='detail value'>Value: <span className='variation-value'>{totalVariationValue(selectedCard, v)}</span></p>
                    </div>
                    
                    
                    </>
                  }
                  {/* if collection component isn't mounted, show the 'add to collection' button */}
                  {!isCardVarInCollection(selectedCard, v) &&
                    <button className='addToCollection button' key={`${v}Btn`} onClick={() => saveLocalCollection(selectedCard, v)}>Add to Collection</button>
                  }
                  </div>
              </React.Fragment>
            )
            )}
            
            {collectionMounted && <div className='total-card-value'><span className='detail'>Total Card Value: </span>{cardTotalValue(selectedCard)}</div>}
        </div>
        
      </div>
      <div className="modal-bg" onClick={() => hideModal()}>
      </div>
    </>
  )
}

export default CardDetails 