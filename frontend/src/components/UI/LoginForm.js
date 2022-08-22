import useInput from "../../hooks/use-input";
import './LoginForm.css'

const LoginForm = (props) => {

    const passwordValidation = (value) => value.trim() !== '';
    const emailValidation = (value) => value.trim() !== '' && value.length >= 11 && value.includes("@",0);
  
    const {
      value: enteredPassword,
      isValid: enteredPasswordIsValid,
      hasError: passwordInputHasError,
      valueChangeHandler: passwordChangeHandler,
      inputBlurHandler: passwordBlurHandler,
      reset: resetPasswordInput
    } = useInput(passwordValidation);
  
    const {
      value: enteredEmail,
      isValid: enteredEmailIsValid,
      hasError: emailInputHasError,
      valueChangeHandler: emailChangeHandler,
      inputBlurHandler: emailBlurHandler,
      reset: resetEmailInput
    } = useInput(emailValidation);
  
    let formIsValid = false;
  
    if(enteredPasswordIsValid && enteredEmailIsValid) {
      formIsValid = true;
    }
  
    const formSubmissionHandler = event => {
      event.preventDefault();
  
      console.log(enteredPassword);
      console.log(enteredEmail);
  
      resetPasswordInput('');
      resetEmailInput('');
  
    }
  
    const passwordInputClasses = passwordInputHasError
      ? 'form-con invalid'
      : 'form-con';
  
    const emailInputClasses = emailInputHasError
      ? 'form-con invalid'
      : 'form-con';
  
    return (
      <div className="contain">
        <form onSubmit={formSubmissionHandler}>
          <div className='control-g'>
            <div className={emailInputClasses}>
              <label htmlFor='email'>Email Address</label>
              <input 
                type='email' 
                id='email' 
                value={enteredEmail}
                onChange={emailChangeHandler}
                onBlur={emailBlurHandler}
                />
                {emailInputHasError && <p className="error-text">Email cannot be Empty, have to be at least 11 characters long and have @</p>}                </div>
            </div>
            <div className={passwordInputClasses}>
              <label htmlFor='password'>Password</label>
                <input 
                  type='text' 
                  id='password'
                  value={enteredPassword}
                  onChange={passwordChangeHandler}
                  onBlur={passwordBlurHandler}
                  />
                  {passwordInputHasError && <p className="error-text">Password Must not Be Empty</p>}
            </div>
            <div className='form-actions'>
                <button disabled={!formIsValid}>Submit</button>
            </div>
        </form>
      </div>
    );
  };

export default LoginForm;