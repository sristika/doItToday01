import React, { useEffect, useState } from 'react';
import { auth, db } from '../../firebase';
import { uid } from 'uid';
import { set, ref, onValue, remove } from 'firebase/database';

const AddTask = () => {
  const [todo, setTodo] = useState('');

  const writeTodoToDb = () => {
    const uidd = uid();
    set(ref(db, `/${auth.currentUser.uid}/${uidd}`), {
      todo: todo,
      uid: uidd,
    });
    setTodo('');
  };

  return (
    <>
      <form onSubmit={writeTodoToDb}>
        <div className="form-group">
          <label htmlFor="title">Task title</label>
          <input
            name="title"
            className="w-100"
            type="text"
            placeholder="I want to.."
            onChange={(e) => setTodo(e.target.value)}
            value={todo}
            required
          />
        </div>
        <div className="form-group">
          <h3>Set time</h3>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="exampleRadios"
              id="exampleRadios1"
              value="option1"
            />
            <label className="form-check-label" htmlFor="exampleRadios1">
              Today
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="exampleRadios"
              id="exampleRadios2"
              value="option2"
            />
            <label className="form-check-label" htmlFor="exampleRadios2">
              Recurring
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="exampleRadios"
              id="exampleRadios3"
              value="option3"
            />
            <label className="form-check-label" htmlFor="exampleRadios3">
              Select specific dates
            </label>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="start-time">Start at</label>
          <input
            type="time"
            id="appt"
            name="start-time"
            className="d-block w-100"
          />
        </div>
        <div className="form-group">
          <label htmlFor="start-time">Duration</label>
          <input
            className="d-block w-100"
            id="duration-input"
            type="text"
            pattern="[0-5][0-9]:[0-5][0-9]"
            placeholder="00:00"
          />
        </div>
        <div className="form-group">
          <label htmlFor="note">Add note</label>
          <textarea className="d-block w-100" name="note" />
        </div>
        <div className="form-group">
          <label htmlFor="url">Add link</label>
          <input className="d-block w-100" type="url" name="url" />
        </div>
        <button type="submit" onClick={writeTodoToDb}>
          Add
        </button>
      </form>
    </>
  );
};

export default AddTask;
