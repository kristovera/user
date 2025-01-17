import React, { useState } from 'react';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import LoginForm from './components/LoginForm';
import './style.css';

function App() {
  const [users, setUsers] = useState([
    { id: 1, name: 'Admin User', email: 'admin@example.com', password: 'admin123', isAdmin: true },
    { id: 2, name: 'John Doe', email: 'john@example.com', password: 'john123', isAdmin: false },
  ]);

  const [currentUser, setCurrentUser] = useState(null);

  const addUser = (user) => {
    setUsers([...users, { ...user, id: Date.now(), isAdmin: false }]);
  };

  const updateUser = (id, updatedUser) => {
    setUsers(users.map((user) => (user.id === id ? updatedUser : user)));
  };

  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const loginUser = (email, password) => {
    const user = users.find((u) => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      alert(`Welcome, ${user.name}!`);
    } else {
      alert('Invalid email or password!');
    }
  };

  const logoutUser = () => {
    setCurrentUser(null);
    alert('You have been logged out.');
  };

  return (
    <div className="App">
      <h1>User Management</h1>
      {currentUser ? (
        <>
          <p>Logged in as: {currentUser.name} {currentUser.isAdmin && <strong>(Admin)</strong>}</p>
          <button onClick={logoutUser}>Logout</button>
          {currentUser.isAdmin && <UserForm addUser={addUser} />}
          <UserList
            users={users}
            updateUser={updateUser}
            deleteUser={deleteUser}
            currentUser={currentUser}
          />
        </>
      ) : (
        <LoginForm loginUser={loginUser} />
      )}
    </div>
  );
}

export default App;
