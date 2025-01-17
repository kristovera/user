import React, { useState } from 'react';
import UserEditForm from './UserEditForm';

const UserList = ({ users, updateUser, deleteUser, currentUser }) => {
  const [editingUserId, setEditingUserId] = useState(null);

  const promoteToAdmin = (id) => {
    const updatedUsers = users.map((user) =>
      user.id === id ? { ...user, isAdmin: true } : user
    );
    updateUser(id, updatedUsers.find((user) => user.id === id));
  };


  const demoteFromAdmin = (id) => {
    const updatedUsers = users.map((user) =>
      user.id === id ? { ...user, isAdmin: false } : user
    );
    updateUser(id, updatedUsers.find((user) => user.id === id));
  };

  return (
    <div>
      <h2>List of Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {editingUserId === user.id ? (
              <UserEditForm
                user={user}
                updateUser={updateUser}
                setEditingUserId={setEditingUserId}
              />
            ) : (
              <>
                <span>
                  {user.name} ({user.email}) {user.isAdmin && <strong>(Admin)</strong>}
                </span>
                {/* Tombol untuk Promote/Demote hanya tersedia bagi admin */}
                {currentUser.isAdmin && (
                  <>
                    <button onClick={() => setEditingUserId(user.id)} className="edit">Edit</button>
                    <button onClick={() => deleteUser(user.id)} className="delete">Delete</button>
                    {!user.isAdmin && (
                      <button onClick={() => promoteToAdmin(user.id)} className="promote">
                        Promote to Admin
                      </button>
                    )}
                    {user.isAdmin && user.id !== currentUser.id && (
                      <button onClick={() => demoteFromAdmin(user.id)} className="demote">
                        Demote Admin
                      </button>
                    )}
                  </>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
