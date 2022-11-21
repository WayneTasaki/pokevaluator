import { createContext, useState, useEffect, useRef } from "react";

const PokeContext = createContext();

export function PokeProvider({ children }) {
  let collection = JSON.parse(localStorage.getItem('collection'))
  const [query, setQuery] = useState('')
  const [isLoading, setIsLoading] = useState(null)
  const [error, setError] = useState(null)
  const [cards, setCards] = useState(collection)
  const [currentPage, setCurrentPage] = useState(1)
  const [cardsPerPage, setCardsPerPage] = useState(10)
  const [indexOfLastCard, setIndexOfLastCard] = useState(currentPage * cardsPerPage)
  const [indexOfFirstCard, setIndexOfFirstCard] = useState(indexOfLastCard - cardsPerPage)
  // const currentCards = cards.slice(indexOfFirstCard, indexOfLastCard)
  const [currentCards, setCurrentCards] = useState()
  const [searchType, setSearchType] = useState('name')
  const [showCardDetails, setShowCardDetails] = useState(false)
  // the id of the clicked card. Always a number, based on where the card sits in the currentCards object
  const [selectedCard, setSelectedCard] = useState()
  const [onHomepage, setOnHomepage] = useState(true)


  // ------- ** USER STATES ** ------- //

  // const [collection, setCollection] = useState(JSON.parse(localStorage.getItem('collection')))
const [collectionMounted, setCollectionMounted] = useState(false)
const [collectionValue, setCollectionValue] = useState(0)

  // when page loads, if the 'collection' object does not exist in localstorage, create it
  useEffect(() => {
    if(!localStorage.collection) {
      localStorage.setItem('collection', JSON.stringify([]))
    }
  },[])

  // formats text by adding a spaces before a capital letter, trims excess spaces off the ends, then makes every first letter uppercase. Used to display the card variation in readable format
  const formatCardVariation = (v) => {
    return v.replace(/([A-Z])/g, ' $1').trim().replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())
   }
  
  //  gets both card variations and returns them in an array
   const getCardVariations = (c) => {
     let cardVariations = Object.keys(c.tcgplayer.prices).map(variable => variable)
     return cardVariations
    //  now i need to access them and put cardVariations[0] and cardVariations[1] into separate variables so I can add them to the newCard object with the value of 0
   }
   

  //  if newCardVar === newCardVarA, newCardVar = newCardVarA or newCardVarB
   const addVariations = (c, v) => {
    let newCardVarA = getCardVariations(c)[0]
    let newCardVarB = getCardVariations(c)[1]
    let newCard = c
    if(v === newCardVarA) {
      newCardVarA = v
      return newCard.variations = {[newCardVarA]: {amount: 0}, [newCardVarB]: {amount: 0}} //nest another object for amount
    }
    if(v === newCardVarB) {
      newCardVarB = v
      return newCard.variations = {[newCardVarA]: {amount: 0}, [newCardVarB]: {amount: 0}}
    }
   }
   
  // save new card to collection + keep track/change amount of the selected card in collection. c = individual card, v = variation
  const saveLocalCollection = (c, v) => {  
    addVariations(c, v)
    let newCard = c
    let newCardId = c.id
    let newCardVar = v
    let newCardVarAmount = newCard.variations[newCardVar].amount
    // add card to collection
    let collection = JSON.parse(localStorage.getItem('collection'))
    if(collection.length === 0) {
      newCard.variations[newCardVar].amount = ++newCardVarAmount
      collection.push(newCard)
      localStorage.setItem('collection', JSON.stringify(collection))
      
      collection = JSON.parse(localStorage.getItem('collection'))
      newCard = collection.find(card => card.id === newCardId)
      newCard.totalValue = cardTotalValue(newCard)
      localStorage.setItem('collection', JSON.stringify(collection))
      console.log(cardTotalValue(newCard))
      console.log(newCard)
      setCollectionValue(collectionMarketValue())
    } else 
    // if you have cards in your collection & a card has same id as the newCard, increment that cards variation amount. explain why i did it this way. wanted to keep the cardTotalValue function in use throughout the app so i chose to go around it
    if(collection.length >= 1 && collection.some(card => card.id === newCardId)) {
      let cardFromCollection = collection.find(card => card.id === newCardId)
      let cardFromCollectionVar = cardFromCollection.variations[newCardVar]
      let cardFromCollectionVarAmount = cardFromCollectionVar.amount
      cardFromCollectionVar.amount = ++cardFromCollectionVarAmount
      localStorage.setItem('collection', JSON.stringify(collection))

      collection = JSON.parse(localStorage.getItem('collection'))
      cardFromCollection = collection.find(card => card.id === newCardId)
      cardFromCollection.totalValue = cardTotalValue(cardFromCollection)
      localStorage.setItem('collection', JSON.stringify(collection))
      console.log(cardTotalValue(cardFromCollection))
      console.log(cardFromCollection)
      setCollectionValue(collectionMarketValue())
    } else
    if(collection.length > 0 && !collection.some(card => card.id === newCardId)) {
      newCard.variations[newCardVar].amount = ++newCardVarAmount
      collection.push(newCard)
      localStorage.setItem('collection', JSON.stringify(collection))

      collection = JSON.parse(localStorage.getItem('collection'))
      newCard = collection.find(card => card.id === newCardId)
      newCard.totalValue = cardTotalValue(newCard)
      localStorage.setItem('collection', JSON.stringify(collection))
      console.log(cardTotalValue(newCard))
      console.log(newCard)
      setCollectionValue(collectionMarketValue())
    }
  }

  // completely remove card from collection
  const removeFromLocalCollection = (c, v) => {
    let collection = JSON.parse(localStorage.getItem('collection'))
    let cardFromCollection = collection.find(card => card.id === c.id)
    // .findIndex() will find index of first element in array that satisfies the testing func
    let indexOfCardToRemove = collection.findIndex(card => {
      return card.id === cardFromCollection.id
    })
    collection.splice(indexOfCardToRemove, 1)
    localStorage.setItem('collection', JSON.stringify(collection))
    let updatedCollection = JSON.parse(localStorage.getItem('collection'))
    setCurrentCards()
    setCards(updatedCollection.sort(
      (d1, d2) =>
        new Date(d1.set.releaseDate).getTime() -
        new Date(d2.set.releaseDate).getTime()
    ))
    setCollectionValue(collectionMarketValue())
    hideModal()
  }

  // decrement card variation and recalc all variation info(ex. price, amount, totalVariationValue, totalcardvalue)
  const decrementCardVariation = (c, v) => {
    let collection = JSON.parse(localStorage.getItem('collection'))
    let cardFromCollection = collection.find(card => card.id === c.id)
    let variationAmount = cardFromCollection.variations[v].amount
    cardFromCollection.variations[v].amount = --variationAmount
    localStorage.setItem('collection', JSON.stringify(collection))

    collection = JSON.parse(localStorage.getItem('collection'))
    cardFromCollection = collection.find(card => card.id === c.id)
    cardFromCollection.totalValue = cardTotalValue(cardFromCollection)
    localStorage.setItem('collection', JSON.stringify(collection))
    setCollectionValue(collectionMarketValue())
    totalVariationValue(c, v)
  }

  const collectionMarketValue = () => {
    let collection = JSON.parse(localStorage.getItem('collection'))
    let sum = 0
    // for each card in collection...
    collection.forEach(c => {
      // look at the variation name in tcgplayer prices...
      if(Object.keys(c.tcgplayer.prices).forEach(v => {
        // variation names
        
      }) === Object.keys(c.variations).forEach(cv => {
        
      })) {
        Object.keys(c.tcgplayer.prices).forEach(v => {
          if(c.variations[v].amount > 0) {
            sum += c.tcgplayer.prices[v].market * c.variations[v].amount
          }
        })
      } 
    }) 
    return sum
  }
  
  // Create cardTotalVal property & value for each card in collection. Give each card a total value. total value = sum of both variations
  const cardTotalValue = (a) => {
    if(collectionMounted) {
      let collection = JSON.parse(localStorage.getItem('collection'))
      let tempArr = []
      let cardTotalVal = null
      let cardInCollection = collection.find(card => card.id === a.id)
      Object.keys(cardInCollection.tcgplayer.prices).forEach((v) => {
        tempArr.push(cardInCollection.tcgplayer.prices[v].market * cardInCollection.variations[v].amount)
        cardTotalVal = tempArr.reduce((varA, varB) => varA + varB)
      }) 
      return addZeroes(cardTotalVal)
    }
    return
  }

  const totalVariationValue = (c, v) => {
    let collection = JSON.parse(localStorage.getItem('collection'))
    let cardInCollection = collection.find(card => card.id === c.id)
    // if i put card variation info into its own div and give it an id named its variation(ex: 1stEdition), then I can access that div id name and use it to grab the variation amount
    let variationValue = cardInCollection.tcgplayer.prices[v].market * cardInCollection.variations[v].amount
    return addZeroes(variationValue)
  }

// , create two functions first to show modal second to hide modal, 
  const showModal = (e) => {
    setShowCardDetails(true)
    // console.log(e.target.id)
    setSelectedCard(e.target.id)
  }

  const hideModal = () => {
    setShowCardDetails(false)
    setSelectedCard()
  }

  function parseDate(oldDate) {
    let dateObj = new Date();
    let month = dateObj.getUTCMonth() + 1; //months from 1-12
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();

    let newdate = year + "/" + month + "/" + day;
  }

  const addZeroes = (num) => {
    if(num == undefined) {
      return ' - No Data Available - '
    } else {
      let newNum = num.toLocaleString("en", {useGrouping: false, minimumFractionDigits: 2})
      return `$${newNum}`
    }
 }

  const showCollectionAmount = (c,v) => {
    let collection = JSON.parse(localStorage.getItem('collection'))
    let cardInCollection = collection.find(card => card.id === c)
    
    // need to use a method on collection object that finds (.find?) the card matching 'c' AKA currentCards[selectedCard].id, then put that entire card object into a variable. then thatVariable.variations[v].amount will be the updated variation amount anytime function is ran
    let amountInCollection = cardInCollection.variations[v].amount
    return amountInCollection
  }
  
  // if currentCard[selectedCard].variations[v].amount 
  // need to check if selectedcard variation is greater than 0 inside collection
  // check selectedCard id and find card in collection with same id, put into variable. if cardInCollection.variations[v]
  const isCardVarInCollection = (cardSelected, v ) => {
    let collection = JSON.parse(localStorage.getItem('collection'))
    // let cardInCollectionVariation = collection.find(card => card.variations[selectedCardVariation]  === selectedCardVariation)
    
    if(collection.some(card => card.id === cardSelected.id)) {
      let cardInCollection = collection.find(card => card.id === cardSelected.id)
      if(cardInCollection.variations[v].amount > 0) {
        return true
      }
    }
    return false
  }


  console.log(collectionMounted)
  return (
    <PokeContext.Provider value={{ query, setQuery, isLoading, setIsLoading, error, setError, cards, setCards, currentPage, setCurrentPage, cardsPerPage, setCardsPerPage, indexOfLastCard, setIndexOfLastCard, indexOfFirstCard, setIndexOfFirstCard, currentCards, setCurrentCards, searchType, setSearchType, showCardDetails, setShowCardDetails, showModal, hideModal, selectedCard, setSelectedCard, parseDate, saveLocalCollection, formatCardVariation, getCardVariations, addVariations, collectionMounted, setCollectionMounted, onHomepage, setOnHomepage, collectionValue, setCollectionValue, collectionMarketValue, addZeroes, cardTotalValue, showCollectionAmount, totalVariationValue, removeFromLocalCollection, decrementCardVariation, isCardVarInCollection }}>
      {children}
    </PokeContext.Provider>
  );
}

export default PokeContext;