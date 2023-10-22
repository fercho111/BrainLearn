import React, { useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import './SignUp.css';
import FormInput from '../components/FormInput';
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';


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

  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState('');
  const [alertMessage, setAlertMessage] = useState(''); 

  const handleSubmitSignUp = async (e) => {
    e.preventDefault();
    console.log(values);
    try {
      const res = await axios.post('http://localhost:8000/register/', {
        username: values.username,
        password: values.password,
        email: values.email
      });
      localStorage.setItem('access', res.data.access);
      localStorage.setItem('refresh', res.data.refresh);
      setShowAlert(true);
      setAlertVariant('success');
      setAlertMessage(res.data.message);
      setTimeout(() => {
        navigate('/login');
      }, 0.5);
      // history.push('/');
    } catch (err) {
      console.log(err);
      setShowAlert(true);
      setAlertVariant('danger');
      setAlertMessage(err.response.data.error);

      setTimeout(() => {
        setShowAlert(false);
      }, 1000);
    }
  }
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value})

  }
  return (
    <div className="App">
      {showAlert && (<Alert variant={alertVariant}>{alertMessage}</Alert>)}
      <form onSubmit={handleSubmitSignUp}>
        <div className='option-container'>
        <div className='row text-center'>
            <Link to='/' className='arrow col-md-2  '><AiOutlineArrowLeft/></Link>
            <Link to='/login' className='option gray col-md-5'>Login</Link>
            <Link to='/signup' className='option  col-md-5'>Sign Up</Link>
          </div>
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
