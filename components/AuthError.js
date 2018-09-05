import React, {Component} from 'react';
import Logo from './Logo';
import {Router} from '../routes';
import {Segment, Message, Button, Grid} from 'semantic-ui-react';



class AuthError extends Component {

	onClick = event => {
		event.preventDefault();

		Router.pushRoute('/signin');
	}

	render () {
		return(
		<div className="AuthError">
			<Grid
				style={{
					height: '100%',
					marginTop: '100px'
				}}
				verticalAlign='middle'>
				<Grid.Column>
					<Segment raised inverted style={{width: '900px', background: '#5c5f63' }}>

						<Logo/>
						<Message negative>
							<Message.Header>You're not logged in!</Message.Header>
							<p>Please login to continue</p>
						</Message>

						<Button
							fluid
							onClick={this.onClick.bind(this)}
							style={{background:'#ffcc33', color:'#fff'}}
							>
							Login
						</Button>

					</Segment>
				</Grid.Column>
				</Grid>
		</div>
	)
	}
}

export default AuthError;
