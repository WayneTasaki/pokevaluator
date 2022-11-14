import React from 'react'
import CardList from './components/CardList'
import CardDetails from './components/CardDetails'
import SearchBar from './components/SearchBar'
import PokeContext from './components/PokeContext'
import { useContext } from 'react'
import pokemon from 'pokemontcgsdk'
pokemon.configure({apiKey: process.env.REACT_APP_API_KEY})

function Search() {
  const { query, setQuery, isLoading, setIsLoading, error, setError, cards, setCards, currentPage, setCurrentPage, cardsPerPage, setCardsPerPage, indexOfLastCard, setIndexOfLastCard, indexOfFirstCard, setIndexOfFirstCard, currentCards, setCurrentCards, searchType, setSearchType, showCardDetails, setShowCardDetails, showModal, hideModal, selectedCard, setSelectedCard, parseDate, saveLocalCollection, formatCardVariation, getCardVariations, addVariations, collectionMounted, setCollectionMounted, onHomepage, setOnHomepage} = useContext(PokeContext)

  console.log(query)
  return (
    <>
    {console.log(onHomepage)}
    {selectedCard && <CardDetails/>}
    <SearchBar/>
    <CardList/>
    </>
  )
}

export default Search