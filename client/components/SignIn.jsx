import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { signIn } from '../actions/auth'
import { clearError } from '../actions/error'
import { withRouter } from 'react-router-dom'
import { Button, Form, Header, Segment } from 'semantic-ui-react'

import ResponsiveContainer from './ResponsiveContainer'

const style = {
  minWidth: '350px',
  maxWidth: '550px',
  marginTop: '4rem'
}

class SignIn extends React.Component {
  state = {
    username: '',
    password: ''
  }

  handleChange = e => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit = e => {
    const { username, password } = this.state
    const goToEvents = () => this.props.history.push('/events')
    this.props.signIn(username, password, goToEvents)
    e.preventDefault()
  }

  render () {
    const { username, password } = this.state
    return (
      <ResponsiveContainer>
        <div className='ui middle center aligned grid'>
          <div style={style}>
            <Form size='large'>
              <Segment>
                <Header as='h2'>Sign In</Header>

                <Form.Input data-e2e='username' name='username' label='Username'
                  onChange={this.handleChange} value={username} />

                <Form.Input data-e2e='password' name='password'
                  type='password' label='Password'
                  onChange={this.handleChange} value={password} />

                <Button data-e2e='sign-in-button' fluid primary
                  onClick={this.handleSubmit}>Sign In</Button>
              </Segment>
            </Form>
          </div>
        </div>
      </ResponsiveContainer>
    )
  }
}

SignIn.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func
  }),
  signIn: PropTypes.func
}

function mapDispatchToProps (dispatch) {
  return {
    signIn: (username, password, onSuccess) => {
      dispatch(clearError())
      dispatch(signIn({ username, password }, onSuccess))
    }
  }
}

export default withRouter(
  connect(null, mapDispatchToProps)(SignIn)
)
