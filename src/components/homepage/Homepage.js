import React, { useEffect, useState } from 'react';
import './homepage.scss';
import { auth, db } from '../../firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { uid } from 'uid';
import { set, ref, onValue, remove } from 'firebase/database';
import AddTask from '../addTask/AddTask';

const Homepage = () => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [modalState, setModalState] = useState(false);

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

  const handleDelete = (uid) => {
    remove(ref(db, `/${auth.currentUser.uid}/${uid}`));
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setModalState(true)}
        data-toggle="modal"
        data-target="#myModal"
      >
        Create a task
      </button>
      {modalState ? (
        <div className="modal fade" id="myModal" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="close"
                  onClick={() => setModalState(false)}
                  data-dismiss="modal"
                >
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <AddTask />
              </div>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
      {todos.map((todo) => (
        <div key={todo.id}>
          <h1>{todo.title}</h1>
          <button type="button" onClick={() => handleDelete(todo.id)}>
            Delete entry
          </button>
        </div>
      ))}
      <button type="button" onClick={handleSignOut}>
        Sign Out
      </button>
    </>
  );
};

export default Homepage;
