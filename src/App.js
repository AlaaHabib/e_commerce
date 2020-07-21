import React, { Component } from 'react';
import { Switch, Route , Redirect } from 'react-router-dom';
import {connect } from 'react-redux'
import {createStructuredSelector} from 'reselect'

import './App.css';

import HomePage from './pages/homepage/homepage';
import ShopPage from './pages/shop/shop'
import Header from './components/header/header'
import Sign from './pages/sign/sign'
import {auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user-actions'
import { selectCurrentUser } from './redux/user/user-selectors';
import CheckoutPage from './pages/checkout/checkout';


class  App extends Component {
  
  unsubscribeFromAuth= null;


  componentDidMount(){
    const {setCurrentUser} = this.props;
   this.unsubscribeFromAuth= auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot =>{
          setCurrentUser({
              id : snapShot.id ,
              ...snapShot.data()
            })
          });
        };
      
      setCurrentUser(userAuth)
  })};
  

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }


  render(){
  return (
    <div>
       <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route  path='/shop' component={ShopPage} />
        <Route exact path='/checkout' component={CheckoutPage} />
        <Route exact path='/sign' render={()=> this.props.currentUser ? (<Redirect to='/'/>) : (<Sign/>)  } />

      </Switch>
    </div>
  );
}
}
const mapStateToProps =createStructuredSelector({
  currentUser : selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser : user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps,mapDispatchToProps)(App);