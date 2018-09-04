import React, {Component} from 'react';
import Layout from '../components/Layout';
import Logo from '../components/Logo';
import axios from 'axios';
import {API} from '../config';
import {Grid,
				Menu,
				Header,
				Image,
				Icon,
				Card,
				Segment} from 'semantic-ui-react';

class ShowTicket extends Component {
	constructor(props) {
		super(props);
		this.state = {
			ticket: '',
			carpark: ''
		};
	}

	// TODO: get ticket information from sc not db -> carpark info from db!
	static async getInitialProps(props) {

		const contractAddress = props.query.id;

		const responseTicket = await axios.get(
			`${API}/api/ticket/byCA/${contractAddress}`);
		const ticket = responseTicket.data;

		const responseCarpark = await axios.get(
			`${API}/api/carpark/${ticket.carparkId}`);
		const carpark = responseCarpark.data;

		return {ticket: ticket, carpark: carpark};
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
													<Grid columns={3} stretched inverted>
															<Grid.Column>
																<b>Contract: </b>
																{this.props.ticket.contractAddress}
      												</Grid.Column>

															<Grid.Column>
																<b>License Plate: </b>
																{this.props.ticket.licensePlate}

															</Grid.Column>
															<Grid.Column>
																<b>IN: </b>
																{this.props.ticket.startTime}
															</Grid.Column>



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
