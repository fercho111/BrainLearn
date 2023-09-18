import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import FormInput from './components/FormInput';


function App() {
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
      required: true
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
  
  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    console.log(values);

    try {
      const res = await axios.post('http://localhost:8000/login/', {
        email: values.email,
        password: values.password
      });
      if (res.data.message) {
        alert(res.data.message);
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

  
  const [action, setAction] = useState('Sign Up');
  
  
  return (
    <div className="App">
      <form onSubmit={action === 'Sign Up' ? handleSubmitSignUp : handleSubmitLogin}>
        <div className='option-container'>
        <div className={action==='Login'?"option gray":"option"} onClick={() => setAction('Sign Up')}>Sing Up</div>
        <div className={action==='Sign Up'?"option gray":"option"} onClick={() => setAction('Login')}>Login</div>
        </div>
        {action === 'Login' ? (
  <div>
    {inputs
      .filter(input => input.name === 'username' || input.name === 'password')
      .map(input => (
        <FormInput key={input.id} {...input} values={values[input.name]} onChange={onChange} />
      ))
    }
  </div>
) : (
  <div>
    {inputs.map(input => (
      <FormInput key={input.id} {...input} values={values[input.name]} onChange={onChange} />
    ))}
  </div>
)}
        <button type='submit'>submit</button>

      </form>
    </div>
  );
}
          

export default App;

