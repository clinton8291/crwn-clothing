import React from "react";
import { Switch, Route } from "react-router-dom";

import "./App.css";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shoppage/shoppage.component";
import Header from "./components/header/header.component";
import SigninSignupPage from "./pages/signin-signup-page/signin-signup-page.component";

import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

class App extends React.Component {
  constructor(){
    super();
    this.state={
      currentUser: null
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount(){
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      //this.setState({currentUser: user});
      console.log(userAuth);
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth); //This returns a documentRef object 
        userRef.onSnapshot(snapshot => {
          console.log(snapshot);
          this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data() //To read the data present in documentSnapshot object
            }
          }, () => {
            console.log(snapshot);
          });
        })
      }
      this.setState({currentUser: userAuth}); //Setting current user to null
    }); //Subscribing to auth object, this subscription is always listening to auth
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/signin' component={SigninSignupPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
