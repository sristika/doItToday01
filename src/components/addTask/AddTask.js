import React, { useEffect, useState } from 'react';
import { auth, db } from '../../firebase';
import { uid } from 'uid';
import { set, ref, onValue, remove } from 'firebase/database';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';

const AddTask = () => {
  const [todo, setTodo] = useState({
    title: '',
    setTime: '',
    date: '',
    startTime: '',
    duration: '',
    subtasks: [],
    url: '',
    note: '',
  });
  const [subtask, setSubtask] = useState('');

  const writeTodoToDb = (event) => {
    event.preventDefault();
    const uniqueId = uid();
    const currentTodo = {};
    if (todo.setTime === 'today') {
      currentTodo.id = uniqueId;
      currentTodo.title = todo.title;
      if (todo.date !== '')
        currentTodo.date = new Date().toISOString().slice(0, 10);
      if (todo.startTime !== '') currentTodo.startTime = todo.startTime + ':00';

      if (todo.duration !== '') {
        var tempdate = new Date(
          1900,
          0,
          1,
          currentTodo.startTime.split(':')[0],
          currentTodo.startTime.split(':')[1]
        );
        tempdate.setMinutes(
          tempdate.getMinutes() + todo.duration.split(':')[0]
        );
        tempdate.setHours(tempdate.getHours() + todo.duration.split(':')[1]);
        currentTodo.endTime =
          tempdate.getHours() + ':' + tempdate.getMinutes() + ':00';
      }

      currentTodo.extendedProps = {};

      if (todo.note !== '') currentTodo.extendedProps.note = todo.note;
      if (todo.url != '') currentTodo.extendedProps.url = todo.url;
      if (todo.subtasks !== [])
        currentTodo.extendedProps.subtasks = todo.subtasks;
    }
    set(ref(db, `/${auth.currentUser.uid}/${uniqueId}`), currentTodo);
    setTodo({
      title: '',
      setTime: '',
      date: '',
      startTime: '',
      duration: '',
      subtasks: [],
      url: '',
      note: '',
    });
  };

  const handleSubtasks = (st) => {
    const id = uid();
    const subtaskObj = { completionStatus: false, title: st, id: id };
    setTodo({ ...todo, subtasks: [...todo.subtasks, subtaskObj] });
    setSubtask('');
  };

  const deleteSubTask = (id) => {
    for (let i = 0; i < todo.subtasks.length; i++) {
      if (todo.subtasks[i].id === id) {
        let tempSubtaskArr = todo.subtasks;
        tempSubtaskArr.splice(i, 1);
        setTodo({ ...todo, subtasks: tempSubtaskArr });
      }
    }
  };

  return (
    <>
      <form onSubmit={(e) => writeTodoToDb(e)}>
        <div className="form-group">
          <label htmlFor="title">Task title</label>
          <input
            name="title"
            className="w-100"
            type="text"
            placeholder="I want to.."
            onChange={(e) => setTodo({ ...todo, title: e.target.value })}
            value={todo.title}
            required
          />
        </div>
        <div
          className="form-group"
          name="setTime"
          onChange={(e) => setTodo({ ...todo, setTime: e.target.value })}
        >
          <label className="form-check-label" htmlFor="setTime">
            Set time
          </label>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="exampleRadios"
              id="exampleRadios1"
              value="today"
              required
              checked={todo.setTime === 'today'}
              onChange={(e) => {}}
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
              value="tomorrow"
              checked={todo.setTime === 'tomorrow'}
              onChange={(e) => {}}
            />
            <label className="form-check-label" htmlFor="exampleRadios2">
              Tomorrow
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="exampleRadios"
              id="exampleRadios2"
              value="recurring"
              checked={todo.setTime === 'recurring'}
              onChange={(e) => {}}
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
              value="specific"
              checked={todo.setTime === 'specific'}
              onChange={(e) => {}}
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
            name="start-time"
            className="d-block w-100"
            onChange={(e) => {
              setTodo({ ...todo, startTime: e.target.value });
            }}
            value={todo.startTime}
          />
        </div>
        <div className="form-group">
          <label htmlFor="start-time">Duration</label>
          <input
            name="start-time"
            className="d-block w-100"
            id="duration-input"
            type="text"
            pattern="[0-5][0-9]:[0-5][0-9]"
            placeholder="00:00"
            onChange={(e) => {
              setTodo({ ...todo, duration: e.target.value });
            }}
            value={todo.duration}
          />
        </div>
        <div className="form-group">
          <label htmlFor="add-subtask">Add subtasks</label>
          <input
            name="add-subtask"
            className="d-block w-100"
            type="text"
            onChange={(e) => setSubtask(e.target.value)}
            value={subtask}
          />
          <button type="button" onClick={() => handleSubtasks(subtask)}>
            Add subtask
          </button>
          <div className="subtasks">
            {todo.subtasks
              ? todo.subtasks.map((st) => {
                  return (
                    <li key={st.id}>
                      <span>{st.title}</span>
                      <span>{st.completionStatus}</span>
                      <button
                        type="button"
                        onClick={() => deleteSubTask(st.id)}
                      >
                        <FontAwesomeIcon icon={faTrashCan} />
                      </button>
                    </li>
                  );
                })
              : ''}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="note">Add note</label>
          <textarea
            className="d-block w-100"
            name="note"
            onChange={(e) => {
              setTodo({ ...todo, note: e.target.value });
            }}
            value={todo.note}
          />
        </div>
        <div className="form-group">
          <label htmlFor="url">Add link</label>
          <input
            className="d-block w-100"
            type="url"
            name="url"
            onChange={(e) => {
              setTodo({ ...todo, url: e.target.value });
            }}
            value={todo.url}
          />
        </div>
        <button type="submit">Add</button>
      </form>
    </>
  );
};

export default AddTask;
