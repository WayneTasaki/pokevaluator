import React from 'react'
import { useState, useContext, useEffect, useRef } from 'react'
import PokeContext from './PokeContext'
import Pagination from './Pagination'
import CardDetails from './CardDetails'
import Collection from './Collection'
// Figure out how to filter results based on certain criteria. What should be the default sorting method? What should be all the filter criteria? Do I add conditionals in SearchBar.js since the filter needs to happen to the main card object? I guess not, so long as you're only able to filter once you do a search for a pokemon
function CardList() {
  const parseCurrency = require('parsecurrency');
  const { query, setQuery, isLoading, setIsLoading, error, setError, cards, setCards, currentPage, setCurrentPage, cardsPerPage, setCardsPerPage, indexOfLastCard, setIndexOfLastCard, indexOfFirstCard, setIndexOfFirstCard, currentCards, setCurrentCards, searchType, setSearchType, showCardDetails, setShowCardDetails, showModal, hideModal, selectedCard, setSelectedCard, parseDate, saveLocalCollection, formatCardVariation, getCardVariations, addVariations, collectionMounted, setCollectionMounted, cardTotalValue, mounted } = useContext(PokeContext)

  const isFirstRender = useRef(true)
  
      // Paginate & change current page - triggers cascade of useEffects
      const paginate = (n) => {
      const buttons = document.querySelectorAll('.page-buttons');
      
      buttons.forEach(btn => {
        // ✅ Remove class from each element
        btn.classList.remove('selected-page');
      });
      
      setCurrentPage(n)
      let activePage = document.getElementById(`${n}`)
      activePage.classList.add('selected-page')
      
    }
 
  
  
  // when collection is mounted, setCards to collection
  let collection = JSON.parse(localStorage.getItem('collection'))
  // collectionMounted && setCards(collection.slice(indexOfFirstCard, indexOfLastCard))
  // console.log(cards)
  // console.log(collection)
  
  useEffect(() => {
    if(collectionMounted) {
      cards.sort((a, b) => parseCurrency(a.totalValue).value > parseCurrency(b.totalValue).value ? -1 : 1);
      setCurrentPage(1)
      setCurrentCards(cards.slice(indexOfFirstCard, indexOfLastCard))
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
      cards.sort((a, b) => parseCurrency(a.totalValue).value > parseCurrency(b.totalValue).value ? -1 : 1);
      setCurrentPage(1)
      setCurrentCards(cards.slice(indexOfFirstCard, indexOfLastCard))
    }
  }

  let cardNum = 0
  let selectValue = 'Market Price (High - Low)'
  // IF I GIVE EACH CARD IN COLLECTION A CARDTOTALVALUE PROPERTY, I MAY BE ABLE TO RENDER THE VALUE UNDER EACH CARD +++ SORT IT EASIER. TRY MAKING USEEFFECT WHEN CURRENTCARDS CHANGES OR ADD THE VALUES INSIDE THE SAVETOLOCALSTORAGE FUNCTION 
  


    
  
  return (
    
    <div className='cardList-wrapper'>
      <div className='sort-wrapper'>
        <span className='sortSpan'>Sorted by:</span>
        <select name="sort" id="sort" value={selectValue} onChange={(e) => handleChangeSort(e)}>
          {collectionMounted && <option value='Market Price'>Market Price (High - Low)</option>}
          <option value="Oldest > Newest">Oldest - Newest</option>
          <option value="Newest > Oldest">Newest - Oldest</option>
        </select>
      </div>

      {/* maps through all currentCards. The ID is the index where the card sits inside the currentCard object. I use this to identify which card is clicked to bring up the CardDetails component */}
      <div className='card-wrapper'>
        {currentCards && currentCards.map(c => (
          <React.Fragment key={`${c.id} frag`}>
          <img src={c.images.small} key={c.id} id={c.id}className='cards' onClick={(e) => showModal(e)}></img>
           {collectionMounted && <span>{c.totalValue}</span>} 
          </React.Fragment>
        ))}
      </div>


        {currentCards && <Pagination cardsPerPage={cardsPerPage} totalCards={cards.length} paginate={paginate}/>}
      
    </div>
    
  )
}

export default CardList