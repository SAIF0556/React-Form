import { useRef, useState } from 'react'

export default function Login() {
  const [isInvalidEmail, setIsInvalidEmail] = useState(false)
  const email = useRef()
  const password = useRef()

  function HandleSubmit(event) {
    event.preventDefault()
    const enteredEmail = email.current.value
    const enteredPassword = password.current.value
    console.log(enteredEmail, enteredPassword)
    event.target.reset()

    // validation on submit (adding a submission based validation is always a good idea even you are validating on every key stroke)
    const isEmailValid = enteredEmail.includes('@')
    if (!isEmailValid) {
      setIsInvalidEmail(true)
      return
    }
    setIsInvalidEmail(false)
    console.log('Sending HTTP request')
  }

  return (
    <form onSubmit={HandleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" ref={email} />

          <div className="control-error">
            {isInvalidEmail && <p>please enter a valid email</p>}
          </div>
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" ref={password} />
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  )
}
