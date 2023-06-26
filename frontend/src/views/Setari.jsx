import {useState} from "react";
import {useStateContext} from "../context/ContextProvider.jsx";
import axiosClient from "../axios-client.js";
import {useNavigate} from "react-router-dom";

export default function Setari() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        numeFacultate: '',
        acronim:'',
        numeUniversitate: ''
    })
    const [errors, setErrors] = useState(null)
    const [errorsMessage, setErrorsMessage] = useState(null)
    const [loading, setLoading] = useState(false)
    const {setNotification} = useStateContext()

    const onSubmit = ev => {
        ev.preventDefault()
            console.log(user);
            axiosClient.post('/setari/crate/', user)
                .then(() => {
                    setNotification('Setarile au fost salvate cu succes')
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
            {<h1>Setari</h1>}
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
                        <input value={user.numeFacultate} onChange={ev => setUser({...user, numeFacultate: ev.target.value})} placeholder="Nume Facultate"/>
                        <input value={user.acronim} onChange={ev => setUser({...user, acronim: ev.target.value})} placeholder="Acronim"/>
                        <input value={user.numeUniversitate} onChange={ev => setUser({...user, numeUniversitate: ev.target.value})} placeholder="Nume Universitate"/>

                        <button className="btn">Salvare</button>
                    </form>
                )}
            </div>
        </>
    )
}