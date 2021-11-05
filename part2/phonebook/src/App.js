import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personsService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  useEffect(() => {
    personsService.getAll().then((person) => {
      setPersons(person);
    });
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  const handleDelete = (person) => {
    return () => {
      const confirmation = window.confirm(`Delete ${person.name}?`);
      if (confirmation) {
        personsService.deleteById(person.id).then((response) => {
          setPersons(persons.filter((p) => p.id !== person.id));
        });
      }
    };
  };

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(newFilter.toLocaleLowerCase())
  );

  const addPerson = (event) => {
    event.preventDefault();
    if (newName === "" || newNumber === "") {
      alert("Cannot add empty name or number");
    } else if (persons.findIndex((person) => person.name === newName) === -1) {
      const newPerson = { name: newName, number: newNumber };
      personsService.create(newPerson).then((person) => {
        setPersons(persons.concat(person));
      });
      setNewName("");
      setNewNumber("");
    } else {
      const person = persons.find((person) => person.name === newName);
      const personToUpdate = { ...person, number: newNumber };
      const confirmation = window.confirm(
        `${personToUpdate.name} is already added to phonebook, replace the old number with a new one?`
      );
      if (confirmation) {
        personsService
          .updateById(personToUpdate.id, personToUpdate)
          .then((returnedPerson) => {
            setPersons(
              persons.map((p) =>
                p.name === returnedPerson.name ? returnedPerson : p
              )
            );
          });
        setNewName("");
        setNewNumber("");
      }
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={handleFilterChange} filter={newFilter}></Filter>
      <h2>Add a new</h2>
      <PersonForm
        onSubmit={addPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        name={newName}
        number={newNumber}
      ></PersonForm>
      <h2>Numbers</h2>
      <Persons persons={personsToShow} handleDelete={handleDelete}></Persons>
    </div>
  );
};

export default App;
