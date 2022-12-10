import pokemon from 'pokemontcgsdk'
import CardList from './components/CardList'
import SearchBar from './components/SearchBar'
import CardDetails from './components/CardDetails'
import PokeContext from './components/PokeContext'
import UserCollection from './UserCollection'
import collectionIcon from './images/collectionIcon.png'
import pokevaluatorLogo from './images/pokevaluatorLogo.png'
import pokeball from './images/pokeball.svg'

import { Router, Routes, Link } from 'react-router-dom'
import {useState, useContext, useEffect, useRef} from 'react'
pokemon.configure({apiKey: process.env.REACT_APP_API_KEY})
// have user choose, search for pokemon or browse by set

function Home() {
  const { query, setQuery, isLoading, setIsLoading, error, setError, cards, setCards, currentPage, setCurrentPage, cardsPerPage, setCardsPerPage, indexOfLastCard, setIndexOfLastCard, indexOfFirstCard, setIndexOfFirstCard, currentCards, setCurrentCards, searchType, setSearchType, showCardDetails, setShowCardDetails, showModal, hideModal, selectedCard, setSelectedCard, parseDate, saveLocalCollection, formatCardVariation, getCardVariations, addVariations, collectionMounted, setCollectionMounted, onHomepage, setOnHomepage, searchOccured, setSearchOccurred } = useContext(PokeContext)
  
  useEffect(() => {
    setCurrentCards()
    setCollectionMounted(false)
    setSearchOccurred(false)
  },[])





  return (
    
    <>
      {isLoading && 
        <div className="loadingBg ">
          <img src={pokeball} className='loadingBall'/>
        </div>
      }
    {selectedCard && <CardDetails/>}
    <div className='header'>
      
      <Link to='/collection' element={<UserCollection />}>
        <img src={collectionIcon} className='collectionIcon' alt="" onClick={ () => setCurrentCards()}/>
        <p className='collection-header-text'>Collection</p>
      </Link>
      
    </div>
  <div className='home-wrapper'>
    <img src={pokevaluatorLogo} alt="" className='logo'/>
    <SearchBar/>
    </div>
    
      <div>
    {searchOccured && <CardList/>}
      </div>
    
    </>
  
  )
}

export default Home