import React, { useEffect, useState } from 'react';
import { auth, db } from '../../firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { uid } from 'uid';
import { set, ref, onValue, remove } from 'firebase/database';

const Homepage = () => {
  const navigate = useNavigate();
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        onValue(ref(db, `/${auth.currentUser.uid}`), (snapshot) => {
          setTodos([]);
          const data = snapshot.val();
          if (data != null) {
            Object.values(data).map((todo) => {
              setTodos((oldArray) => [...oldArray, todo]);
            });
          }
        });
      } else if (!user) {
        navigate('/');
      }
    });
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate('/');
      })
      .catch((err) => alert(err.message));
  };

  const writeTodoToDb = () => {
    const uidd = uid();
    set(ref(db, `/${auth.currentUser.uid}/${uidd}`), {
      todo: todo,
      uid: uidd,
    });

    setTodo('');
  };

  const handleDelete = (uid) => {
    remove(ref(db, `/${auth.currentUser.uid}/${uid}`));
  };

  return (
    <>
      <input
        type="text"
        placeholder="Add new todo"
        onChange={(e) => setTodo(e.target.value)}
        value={todo}
      />
      {todos.map((todo) => (
        <div>
          <h1>{todo.todo}</h1>
          <button type="button" onClick={() => handleDelete(todo.uid)}>
            Delete entry
          </button>
        </div>
      ))}
      <button type="button" onClick={writeTodoToDb}>
        Add
      </button>
      <button type="button" onClick={handleSignOut}>
        Sign Out
      </button>
    </>
  );
};

export default Homepage;
