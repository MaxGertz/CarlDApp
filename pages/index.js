import withRedux from 'next-redux-wrapper';
import axios from 'axios';
import React, {Component} from 'react';
import {API} from '../config';
import initialize from '../utils/initialize';
import {initStore} from '../redux';
import Fonts from '../components/Font';
import Layout from '../components/Layout';
import TicketRow from '../components/TicketRow';
import Logo from '../components/Logo';
import {
	 Form,
	 Grid,
	 Segment,
	 Header,
 	 Icon,
 	 Menu,
	 Row,
 	 Table} from 'semantic-ui-react';

class Overview extends Component {
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
				ticket={ticket}/>;
		});
	}

	render () {
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

								<Menu borderless style={{margin: '2em 0em 2em'}}>
									<Menu.Item
										name='username'>

										<Header as='h2' size='small'>
											<Icon name='user circle' size='small'/>
											<Header.Content>{this.props.user.name}</Header.Content>
										</Header>
									</Menu.Item>

									<Menu.Item
									 name='settings'>
									 <Icon name='settings' size='small' />
									</Menu.Item>

									<Menu.Item
										name='logout'
										position='right'
										>
										<Icon name='log out' size='small'/>
									</Menu.Item>

								</Menu>

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

			) || <h3>Not authenticated</h3>
	}



		</Layout>
	  </div>

		)
	}
}


export default withRedux(initStore)(
  Overview
);
