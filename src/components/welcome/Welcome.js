import React, { useState, useEffect } from 'react';
import './welcome.scss';
import logo from '../../img/logo.png';
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';

const Welcome = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
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
        <div className="container-fluid p-0 h-100 d-flex justify-content-between align-items-center">
          <div className="welcome-login-container">
            <img src={logo} alt="logo" className="logo" />

            <form>
              {!isRegistering ? (
                <>
                  <h2>Welcome back, please enter your details.</h2>
                  <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input
                      className="w-100"
                      type="email"
                      id="email"
                      onChange={updateEmailValue}
                      value={email}
                      placeholder="Email"
                      required
                    />
                    <FontAwesomeIcon icon={faUser} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      className="w-100"
                      type={isHidden ? 'password' : 'text'}
                      id="password"
                      onChange={updatePassValue}
                      value={password}
                      required
                      placeholder="Password"
                    />
                    <FontAwesomeIcon
                      icon={isHidden ? faEye : faEyeSlash}
                      onClick={() => setIsHidden(!isHidden)}
                    />
                  </div>
                  <button
                    type="button"
                    className="signin-btn d-block w-100"
                    onClick={handleSignIn}
                  >
                    Sign In
                  </button>
                  <button
                    to="/createaccount"
                    type="button"
                    className="createAcc-btn"
                    onClick={() => setIsRegistering(true)}
                  >
                    <span>Don't have an account? </span>Sign up for free!
                  </button>
                </>
              ) : (
                <>
                  <h2>Let's get started!</h2>
                  <input
                    className="w-100"
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
                    className="w-100"
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
                    className="w-100"
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
                    className="w-100"
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
                  <button
                    type="button"
                    className="signin-btn w-100"
                    onClick={() => handleSignUp()}
                  >
                    Sign up
                  </button>
                  <button
                    type="button"
                    className="goBack-btn"
                    onClick={() => setIsRegistering(false)}
                  >
                    Go Back to Login page
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Welcome;
