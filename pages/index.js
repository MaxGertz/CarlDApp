import withRedux from 'next-redux-wrapper';
import axios from 'axios';
import React, { Component } from 'react';
import { API } from '../config';
import initialize from '../utils/initialize';
import { initStore } from '../redux';
import { Router } from '../routes';
import Fonts from '../components/Font';
import Layout from '../components/Layout';
import Menubar from '../components/Menubar';
import TicketRow from '../components/TicketRow';
import AuthError from '../components/AuthError';
import Logo from '../components/Logo';
import {
  Form,
  Grid,
  Button,
  Message,
  Menu,
  Header,
  Icon,
  Segment,
  Row,
  Table
} from 'semantic-ui-react';

class Overview extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static async getInitialProps(ctx) {
    initialize(ctx);

    const token = ctx.store.getState().authentication.token;

    if (token) {
      const responseUser = await axios.get(`${API}/user `, {
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

      // checks if there are any open tickets
      let showTable = false;
      if (tickets.length >= 1) {
        showTable = true;
      }

      return {
        user: user,
        tickets: tickets,
        loggedIn: true,
        showTable: showTable
      };
    }
  }

  componentDidMount() {
    Fonts();
  }

  openDeployTicket = event => {
    event.preventDefault();

    Router.pushRoute('/test/deployTicket');
  };

  // renders rows in ticket table
  renderTickets() {
    return this.props.tickets.map((ticket, index) => {
      return <TicketRow key={index} ticket={ticket} user={this.props.user} />;
    });
  }

  render() {
    return (
      <div>
        <Layout>
          {(this.props.loggedIn && (
            <Grid
              textAlign="center"
              style={{
                height: '100%',
                marginTop: '100px'
              }}
              verticalAlign="middle">
              <Segment raised inverted style={{ width: '900px', background: '#5c5f63' }}>
                <Grid.Column>
                  <Logo />
                  <Menubar user={this.props.user} />
                </Grid.Column>

                <Grid.Column>
                  {(this.props.showTable && (
                    <Table style={{ margin: '4em 0em 2em' }}>
                      <Table.Header>
                        <Table.Row textAlign="center">
                          <Table.HeaderCell>License Plate</Table.HeaderCell>
                          <Table.HeaderCell>Start Time</Table.HeaderCell>
                          <Table.HeaderCell>Car park</Table.HeaderCell>
                          <Table.HeaderCell>Show</Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>{this.renderTickets()}</Table.Body>
                    </Table>
                  )) || (
                    <Message>
                      <Message.Header>No open tickets</Message.Header>
                      <p>You have no parked cars :(</p>
                    </Message>
                  )}
                </Grid.Column>

                <Button
                  size="small"
                  onClick={this.openDeployTicket.bind(this)}
                  style={{
                    background: '#f24344',
                    color: '#fff',
                    marginTop: '1em'
                  }}>
                  Deploy new ticket!
                </Button>
              </Segment>
            </Grid>
          )) || <AuthError />}
        </Layout>
      </div>
    );
  }
}

export default withRedux(initStore)(Overview);
