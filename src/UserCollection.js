import React from 'react'
import Collection from './components/Collection'
import PokeContext from './components/PokeContext'
import CardDetails from './components/CardDetails'
import { useEffect, useContext, useRef, useState } from 'react'

function UserCollection() {
  const { query, setQuery, isLoading, setIsLoading, error, setError, cards, setCards, currentPage, setCurrentPage, cardsPerPage, setCardsPerPage, indexOfLastCard, setIndexOfLastCard, indexOfFirstCard, setIndexOfFirstCard, currentCards, setCurrentCards, searchType, setSearchType, showCardDetails, setShowCardDetails, showModal, hideModal, selectedCard, setSelectedCard, parseDate, saveLocalCollection, formatCardVariation, getCardVariations, addVariations, collectionMounted, setCollectionMounted, onHomepage, setOnHomepage, collectionValue, setCollectionValue, collectionMarketValue} = useContext(PokeContext)
  
  

// on page load
  useEffect(() => {
    let collection = JSON.parse(localStorage.getItem('collection'))
    setCollectionValue(collectionMarketValue())
    setCollectionMounted(true)
    setCurrentCards()
    setCards(collection)
    // console.log('useeffect ran')
  }, [])
  
  useEffect(() => {
    setCurrentCards(cards.slice(indexOfFirstCard, indexOfLastCard))
  }, [cards])

  useEffect(() => {
    console.log(`collection page: ${collectionValue}`)
    // setCollectionValue(collectionValue)
    // let collection = JSON.parse(localStorage.getItem('collection'))
    // setCollectionValue(collectionMarketValue())
    // setCurrentCards()
    // setCards(collection)
  }, [collectionValue])
  
  // sums up tcg market price of all cards in collection to determine total collection value
  

     //for each card, grab variation (from either the variation property or market.price) and variation amounts. Then multiply variation amount by the variation market price to get total of that variation(make variable?). Add both of those numbers together and that number is what gets added to sum
  
  // const collectionMarketValue = () => {
  //   let sum = 0
  //   // for each card in collection...
  //   collection.forEach(c => {
  //     // look at the variation name in tcgplayer prices...
  //     if(Object.keys(c.tcgplayer.prices).forEach(v => {
  //       // variation names
        
  //     }) === Object.keys(c.variations).forEach(cv => {
        
  //     })) {
  //       Object.keys(c.tcgplayer.prices).forEach(v => {
  //         sum += c.tcgplayer.prices[v].market
          
  //         // console.log(`${c.name} - ${v}: ${c.tcgplayer.prices[v].market}`)
  //       })
  //     } 

  //   })
  //   return sum
  // }

 
  // useEffect(() => {
  //   setCollectionValue(collectionMarketValue())
  // }, [localStorage.getItem('collection')])
// console.log(cards)
// console.log(collection)



  useEffect(() => {

  })
  
  return (
    <>
    
    {selectedCard && <CardDetails/>}
    
    <Collection/>
    </>
  )
}
export default UserCollection