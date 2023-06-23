import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../context/ContextProvider.jsx";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
export default function AppointmentForm() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
       motivatie: ''
    })
    const [errors, setErrors] = useState(null)
    const [errorsMessage, setErrorsMessage] = useState(null)
    const [loading, setLoading] = useState(false)
    const {setNotification} = useStateContext()



    const onSubmit = ev => {
        ev.preventDefault()
            console.log(user);
            axiosClient.post('/adeverinte/crate/', user)
                .then(() => {
                    setNotification('Cererea a fost inregistrata asteptati aprobarea')
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
            {!user.id && <h1>Adeverinta noua</h1>}
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
                        <input value={user.motivatie} onChange={ev => setUser({...user, motivatie: ev.target.value})} placeholder="Motiv cerere adeverinta"/>
                        <button className="btn">Trimite</button>
                    </form>
                )}
            </div>
        </>
    )
}