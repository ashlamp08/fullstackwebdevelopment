import React, { useState, useEffect } from "react";
import axios from "axios";
import CountryDetails from "./components/CountryDetails";
import CountryList from "./components/CountryList";

const App = () => {
  const COUNTRIES_API_BASE_URL = "https://restcountries.com/v3.1/all";
  const [countryList, setCountryList] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [countryToDisplay, setCountryToDisplay] = useState(null);

  const loadCountries = () => {
    axios.get(COUNTRIES_API_BASE_URL).then((response) => {
      console.log("extracted all countries");
      setCountryList(
        response.data.map((country) => {
          return {
            name: country.name.common,
            capital: country.capital,
            population: country.population,
            languages: country.languages,
            flag: country.flags.png,
          };
        })
      );
    });
  };

  useEffect(loadCountries, []);

  const handleSearchString = (event) => {
    setSearchString(event.target.value);
    setCountryToDisplay(null);
  };

  const handleCountryToDisplay = (country) => {
    return () => {
      setCountryToDisplay(country);
    };
  };

  const countryListToShow = countryList.filter((country) => {
    return country.name.toLowerCase().includes(searchString.toLowerCase());
  });

  const display =
    countryListToShow.length >= 10
      ? "showNone"
      : countryListToShow.length === 1
      ? "showOne"
      : "showAll";

  return (
    <div>
      <div>
        Find Countries :{" "}
        <input value={searchString} onChange={handleSearchString}></input>
      </div>
      {(() => {
        switch (display) {
          case "showNone":
            return <div>Too many matches, specify another filter</div>;
          case "showAll":
            return (
              <CountryList
                countries={countryListToShow}
                handleShowCountry={handleCountryToDisplay}
              ></CountryList>
            );
          case "showOne":
            return (
              <CountryDetails country={countryListToShow[0]}></CountryDetails>
            );
          default:
        }
      })()}
      {display !== "showOne" && countryToDisplay !== null && (
        <CountryDetails country={countryToDisplay}></CountryDetails>
      )}
    </div>
  );
};

export default App;
