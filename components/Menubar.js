import React, {Component} from 'react';
import actions from '../redux/actions';
import withRedux from 'next-redux-wrapper';
import {initStore} from '../redux';
import {connect} from 'react-redux';
import initialize from '../utils/initialize';
import {Menu, Header, Icon} from 'semantic-ui-react';
import {Router, Link} from '../routes';

const Menubar = (
  {user, deauthenticate}
) => {
  return (
    <div className='Menubar'>
      <Menu
        borderless
        style={{
          margin: '2em 0em 2em'}}>

        <Menu.Item link name='username'>
          <Link route="/">
            <Header as='h2' size='small'>
              <Icon name='user circle'/>
              <Header.Content>{user.name}</Header.Content>
            </Header>
          </Link>
        </Menu.Item>

        <Menu.Item link name='settings'>
					<Link route ='/user/settings'>
          	<Icon name='settings'/>
					</Link>
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

export default connect(null, actions)(
  Menubar
);
