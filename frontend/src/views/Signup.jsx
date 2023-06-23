import {Link, useNavigate} from "react-router-dom";
import {createRef, useState} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../context/ContextProvider.jsx";

export default function Signup() {
    const navigate = useNavigate();
  const FnameRef = createRef()
  const LnameRef = createRef()
  const nameRef = createRef()
  const emailRef = createRef()
  const passwordRef = createRef()
  const {setUser, setToken} = useStateContext()
  const [errors, setErrors] = useState(null)

  const onSubmit = ev => {
    ev.preventDefault()

    const payload = {
      name: nameRef.current.value,
      first_name: FnameRef.current.value,
      last_name: LnameRef.current.value,
      username: nameRef.current.value,
      role: 2,
      specializare: [1],
      email: emailRef.current.value,
      password: passwordRef.current.value,
      user_name: nameRef.current.value
    }
    axiosClient.post('/users/register/', payload)
      .then(({data}) => {
        setUser(data.user)
        navigate('/login')
      })
      .catch(err => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors)
        }
      })
  }

  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">Signup</h1>
          {errors &&
            <div className="alert">
              {Object.keys(errors).map(key => (
                <p key={key}>{errors[key][0]}</p>
              ))}
            </div>
          }
          <input ref={FnameRef} type="text" placeholder="First Name"/>
          <input ref={LnameRef} type="text" placeholder="Last Name"/>
          <input ref={nameRef} type="text" placeholder="Usernameame"/>
          <input ref={emailRef} type="email" placeholder="Email Address"/>
          <input ref={passwordRef} type="password" placeholder="Password"/>
          <button className="btn btn-block">Signup</button>
          <p className="message">Already registered? <Link to="/login">Sign In</Link></p>
        </form>
      </div>
    </div>
  )
}