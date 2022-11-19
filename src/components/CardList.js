import React from 'react'
import { useState, useContext, useEffect, useRef } from 'react'
import PokeContext from './PokeContext'
import Pagination from './Pagination'
import CardDetails from './CardDetails'
import Collection from './Collection'
// Figure out how to filter results based on certain criteria. What should be the default sorting method? What should be all the filter criteria? Do I add conditionals in SearchBar.js since the filter needs to happen to the main card object? I guess not, so long as you're only able to filter once you do a search for a pokemon
function CardList() {
  const { query, setQuery, isLoading, setIsLoading, error, setError, cards, setCards, currentPage, setCurrentPage, cardsPerPage, setCardsPerPage, indexOfLastCard, setIndexOfLastCard, indexOfFirstCard, setIndexOfFirstCard, currentCards, setCurrentCards, searchType, setSearchType, showCardDetails, setShowCardDetails, showModal, hideModal, selectedCard, setSelectedCard, parseDate, saveLocalCollection, formatCardVariation, getCardVariations, addVariations, collectionMounted, setCollectionMounted } = useContext(PokeContext)

  const isFirstRender = useRef(true)
  

    // Paginate & change current page - triggers cascade of useEffects
    const paginate = (n) => {
      setCurrentPage(n)
    }
  
  
  // when collection is mounted, setCards to collection
  let collection = JSON.parse(localStorage.getItem('collection'))
  // collectionMounted && setCards(collection.slice(indexOfFirstCard, indexOfLastCard))
  // console.log(cards)
  // console.log(collection)
  
  useEffect(() => {
    if(collectionMounted) {
      setCurrentCards()
      // console.log('cards should display')
      // setCards(collection)
      
      // console.log(currentCards)
    } else {
      setCurrentPage(1)
    }
  }, [collectionMounted])

  // set index of last card
  useEffect(() => {
    if(isFirstRender.current) {
      isFirstRender.current = false
      return;
    }
    setIndexOfLastCard(currentPage * cardsPerPage)
  }, [currentPage])

  // set index of first card
  useEffect(() => {
    if(isFirstRender.current) {
      isFirstRender.current = false
      return;
    }
    setIndexOfFirstCard(indexOfLastCard - cardsPerPage)
  }, [indexOfLastCard])
  
  // set current cards
  useEffect(() => {
    if(isFirstRender.current) {
      isFirstRender.current = false
      return;
    }
    // sorts currentCards oldest to newest by default
    currentCards && setCurrentCards(cards.slice(indexOfFirstCard, indexOfLastCard))
  }, [indexOfFirstCard])

  
// console.log(currentCards)

// cards.sort((d1, d2) => new Date(d1.set.releaseDate).getTime() - new Date(d2.set.releaseDate).getTime())

// filter by set: cards[0].filter(c => c.set.id === 'smp')
// any time something gets filtered, need to create function that fires the filter method, and sets the totalCards prop in Pagination to the filtered array
// 
// 
// 
  // When a dropdown option is selected, sorts all cards and changes currentCards
  const handleChangeSort = (e) => {
    if(e.target.value === 'Oldest > Newest') {
      console.log('Oldest > Newest')
      cards.sort((d1, d2) => new Date(d1.set.releaseDate).getTime() - new Date(d2.set.releaseDate).getTime())
      setCurrentPage(1)
      setCurrentCards(cards.slice(indexOfFirstCard, indexOfLastCard))
    }
    if(e.target.value === 'Newest > Oldest') {
      console.log('Newest > Oldest')
      cards.sort((d1, d2) => new Date(d2.set.releaseDate).getTime() - new Date(d1.set.releaseDate).getTime())
      setCurrentPage(1)
      setCurrentCards(cards.slice(indexOfFirstCard, indexOfLastCard))
    }
    if(e.target.value === 'Market Price') {
      console.log('Market Price')
      let cardAArr = []
      let cardBArr = []
      let cardATotalVal = null
      let cardBTotalVal = null
      cards.sort((cardA, cardB) => {
 
        Object.keys(cardB.tcgplayer.prices).forEach((v) => {
          cardBArr.push(cardB.tcgplayer.prices[v].market * cardB.variations[v].amount)
          cardBTotalVal = cardBArr.reduce((a,b) => a + b)
          cardB.totalValue = cardBTotalVal
        })
        
        
        console.log(cardATotalVal, cardBTotalVal)
      })
      setCurrentPage(1)
      setCurrentCards(cards.slice(indexOfFirstCard, indexOfLastCard))
    }
  }

  let cardNum = 0
  
  
  return (
    
    <div>
      {/* {showCardDetails && <CardDetails selectedCard={selectedCard}/>} */}
      <h1>CardList</h1>
      <p>Sorted by:</p>
      <select name="sort" id="sort" onChange={(e) => handleChangeSort(e)}>
        {collectionMounted && <option value='Market Price'>Market Price (High - Low)</option>}
        <option value="Oldest > Newest">Oldest - Newest</option>
        <option value="Newest > Oldest">Newest - Oldest</option>
      </select>
      {/* maps through all currentCards. The ID is the place the card sits inside the currentCard object. I use this to identify which card is clicked to bring up the CardDetails component */}
      {currentCards && currentCards.map(c => (
        <img src={c.images.small} key={c.id} id={cardNum++} onClick={(e) => showModal(e)}></img>
      ))}
      {/* component which renders the pagination  */}
      {currentCards && <Pagination cardsPerPage={cardsPerPage} totalCards={cards.length} paginate={paginate}/>}
    </div>
    
  )
}

export default CardList