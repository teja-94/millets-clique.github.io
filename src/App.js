import React,{useEffect} from 'react';
import './App.css';
import {Switch} from 'react-router'; 
import { BrowserRouter as Router, Route} from "react-router-dom";
import Header from './Header';
import Home from './Home';
import Checkout from './Checkout';
import { useStateValue } from './StateProvider'
import Login from './Login'
import {auth} from './Firebase'


function App() {
    const [{ user }, dispatch] = useStateValue();
    //useEffect --- poweful
    //piece of code which runs based on condition


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                //user logged in...
                dispatch({
                    type: "SET_USER",
                    user: authUser
                })

            } else {
                //user logout .....
               
               
                dispatch({
                    type: "SET_USER",
                    user: null
                })

            }
        
        });
        return () => {
            unsubscribe();
        }

    }, []);
    console.log("User Is>>>>",user);

    return (
    <Router>
        <div className="App">
            <Switch>
                    <Route path="/checkout">
                    <Header />
                    <Checkout />
                        
                    </Route>  
                    <Route path="/login">
                    <Login />
                    
                    </Route> 
                    {/* default page */}
                    <Route path="/"> 
                        <Header />
                        <Home />
                    </Route>  
            </Switch>
         </div>
    </Router>
  );
}

export default App;
