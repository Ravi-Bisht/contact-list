import { useState } from "react";

const Contact = ({ data, updateDetails, deleteContact }) => {
  const [edit, setEdit] = useState(false);
  const [inputs, setInputs] = useState({
    name: data.name,
    email: data.email,
    phone: data.phone,
    website:data.website,
  });

  const handleInputsChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const cancelEdit = () => {
    setInputs({
      name: data.name,
      email: data.email,
      phone: data.phone,
      website:data.website,
    });
    setEdit(false);
  };

  const updateContact = async (e) => {
    e.preventDefault();
    await updateDetails({ id: data.id, ...inputs });
    setEdit(false);
  };

  return (
    <div className="contact">
      {edit ? (
        <form className="contact-details-edit" onSubmit={updateContact}>
          <div className="input-fields">
            <input
              type="text"
              name="name"
              onChange={handleInputsChange}
              value={inputs.name}
              required
              autoFocus
            />
            <input
              type="email"
              name="email"
              onChange={handleInputsChange}
              value={inputs.email}
              required
            />
            <input
              type="text"
              name="phone"
              onChange={handleInputsChange}
              value={inputs.phone}
              required
            />
            <input
              type="text"
              name="website"
              onChange={handleInputsChange}
              value={inputs.website}
              required
            />
          </div>

          <div className="buttons">
            <button>Update</button>
            <button onClick={cancelEdit}>Cancel</button>
          </div>
        </form>
      ) : (
        <div className="contact-details">
          <span>Name:&nbsp;{inputs.name}</span>
          <span>Email:&nbsp;{inputs.email}</span>
          <span>Phone:&nbsp;{inputs.phone}</span>
          <span>Website:&nbsp; {inputs.website}</span>
        </div>
      )}
      <div className="buttons">
        {!edit && (
          <>
            <button onClick={() => setEdit(true)}>Edit</button>
            <button onClick={() => deleteContact({ id: data.id, ...inputs })}>
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Contact;
