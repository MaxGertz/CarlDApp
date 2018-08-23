import React, {Component} from 'react';
import withRedux from 'next-redux-wrapper';
import { initStore } from '../redux';
import actions from '../redux/actions';
import initialize from '../utils/initialize';
import {Button, Form, Grid, Segment, Image, Divider, Message} from 'semantic-ui-react';
import {Router} from '../routes';
import Fonts from '../components/Font';
import Layout from '../components/Layout';

const API = 'http://localhost:5656/api/';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
			errorMessage: '',
			loading: false
		};
	}

static getInitialProps (ctx) {
	initialize(ctx);
}

	componentDidMount () {
    Fonts();
  }


	validateUser = event => {
		event.preventDefault();

		this.props.authenticate({username: this.state.username, password: this.state.password}, 'signin');
	}

	registerUser(event) {
		event.preventDefault();
		console.log('Called register!');

		Router.pushRoute('/register');
	}

  render() {
    return (
				<div className='login-form'>
					<Layout>

				<Grid textAlign='center' style={{ height: '100%', marginTop: '100px' }} verticalAlign='middle'>
			      <Grid.Column style={{ maxWidth: 550 }}>
			        <Form size='large' onSubmit={this.validateUser.bind(this)} error={!!this.state.errorMessage}>

			          <Segment raised>
									<Form.Field>
										<Image src='static/header.png' size='massive'/>
									</Form.Field>
			            <Form.Input
										fluid icon='user'
										iconPosition='left'
										placeholder='Username'
										value={this.state.username}
										onChange={event => this.setState({username: event.target.value})} />
			            <Form.Input
			              fluid
			              icon='lock'
			              iconPosition='left'
			              placeholder='Password'
			              type='password'
										value={this.state.password}
										onChange={event => this.setState({password: event.target.value})} />
									<Button
										color='yellow'
										fluid
										loading={this.state.loading}
										type="submit">
										Login
									</Button>
									<Divider horizontal>Or</Divider>
									<Button
										secondary
										fluid
										onClick={this.registerUser.bind(this)}>
										Sign Up Now
									</Button>
									<Message error header={'Oops!'} content={this.state.errorMessage}/>
									</Segment>

							</Form>
			      </Grid.Column>
			    </Grid>

				</Layout>
			  </div>

		);
  }
}

export default withRedux(initStore, null, actions)(Login);
