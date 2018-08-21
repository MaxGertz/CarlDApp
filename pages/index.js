import React, {Component} from 'react';
import Layout from '../components/Layout';
import {Button, Form, Grid, Segment, Image, Divider, Message} from 'semantic-ui-react';
import axios from 'axios';
import {Router} from '../routes';
import Fonts from '../components/Font';

const API = 'http://localhost:5656/api/';

class CarlLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
			errorMessage: '',
			loading: false
    };
	}
	componentDidMount () {
    Fonts();
  }


	validateUser = async event => {
		event.preventDefault();

		if(this.state.username.length > 0 && this.state.password.length > 0){
			console.log('Called validate!');
			this.setState({loading: true});

			try{

				let result = await axios.get(API +'user/authUser/'+ this.state.username);
				console.log(result);

				// TODO: Check password!!!!
				if(result.status == '200') {
					if(this.state.password == result.data[0].password) {
					Router.pushRoute('/overview/user/' + result.data[0]._id);
				} else {
					this.setState({errorMessage: 'Wrong password!', loading: false})
				}
				} else {
					this.setState({errorMessage: 'Login failed! Please try again', loading: false})
				}

			} catch (err){
				this.setState({errorMessage: err.message, loading: false});
			}
		} else {
			this.setState({errorMessage: 'Please enter Username & Password'})
		}

	}

	registerUser(event) {
		event.preventDefault();
		console.log('Called register!');

		Router.pushRoute('/register');
	}

  render() {
    return (
			<Layout>
				<div className='login-form'>

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

			  </div>
			</Layout>

		);
  }
}

export default CarlLogin;
