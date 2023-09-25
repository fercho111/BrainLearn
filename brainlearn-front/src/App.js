import './App.css';
import Login from './login/Login';

function App() {
  return (
<<<<<<< Updated upstream
    <Login/>
=======
    // onSubmit={action === 'Sign Up' ? handleSubmitSignUp : handleSubmitLogin}
    <div className="App" >
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
>>>>>>> Stashed changes
  );
}

export default App;
