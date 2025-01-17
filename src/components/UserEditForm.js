import React, { useState } from 'react';

const UserEditForm = ({ user, updateUser, setEditingUserId }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(user.id, { id: user.id, name, email });
    setEditingUserId(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Save</button>
      <button type="button" onClick={() => setEditingUserId(null)}>
        Cancel
      </button>
    </form>
  );
};

export default UserEditForm;
