import React from "react";

const Persons = ({ persons, handleDelete }) => {
  return (
    <>
      {persons.map((person) => (
        <div key={person.name}>
          {person.name} {person.number}{" "}
          <input
            type="button"
            key={person.name}
            value="delete"
            onClick={handleDelete(person)}
          ></input>
        </div>
      ))}
    </>
  );
};

export default Persons;
