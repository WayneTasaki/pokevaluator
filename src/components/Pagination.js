import React from 'react'
import { useContext, useEffect } from 'react'
import PokeContext from './PokeContext'

const Pagination = ({totalCards, paginate}) => {
  const { query, setQuery, isLoading, setIsLoading, error, setError, cards, setCards, currentPage, setCurrentPage, cardsPerPage, setCardsPerPage, indexOfLastCard, setIndexOfLastCard, indexOfFirstCard, setIndexOfFirstCard, currentCards, setCurrentCards } = useContext(PokeContext)
  
  const pageNumbers = []

  for(let i = 1; i <= Math.ceil(totalCards / cardsPerPage); i++) {
    pageNumbers.push(i)
  }

  let allPages = document.getElementsByTagName('button')
  
  useEffect(() => {
    paginate(1)
  }, [])
  
  return (
    // have currentPage button be highlighted to indicate what page you're on
      <ul className='pagination-wrapper' style={{listStyle: 'none'}}>
        
        {pageNumbers.map(n => (
          <li key={n}>
            <button className='page-buttons' id={n} onClick={() => paginate(n, allPages)}>
              {n}
            </button>
          </li>
        ))}
      </ul>
    
  )
}

export default Pagination