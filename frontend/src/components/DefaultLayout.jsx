import {Link, Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../context/ContextProvider";
import axiosClient from "../axios-client.js";
import {useEffect} from "react";

export default function DefaultLayout() {
  const {user, token, setUser, setToken, notification} = useStateContext();

  if (!token) {
    return <Navigate to="/login"/>
  }

  const onLogout = ev => {
    ev.preventDefault()
    setUser({})
      setToken(null)

  }

  useEffect(() => {
    axiosClient.get('/users/getuser/')
      .then(({data}) => {
          console.log(data)
         setUser(data)
      })
  }, [])

  if(user?.role === 2) {
    return (
        <div id="defaultLayout">
          <aside>
            <img src="https://usv.ro/wp-content/uploads/2020/05/sigla-standard-RGB.jpg" height="100" width="200"
                 alt="logo" className="logo"/>
            <Link to="/dashboard">Adeverinte</Link>
            <Link to="/availability">Specializari</Link>
            <Link to="/users">Utilizatori</Link>
          </aside>
          <div className="content">
            <header>
              <div>
                Adeverinte App
              </div>

              <div>
                {user?.username} &nbsp; &nbsp;
                <a onClick={onLogout} className="btn-logout" href="#">Logout</a>
              </div>
            </header>
            <main>
              <Outlet/>
            </main>
            {notification &&
                <div className="notification">
                  {notification}
                </div>
            }
          </div>
        </div>
    )
  } else {
    return (
        <div id="defaultLayout">
          <aside>
            <img src="https://usv.ro/wp-content/uploads/2020/05/sigla-standard-RGB.jpg" height="100" width="200"
                 alt="logo" className="logo"/>
            <Link to="/dashboard">Adeverinte</Link>
          </aside>
          <div className="content">
            <header>
              <div>
                Adeverinte App
              </div>

              <div>
                {user?.username} &nbsp; &nbsp;
                <a onClick={onLogout} className="btn-logout" href="#">Logout</a>
              </div>
            </header>
            <main>
              <Outlet/>
            </main>
            {notification &&
                <div className="notification">
                  {notification}
                </div>
            }
          </div>
        </div>
    )
  }
}