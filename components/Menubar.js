import React, {Component} from 'react';
import {Menu, Header, Icon} from 'semantic-ui-react';
import {Link} from '../routes';


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
