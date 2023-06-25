import {useEffect, useState} from "react";

import axiosClient from "../axios-client.js";
import {useNavigate, useParams} from "react-router-dom";
import {useStateContext} from "../context/ContextProvider.jsx";
function Availability() {
  const [user, setUser] = useState({
   nume: "", acronim: "" ,is_master: false
  })
  const [errors, setErrors] = useState(null)
  const [roles, setRoles] = useState(null)
  const [spec, setSpecs] = useState(null)
  const [loading, setLoading] = useState(false)
  const {setNotification} = useStateContext()


  const onSubmit = ev => {
    ev.preventDefault()
            console.log(user)
      axiosClient.post('/specializari/create/', user)
        .then(() => {
          setNotification('Specializare was successfully created')
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        })
    }


  return (
    <>
      <h1>Adauga Specializare</h1>
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
            <input value={user.nume} onChange={ev => setUser({...user, nume: ev.target.value})} placeholder="Nume"/>
            <input value={user.acronim} onChange={ev => setUser({...user, acronim: ev.target.value})} placeholder="Acronim"/>
              <label htmlFor={"master"}>Master</label>
              <input value={true} type={"checkbox"} id={"master"} onChange={ev => setUser({...user, is_master: ev.target.value})} />
            <button className="btn">Save</button>
          </form>
        )}
      </div>
    </>
  )
}
export default Availability