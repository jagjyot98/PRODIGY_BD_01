// App.jsx
import { useState } from 'react';
import './App.css';

const API_BASE = 'http://localhost:3000';

function App() {
  const [form, setForm] = useState({ name: '', email: '', age: '' });
  const [userId, setUserId] = useState('');
  const [fetchedUser, setFetchedUser] = useState(null);
  const [updateForm, setUpdateForm] = useState({ id: '', name: '', email: '', age: '' });
  const [allUsers, setAllUsers] = useState([]);
  const [deleteId, setDeleteId] = useState('');
  const [createMessage, setCreateMessage] = useState('');
  const [getUserMessage, setGetUserMessage] = useState('');
  const [deleteMessage, setDeleteMessage] = useState('');
  const [updateMessage, setUpdateMessage] = useState('');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

  const handleChange = (e, setter) => {
    setter(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCreate = async () => {
    if (!emailRegex.test(form.email)) {
      setCreateMessage('Invalid email format');
      return;
    }
    const res = await fetch(`${API_BASE}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setCreateMessage(res.ok ? `User created with ID: ${data.id}` : data.error);
    setForm({ createName: '', createEmail: '', createAge: '' });
  };

  const handleFetchById = async () => {
    const res = await fetch(`${API_BASE}/users/${userId}`);
    const data = await res.json();
    setFetchedUser(res.ok ? data : null);
    setGetUserMessage(res.ok ? '' : data.error);
  };

const handleDelete = async () => {
  const res = await fetch(`${API_BASE}/users/${deleteId}`, { method: 'DELETE' });
  const data = await res.json();
  setDeleteMessage(data.message || data.error);
};

  const handleUpdate = async () => {
    if (!emailRegex.test(updateForm.email)) {
      setMessage('Invalid email format');
      return;
    }
    const res = await fetch(`${API_BASE}/users/${updateForm.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateForm),
    });
    const data = await res.json();
    setUpdateMessage(res.ok ? data.message : data.error);
  };

  const handleGetAll = async () => {
    const res = await fetch(`${API_BASE}/users`);
    const data = await res.json();
    setAllUsers(data);
  };

  return (
    <div>
      <h1 style={{ textAlign:'center'}}>Users' Catalogue</h1>
      <h2 style={{ textAlign:'center'}}>Create User</h2> {createMessage && <p style={{ textAlign:'left'}}>{createMessage}</p>}
      <input name="createName" placeholder="Name" onChange={(e) => handleChange(e, setForm)} />
      <input name="createEmail" placeholder="Email" onChange={(e) => handleChange(e, setForm)} />
      <input name="createAge" type="number" placeholder="Age" onChange={(e) => handleChange(e, setForm)} />
      <button style={{ margin: '10px', fontFamily: 'Arial' }} onClick={handleCreate}>Create</button>

      <h2>Get User by ID</h2> {getUserMessage && <p style={{ textAlign:'left'}}>{getUserMessage}</p>}
      <input  placeholder="User ID" onChange={(e) => setUserId(e.target.value)} />
      <button style={{ margin: '10px', fontFamily: 'Arial' }} onClick={handleFetchById}>Fetch</button>
      {fetchedUser && <pre>{JSON.stringify(fetchedUser, null, 2)}</pre>}

      <h2>Delete User by ID</h2> {deleteMessage && <p style={{ textAlign:'left'}}>{deleteMessage}</p>}
      <input placeholder="User ID to Delete" onChange={(e) => setDeleteId(e.target.value)}/>
      <button style={{ margin: '10px', fontFamily: 'Arial' }} onClick={handleDelete}>Delete</button>

      <h2>Update User</h2> {updateMessage && <p style={{ textAlign:'left'}}>{updateMessage}</p>}
      <input name="id" placeholder="User ID" onChange={(e) => handleChange(e, setUpdateForm)} />
      <input ame="name" placeholder="Name" onChange={(e) => handleChange(e, setUpdateForm)} />
      <input name="email" placeholder="Email" onChange={(e) => handleChange(e, setUpdateForm)} />
      <input name="age" type="number" placeholder="Age" onChange={(e) => handleChange(e, setUpdateForm)} />
      <button style={{ margin: '10px', fontFamily: 'Arial' }} onClick={handleUpdate}>Update</button>

      <h2>View All Users</h2> 
      <button style={{ margin: '10px', fontFamily: 'Arial' }} onClick={handleGetAll}>Get All Users</button>
      {allUsers.length > 0 && <pre>{JSON.stringify(allUsers, null, 2)}</pre>}

      
    </div>
  );
}

export default App;
