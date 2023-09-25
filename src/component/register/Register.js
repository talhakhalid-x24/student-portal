import React, {useState , useEffect} from 'react';
import { useNavigate,Link } from 'react-router-dom';
import axios from 'axios';

export const Register = () => {    
    const navigate = useNavigate();
    useEffect(() => {
        let isAuth = localStorage.getItem('token');
        if(isAuth && isAuth !== null) {
            navigate("/");
        }
        else
        {
          navigate("/register");
        }
    }, []);
    const formData = new FormData();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [subject, setSubject] = useState([{subject:''}]);
    const [image, setImage] = useState([]);
    const [document, setDocument] = useState([]);

    const handleImageDoc = (event) => {
      const name = event.target.name;
      const file = event.target.files;
      
      if(name == 'document[]')
      {
        for(let i = 0; i < file.length; i++)
        {
            setDocument(arr => [...arr, file[i]]);
        }
      }
      else
      {
        for(let i = 0; i < file.length; i++)
        {
            setImage(arr => [...arr, file[i]]);
        }
      }
    }

    const onChangeFieldName = (event) => {
        if(event.name == 'name')
        {
            setName(event.value);
        }
        else if(event.name == 'email')
        {
            setEmail(event.value);
        }
        else if(event.name == 'phone')
        {
            setPhone(event.value);
        }
        else if(event.name == 'password'){
            setPassword(event.value);
        }
    }

    const onChangeSubject = (event,i) => {
        const { name , value } = event.target;
        const newValue = [...subject];
        newValue[i][name] = value;
        setSubject(newValue);
    }
    
    const addMore = () => {
        setSubject([...subject, {subject:''}]);
    }

    const removeSub = (i) => {
        const sub = [...subject];
        sub.splice(i, 1);
        setSubject(sub);
    }

    const sumbitForm = (e) => {
        e.preventDefault();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('password', password);
        image.forEach(file=>{
            formData.append("image[]", file);
        });
        document.forEach(file=>{
            formData.append("document[]", file);
        });
        subject.forEach(text=>{
            formData.append("subject[]", text.subject);
        });

        axios.post('http://127.0.0.1:8000/api/register', formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
        //   console.log(response.data);
        //   formData = [];
          navigate('/login', { replace: true });
        })
        .catch(function (error) {
            // const err = error.response.data.errors;
            // if(err.password)
            // {
            //     alert(err.password[0]);
            // }
        //   console.log(error.response.data.errors);
        });
    }

    return (
        <>
            <div className='container'>
                <div className='contain'>
                    <div className='container-fluid'>
                        <div className='heading'>
                            <h2>Student Registeration</h2>
                        </div>
                        <form onSubmit={sumbitForm}>
                            <div className='form'>
                                <div className='row'>
                                    <div className='form-group'>
                                        <label className='form-label'>Name</label>
                                        <input type='text' name='name' id='name' placeholder='Enter Your Name...' className='form-control' onChange={(e) => onChangeFieldName(e.target)} />
                                    </div>
                                    <div className='form-group'>
                                        <label className='form-label'>Phone</label>
                                        <input type='text' name='phone' id='phone' placeholder='Enter Your Phone...' className='form-control' onChange={(e) => onChangeFieldName(e.target)} />
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='form-group'>
                                        <label className='form-label'>Email</label>
                                        <input type='email' name='email' id='email' placeholder='Enter Your Email...' className='form-control' onChange={(e) => onChangeFieldName(e.target)} />
                                    </div>
                                    <div className='form-group'>
                                        <label className='form-label'>Password</label>
                                        <input type='password' name='password' id='password' placeholder='Enter Your Password...' className='form-control' onChange={(e) => onChangeFieldName(e.target)} />
                                    </div>
                                </div>
                                {
                                    subject.map((val,i)=> 
                                        <div className="form-group">
                                            <label className='form-label space-between'>
                                                Subject {i + 1}
                                                { i > 0 &&
                                                    <button type="button" className="btn btn-danger" onClick={() => removeSub(i)}>-</button>
                                                }
                                                {
                                                    i === 0 &&
                                                    <button type="button" className="btn btn-success" onClick={addMore}>+</button>
                                                }
                                            </label>
                                            <input type='text' name='subject' id='subject' placeholder='Enter Your Subject...' className='form-control' onChange={(e) => onChangeSubject(e,i)} />
                                        </div>
                                    )
                                }
                                <div className='form-group'>
                                    <label className='form-label'>Multiple Images</label>
                                    <input type='file' name='image[]' id='image' placeholder='Enter Your Image...' className='form-control' multiple onChange={handleImageDoc} accept='image/*' />
                                </div>
                                <div className='form-group'>
                                    <label className='form-label'>Multiple Documents</label>
                                    <input type='file' name='document[]' id='document' placeholder='Enter Your Documents...' className='form-control' multiple onChange={handleImageDoc} accept='application/pdf,application/msword' />
                                </div>
                                <div className='space-between'>
                                    <Link to="/login">Already Have an Account?</Link>
                                    <button type="submit" className="btn btn-success">
                                        Register
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}