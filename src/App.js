
import './App.css';
import React from 'react'
import {Route,Switch,Redirect} from 'react-router-dom'
import Homepage from './pages/homepage/Homepage.component'
import ShopPage from './pages/shop/shop.component'
import SignInandSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import Header from './components/header/header.component'
import {auth,createProfileDocument} from './firebase/firebase.utils'
import {connect } from 'react-redux'
import {setCurrentUser} from './redux/user/user.actions'




class  App extends React.Component {
  
  unSubcribeFromAuth = null;
  componentDidMount(){
    const {setCurrentUser} = this.props;
   this.unSubcribeFromAuth= auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
        const userRef = await createProfileDocument(userAuth);
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            
              id:snapShot.id,
              ...snapShot.data(),
            
          })
          
            
            

          
          
        });
       setCurrentUser(userAuth);
      }
    });
    
  }
  componentWillUnmount(){
    this.unSubcribeFromAuth();
  }
  render(){
    return (
      <div>
        <Header  />
        <Switch>
          <Route exact  path='/' component={Homepage}/>
          <Route path='/shop/' component={ShopPage} />
          <Route
            exact
            path='/signin'
            render={() =>
              this.props.currentUser ? (
                <Redirect to='/' />
              ) : (
                <SignInandSignUpPage />
              )
            }
          />
  
          </Switch>
        
      
        
        
  
        
      </div>
    )

  }


 
}
const mapStateToProps = ({user}) => ({
  currentUser:user.currentUser
});
const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);