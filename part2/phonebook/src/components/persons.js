import Button from "./button";
import phoneNumberService from "../services/phoneNumbers";
import "../index.css";

const onClickDelete = (
  person,
  changeStateFunction,
  statusChangeMessageCarrier
) => {
  if (window.confirm(`Do  you want to delete ${person.name}`))
    phoneNumberService.remove(person.id).then(() =>
      phoneNumberService.getAll().then((response) => {
        statusChangeMessageCarrier(
          `Deleted "${person.name}" from phonebook.`,
          "delete"
        );
        changeStateFunction(response);
      })
    );
};

const DisplayPerson = ({
  person,
  onPersonChange,
  statusChangeMessageCarrier,
}) => (
  <div className="numberTile">
    <p className="text" key={person.name + "Title"}>
      {person.name}: {person.number}{" "}
    </p>
    <Button
      key={person.name + "Button"}
      text="Delete"
      onClick={() =>
        onClickDelete(person, onPersonChange, statusChangeMessageCarrier)
      }
      type="submit"
    />
  </div>
);

const Persons = ({
  persons,
  filterString,
  noFilterAppliedString,
  onPersonChange,
  statusChangeMessageCarrier,
}) => {
  return (
    <div>
      {persons.map((person) =>
        filterString !== noFilterAppliedString ? (
          person.name.includes(filterString) ? (
            <DisplayPerson
              key={person.name + "Display"}
              person={person}
              onPersonChange={onPersonChange}
              statusChangeMessageCarrier={statusChangeMessageCarrier}
            />
          ) : null
        ) : (
          <DisplayPerson
            key={person.name + "Display"}
            person={person}
            onPersonChange={onPersonChange}
            statusChangeMessageCarrier={statusChangeMessageCarrier}
          />
        )
      )}
    </div>
  );
};

export default Persons;
