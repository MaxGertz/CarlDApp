import React, {Component} from 'react';
import {Table, Button} from 'semantic-ui-react';
import axios from 'axios';
import { API } from '../config';
import {Link} from '../routes';

class TicketRow extends Component{
	constructor(props) {
		super(props);
		this.state = {
			carpark:''
		};
	}

	async componentDidMount() {
		const responseCarpark = await axios.get(
			`${API}/api/carpark/${this.props.ticket.carparkId}`
		);
		this.setState({carpark: responseCarpark.data})
}

	render() {
		const {Row, Cell} = Table;

		return(
			<Row textAlign='center'>
				<Cell>{this.props.ticket.licensePlate}</Cell>
				<Cell>{this.props.ticket.startTime}</Cell>
				<Cell>{this.state.carpark.name}</Cell>
				<Cell>
					<Link route={`/showticket/${this.props.ticket.contractAddress}`}>
						<Button fluid style={{background:'#ffcc33', color:'#fff'}}>
							Show Ticket
						</Button>
					</Link>
				</Cell>
			</Row>
		)
	};
}

export default TicketRow;
