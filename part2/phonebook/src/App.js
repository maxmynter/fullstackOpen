import { useState, useEffect } from "react";
import PersonForm from "./components/personform";
import Input from "./components/input";
import Filter from "./components/filter";
import Heading from "./components/heading";
import Persons from "./components/persons";
import phoneNumberService from "./services/phoneNumbers";

const App = () => {
  const noFilterAppliedString = "";
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterString, setFilterstring] = useState(noFilterAppliedString);

  useEffect(() => {
    phoneNumberService.getAll().then((response) => setPersons(response));
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    if (persons.map((person) => person.name).includes(newName)) {
      let personInPhonebook = persons.find((person) => person.name === newName);
      if (
        window.confirm(
          `${newName} already in phonebook. Do you want to replace their number ${personInPhonebook.number} with ${newNumber}?`
        )
      )
        phoneNumberService
          .update({ ...personInPhonebook, number: newNumber })
          .then(() =>
            phoneNumberService
              .getAll()
              .then((newPersons) => setPersons(newPersons))
          );
    } else {
      const newNumberObject = { name: newName, number: newNumber }; // Here defined w/o id. Gets id from server
      phoneNumberService
        .create(newNumberObject)
        .then(() =>
          phoneNumberService
            .getAll() // Fetch again from server to get all Persons (and with new persons id)
            .then((newPersons) => setPersons(newPersons))
        )
        .catch((error) => console.log(error));
    }
    setNewName("");
    setNewNumber("");
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
        onPersonChange={setPersons}
      />
    </div>
  );
};

export default App;
