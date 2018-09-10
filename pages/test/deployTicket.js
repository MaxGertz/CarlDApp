import React, {Component} from 'react';
import initialize from '../../utils/initialize';
import {initStore} from '../../redux';
import withRedux from 'next-redux-wrapper';
import axios from 'axios';
import {API} from '../../config';
import web3 from '../../ethereum/web3';
import factory from '../../ethereum/factory';
import Ticket from '../../ethereum/ticket';
import AuthError from '../../components/AuthError';
import Logo from '../../components/Logo';
import Layout from '../../components/Layout';
import Menubar from '../../components/Menubar';
import {Grid,
				Segment,
				Form,
				Header,
				Button,
				Message,
				Dropdown} from 'semantic-ui-react';

class DeployTicket extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			success: false,
			errorMessage: '',
			licensePlate: null,
			carpark: null
		};
	}

	static async getInitialProps(ctx) {
		initialize(ctx);

		const token = ctx.store.getState().authentication.token;

		if (token) {
			console.log(token);
			const responseUser = await axios.get(
				`${API}/user `,
				{
					headers: {
					authorization: token
				}
			});
			const user = responseUser.data;
			console.log(user);
			const responseCarparks = await axios.get(
				`${API}/api/carpark/getAllCarparks`
			);
			const carparks = responseCarparks.data;
			console.log(carparks);

			return {user: user, carparks: carparks, loggedIn: true};
		}
	}

	onChangeCarpark = (value) => {
		this.setState({carpark: value});
	}

	onChangeLP = (value) => {
		this.setState({licensePlate: value});
	}

	parkCar = async (event) => {
		event.preventDefault();

		if(this.state.licensePlate != null && this.state.carpark != null) {
			console.log('Open ticket with:', this.state);

			this.setState({loading: true,success: false, errorMessage: ''});

			try {
				const accounts = await web3.eth.getAccounts();

				let cost = (this.state.carpark.costHour/60/60).toFixed(18);
				const costInWeiPerSec = web3.utils.toWei(cost.toString(), 'ether');

				await factory.methods.createTicket(
					this.state.licensePlate,
					this.state.carpark.wallet,
					costInWeiPerSec
				).send({
					from: accounts[0]
				});

				// IDEA: let createTicket return the contractAddress!
				const deployedTickets = await factory.methods.getDeployedTickets().call();
				console.log(deployedTickets);
				const ticketAddress = deployedTickets[deployedTickets.length-1];
				console.log(ticketAddress);

				const ticketSC = Ticket(ticketAddress);
				console.log(ticketSC);

				const startTime = await ticketSC.methods.startTime().call();

				// add auth
				const res = await axios.post(
					`${API}/api/ticket/addNewTicket`,
					{
						userId: this.props.user._id,
						carparkId: this.state.carpark._id,
						contractAddress: ticketAddress,
						licensePlate: this.state.licensePlate,
						startTime: startTime
					}
				);
				if(res.status == 201) {
					this.setState({loading: false, success: true});
				} else {
					this.setState({errorMessage: 'Ticket created but not saved in db!'});
				}

			} catch (err) {
				this.setState({errorMessage: err.message});
			}

		} else {
			this.setState({errorMessage: 'Please choose carpark & license plate!'});
		}

		// string licensePlate, address cpAddress, uint cost <- required parameters for new ticket
	}

	render() {
		console.log(this.state);
		return (
			<div>
				<Layout>

					{(this.props.loggedIn &&
						<Grid
							textAlign='center'
							style={{
								height: '100%',
								marginTop: '100px',
							}}
							verticalAlign='middle'>

							<Segment
								raised
								inverted
								style={{width: '900px', background: '#5c5f63' }}>

								<Grid.Column>
									<Logo/>
									<Menubar user={this.props.user}/>
								</Grid.Column>

								<Segment>

									<Form
										success={this.state.success}
										error={!!this.state.errorMessage}>
										<Form.Field>
											<Form.Input
												readOnly
												fluid
												width='4'
												label='Username'
												value={this.props.user.name}>
											</Form.Input>
										</Form.Field>
										<Form.Field>
											<Dropdown
												placeholder='Select carpark'
												selection
												onChange={(event, data) => {this.onChangeCarpark(data.value)}}
												options={this.props.carparks.map(cp => {
													return{
														key: cp._id,
														text: cp.name,
														value: cp,
														content: <Header icon='warehouse' content={cp.name} size='tiny'/>};
												})}>
											</Dropdown>
										</Form.Field>
										<Form.Field>
											<Dropdown
												placeholder='Select car'
												selection
												onChange={(event, data) => {this.onChangeLP(data.value)}}
												options={this.props.user.licensePlate.map(lp => {
													return{
														key: lp,
														text: lp,
														value: lp,
														content: <Header  icon='car' content={lp} size='tiny'/>};
												})}>
											</Dropdown>
										</Form.Field>

										<Message
	                    error
	                    header={'Oops!'}
	                    content={this.state.errorMessage}/>
											<Message
										    success
										    header='Deployed new ticket!'
										  />

										<Button
 										  fluid
                      loading={this.state.loading}
                      type="submit"
 										  onClick={this.parkCar.bind(this)}
  										style={{marginTop: '2em',marginBottom: '2em', background:'#ffcc33', color:'#fff'}}>
 										 Park car!
 									 </Button>

									</Form>
							</Segment>
						</Segment>
					</Grid>


					 ) || <AuthError/> }
			</Layout>
		</div>
		)
	}
}

export default withRedux(initStore)(DeployTicket);
