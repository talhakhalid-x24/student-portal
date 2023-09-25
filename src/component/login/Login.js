import React, {useState,useEffect} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export const Login = () => {
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

    const formData = new FormData();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onChangeFieldName = (event) => {
        if(event.name == 'email')
        {
            setEmail(event.value);
        }
        else{
            setPassword(event.value);
        }
    }
    
    const sumbitForm = (e) => {
        e.preventDefault();
        formData.append('email', email);
        formData.append('password', password);

        axios.post('http://127.0.0.1:8000/api/login', formData)
        .then((response) => {
          console.log(response.data);
          const token  = response.data.token;
          const user  = response.data.user;
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));
          navigate("/");
        })
        .catch(function (error) {
            const err = error.response.data.errors;
            if(err.password)
            {
                alert(err.password[0]);
            }
            if(err.email)
            {
                alert(err.email[0]);
            }
        });
    }

    return (
        <>
            <div className='container'>
                <div className='contain'>
                    <div className='container-fluid'>
                        <div className='heading'>
                            <h2>Student Login</h2>
                        </div>
                        <form onSubmit={sumbitForm}>
                            <div className='form'>
                                <div className='form-group'>
                                    <label className='form-label'>Email</label>
                                    <input type='email' name='email' id='email' placeholder='Enter Your Email...' className='form-control' onChange={(e) => onChangeFieldName(e.target)} />
                                </div>
                                <div className='form-group'>
                                    <label className='form-label'>Password</label>
                                    <input type='password' name='password' id='password' placeholder='Enter Your Password...' className='form-control' onChange={(e) => onChangeFieldName(e.target)} />
                                </div>
                                <div className='space-between'>
                                    <Link to="/register">Create an Account</Link>
                                    <button type="submit" className="btn btn-success">
                                        Login
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
  );
};