import React from 'react'
import { useContext, useRef, useEffect, useState } from 'react'
import CardList from './CardList'
import PokeContext from './PokeContext'

function Collection() {
  const { query, setQuery, isLoading, setIsLoading, error, setError, cards, setCards, currentPage, setCurrentPage, cardsPerPage, setCardsPerPage, indexOfLastCard, setIndexOfLastCard, indexOfFirstCard, setIndexOfFirstCard, currentCards, setCurrentCards, searchType, setSearchType, showCardDetails, setShowCardDetails, showModal, hideModal, selectedCard, setSelectedCard, parseDate, saveLocalCollection, formatCardVariation, getCardVariations, addVariations, collectionMounted, setCollectionMounted, collectionValue, addZeroes } = useContext(PokeContext)
  // vv Count number of each card in collection
  // https://www.geeksforgeeks.org/how-to-count-number-of-occurrences-of-repeated-names-in-an-array-of-objects-in-javascript/
  
  // remake cardlist component here. needs reworking because of additional info needed for each rendered card.
 
  // display collection just like cardList


  return (
    <>
    <p>{addZeroes(collectionValue)}</p>
    <CardList />
    </>
  )
}

export default Collection 