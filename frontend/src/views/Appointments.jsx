import {useEffect, useState} from 'react'
import {useStateContext} from "../context/ContextProvider.jsx";
import axiosClient from "../axios-client.js";
import {Link} from "react-router-dom";
import fileDownload from "js-file-download";

function Appointments() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const {setNotification} = useStateContext()
    const {user, setUser, } = useStateContext();

    useEffect(() => {
    axiosClient.get('/users/getuser/')
      .then(({data}) => {
          console.log(data)
         setUser(data)
      })
  }, [])
    useEffect(() => {
        getUsers();
    }, [])

    const onDeleteClick = user => {
        if (!window.confirm("Sunteti sigur?")) {
            return
        }
        const acc = {accept: false}
        axiosClient.patch(`/adeverinte/update/${user.id}`, acc)
            .then(() => {
                setNotification('Adeverinta respinsa')
                getUsers()
            })
    }

    const onAcceptClick = user => {
        if (!window.confirm("Sunteti sigur?")) {
            return
        }
        const acc = {accept: true}
        axiosClient.patch(`/adeverinte/update/${user.id}`, acc)
            .then(() => {
                setNotification('Adeverinta acceptata')
                getUsers()
            })
    }

    const onDownloadClick = user => {
        axiosClient.put(`/adeverinte/downloadPDF/${user.id}`, {
            responseType: 'blob',
        }).then(res => {
            fileDownload(res.data, 'filename.pdf');
            console.log(res.data);
        }).catch(err => {
            console.log(err);
        })
    }
    const getUsers = () => {
        setLoading(true)
        axiosClient.get('/adeverinte/get/')
            .then(({ data }) => {
                setLoading(false)
                console.log(data)
                setUsers(data)
            })
            .catch(() => {
                setLoading(false)
            })
    }

if(user?.role === 0) {
    return (
        <div>
            <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
                <h1>Adeverinte</h1>
                <Link className="btn-add" to="/appointments/new">Adauga Adeveinta</Link>
            </div>
            <div className="card animated fadeInDown">
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Motivatie</th>
                        <th>Data</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    {loading &&
                        <tbody>
                        <tr>
                            <td colSpan="5" className="text-center">
                                Loading...
                            </td>
                        </tr>
                        </tbody>
                    }
                    {!loading &&
                        <tbody>
                        {users && users.map(u => (
                            <tr key={u.id}>
                                <td>{u.id}</td>
                                <td>{u.motivatie}</td>
                                <td>{u.data}</td>
                                <td>{u.stare}</td>
                            </tr>
                        ))}
                        </tbody>
                    }
                </table>
            </div>
        </div>
    )
    }
else {
    return (
        <div>
            <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
                <h1>Adeverinte</h1>
            </div>
            <div className="card animated fadeInDown">
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Student</th>
                        <th>Specializare</th>
                        <th>Motivatie</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    {loading &&
                        <tbody>
                        <tr>
                            <td colSpan="5" className="text-center">
                                Loading...
                            </td>
                        </tr>
                        </tbody>
                    }
                    {!loading &&
                        <tbody>
                        {users && users.map(u => (
                            <tr key={u.id}>
                                <td>{u.id}</td>
                                <td>{u.subsemnatul?.first_name} {u.subsemnatul?.last_name}</td>
                                <td>{u.subsemnatul?.specializare.map(s => s.nume)}</td>
                                <td>{u.motivatie}</td>
                                <td>{u.data}</td>
                                <td>{u.stare}</td>
                                <td>
                                    <Link className="btn-edit" onClick={ev => onAcceptClick(u)}>Accept</Link>
                                    &nbsp;
                                    <button className="btn-delete" onClick={ev => onDeleteClick(u)}>Respins</button>
                                    &nbsp;
                                    <button className="btn-success" onClick={ev => onDownloadClick(u)}>Print</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    }
                </table>
            </div>
        </div>
    )
}
}

export default Appointments