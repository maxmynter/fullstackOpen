const Persons = ({ persons, filterString, noFilterAppliedString }) => {
  return (
    <div>
      {persons.map((person) => {
        if (filterString !== noFilterAppliedString) {
          return person.name.includes(filterString) ? (
            <p key={person.name}>
              {person.name}: {person.number}
            </p>
          ) : null;
        } else {
          return (
            <p key={person.name}>
              {person.name}: {person.number}
            </p>
          );
        }
      })}
    </div>
  );
};

export default Persons;
