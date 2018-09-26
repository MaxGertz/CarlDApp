import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Carpark from '../ethereum/carpark';

class CarparkRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: '',
      carparkSC: null,
      accounts: null
    };
  }

  async componentDidMount() {
    try {
      const accounts = await web3.eth.getAccounts();
      const carparkSC = Carpark(this.props.carpark.wallet);
      const balanceWei = await carparkSC.methods.getValue().call();
      const balance = web3.utils.fromWei(balanceWei, 'ether');
      const balanceFixed = parseFloat(balance).toFixed(5);

      this.setState({ balance: balanceFixed, carparkSC: carparkSC, accounts: accounts });
    } catch (err) {
      console.log(err.message);
    }
  }

  onClick = async event => {
    event.preventDefault();

    const carpark = this.state.carparkSC;
    console.log(this.state.carparkSC);

    try {
      await carpark.methods.transferValue().send({
        from: this.state.accounts[0]
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  render() {
    const { Row, Cell } = Table;
    return (
      <Row textAlign="center">
        <Cell>{this.props.carpark.name}</Cell>
        <Cell>{this.state.balance}</Cell>
        <Cell>
          <Button
            fluid
            onClick={this.onClick.bind(this)}
            style={{
              background: '#ffcc33',
              color: '#fff'
            }}>
            Transfer Balance
          </Button>
        </Cell>
      </Row>
    );
  }
}

export default CarparkRow;
