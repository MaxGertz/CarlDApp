import React, { Component } from 'react';
import withRedux from 'next-redux-wrapper';
import { initStore } from '../redux';
import actions from '../redux/actions';
import initialize from '../utils/initialize';
import { Grid, Form, Segment, Image, Button, Message } from 'semantic-ui-react';
import Fonts from '../components/Font';
import Layout from '../components/Layout';
import Logo from '../components/Logo';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errorMessage: '',
      loading: false,
      success: false
    };
  }

  static getInitialProps(ctx) {
    initialize(ctx);
  }

  componentDidMount() {
    Fonts();
  }

  registerNewUser = event => {
    event.preventDefault();
    // TODO: license plate needs to be added to db during registration

    this.props.authenticate(
      {
        username: this.state.username,
        password: this.state.password
      },
      'signup'
    );
  };

  render() {
    return (
      <Layout>
        <div className="register-form">
          <Grid
            textAlign="center"
            color="grey"
            style={{
              height: '100%',
              marginTop: '100px'
            }}
            verticalAlign="middle">
            <Grid.Column
              style={{
                maxWidth: 550
              }}>
              <Form
                size="large"
                color="grey"
                onSubmit={this.registerNewUser.bind(this)}
                error={!!this.state.errorMessage}
                success={this.state.success}>
                <Segment raised inverted style={{ background: '#5c5f63' }}>
                  <Form.Field>
                    <Logo />
                  </Form.Field>

                  <Form.Input
                    fluid
                    icon="user"
                    iconPosition="left"
                    placeholder="Username"
                    type="text"
                    value={this.state.username}
                    onChange={event => this.setState({ username: event.target.value })}
                  />
                  <Form.Input
                    fluid
                    icon="lock"
                    iconPosition="left"
                    placeholder="Password"
                    type="password"
                    value={this.state.password}
                    onChange={event => this.setState({ password: event.target.value })}
                  />

                  <Button
                    fluid
                    color="yellow"
                    onClick={this.registerNewUser.bind(this)}
                    loading={this.state.loading}
                    type="submit"
                    style={{ background: '#ffcc33', color: '#fff' }}>
                    Register now!
                  </Button>

                  <Message error header={'Oops!'} content={this.state.errorMessage} />
                  <Message
                    success
                    header={'Yeah! Your registration was successful'}
                    content="You may now log-in with the username you have chosen"
                  />
                </Segment>
              </Form>
            </Grid.Column>
          </Grid>
        </div>
      </Layout>
    );
  }
}

export default withRedux(initStore, null, actions)(Register);
