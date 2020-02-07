/* eslint-disable react/no-unused-state */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-filename-extension */
import React, { PureComponent } from 'react';
import {
  NavigationDrawer,
  SVGIcon,
  Drawer,
  Toolbar,
  Button,
} from 'react-md';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { Route, Switch, Link } from 'react-router-dom';
import { withRouter } from 'react-router';

import NavItemLink from 'client/components/form/NavItemLink';
import ElementContainer from 'client/containers/element_container';
import TrainingContainer from 'client/containers/training_container';
import SignIn from 'client/components/auth/SignIn';
import SignOut from 'client/components/auth/SignOut';
import ManageTest from 'client/components/humanError/ManageTest';
import Inbox from 'client/components/inbox/Inbox';
import ClassificationTest from 'client/components/humanError/ClassificationTest';
import Verify from 'client/components/auth/Verify';
import UpdatePassword from 'client/components/auth/UpdatePassword';
import Management from 'client/components/userManagement/Container';
import LabelDocument from 'client/components/label/Container';

import inboxListItems from 'client/constants/inboxListItems';
import menu from 'client/icons/menu.svg';
import arrowBack from 'client/icons/arrow_back.svg';
import SignButtons from 'client/components/auth/SignButtons';

const navItems = [
  {
    label: 'Inbox',
    to: '/inbox',
    exact: true,
    icon: 'inbox',
  },
];


class App extends PureComponent {
  constructor() {
    super();

    this.state = {
      visible: false,
    };
  }

  componentDidMount() {
    // Need to set the renderNode since the drawer uses an overlay
    this.dialog = document.getElementById('drawer-routing-example-dialog');
  }

  showDrawer = () => {
    this.setState({ visible: true });
  };

  hideDrawer = () => {
    this.setState({ visible: false });
  };

  handleVisibility = (visible) => {
    this.setState({ visible });
  }

  render() {
    const { visible } = this.state;

    return (
      <div>
        <Toolbar
          colored
          fixed
          title="Curation"
          nav={<Button icon onClick={this.showDrawer}>menu</Button>}
          actions={<SignButtons />}
        />
        <CSSTransitionGroup
          component="div"
          transitionName="md-cross-fade"
          transitionEnterTimeout={300}
          transitionLeave={false}
          className="md-toolbar-relative md-grid"
        >
          <Switch>
            <Route path="/document/:id" component={ElementContainer} />
            <Route path="/training" component={TrainingContainer} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signout" component={SignOut} />
            <Route path="/manageTest" component={ManageTest} />
            <Route path="/classificationTest/:id" component={ClassificationTest} />
            <Route path="/updatePassword/:id" component={UpdatePassword} />
            <Route path="/verify/:token" component={Verify} />
            <Route path="/management" component={Management} />
            <Route path="/inbox" component={Inbox} />
            <Route path="/label/:id/:taskId" component={LabelDocument} />
            <Route path="/" component={ElementContainer} />
          </Switch>
        </CSSTransitionGroup>
        <Drawer
          type={Drawer.DrawerTypes.TEMPORARY}
          visible={visible}
          onVisibilityChange={this.handleVisibility}
          renderNode={this.dialog}
          navItems={navItems.map(props => <NavItemLink {...props} key={props.to} />)}
        />
      </div>
    );
  }
}

export default withRouter(App);
