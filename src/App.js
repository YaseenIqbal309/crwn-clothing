
import './App.css';
import React from 'react'
import {Route,Switch} from 'react-router-dom'
import Homepage from './pages/homepage/Homepage.component'
import ShopPage from './pages/shop/shop.component'
import SignInandSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import Header from './components/header/header.component'
import {auth} from './firebase/firebase.utils'



class  App extends React.Component {
  constructor(){
    super();
    this.state = {
      currentUser: null
    };

  }
  unSubcribeFromAuth = null;
  componentDidMount(){
   this.unSubcribeFromAuth= auth.onAuthStateChanged(user => {
      this.setState({currentUser:user});
      console.log(this.state.currentUser);
    });
    
  }
  componentWillUnmount(){
    this.unSubcribeFromAuth();
  }
  render(){
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact  path='/' component={Homepage}/>
          <Route path='/shop/' component={ShopPage} />
          <Route path='/signin' component={SignInandSignUpPage} />
  
          </Switch>
        
      
        
        
  
        
      </div>
    )

  }


 
}

export default App;
