import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../context/ContextProvider.jsx";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
export default function AppointmentForm() {
    const navigate = useNavigate();
    let {id} = useParams();
    const [client, setClient] = useState(null);


    const [user, setUser] = useState({
       motivatie: ''
    })
    const [users, setUsers] = useState([]);
    const [errors, setErrors] = useState(null)
    const [errorsMessage, setErrorsMessage] = useState(null)
    const [loading, setLoading] = useState(false)
    const {setNotification} = useStateContext()



    const onSubmit = ev => {
        ev.preventDefault()
            console.log(user);
            axiosClient.post('/adeverinte/create/', user)
                .then(() => {
                    setNotification('Appointment was successfully created')
                    navigate('/dashboard')
                })
                .catch(err => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors)
                        console.log(response.data.message)
                    }else if(response && response.status === 421)
                    {
                        setErrorsMessage(response.data.message)
                    }
                })
        }


    return (
        <>
            {user.id && <h1>Update Appointment</h1>}
            {!user.id && <h1>New Appointment</h1>}
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
                {errorsMessage &&
                    <div className="alert">
                        <p>{errorsMessage}</p>
                    </div>
                }
                {!loading && (
                    <form onSubmit={onSubmit}>
                        <input value={user.description} onChange={ev => setUser({...user, description: ev.target.value})} placeholder="Description"/>
                        <label >Enter a date and time:</label>
                        <input type="datetime-local" id="start" name="trip-start"
                               value={user.date}  onChange={ev => setUser({...user, date: ev.target.value})} min={new Date().toISOString().slice(0, 16)} />
                        <label >Choose your consultant: </label>
                        <select value={user.consultant_id} onChange={ev => setUser({...user, consultant_id: ev.target.value})}>
                            <option value="">Select Consultant</option>
                            {users.map(us => (
                                <option key={us.id} value={us.id}>{us.name}</option>
                            ))}
                        </select>
                        <br></br>
                        <button className="btn">Save</button>
                    </form>
                )}
            </div>
        </>
    )
}