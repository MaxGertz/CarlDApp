import React, {Component} from 'react';
import {Table, Button} from 'semantic-ui-react';
import axios from 'axios';
import {API} from '../config';
import {Router} from '../routes';
import datetime from '../utils/datetime';

///showticket/${this.props.ticket.contractAddress}

class TicketRow extends Component{
	constructor(props) {
		super(props);
		this.state = {
			carpark:'',
			start:''
		};
	}

	// TODO: try with getInitialProps
	async componentDidMount() {
		const responseCarpark = await axios.get(
			`${API}/api/carpark/${this.props.ticket.carparkId}`
		);

		const date = datetime(this.props.ticket.startTime);
		console.log(date);
		this.setState({carpark: responseCarpark.data, start: date})
	}

	onClick = event => {
		event.preventDefault();

		Router.pushRoute(`/showticket/${this.props.ticket.contractAddress}`);
	}

	render() {
		const {Row, Cell} = Table;

		return(
			<Row textAlign='center'>
				<Cell>{this.props.ticket.licensePlate}</Cell>
				<Cell>{this.state.start}</Cell>
				<Cell>{this.state.carpark.name}</Cell>
				<Cell>
						<Button
							fluid
							onClick={this.onClick.bind(this)}
							style={{background:'#ffcc33', color:'#fff'}}>
							Show Ticket
						</Button>
				</Cell>
			</Row>
		)
	};
}

export default TicketRow;
