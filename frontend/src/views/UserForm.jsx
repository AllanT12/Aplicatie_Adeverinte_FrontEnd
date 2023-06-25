import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../context/ContextProvider.jsx";
import ReactDOM from "react-dom/client";

export default function UserForm() {
  const navigate = useNavigate();
  let {id} = useParams();
      var [specs, setSelectedSpecs] = useState([])

  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    username: '',
    role: null,
    specializare: specs,
    email: '',
    password: '',
    user_name: ''
  })
  const [errors, setErrors] = useState(null)
  const [roles, setRoles] = useState(null)
  const [spec, setSpecs] = useState(null)
  const [loading, setLoading] = useState(false)
  const {setNotification} = useStateContext()
  const root = document.getElementById("specializari");
  if (id) {
    useEffect(() => {
      setLoading(true)
      axiosClient.get(`/users/${id}`)
        .then(({data}) => {
          setLoading(false)
          setUser(data)
        })
        .catch(() => {
          setLoading(false)
        })
    }, [])
  }

  useEffect(() => {
    getSpecializari();
  }, [])
  const getSpecializari = () =>
  {
    axiosClient.get('/specializari/get/')
      .then(({data}) => {
        setSpecs(data)
        console.log(data)
      })
      .catch(error => {
        console.error(error)
      });
  }

  const addSpec = () => {
    console.log(roles-1)
    console.log(spec[roles-1].nume)
    var nr = parseInt(roles)
    console.log(nr)
    specs.push(nr)
    root.append(spec[roles-1].nume)
  }
  const onSubmit = ev => {
    ev.preventDefault()
    if (user.id) {
      axiosClient.put(`/users/${id}`, user)
        .then(() => {
          setNotification('User was successfully updated')
          navigate('/users')
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        })
    } else {
      user.role =parseInt(user.role)
      user.user_name = user.username;
      console.log(user)
      axiosClient.post('/users/register/', user)
        .then(() => {
          setNotification('User was successfully created')
          navigate('/users')
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 300) {
            setErrors(response.data.errors)
          }
        })
    }
  }

  return (
    <>
      {user.id && <h1>Update User: {user.first_name} {user.last_name}</h1>}
      {!user.id && <h1>Adauga Utilizator</h1>}
      <div className="card animated fadeInDown">
        {loading && (
          <div className="text-center">
            Loading...
          </div>
        )}
        {errors &&
          <div className="alert">
            {Object.keys(errors).map(key => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        }
        {!loading && (
          <form onSubmit={onSubmit}>
            <input value={user.first_name} onChange={ev => setUser({...user, first_name: ev.target.value})} placeholder="First Name"/>
            <input value={user.last_name} onChange={ev => setUser({...user, last_name: ev.target.value})} placeholder="Last Name"/>
            <input value={user.username} onChange={ev => setUser({...user, username: ev.target.value})} placeholder="Username"/>
            <input value={user.email} onChange={ev => setUser({...user, email: ev.target.value})} placeholder="Email"/>
            <select value={roles} onChange={ev => setRoles(ev.target.value)}>
                <option value="">Selecteaza Specializare</option>
                {spec && spec.map((spec) => (
                    <option key={spec.id} value={spec.id}>{spec.nume}</option>
                ))}
            </select>
            <button onClick={addSpec} className="btn">Adauga Specializare</button>
            {specs &&
          <div className="alert" id="specializari">

          </div>
        }
            <select value={user.role} onChange={ev => setUser({...user, role: parseInt(ev.target.value)})}>
              <option value="">Select Rol</option>
              <option key="0" value="0">Student</option>
              <option key="1" value="1">Secretara</option>
              <option key="2" value="2">Admin</option>
              <option key="3" value="3">Secretara_Sef</option>
              <option key="4" value="4">Decan</option>
            </select>
            <input type="password" onChange={ev => setUser({...user, password: ev.target.value})} placeholder="Password"/>
            <button className="btn">Save</button>
          </form>
        )}
      </div>
    </>
  )
}