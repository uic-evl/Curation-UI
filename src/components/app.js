/* eslint-disable react/no-unused-state */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { NavigationDrawer, SVGIcon } from 'react-md';
import { Route, Switch } from 'react-router-dom';

import ElementContainer from '../containers/element_container';
import TrainingContainer from '../containers/training_container';
import inboxListItems from '../constants/inboxListItems';
import menu from '../icons/menu.svg';
import arrowBack from '../icons/arrow_back.svg';

export default class App extends Component {
  constructor() {
    super();

    // Update the items so they have an onClick handler to change the current page
    this.navItems = inboxListItems.map((item) => {
      if (item.divider) {
        return item;
      }

      return {
        ...item,
        onClick: () => this.setPage(item.key, item.primaryText),
      };
    });

    this.state = {
      renderNode: null,
      visible: false,
      key: inboxListItems[0].key,
      page: inboxListItems[0].primaryText,
    };
  }

  setPage(key, page) {
    this.navItems = this.navItems.map((item) => {
      if (item.divider) {
        return item;
      }

      return {
        ...item,
        active: item.key === key,
      };
    });

    this.setState({ key, page });
  }

  show() {
    this.setState({ visible: true });
  }

  hide() {
    this.setState({ visible: false, renderNode: null });
  }

  handleShow() {
    this.setState({ renderNode: document.getElementById('navigation-drawer-demo') });
  }

  render() {
    const { visible, page, renderNode } = this.state;

    return (
      <NavigationDrawer
        renderNode={renderNode}
        navItems={this.navItems}
        mobileDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY_MINI}
        tabletDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT_MINI}
        desktopDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT_MINI}
        toolbarTitle="Curation Project"
        contentId="main-demo-content"
        temporaryIcon={<SVGIcon use={menu.url} />}
        persistentIcon={<SVGIcon use={arrowBack.url} />}
        contentClassName="md-grid"
      >

        <Switch>
          <Route path="/document/:id" component={ElementContainer} />
          <Route path="/training" component={TrainingContainer} />
          <Route path="/" component={ElementContainer} />
        </Switch>
      </NavigationDrawer>
    );
  }
}
