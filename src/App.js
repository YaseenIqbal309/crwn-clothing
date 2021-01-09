
import './App.css';
import {Route,Switch} from 'react-router-dom'
import Homepage from './pages/homepage/Homepage.component'


const Hats=()=>(
  <div>
    <h1>Hats Page</h1>
  </div>
)

function App() {
  return (
    <div>
      <Switch>
        <Route exact  path='/' component={Homepage}/>
        <Route path='/shop/Hats' component={Hats} />
        </Switch>
      
    
      
      

      
    </div>
  );
}

export default App;
