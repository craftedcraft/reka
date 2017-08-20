import React from 'react'
import {connect} from 'react-redux'
import {signIn} from '../actions/auth'
import {clearError} from '../actions/error'

class SignIn extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  render () {
    const {username, password} = this.state
    return (
      <div className='sign-in'>
        <div className='page-content-wrapper'>
          <div className='content'>
            <form className='pure-form pure-form-stacked'>
              <fieldset>
                <legend>Sign in</legend>

                <label htmlFor='username'>Username</label>
                <input id='username' name='username' placeholder='username'
                  onChange={this.handleChange} value={username} />

                <label htmlFor='password'>Password</label>
                <input id='password' name='password'
                  type='password' placeholder='password'
                  onChange={this.handleChange} value={password} />

                <button className='pure-button pure-button-primary'
                  onClick={this.handleSubmit}>Sign in</button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    )
  }

  handleChange (e) {
    const {name, value} = e.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit (e) {
    const {username, password} = this.state
    this.props.signIn(username, password)
    e.preventDefault()
  }
}

function mapDispatchToProps (dispatch) {
  return {
    signIn: (username, password) => {
      dispatch(clearError())
      dispatch(signIn({username, password}))
    }
  }
}

export default connect(null, mapDispatchToProps)(SignIn)
