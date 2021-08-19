import useInput from '../hooks/use-input2';

const validateString = (string) => string.trim() !== '';

const BasicForm = (props) => {
  const {
    value: enteredFirstName,
    hasError: firstNameHasError,
    isValid: firstNameIsValid,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameInputBlurHandler,
    reset: resetFirstNameInput,
  } = useInput(validateString);

  const {
    value: enteredLastName,
    hasError: lastNameHasError,
    isValid: lastNameIsValid,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameInputBlurHandler,
    reset: resetLastNameInput,
  } = useInput(validateString);

  const {
    value: enteredEmail,
    hasError: emailHasError,
    isValid: emailIsValid,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailInputBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => value.includes('@') && value.trim().length > 3);

  //FORM VALIDATION
  let formIsValid;
  if (firstNameIsValid && lastNameIsValid && emailIsValid) {
    formIsValid = true;
  } else {
    formIsValid = false;
  }

  const submitHandler = (e) => {
    e.preventDefault();
    if (!formIsValid) {
      return;
    }
    console.log(`${enteredFirstName} ${enteredLastName} : ${enteredEmail}`);
    resetFirstNameInput('');
    resetLastNameInput('');
    resetEmailInput('');
  };

  const firstNameClasses = `form-control${firstNameHasError ? ' invalid' : ''}`;
  const lastNameClasses = `form-control${lastNameHasError ? ' invalid' : ''}`;
  const emailClasses = `form-control${emailHasError ? ' invalid' : ''}`;

  return (
    <form onSubmit={submitHandler}>
      <div className='control-group'>
        <div className={firstNameClasses}>
          <label htmlFor='name'>First Name</label>
          <input
            type='text'
            id='name'
            value={enteredFirstName}
            onChange={firstNameChangeHandler}
            onBlur={firstNameInputBlurHandler}
          />
          {firstNameHasError && (
            <p className='error-text'>Please enter your first name.</p>
          )}
        </div>
        <div className={lastNameClasses}>
          <label htmlFor='name'>Last Name</label>
          <input
            type='text'
            id='name'
            value={enteredLastName}
            onChange={lastNameChangeHandler}
            onBlur={lastNameInputBlurHandler}
          />
          {lastNameHasError && (
            <p className='error-text'>
              Last name is also required, c'mon, gimme.
            </p>
          )}
        </div>
      </div>
      <div className={emailClasses}>
        <label htmlFor='name'>E-Mail Address</label>
        <input
          type='email'
          id='name'
          value={enteredEmail}
          onChange={emailChangeHandler}
          onBlur={emailInputBlurHandler}
        />
        {emailHasError && (
          <p className='error-text'>Por favor, enter a valid email address.</p>
        )}
      </div>
      <div className='form-actions'>
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
