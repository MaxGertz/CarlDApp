import React, {Component} from 'react';
import Layout from '../components/Layout';
import Logo from '../components/Logo';
import axios from 'axios';
import {API} from '../config';
import Menubar from '../components/Menubar';
import datetime from '../utils/datetime';
import {Grid,
				Menu,
				Header,
				Image,
				Divider,
				Button,
				Icon,
				Card,
				Segment} from 'semantic-ui-react';

class ShowTicket extends Component {
	constructor(props) {
		super(props);
		this.state = {
			ticket: '',
			carpark: '',
			user: '',
			startTime: ''
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

		renderCarpark() {
			return(
					<Grid.Column style={{width: '200px'}}>
						<b>CARPARK: </b>
						<Grid.Row>{this.props.carpark.name}</Grid.Row>
						<Grid.Row>{this.props.carpark.address.street} {this.props.carpark.address.number}</Grid.Row>
						<Grid.Row>{this.props.carpark.address.zipCode} {this.props.carpark.address.city}</Grid.Row>
					</Grid.Column>
			);
		}


	render() {
		console.log(this.props);

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
																	font-family: "Lucida Console", Monaco, monospace;
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

															<Grid.Column style={{width: '300px', marginTop: '10px'}}>
																<Grid.Row><b>LICENSE PLATE: </b></Grid.Row>
																<Grid.Row>{this.props.ticket.licensePlate}</Grid.Row>
															</Grid.Column>
														</Grid.Row>

															<Grid.Column style={{width: '250px'}}>
																<Grid.Row><b>IN: </b></Grid.Row>
																<Grid.Row>{this.props.startTime}</Grid.Row>
															</Grid.Column>

															<Grid.Column>
																<Grid.Row><b>COST/HOUR:</b></Grid.Row>
																<Grid.Row>{this.props.carpark.costHour} Ether</Grid.Row>
															</Grid.Column>

																{this.renderCarpark()}

													 </Grid>
												</div>
											</Segment>
									 </div>


				 </Segment>
				</Grid>
			</Layout>
		</div>
		);
	}
}



export default ShowTicket;
