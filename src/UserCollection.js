import React from 'react'
import Collection from './components/Collection'
import PokeContext from './components/PokeContext'
import CardDetails from './components/CardDetails'
import CardList from './components/CardList'
import { useEffect, useContext, useRef, useState } from 'react'

function UserCollection() {
  const { query, setQuery, isLoading, setIsLoading, error, setError, cards, setCards, currentPage, setCurrentPage, cardsPerPage, setCardsPerPage, indexOfLastCard, setIndexOfLastCard, indexOfFirstCard, setIndexOfFirstCard, currentCards, setCurrentCards, searchType, setSearchType, showCardDetails, setShowCardDetails, showModal, hideModal, selectedCard, setSelectedCard, parseDate, saveLocalCollection, formatCardVariation, getCardVariations, addVariations, collectionMounted, setCollectionMounted, onHomepage, setOnHomepage, collectionValue, setCollectionValue, collectionMarketValue, addZeroes, mounted} = useContext(PokeContext)
  
  

// on page load
  useEffect(() => {
    let collection = JSON.parse(localStorage.getItem('collection'))
    setCollectionValue(collectionMarketValue())
    setCollectionMounted(true)
    setCards(collection.sort(
      (d1, d2) =>
        new Date(d1.set.releaseDate).getTime() -
        new Date(d2.set.releaseDate).getTime()
    ))
    
    // console.log('useeffect ran')
  }, [])
  
  useEffect(() => {
    setCurrentCards(cards.slice(indexOfFirstCard, indexOfLastCard))
  }, [cards])

    
  
  
  return (
    <>
    
    {selectedCard && <CardDetails/>}
    
    <p>{addZeroes(collectionValue)}</p>
    <CardList />
    </>
  )
}
export default UserCollection