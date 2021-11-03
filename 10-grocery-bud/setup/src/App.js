import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if (list) {
    return JSON.parse(list)
  } else {
    return []
  }
}
// allow to retrieve data when refreshing the page 

function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState(getLocalStorage);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      setAlert({ show: true, msg: 'please enter value', type: 'danger' })
    } else if (name && isEditing) {
      setList(list.map((item) => {
        if (item.id === editId) {
          return { ...item, title: name }
        }
        return item
      }))
      setName('');
      setEditId(null);
      setIsEditing(false);
      setAlert({ show: true, type: 'success', msg: `edited` })

    } else {
      setAlert({ show: true, msg: `${name} added`, type: 'success' })
      const newItem = {
        id: new Date().getTime().toString(),
        title: name
      }
      setList([...list, newItem]);
      setName('');
    }
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAlert(false)
    }, 1500)
    return () => clearTimeout(timeout)
  }, [alert])

  const removeItem = (id, name) => {
    setAlert({ show: true, type: 'danger', msg: `${name} removed` });
    setList(list.filter((item) => item.id !== id));
  }

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditId(id);
    setName(specificItem.title);
  }

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])

  return <section className="section-center">
    <form className="grocery-form" onSubmit={handleSubmit}>
      {alert.show && <Alert {...alert} />}
      <h3> grocery list </h3>
      <div className="form-control">
        <input type="text"
          className="grocery"
          placeholder="e.g. eggs"
          value={name}
          onChange={(e) => { setName(e.target.value) }}
        />
        <button type="submit" className="submit-btn">
          {isEditing ? 'edit' : 'submit'}
        </button>
      </div>
    </form>
    {list.length > 0 && (
      <div className="grocery-container">
        <List items={list}
          removeItem={removeItem}
          editItem={editItem}
        />
        <button classname="clear-btn"
          onClick={() => {
            setList([]);
            setAlert({ show: true, msg: "cleared the list", type: "success" })
          }}
        >
          clear items </button>
      </div>
    )}
  </section>
}

export default App
