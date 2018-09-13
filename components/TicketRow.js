import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';
import Fonts from '../components/Font';
import axios from 'axios';
import { API } from '../config';
import { Router } from '../routes';
import datetime from '../utils/datetime';

///showticket/${this.props.ticket.contractAddress}

class TicketRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carpark: '',
      start: ''
    };
  }

  async componentDidMount() {
    Fonts();
    const responseCarpark = await axios
      .get(
        `${API}/api/carpark/${this.props.ticket.carparkId}`
      );
    const carpark = responseCarpark.data;

    this.setState({ carpark: carpark });
  }

  onClick = event => {
    event.preventDefault();

    Router.pushRoute('showTicket', { id: this
        .props.ticket.contractAddress });
  }

  render() {
    const { Row, Cell } = Table;

    return (
      <Row textAlign='center'>
				<Cell>{this.props.ticket.licensePlate}</Cell>
				<Cell>{datetime(this.props.ticket.startTime)}</Cell>
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
