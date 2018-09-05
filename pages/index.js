import withRedux from 'next-redux-wrapper';
import axios from 'axios';
import React, {Component} from 'react';
import {API} from '../config';
import initialize from '../utils/initialize';
import {initStore} from '../redux';
import Fonts from '../components/Font';
import Layout from '../components/Layout';
import Menubar from '../components/Menubar'
import TicketRow from '../components/TicketRow';
import AuthError from '../components/AuthError';
import Logo from '../components/Logo';
import {
	 Form,
	 Grid,
	 Menu,
	 Header,
	 Icon,
	 Segment,
	 Row,
 	 Table} from 'semantic-ui-react';

class Overview extends Component {
	targetElement = null;

	constructor(props) {
		super(props);
		this.state = {
			user:'',
			tickets:'',
			loggedIn: false
		};
	}

	static async getInitialProps(ctx) {
		initialize(ctx);

	  const token = ctx.store.getState().authentication.token;

	  if (token) {
	    const responseUser = await axios.get(
	      `${API}/user `,
	      {
	        headers: {
	          authorization: token
	        }
	      });
	    const user = responseUser.data;

			const responseTicket = await axios.get(`${API}/api/ticket/openTickets`, {
					headers: {
						authorization: token
					}
				});
			const tickets = responseTicket.data;

	    return {user: user, tickets: tickets, loggedIn: true};
		}
	}

	componentDidMount(){
		Fonts();
	}

	renderTickets() {
		return this.props.tickets.map((ticket, index) => {
			return <TicketRow
				key={index}
				ticket={ticket}
				user={this.props.user}/>;
		});
	}

	render () {
		const isServer = typeof window === 'undefined'
		if (isServer) {
			console.log('isServer ' + true);

		}
		return(
		<div>
			<Layout>
				{
				(this.props.loggedIn &&
					<Grid
						textAlign='center'
						style={{
							height: '100%',
							marginTop: '100px',
						}}
						verticalAlign='middle'>
						<Segment raised inverted style={{width: '900px', background: '#5c5f63' }}>

						<Grid.Column>

							<Logo/>

								<Menubar user={this.props.user}/>

					</Grid.Column>

					<Grid.Column>
					<Table style={{margin: '4em 0em 2em'}}>

						<Table.Header>
							<Table.Row textAlign='center'>
								<Table.HeaderCell>License Plate</Table.HeaderCell>
								<Table.HeaderCell>Start Time</Table.HeaderCell>
								<Table.HeaderCell>Carpark</Table.HeaderCell>
								<Table.HeaderCell>Show</Table.HeaderCell>
							</Table.Row>
						</Table.Header>

							<Table.Body>
								{this.renderTickets()}
							</Table.Body>

					</Table>

				</Grid.Column>

			</Segment>
		</Grid>

	) || <AuthError/>
	}


		</Layout>
	  </div>

		)
	}
}


export default withRedux(initStore)(
  Overview
);
