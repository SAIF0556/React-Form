import { useState } from 'react'
import Input from './Input'
import { isEmail, isNotEmpty, hasMinLength } from '../util/validation.js'
export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [isInputBlur, setIsInputBlur] = useState({
    email: false,
    password: false,
  })
  function HandleSubmit(event) {
    event.preventDefault()
    console.log(formData)
    setFormData(() => ({
      email: '',
      password: '',
    }))
    setIsInputBlur({
      email: false,
      password: false,
    })
  }

  function handleInputBlur(identifier) {
    setIsInputBlur((prevValue) => ({
      ...prevValue,
      [identifier]: true,
    }))
  }
  // console.log(isInputBlur.password)
  function HandleChange(identifier, value) {
    setFormData((prevValue) => ({
      ...prevValue,
      [identifier]: value,
    }))
    setIsInputBlur((prevValue) => ({
      ...prevValue,
      [identifier]: false,
    }))
  }
  function handleReset() {
    setFormData({
      email: '',
      password: '',
    })
  }
  // form validation on every key stroke -- too early validation
  // const isInValidEmail = formData.email != '' && !formData.email.includes('@')
  // validation on submit (adding a submission based validation is always a good idea even you are validating on every key stroke)

  const isInValidEmail =
    isInputBlur.email === true &&
    !isEmail(formData.email) &&
    isNotEmpty(formData.email)
  const isInValidPassword =
    isInputBlur.password === true && !hasMinLength(formData.password, 6)

  return (
    <form onSubmit={HandleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <Input
            id="mail"
            name="mail"
            type="mail"
            error={isInValidEmail && 'Please enter a valid email'}
            onChange={(event) => HandleChange('email', event.target.value)}
            onBlur={() => handleInputBlur('email')}
            value={formData.email}
          />
        </div>

        <div className="control no-margin">
          <Input
            id="password"
            type="password"
            name="password"
            error={isInValidPassword && 'Please enter a valid password'}
            onChange={(event) => HandleChange('password', event.target.value)}
            onBlur={() => handleInputBlur('password')}
            value={formData.password}
          />
        </div>
      </div>

      <p className="form-actions">
        <button
          type="reset"
          className="button button-flat"
          onClick={handleReset}
        >
          Reset
        </button>
        <button className="button">Login</button>
      </p>
    </form>
  )
}
