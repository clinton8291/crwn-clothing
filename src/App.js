import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import "./App.css";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shoppage/shoppage.component";
import CheckoutPage from "./pages/checkoutpage/checkoutpage.component";
import Header from "./components/header/header.component";

import SigninSignupPage from "./pages/signin-signup-page/signin-signup-page.component";

import styled from "styled-components";

import { connect } from "react-redux";

import { setCurrentUser } from "./redux/user/user.actions";

import { auth, createUserProfileDocument, addCollectionsAndItems } from "./firebase/firebase.utils";

import { selectShopCollectionForPreview } from "./redux/shop/shop.selectors";

import { selectCurrentUser } from "./redux/user/user.selectors";

import { createStructuredSelector } from "reselect";

const Text = styled.div`
  color: white;
  padding: 10px;
  border:  ${({isActive}) => isActive ? '1px solid green':'3px dotted lightgreen' }
`;

const textStyle = {
  backgroundColor: "#41c346",
  fontSize: "18px",
};

const StyledComponent = () => {
  return (
    <div style={textStyle}>
      <Text isActive={false}>Clinton Antony Cardoza</Text>
    </div>
  );
};

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser, collectionsArray } = this.props;
    console.log(selectShopCollectionForPreview);
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth); //This returns a documentRef object
        userRef.onSnapshot((snapshot) => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data(), //To read the data present in documentSnapshot object
          });
        });
      }
      setCurrentUser(userAuth); //Setting current user to null

      addCollectionsAndItems('collections', collectionsArray.map(({title, items}) => ({title, items})));
    }); //Subscribing to auth object, this subscription is always listening to auth
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <StyledComponent />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route
            exact
            path='/signin'
            render={() =>
              this.props.currentUser ? (
                <Redirect to='/' />
              ) : (
                <SigninSignupPage />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  collectionsArray: selectShopCollectionForPreview
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
