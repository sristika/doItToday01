import React, { useState, useEffect } from 'react';
import welcomeImg from '../../img/welcomeWall.jpg';
import './welcome.scss';
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [registerInformation, setRegisterInformation] = useState({
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigate('./homepage');
      }
    });
  }, []);

  const handleSignUp = () => {
    if (registerInformation.email != registerInformation.confirmEmail) {
      alert('Please ensure that the email addresses match with each other');
      return;
    } else if (
      registerInformation.password != registerInformation.confirmPassword
    ) {
      alert('Please ensure that the passwords match with each other');
      return;
    }
    createUserWithEmailAndPassword(
      auth,
      registerInformation.email,
      registerInformation.password
    )
      .then(() => {
        navigate('/homepage');
      })
      .catch((err) => alert(err.message));
  };

  const updateEmailValue = (e) => {
    setEmail(e.target.value);
  };

  const updatePassValue = (e) => {
    setPassword(e.target.value);
  };

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate('./homepage');
      })
      .catch((err) => alert(err.message));
  };

  return (
    <>
      <div className="welcome-wrap">
        <div className="container-fluid p-0 h-100 d-flex justify-content-between">
          <div className="h-100">
            <h1>Do it today</h1>
            <h2>Welcome back, please enter your details.</h2>
            <form>
              {!isRegistering ? (
                <>
                  <div className="form-group">
                    <label htmlFor="email" className="d-block">
                      Email address
                    </label>
                    <input
                      type="email"
                      id="email"
                      onChange={updateEmailValue}
                      value={email}
                      placeholder="Email"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password" className="d-block">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      onChange={updatePassValue}
                      value={password}
                      required
                      placeholder="Password"
                    />
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary d-block"
                    onClick={handleSignIn}
                  >
                    Sign In
                  </button>
                  <button
                    to="/createaccount"
                    type="button"
                    className="btn btn-primary"
                    onClick={() => setIsRegistering(true)}
                  >
                    Create a new account
                  </button>
                </>
              ) : (
                <>
                  <input
                    type="text"
                    required
                    placeholder="Email"
                    value={registerInformation.email}
                    onChange={(e) =>
                      setRegisterInformation({
                        ...registerInformation,
                        email: e.target.value,
                      })
                    }
                  />
                  <input
                    type="email"
                    required
                    placeholder="Confirm Email"
                    value={registerInformation.confirmEmail}
                    onChange={(e) =>
                      setRegisterInformation({
                        ...registerInformation,
                        confirmEmail: e.target.value,
                      })
                    }
                  />
                  <input
                    type="password"
                    required
                    placeholder="Password"
                    value={registerInformation.password}
                    onChange={(e) =>
                      setRegisterInformation({
                        ...registerInformation,
                        password: e.target.value,
                      })
                    }
                  />
                  <input
                    type="password"
                    required
                    placeholder="Confirm Password"
                    value={registerInformation.confirmPassword}
                    onChange={(e) =>
                      setRegisterInformation({
                        ...registerInformation,
                        confirmPassword: e.target.value,
                      })
                    }
                  />
                  <button type="button" onClick={() => handleSignUp()}>
                    Sign up
                  </button>
                  <button type="button" onClick={() => setIsRegistering(false)}>
                    Go Back
                  </button>
                </>
              )}
            </form>
          </div>
          <div className="h-100 welcomeImg-wrap">
            <img
              src={welcomeImg}
              className="welcomeImg"
              width="100%"
              height="100%"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Welcome;
