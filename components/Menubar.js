import React, {Component} from 'react';
import actions from '../redux/actions';
import withRedux from 'next-redux-wrapper';
import {initStore} from '../redux';
import {connect} from 'react-redux';
import initialize from '../utils/initialize';

import {Menu, Header, Icon} from 'semantic-ui-react';
import {Router, Link} from '../routes';

/*
class Menubar extends Component {

	static getInitialProps(ctx) {
		initialize(ctx);
	}

	openSettings = event => {
		event.preventDefault();
		// TODO: Push route to settings page

		console.log('Open settings');
	}

	logoutUser = async event => {
		event.preventDefault();
		console.log('Called');

		this.props.actions.deauthenticate();

	}

  mapStateToProps = (state) => (
  {isAuthenticated: !!state.authentication.token}
	);

	render() {
		console.log(this.props);
		return(
			<div className='Menubar'>
				<Menu borderless style={{margin: '2em 0em 2em'}}>

					<Menu.Item
						link
						name='username'>
							<Link route="/">
								<Header as='h2' size='small'>
									<Icon name='user circle' size='small'/>
									<Header.Content>{this.props.user.name}</Header.Content>
								</Header>
							</Link>
						</Menu.Item>

					<Menu.Item
						onClick={(this.openSettings.bind(this))}
					 	name='settings'>
					 	<Icon name='settings' size='small' />
					</Menu.Item>

					<Menu.Item
						name='logout'
						onClick={this.logoutUser.bind(this)}
						position='right'>
						<Icon name='log out' size='small'/>
					</Menu.Item>
				</Menu>

			</div>
		);
	}
}
export default connect(mapStateToProps, actions)(Menubar);


/*

export default(props) => {
	return(
		<div className='Menubar'>
			<Menu borderless style={{margin: '2em 0em 2em'}}>

				<Menu.Item
					link
					name='username'>
						<Link route="/">
							<Header as='h2' size='small'>
								<Icon name='user circle' size='small'/>
								<Header.Content>{props.user.name}</Header.Content>
							</Header>
						</Link>
					</Menu.Item>

				<Menu.Item
				 	name='settings'>
				 	<Icon name='settings' size='small' />
				</Menu.Item>

				<Menu.Item
					name='logout'
					position='right'>
					<Icon name='log out' size='small'/>
				</Menu.Item>
			</Menu>

		</div>
	)
}
*/


const Menubar = ({user, deauthenticate}) => {
	return(
	<div className='Menubar'>
		<Menu borderless style={{margin: '2em 0em 2em'}}>

			<Menu.Item
				link
				name='username'>
					<Link route="/">
						<Header as='h2' size='small'>
							<Icon name='user circle'/>
							<Header.Content>{user.name}</Header.Content>
						</Header>
					</Link>
				</Menu.Item>

			<Menu.Item
				name='settings'>
				<Icon name='settings'/>
			</Menu.Item>

			<Menu.Item
				name='logout'
				onClick={deauthenticate}
				position='right'>
				<Icon name='log out'/>
			</Menu.Item>
		</Menu>

	</div>
)
};

export default connect(null, actions)(Menubar);
