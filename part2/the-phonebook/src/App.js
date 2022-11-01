import { useState, useEffect } from "react";
import axios from "axios";
import Persons from "./Persons";
import Form from "./Form";
import Filter from "./Filter";
import personsService from "./personsService";

function getId() {
  return Math.floor(Math.random() * 10 ** 10);
}

function Notification({ notificationMessage, notificationType }) {
  let styleObj;

  if (notificationType === "success") {
    styleObj = {
      color: "green",
      backgroundColor: "grey",
      border: "5px solid green",
      padding: "10px 15px",
    };
  }
  if (notificationType === "error") {
    styleObj = {
      color: "#b22222",
      backgroundColor: "grey",
      border: "5px solid #b22222",
      padding: "10px 15px",
    };
  }

  if (!notificationMessage || !notificationType) {
    return null;
  }
  return <h2 style={styleObj}>{notificationMessage}</h2>;
}

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationType, setNotificationType] = useState(null);

  function handleApiError(err) {
    if (err?.response?.data?.error) {
      flashNotification(err.response.data.error, "error");
    } else {
      flashNotification(err.message || "something went very wrong", "error");
    }
    console.log(err);
  }

  useEffect(() => {
    personsService
      .getAll()
      .then(setPersons)
      .catch((err) => {
        handleApiError(err);
      });
  }, []);

  //helpers for working with persons state
  function getId(name) {
    const name_to_find = name;
    const person = persons.find(({ name }) => name == name_to_find);
    return person.id;
  }

  function replacePerson(person) {
    const filtered = persons.filter(({ id }) => {
      return id !== person.id;
    });
    const newPersons = [...filtered, person];
    setPersons(newPersons);
  }

  function uniqueName(newName, persons) {
    return persons.map(({ name }) => name).indexOf(newName) === -1;
  }

  //actions which both call backend service and update persons state

  const updatePerson = () => {
    const id = getId(newName);
    personsService
      .update(id, { name: newName, number: newNumber })
      .then((person) => {
        replacePerson(person);
      })
      .catch((err) => {
        handleApiError(err);
      });
  };

  const removePerson = (remove_id) => {
    const person = persons.find((person) => person.id == remove_id);
    const { name } = person;
    personsService
      .remove(remove_id)
      .then((res) => {
        console.log(res);
        const newPersons = persons.filter(({ id }) => id != remove_id);
        setPersons(newPersons);
        flashNotification(`successfully deleted ${name}`, "success");
      })
      .catch((err) => {
        console.error(err);
        handleApiError(err);
      });
  };

  const createNewPerson = () => {
    personsService
      .create({ name: newName, number: newNumber })
      .then((person) => {
        setPersons([...persons, { ...person }]);
        flashNotification(`successfully added ${newName}`, "success");
      })
      .catch((err) => {
        handleApiError(err);
      });
  };

  //flash notification for 2 seconds
  function flashNotification(message, type) {
    setNotificationMessage(message);
    setNotificationType(type);

    setTimeout(() => {
      setNotificationMessage(null);
      setNotificationType(null);
    }, 2000);
  }

  //handlers for changes on ui

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (uniqueName(newName, persons)) {
      createNewPerson();
      return;
    }

    const shouldReplaceNumber = window.confirm(
      `${newName} is already added to the phone book, replace the old number with a new one?`
    );

    if (shouldReplaceNumber) updatePerson();
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        notificationMessage={notificationMessage}
        notificationType={notificationType}
      />
      <Filter handleFilterChange={handleFilterChange} />
      <h2>Add a new</h2>
      <Form {...{ handleNameChange, handleNumberChange, handleSubmit }} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} removePerson={removePerson} />
    </div>
  );
};

export default App;
