import React from "react";

const CountryList = ({ countries, handleShowCountry }) => {
  return (
    <div>
      {countries.map((country) => (
        <div key={country.name}>
          {country.name}{" "}
          <button key={country.name} onClick={handleShowCountry(country)}>
            show
          </button>
        </div>
      ))}
    </div>
  );
};

export default CountryList;
