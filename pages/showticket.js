import React, {Component} from 'react';
import Layout from '../components/Layout';
import Logo from '../components/Logo';
import axios from 'axios';
import {API} from '../config';
import withRedux from 'next-redux-wrapper';
import {initStore} from '../redux';
import initialize from '../utils/initialize';
import Menubar from '../components/Menubar';
import datetime from '../utils/datetime';

import web3 from '../ethereum/web3';
import Ticket from '../ethereum/ticket';

import {Grid,
				Menu,
				Header,
				Form,
				Message,
				Button,
				Icon,
				Card,
				Segment} from 'semantic-ui-react';

class ShowTicket extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			success: false,
			errorMessage: ''
		};
	}

	// TODO: get ticket information from sc not db -> carpark info from db!
	static async getInitialProps(props) {

		const contractAddress = props.query.id;

		const responseTicket = await axios.get(
			`${API}/api/ticket/byCA/${contractAddress}`);
		const ticket = responseTicket.data;

		const responseUser = await axios.get(
			`${API}/api/user/find/${ticket.userId}`);
		const user = responseUser.data;

		const responseCarpark = await axios.get(
		`${API}/api/carpark/${ticket.carparkId}`);
		const carpark = responseCarpark.data;

		const startTime = datetime(ticket.startTime);

		return {ticket: ticket, carpark: carpark, user: user, startTime: startTime};
		}

		getCost = () =>{
			const currentTime = Math.floor(Date.now()/1000);
			const currentCost = parseFloat((currentTime - parseInt(this.props.ticket.startTime)))*(this.props.carpark.costHour/60/60);

			return currentCost.toFixed(4);
		}

		requestCar = async (event) => {
			event.preventDefault();

			this.setState({loading: true, errorMessage: ''});

			console.log('Called request car!');

			try {
				const accounts = await web3.eth.getAccounts();

				const ticketSC = Ticket(this.props.ticket.contractAddress);
				console.log(ticketSC);

				await ticketSC.methods.closeTicket().send({
					from: accounts[0]
				});

				const parkingCosts = await ticketSC.methods.parkingCosts().call();
				console.log('parkingCosts',parkingCosts);
				const endTime = await ticketSC.methods.endTime().call();
				console.log('endTime', endTime);

				await ticketSC.methods.payTicket().send({
					from: accounts[0],
					value: parkingCosts
				})

				const res = await axios.put(
					`${API}/api/ticket/closeTicket`,
					{
						_id: this.props.ticket._id,
						endTime: endTime
					});
					if(res.status == 200) {
						this.setState({loading: false, success: true});
					} else {
						this.setState({loading: false, errorMessage: 'Ticket is closed but not saved in the database'});
					}
			} catch (err) {
				this.setState({errorMessage: err.message, loading: false});
			}
		}

		renderCarpark() {
			return(
					<Grid.Column style={{width: '400px', marginTop: '10px'}}>
						<b>CARPARK: </b>
						<Grid.Row>{this.props.carpark.name}</Grid.Row>
						<Grid.Row>{this.props.carpark.address.street} {this.props.carpark.address.number}</Grid.Row>
						<Grid.Row>{this.props.carpark.address.zipCode} {this.props.carpark.address.city}</Grid.Row>
					</Grid.Column>
			);
		}


	render() {
		console.log(this.state);

		return(
			<div>
				<Layout>
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
						 style={{
							 width: '900px',
							 background: '#5c5f63'}}>

								<Logo/>
								<Menubar user={this.props.user}/>

									<div className='ticket'>
											<style jsx>{`
																.ticket{
																	background: url(../static/Ticket_bg.png) center;
																	background-size: 63em !important;
																	background-repeat: no-repeat;
																	font-family: Lucida Console, Monaco, monospace;
																	}`}
											</style>

											<Segment basic style={{
													height: '450px',
													width: '230px'
											}}>

												<div className='info' style={{margin: '4em 12em 2em'}}>
													<Grid columns={3} stretched inverted style={{width: '400px'}}>

														<Grid.Row>
															<Grid.Column style={{width: '300px'}}>
																<Grid.Row><b>CONTRACT: </b></Grid.Row>
																<Grid.Row>{this.props.ticket.contractAddress}</Grid.Row>
      												</Grid.Column>

																<Grid.Column style={{width: '250px', marginTop: '10px'}}>
																	<Grid.Row><b>LICENSE PLATE: </b></Grid.Row>
																	<Grid.Row>{this.props.ticket.licensePlate}</Grid.Row>
																</Grid.Column>

																<Grid.Column style={{marginTop:'10px'}}>
																	<Grid.Row><b>COST/HOUR:</b></Grid.Row>
																	<Grid.Row>{this.props.carpark.costHour} Ether</Grid.Row>
																</Grid.Column>
															</Grid.Row>

														<Grid.Row>
															<Grid.Column style={{width: '250px'}}>
																<Grid.Row><b>IN: </b></Grid.Row>
																<Grid.Row>{this.props.startTime}</Grid.Row>
															</Grid.Column>

															<Grid.Column style={{width: '150px'}}>
																<Grid.Row><b>TICKET COST: </b></Grid.Row>
																<Grid.Row>{this.getCost()} Ether</Grid.Row>
															</Grid.Column>
																{this.renderCarpark()}
														</Grid.Row>

													 </Grid>
												</div>

											</Segment>
									 </div>

									 <Form error={!!this.state.errorMessage} success={this.state.success} style={{marginTop: '1em'}}>
									 <Message
                     error
                     header={'Oops!'}
                     content={this.state.errorMessage}/>
									 <Message
										 success
										 header={'Successfully requested car'}
										 content='You can pick up your car at B3'/>

									 <Button
										 fluid
										 disabled={this.state.success}
                     loading={this.state.loading}
                     type="submit"
										 onClick={this.requestCar.bind(this)}
 										 style={{marginTop: '2em',marginBottom: '2em', background:'#ffcc33', color:'#fff'}}>
										 Request car & pay ticket
									 </Button>
								 </Form>


				 </Segment>
				</Grid>
			</Layout>
		</div>
		);
	}
}



export default withRedux(initStore)(ShowTicket);
