import withRedux from 'next-redux-wrapper';
import axios from 'axios';
import React, {Component} from 'react';
import {API} from '../config';
import initialize from '../utils/initialize';
import {initStore} from '../redux';
import Fonts from '../components/Font';
import Layout from '../components/Layout';
import Logo from '../components/Logo';
import {Form,
	 Grid,
	 Segment,
	 Header,
 	 Icon,
 	 Menu} from 'semantic-ui-react';

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
			console.log(user);

			const responseTicket = await axios.get(`${API}/api/ticket/openTickets`, {
					headers: {
						authorization: token
					}
				});

			const tickets = responseTicket.data;
			console.log(tickets);

	    return {user: user, tickets: tickets, loggedIn: true};
	}
}

	componentDidMount(){
		Fonts();
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
							marginTop: '100px'
						}}
						verticalAlign='middle'>
						<Grid.Column
							style={{
							maxWidth: 900
						}}>
						<Form
							size='massive'>
							<Segment raised inverted color='grey'>
								<Form.Field>
									<Logo/>
								</Form.Field>

								<Menu>
									<Menu.Item
										name='username'>

										<Header as='h2' size='small'>
											<Icon name='user circle' size='small'/>
											<Header.Content>{this.props.user.name}</Header.Content>
										</Header>
									</Menu.Item>

									<Menu.Item
									 name='settings'>
									 <Icon name='settings' size='small'/>
									</Menu.Item>

									<Menu.Item
										name='logout'
										position='right'
										>
										<Icon name='log out' size='small'/>
									</Menu.Item>

								</Menu>
							</Segment>
						</Form>
					</Grid.Column>
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
