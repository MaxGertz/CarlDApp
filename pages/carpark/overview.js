import React, { Component } from 'react';
import initialize from '../../utils/initialize';
import { initStore } from '../../redux';
import withRedux from 'next-redux-wrapper';
import Layout from '../../components/Layout';
import Logo from '../../components/Logo';
import Menubar from '../../components/Menubar';
import AuthError from '../../components/AuthError';
import CarparkRow from '../../components/CarparkRow';
import { API } from '../../config';
import axios from 'axios';
import { Grid, Segment, Table } from 'semantic-ui-react';

class CarparkOverview extends Component {
  constructor(props) {
    super(props);
  }

  static async getInitialProps(ctx) {
    initialize(ctx);

    const token = ctx.store.getState().authentication.token;

    // checking if user is logged in
    if (token) {
      const responseUser = await axios.get(`${API}/user`, {
        headers: {
          authorization: token
        }
      });
      const user = responseUser.data;

      const responseCarpark = await axios.get(`${API}/api/carpark/getAllCarparks`);
      const carparks = responseCarpark.data;

      return {
        carparks: carparks,
        user: user,
        loggedIn: true
      };
    }
  }

  // renders rows in carpark table for each carpark in db/ owned by user
  renderCarparks() {
    return this.props.carparks.map((carpark, index) => {
      return <CarparkRow key={index} carpark={carpark} />;
    });
  }

  render() {
    return (
      <div>
        {(this.props.loggedIn && (
          <Layout>
            <Grid
              textAlign="center"
              verticalAlign="middle"
              style={{
                height: '100%',
                marginTop: '100px'
              }}>
              <Segment raised inverted style={{ width: '900px', background: '#5c5f63' }}>
                <Grid.Column>
                  <Logo />
                  <Menubar user={this.props.user} />
                </Grid.Column>

                <Grid.Column>
                  <Table style={{ margin: '4em 0em 2em' }}>
                    <Table.Header>
                      <Table.Row textAlign="center">
                        <Table.HeaderCell>Car park</Table.HeaderCell>
                        <Table.HeaderCell>Balance in ether</Table.HeaderCell>
                        <Table.HeaderCell>Transfer to wallet</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>{this.renderCarparks()}</Table.Body>
                  </Table>
                </Grid.Column>
              </Segment>
            </Grid>
          </Layout>
        )) || <AuthError />}
      </div>
    );
  }
}

export default withRedux(initStore)(CarparkOverview);
