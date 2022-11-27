import { useState, useContext, useEffect, useRef } from "react";
import { Router, Routes, Link } from "react-router-dom";
import PokeContext from "./PokeContext";
import pokemon from "pokemontcgsdk";
import Search from "../Search";
import search from '../images/search.png'
import pokeball from '../images/pokeball.svg'
pokemon.configure({ apiKey: process.env.REACT_APP_API_KEY });

function SearchBar() {

  // context
  const {
    query,
    setQuery,
    isLoading,
    setIsLoading,
    error,
    setError,
    cards,
    setCards,
    currentPage,
    setCurrentPage,
    cardsPerPage,
    setCardsPerPage,
    indexOfLastCard,
    setIndexOfLastCard,
    indexOfFirstCard,
    setIndexOfFirstCard,
    currentCards,
    setCurrentCards,
    searchType,
    setSearchType,
    onHomepage,
    setOnHomepage, 
    searchOccured, 
    setSearchOccurred
  } = useContext(PokeContext);
  
  // gets value from search input, turns it into string, and sets that as the state for 'query'
  const getValue = () => {
    const input = document.getElementById("query").value;
    setQuery(JSON.stringify(input));
  };

  // creates state for search bar placeholder text, changes the searchType and placeholder text based on if the checkbox is checked. Fires onChange
  const [searchPlaceholder, setSearchPlaceholder] = useState("Search by name");
  const changeSearchType = (e) => {
    if (e.target.checked) {
      setSearchType("number");
      setSearchPlaceholder("Search by number");
    } else {
      setSearchType("name");
      setSearchPlaceholder("Search by name");
    }
  };

  // main search function. changes several states which gets the results ready for the Pagination component to work properly
  const fetchQuery = () => {
    pokemon.card
      .all({ q: `${searchType}:${query}` })
      .then((res) => {
        setCards(
          [res][0].sort(
            (d1, d2) =>
              new Date(d1.set.releaseDate).getTime() -
              new Date(d2.set.releaseDate).getTime()
          )
        );
        setCurrentPage(1);
        setIndexOfLastCard(currentPage * cardsPerPage);
        setIndexOfFirstCard(indexOfLastCard - cardsPerPage);
        if (res[0].length <= 0) {
          setError("Sorry, no card found");
        } else {
          setError("");
        }
        setCurrentCards([res][0].slice(indexOfFirstCard, indexOfLastCard));
        setIsLoading(false);
      })
      .catch((err) => {
        if (err.name === "TypeError") {
        }
        setError("Sorry, no card found");
        setIsLoading(false);
      });
  };

  // resets all previous search results and runs the fetchQuery function
  const handleSubmit = (e) => {
    setSearchOccurred(true)
    e.preventDefault();
    // consolidate functions that reset
    setCurrentCards();
    setCards([]);
    // setCurrentCards()
    setIsLoading(true);
    fetchQuery();
  };

  return (
    
    <>

      
      <form onSubmit={handleSubmit}>

      <div className="form-field">
        <input
              type="text"
              id="query"
              onInput={getValue}
              placeholder={searchPlaceholder}
        />
        <img src={search} className='icon'/>
      </div>
      
          
          <div className="search-text-wrapper">
            <input
              type="checkbox"
              id="cardNumberSearch"
              name="cardNumberSearch"
              onChange={(e) => changeSearchType(e)}
            />
            <label className="search-label" htmlFor="cardNumberSearch">Search by card number</label>
          </div>

          {/* <button type="submit" className="submit" >Search</button> */}
        {error && <p>{error}</p>}
      </form>
      </>
  );
}

export default SearchBar;
