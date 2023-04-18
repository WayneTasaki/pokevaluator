import React from 'react'
import Collection from './components/Collection'
import PokeContext from './components/PokeContext'
import CardDetails from './components/CardDetails'
import CardList from './components/CardList'
import Home from './Home'
import pokevaluatorLogo from './images/pokevaluatorLogo.png'
import charizardderpgif from './images/charizardderpgif.gif'
import moneyBag from './images/moneyBag.png'
import { useEffect, useContext, useRef, useState } from 'react'
import { Router, Routes, Link } from 'react-router-dom'

function UserCollection() {
  const parseCurrency = require('parsecurrency')
  const { query, setQuery, isLoading, setIsLoading, error, setError, cards, setCards, currentPage, setCurrentPage, cardsPerPage, setCardsPerPage, indexOfLastCard, setIndexOfLastCard, indexOfFirstCard, setIndexOfFirstCard, currentCards, setCurrentCards, searchType, setSearchType, showCardDetails, setShowCardDetails, showModal, hideModal, selectedCard, setSelectedCard, parseDate, saveLocalCollection, formatCardVariation, getCardVariations, addVariations, collectionMounted, setCollectionMounted, onHomepage, setOnHomepage, collectionValue, setCollectionValue, collectionMarketValue, addZeroes, mounted, handleChangeSort, setCardTotalMarketValue, CardTotalMarketValue} = useContext(PokeContext)
  
  

// on page load
  useEffect(() => {
    let collection = JSON.parse(localStorage.getItem('collection'))
    setCollectionValue(collectionMarketValue())
    setCollectionMounted(true)
    setCards(collection.sort((a, b) => parseCurrency(a.totalValue).value > parseCurrency(b.totalValue).value ? -1 : 1))
    
    // console.log('useeffect ran')
  }, [])
  
  useEffect(() => {
    setCurrentCards(cards.slice(indexOfFirstCard, indexOfLastCard))
  }, [cards])

    
  
  
  return (
    
    <>
    {selectedCard && <CardDetails/>}
    
    <header className='collection-header'>
      <Link to='/' element={<Home/>} className='logo-link'>
        <img src={pokevaluatorLogo} className='collection-logo'/>
      </Link>
    </header>
    {collectionValue > 0 && 
          <div className='collection-value-wrapper'>
          <p className='total-collection-value collection-card-value'><img src={moneyBag} className='money-bag-total'/>Total Collection Value: {addZeroes(collectionValue)}</p>
        </div>
    }


    {collectionValue > 0 && <CardList />}
    {collectionValue == 0 && 
      <div className='no-collection-wrapper'>
        <p className='no-collection-title'>It looks like your collection is empty...</p>
        <img className='derp' src={charizardderpgif} alt='animated gif of a derpy Charizard card' />
        <span className='gif-credit'>Gif Credit: <a href='https://www.kennymays.com/'>Kenny Mays</a></span>
        <p className='no-collection-text'>Let's start tracking your collection value! Click the logo to go home and start searching for some cards.</p>
      </div>
    }
    </>
  )
}
export default UserCollection