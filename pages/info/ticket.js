import React, { Component } from 'react';
import Layout from '../../components/Layout';
import Logo from '../../components/Logo';
import { Segment, Container, Image, Grid } from 'semantic-ui-react';

class ContractInfo extends Component {
  render() {
    return (
      <div>
        <Layout />
        <Grid
          textAlign="center"
          verticalAlign="middle"
          style={{
            height: '100%',
            marginTop: '100px'
          }}>
          <Segment
            raised
            inverted
            style={{
              width: '900px',
              background: '#5c5f63'
            }}>
            <Logo />
            <Segment>
              <Image centered src="/static/TicketContract.png" />
            </Segment>
          </Segment>
        </Grid>
      </div>
    );
  }
}

export default ContractInfo;
