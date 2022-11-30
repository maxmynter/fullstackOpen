import { useState } from "react";
import PersonForm from "./components/personform";
import Input from "./components/input";
import Filter from "./components/filter";
import Heading from "./components/heading";
import Persons from "./components/persons";

const App = () => {
  const noFilterAppliedString = "";
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "015205724990" },
  ]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterString, setFilterstring] = useState(noFilterAppliedString);

  const onSubmit = (event) => {
    event.preventDefault();
    if (persons.map((person) => person.name).includes(newName)) {
      alert(`${newName} already in phonebook. `);
      setNewName("");
      setNewNumber("");
    } else {
      let newPersons = [...persons, { name: newName, number: newNumber }];
      setPersons(newPersons);
      setNewName("");
      setNewNumber("");
    }
  };

  const personFormInputs = [
    <Input
      prefix="Name: "
      value={newName}
      onChange={(event) => setNewName(event.target.value)}
    />,
    <Input
      prefix="Number: "
      value={newNumber}
      onChange={(event) => setNewNumber(event.target.value)}
    />,
  ];

  return (
    <div>
      <Heading text="Phonebook" />
      <Filter
        value={filterString}
        onChange={(event) => setFilterstring(event.target.value)}
      />
      <Heading text="Add New" />
      <PersonForm inputs={personFormInputs} onSubmit={onSubmit} />
      <Heading text="Numbers" />
      <Persons
        persons={persons}
        filterString={filterString}
        noFilterAppliedString={noFilterAppliedString}
      />
    </div>
  );
};

export default App;
