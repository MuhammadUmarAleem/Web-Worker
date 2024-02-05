import './App.css';
import { useEffect } from 'react';
import {Switch,Route} from 'react-router-dom';
import Plans from './Components/Plans';

function App() {
  useEffect(()=>{
    document.body.style.overflowX="hidden";
  },[])
  return (
    <div className="App">
     <Switch>
      <Route exact path="/" component={Plans}/>
     </Switch>
    </div>
  );
}

export default App;
