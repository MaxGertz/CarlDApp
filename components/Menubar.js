import React, { Component } from 'react';
import actions from '../redux/actions';
import withRedux from 'next-redux-wrapper';
import { initStore } from '../redux';
import { connect } from 'react-redux';
import initialize from '../utils/initialize';
import { Menu, Header, Icon } from 'semantic-ui-react';
import { Router } from '../routes';
import Link from 'next/link';

// menubar is used on all pages after the user logs in
// consists of 3 items
// 1: user-icon: onClick -> forwards to overview page
// 2: settings-icon: onClick -> forwards to settings-page
// 3: logout-icon: onClick -> logs out user and forwards to login-page
// logout removes the token from store

const Menubar = ({ user, deauthenticate }) => {
  return (
    <div className="Menubar">
      <Menu
        borderless
        style={{
          margin: '2em 0em 2em'
        }}>
        <Menu.Item link name="username">
          <Link href="/" replace>
            <Header as="h2" size="small">
              <Icon name="user circle" />
              <Header.Content>{user.name}</Header.Content>
            </Header>
          </Link>
        </Menu.Item>

        <Menu.Item link name="settings">
          <Link href="/user/settings" replace>
            <Icon name="settings" />
          </Link>
        </Menu.Item>

        <Menu.Item name="logout" onClick={deauthenticate} position="right">
          <Icon name="log out" />
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default connect(
  null,
  actions
)(Menubar);
