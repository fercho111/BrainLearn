import React, { useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import './Login.css';
import FormInput from '../components/FormInput';
import { AiOutlineArrowLeft } from "react-icons/ai";


function Login() {
  const [values, setValues] = useState({
    username: '',
    password: '',
    
  });

  const inputs = [
    {
      id:1,
      name: 'username',
      placeholder: 'Username',
      type: 'text',
      label: 'Username',
      required: true
    },
    {
      id:2,
      name: 'password',
      placeholder: 'Password',
      type: 'password',
      label: 'Password',
      required: true
    },
  ]

  
  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    console.log(values);

    try {
      const res = await axios.post('http://localhost:8000/login/', {
        username: values.username,
        password: values.password
      });
      if (res.data.message) {
        res.data.message.forEach((error) => {
          alert(error.message);
        });
        // alert(res.data.message);
      }
      
      localStorage.setItem('token', res.data.token);
      // history.push('/');
    } catch (err) {
      console.error(err);
    }
  }


  
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value})
  }

  return (
    <div className="App" onSubmit={handleSubmitLogin}>
      <form onSubmit={handleSubmitLogin}>
        <div className='option-container'>
          <div className='row text-center'>
            <Link to='/' className='arrow col-md-2  '><AiOutlineArrowLeft/></Link>
            <Link to='/login' className='option col-md-5'>Login</Link>
            <Link to='/signup' className='option gray col-md-5'>Sign Up</Link>
          </div>
        </div>
        {inputs.map((input) => (
          <FormInput key={input.id} {...input} values={values[input.name]} onChange={onChange}/>
          
        ))}

        <button type='submit'>submit</button>

      </form>
    </div>
  );
}
          

export default Login;

