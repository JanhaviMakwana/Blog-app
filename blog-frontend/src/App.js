import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { withState } from './blog-context';
import Error from './components/Error/Error';
import NavBar from './components/NavBar/NavBar';
import Blogs from './components/Blogs/Blogs';
import AddBlog from './components/AddBlog/AddBlog';
import MyBlogs from './components/MyBlogs/MyBlogs';
import Auth from './components/Auth/Auth';
import * as actionTypes from './store/actionTypes';
import './App.css';

function PrivateRoutes({ component: Component, isAuthenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => isAuthenticated === true
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/auth', state: { from: props.location } }} />}
    />
  );
};

function PublicRoute({ component: Component, isAuthenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => isAuthenticated === false
        ? <Component {...props} />
        : <Redirect to="/" />}
    />
  );
};



class App extends React.Component {

  componentDidMount() {
    const user = localStorage.getItem('user');
    user && this.props.dispatch({ type: actionTypes.SET_AUTH_DATA, user: user });
    window.onunload = () => {
      localStorage.clear();
    }

  }

  render() {
    return (
      <div className="App">
        <NavBar />
        {this.props.state.error === null
          ? <Switch>
            <PublicRoute path="/auth" isAuthenticated={this.props.state.user ? true : false} component={Auth} />
            <PrivateRoutes path="/add-blog" isAuthenticated={this.props.state.user ? true : false} component={AddBlog} />
            <PrivateRoutes path="/blog/:id" isAuthenticated={this.props.state.user ? true : false} component={AddBlog} />
            <PrivateRoutes path="/blogs" isAuthenticated={this.props.state.user ? true : false} component={MyBlogs} />
            {/* <Route path="/add-blog" component={AddBlog} /> */}
            <Route path="/" component={Blogs} />

          </Switch>
          : <Error />}
      </div>
    );
  }
};

export default withState(App);
