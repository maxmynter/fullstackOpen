import { useState } from "react";
import WeatherInCapital from "./weatherInCapital";

const Button = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>;
};

const Country = ({ country, initialExpanded }) => {
  const [collapsed, setCollapsed] = useState(!initialExpanded);

  return (
    <div key={country.name.common}>
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
            {Object.keys(country.languages).map((key) => (
              <li key={key}>{country.languages[key]}</li>
            ))}
          </ul>
          <img src={country.flags.png} alt="" />
          <WeatherInCapital capital={country.capital[0]} />
        </>
      )}
    </div>
  );
};

export default Country;
