import React, {useEffect} from "react";
import { 
    useNavigate,
} from 'react-router-dom';

const Main = () => {
    const navigate = useNavigate();
    useEffect(() => {
        let isAuth = localStorage.getItem('token');
        if(isAuth && isAuth !== null) {
            navigate("/");
        }
        else
        {
          navigate("/login");
        }
    }, []);

    const logoutPanel = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate("/login");
    }
    return (
      <>
        <div className="dashboard-container">
          <div className="space-between">
            <h1>Hello Dashboard</h1>
            <button type="button" className="logout-btn" onClick={logoutPanel}>Logout</button>
          </div>
        </div>
      </>       
    );
}

export default Main;