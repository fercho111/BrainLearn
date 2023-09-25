import React, { useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import './SignUp.css';
import FormInput from '../components/FormInput';



function SignUp() {
  const [values, setValues] = useState({
    username: '',
    email: '',
    name: '',
    password: '',
    confirmpassword: ''
  });

  const inputs = [
    {
      id:1,
      name: 'username',
      placeholder: 'Username',
      type: 'text',
      errorMessage: 'Se espera de 3 a 10 caracteres y no incluir caracteres especiales',
      label: 'Username',
      pattern: '^[a-zA-Z0-9]{3,10}$',
      requited: true
    },
    {
      id:2,
      name: 'email',
      placeholder: 'Email',
      type: 'email',
      errorMessage: 'El email no es valido',
      label: 'Email',
      required: true
    },
    {
      id:3,
      name: 'password',
      placeholder: 'Password',
      type: 'password',
      errorMessage: 'Se espera minimo 8 caracteres, almenos una mayuscula, una minuscula y un numero.',
      label: 'Password',
      pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$',
      required: true
    },
    {
      id:4,
      name: 'confirmpassword',
      placeholder: 'Confirm Password',
      type: 'password',
      errorMessage: 'Las contraseñas no coinciden',
      label: 'Confirm Password',
      pattern: values.password,
      required: true
    },
  ]

  const handleSubmitSignUp = async (e) => {
    e.preventDefault();
    console.log(values);
    try {
      const res = await axios.post('http://localhost:8000/register/', {
        username: values.username,
        password: values.password,
        email: values.email
      });
      localStorage.setItem('token', res.data.token);
      // history.push('/');
    } catch (err) {
      ;
    }
  }
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value})

  }
  return (
    <div className="App" onSubmit={handleSubmitSignUp}>
      <form onSubmit={handleSubmitSignUp}>
        <div className='option-container'>
            <Link to='/login' className='option gray'>Login</Link>
            <Link to='/signup' className='option'>Sign Up</Link>
        </div>
        {inputs.map((input) => (
          <FormInput key={input.id} {...input} values={values[input.name]} onChange={onChange}/>
            
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
          

export default SignUp;
