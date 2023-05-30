import axios from "axios";
import { useState, useEffect } from "react";
import Loader from "./Loader";
import Contact from "./Contact";

function Home() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
//   const [edit, setEdit] = useState(false);

  const [newContact, setNewContact] = useState({
    name: "",
    email: "",
    phone:"",
    website:"",
  });

  // fetching the data from API and setting state 

  useEffect(() => {
    setLoading(true);
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => setContacts(json));
      setLoading(false);
  }, []);


  // adding the new contact using post request
  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    const addedContact = await axios.post(
      "https://jsonplaceholder.typicode.com/users"
    );
    setLoading(false);
    console.log(addedContact);
    setContacts((prev) => [
      {
        id: addedContact.data.id ,
        ...newContact,
      },
      ...prev,
    ]);    
    console.log(contacts)
    setNewContact({
      name: "",
      email: "",
      phone: "",
      website: "",
    });
    setShowContactForm(false);
  };

  console.log(contacts)


  const deleteContact = async (contact) => {
    setLoading(true);
    
    await axios.delete(
      `https://jsonplaceholder.typicode.com/users/${contact.id}`
    );
    setLoading(false);
    const newArray = contacts.filter((item) => item.id !== contact.id);
    setContacts(newArray);
  };

  const changeInput = (e) => {
    setNewContact((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

    const updateDetails = async (updatedData) => {
    setLoading(true);
    const res = await axios.put("https://jsonplaceholder.typicode.com/users/1");
    console.log(res);
    setLoading(false);
    const newArray = contacts.map((item) => {
      if (item.id === updatedData.id) {
        const updatedContact = {
          id: updatedData.id,
          ...updatedData,
        };
        // console.log( updatedContact);
        return updatedContact;
      }
      return item;
    });
    console.log( newArray);
    setContacts(newArray);
 
  };
  return (
    <div className="container">
      <h1 className="heading">Contact List App</h1>
      <button onClick={() => setShowContactForm(true)}>Add contact</button>
      {showContactForm && (
        <div className="contact-form-container">
          <div className="contact-form">
            <p
              onClick={() => setShowContactForm(false)}
              style={{ color: "white", fontsize: 30, cursor: "pointer" }}
            >
              Close
            </p>
            <form className="form" onSubmit={submitForm}>
              <h1 style={{ color: "white" }}>Enter contact details.</h1>
              <div className="contact-info">
                <input
                  type="text"
                  name="name"
                  value={newContact.name}
                  onChange={changeInput}
                  required
                  placeholder="Contact Name"
                />
                <input
                  type="email"
                  name="email"
                  value={newContact.email}
                  onChange={changeInput}
                  required
                  placeholder="Contact Email"
                />
                <input
                  type="text"
                  name="phone"
                  value={newContact.phone}
                  onChange={changeInput}
                  required
                  placeholder="phone"
                />
                <input
                  type="text"
                  name="website"
                  value={newContact.website}
                  onChange={changeInput}
                  required
                  placeholder="website"
                />
              </div>
              <input type="submit" value="Add Contact" />
            </form>
          </div>
        </div>
      )}

      {contacts?.map((contact) => (
        <Contact
          key={contact.id}
          data={contact}
          updateDetails={updateDetails}
          deleteContact={deleteContact}
        />
      ))}
      {loading && <Loader />}
    </div>
  );
}

export default Home;
