import React, {Component} from 'react';
import{} from 'semantic-ui-react';
import axios from 'axios';
import Layout from '../../components/Layout';
import Fonts from '../../components/Font';

const API = 'http://localhost:5656/api/';

class UserOverview extends Component {
	static async getInitialProps(props) {
		const userId = props.query.id;

		const user = await axios.get(API + 'user/findUser/' + userId);
		const tickets = await axios.get(API + 'ticket/openTickets/' + userId);

		return {
			userId: userId,
			licensePlate: user.data[0].licensePlate,
			tickets: tickets.data
		};
	}

	componentDidMount() {
		Fonts();
	}

	render () {
		return (
			<Layout>
				<h3> User overview </h3>
			</Layout>
		);
	}


}

export default UserOverview;
