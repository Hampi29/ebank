import Cookies from 'js-cookie'
import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {userId: '', pin: '', errorMsg: ''}
  onChangingUser = event => {
    this.setState({userId: event.target.value})
  }
  onChangingPin = event => {
    this.setState({pin: event.target.value})
  }
  onSubmitForm = async event => {
    event.preventDefault()
    const {userId, pin} = this.state
    const url = 'https://apis.ccbp.in/ebank/login'
    const userDetails = {user_id:userId, pin}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const jwtToken = data.jwt_token
      const {history} = this.props
      Cookies.set('jwt_token', jwtToken, {expires: 30,path:'/',})
      history.replace('/')
    } else {
      this.setState({errorMsg: data.error_msg})
    }
  }
  render() {
    const {userId, pin, errorMsg} = this.state
    const showError = errorMsg !== ''
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <div className="login-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
            className="image"
          />
          <form className="welcome-container" onSubmit={this.onSubmitForm}>
            <h1>Welcome Back!</h1>
            <label for="UserId">User ID</label>
            <br />
            <input
              id="UserId"
              value={userId}
              type="text"
              placeholder="Enter User ID"
              onChange={this.onChangingUser}
            />
            <br />
            <label for="Pin">PIN</label>
            <br />
            <input
              id="Pin"
              value={pin}
              type="password"
              placeholder="Enter PIN"
              onChange={this.onChangingPin}
            />
            <br />
            <button type="submit" className="login-btn">
              Login
            </button>
            {showError ? <p className="error">*{errorMsg}</p> : null}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
