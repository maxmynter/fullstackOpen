import { useState, useEffect } from "react";
import axios from "axios";
import DisplayCountries from "./components/displayCountries";

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
