import React, { useEffect, createContext, useReducer, useContext } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/sreens/Home';
import Signin from './components/sreens/Signin';
import Signup from './components/sreens/Signup';
import Profile from './components/sreens/Profile';
import CreatePost from './components/sreens/CreatePost';
import { reducer, initialState } from './reducers/userReducer';

export const UserContext = createContext()

const Routing = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    dispatch({ type: "USER", payload: user });
    if (user) {
      history.push("/");
    } else {
      history.push("/signin");
    }
  }, []);
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/signin">
        <Signin />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route path="/profile">
        <Profile />
      </Route>
      <Route path="/create">
        <CreatePost />
      </Route>
    </Switch>
  )
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <NavBar />
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
