import Country from "./country";

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
              <Country country={country} initialExpanded={false} />
            </div>
          ))}
        </div>
      );
    }
  }
};

export default DisplayCountries;
