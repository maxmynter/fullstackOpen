import { useState, useEffect } from "react";
import axios from "axios";

const Button = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>;
};

const Country = ({ country, initialExpanded }) => {
  const [collapsed, setCollapsed] = useState(!initialExpanded);

  return (
    <div key={country.name.common}>
      {console.log(collapsed)}
      {collapsed ? (
        <>
          <p>
            {country.name.common}{" "}
            <Button
              text="Show"
              onClick={() => {
                setCollapsed(!collapsed);
              }}
            />
          </p>
        </>
      ) : (
        <>
          <h3>
            {country.name.common}{" "}
            <Button
              text="Hide"
              onClick={() => {
                setCollapsed(!collapsed);
              }}
            />
          </h3>
          <p>Capital: {country.capital[0]}</p>
          <p>Area: {country.area}</p>
          <h2>Languages: </h2>
          <ul>
            {console.log(country)}
            {Object.keys(country.languages).map((key) => (
              <li>{country.languages[key]}</li>
            ))}
          </ul>
          <img src={country.flags.png} />
        </>
      )}
    </div>
  );
};

const DisplayCountries = ({ countries }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter.</p>;
  } else {
    if (countries.length === 0) {
      return <p>Type to display matching results</p>;
    } else {
      return (
        <div>
          {countries.map((country) => (
            <div key={country.name.common}>
              {console.log("Display Coutries", country)}
              <Country country={country} initialExpanded={false} />
            </div>
          ))}
        </div>
      );
    }
  }
};

function App() {
  const [searchString, setSearchString] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    if (searchString.length > 0) {
      axios
        .get(`https://restcountries.com/v3.1/name/${searchString}`)
        .then((response) => {
          console.log(`Request for ${searchString}`);
          setCountries(response.data);
        });
    }
  }, [searchString]);

  const onChange = (event) => setSearchString(event.target.value);

  return (
    <div className="App">
      <form>
        <p>Find countries: </p> <input onChange={onChange} />
      </form>
      <DisplayCountries countries={countries} />
    </div>
  );
}

export default App;
