import Button from "./button";
import phoneNumberService from "../services/phoneNumbers";

const onClickDelete = (person, changeStateFunction) => {
  if (window.confirm(`Do  you want to delete ${person.name}`))
    phoneNumberService
      .remove(person.id)
      .then(() =>
        phoneNumberService
          .getAll()
          .then((response) => changeStateFunction(response))
      );
};

const DisplayPerson = ({ person, onPersonChange }) => (
  <>
    <p key={person.name + "Title"}>
      {person.name}: {person.number}{" "}
    </p>
    <Button
      key={person.name + "Button"}
      text="Delete"
      onClick={() => onClickDelete(person, onPersonChange)}
      type="submit"
    />
  </>
);

const Persons = ({
  persons,
  filterString,
  noFilterAppliedString,
  onPersonChange,
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
            />
          ) : null
        ) : (
          <DisplayPerson
            key={person.name + "Display"}
            person={person}
            onPersonChange={onPersonChange}
          />
        )
      )}
    </div>
  );
};

export default Persons;
