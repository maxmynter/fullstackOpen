import { useState, useEffect } from "react";
import PersonForm from "./components/personform";
import Input from "./components/input";
import Filter from "./components/filter";
import Heading from "./components/heading";
import Persons from "./components/persons";
import phoneNumberService from "./services/phoneNumbers";
import DisplayStatusUpdate from "./components/statusUpdate";
import "./index.css";

const App = () => {
  const noFilterAppliedString = "";
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterString, setFilterstring] = useState(noFilterAppliedString);
  const [phoneNumberStatus, setPhoneNumberStatus] = useState(null);
  const [phoneNumberStatusType, setPhoneNumberStatusType] = useState("update");

  useEffect(() => {
    phoneNumberService.getAll().then((response) => setPersons(response));
  }, []);

  const timedPhoneNumberStatusMessage = (message, type) => {
    setPhoneNumberStatusType(type);
    setPhoneNumberStatus(message);
    setTimeout(() => {
      setPhoneNumberStatus(null);
    }, 5000);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (persons.map((person) => person.name).includes(newName)) {
      let personInPhonebook = persons.find((person) => person.name === newName);
      if (
        window.confirm(
          `"${newName}" is already in phonebook. Do you want to replace their number ${personInPhonebook.number} with ${newNumber}?`
        )
      )
        phoneNumberService
          .update({ ...personInPhonebook, number: newNumber })
          .then(() =>
            phoneNumberService.getAll().then((newPersons) => {
              setPersons(newPersons);
              timedPhoneNumberStatusMessage(
                `Changed phonebook entry "${personInPhonebook.name}."`,
                "update"
              );
            })
          )
          .catch(() => {
            timedPhoneNumberStatusMessage(
              `Did not find "${personInPhonebook.name}" on server. Updating...`,
              "error"
            );
            phoneNumberService.getAll().then((personsFromServer) => {
              setPersons(personsFromServer);
            });
          });
    } else {
      const newNumberObject = { name: newName, number: newNumber }; // Here defined w/o id. Gets id from server
      phoneNumberService
        .create(newNumberObject)
        .then(() =>
          phoneNumberService
            .getAll() // Fetch again from server to get all Persons (and with new persons id)
            .then((newPersons) => {
              setPersons(newPersons);
              timedPhoneNumberStatusMessage(
                `Added "${newNumberObject.name}" to phonebook.`,
                "update"
              );
            })
        )
        .catch((error) => {
          timedPhoneNumberStatusMessage(error.response.data.error, "error");
          console.log("ERROR: ", error.response.data.error);
        });
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
      <DisplayStatusUpdate
        message={phoneNumberStatus}
        type={phoneNumberStatusType}
      />
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
        statusChangeMessageCarrier={timedPhoneNumberStatusMessage}
      />
    </div>
  );
};

export default App;
