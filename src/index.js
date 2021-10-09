import React from 'react';
import {render} from 'react-dom';
import './index.css';
import App from './App';
import WebFont from 'webfontloader';
import Container from './layouts/Container';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from './layouts/Login';
import Register from './layouts/Register';
import ExpensesByCategory from './layouts/ExpensesByCategory';
import EditExpense from './layouts/EditExpense';
import ExpensesList from './layouts/ExpensesList';
import { Helmet } from 'react-helmet';
import Favicon from './images/logo.png'
import Background from './components/Background';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './routes/PrivateRoute';

WebFont.load({
  google:{
    families: ['Work Sans: 400, 500, 700', 'sans-serif']
  }
})
const Index =( )=>{
  return(
    <>
      <Helmet>
        <link rel='shortcut icon' href={Favicon} type='image/x-icon'/>
      </Helmet>
      <AuthProvider>
        <Router>
          <Container>
            <Switch>
              <Route path='/login' component={Login}/>
              <Route path='/register' component={Register}/>
              
              <PrivateRoute path='/categories'>
                  <ExpensesByCategory/>
              </PrivateRoute>
              <PrivateRoute path='/list_expenses'>
                  <ExpensesList/>
              </PrivateRoute>
              <PrivateRoute path='/edit_expenses/:id'>
                  <EditExpense/>
              </PrivateRoute>
              <PrivateRoute path='/'>
                  <App/>
              </PrivateRoute>
            </Switch>
          </Container>
        </Router>
      </AuthProvider>
      <Background/>
    </>
  )
}
render( <Index/>, document.getElementById('root')
);