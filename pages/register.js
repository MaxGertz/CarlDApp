import React, {Component} from 'react';
import Layout from '../components/Layout';
import {Grid, Form, Segment, Image, Button, Message} from 'semantic-ui-react';
import axios from 'axios';
import Fonts from '../components/Font';

const API = 'http://localhost:5656/api/';

class RegisterUser extends Component {
	constructor(props) {
		super(props);
		this.state ={
			username: '',
			password: '',
			licensePlate:'',
			errorMessage:'',
			loading: false,
			success: false
		};
	}

	componentDidMount() {
		Fonts();
	}

	registerNewUser = async event => {
		event.preventDefault();

		if(this.state.username.length > 0 && this.state.password.length > 0 && this.state.licensePlate.length > 0){
			console.log('Called register!');

			try {

				this.setState({loading: true});

				let data = JSON.stringify({
					name: this.state.username,
					password: this.state.password,
					licensePlate: this.state.licensePlate
				});

				let result = await axios.post(API + 'user/addUser', data, {
					headers:{
						'Content-Type':'application/json'
					}
				});

				if(result.status == '201') {
					this.setState({success: true, loading: false})

				} else {
					this.setState({errorMessage: 'Registration failed! Username already taken!', loading: false})
				}

			} catch (err) {
				this.setState({errorMessage: 'Registration failed! Username already taken!', loading: false});
			}

		} else {
			this.setState({errorMessage: 'Please enter all informations'});
		}
	}

	render () {
		return (
		<Layout>
			<div className='register-form'>

				<Grid textAlign='center' style={{ height: '100%', marginTop: '100px' }} verticalAlign='middle'>
						<Grid.Column style={{ maxWidth: 550 }}>
							<Form size='large'onSubmit={this.registerNewUser.bind(this)} error={!!this.state.errorMessage} success={this.state.success}>
								<Segment raised>

									<Form.Field>
										<Image src='static/header.png' size='massive'/>
									</Form.Field>

									<Form.Input
										fluid
										icon='user'
										iconPosition='left'
										placeholder='Username'
										type='text'
										value={this.state.username}
										onChange={event => this.setState({username: event.target.value})}
										/>
									<Form.Input
										fluid
										icon='lock'
										iconPosition='left'
										placeholder='Password'
										type='password'
										value={this.state.password}
										onChange={event => this.setState({password: event.target.value})}
										/>
									<Form.Input
										fluid
										icon='car'
										iconPosition='left'
										placeholder='License Plate'
										type='text'
										value={this.state.licensePlate}
										onChange={event => this.setState({licensePlate: event.target.value})}
										/>

									<Button
										fluid
										color='yellow'
										onClick={this.registerNewUser.bind(this)}
										loading={this.state.loading}
										type='submit'
										>Register now!</Button>

										<Message error header={'Oops!'} content={this.state.errorMessage}/>
										<Message success header={'Yeah! Your registration was successful'} content='You may now log-in with the username you have chosen'/>

								</Segment>
							</Form>
						</Grid.Column>
					</Grid>
			</div>
		</Layout>
	);
	}
}

export default RegisterUser;
