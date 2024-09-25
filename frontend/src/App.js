import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div>
        <Switch>
          <Route path="/login">
            {isAuthenticated ? <Redirect to="/dashboard" /> : <LoginPage onLogin={handleLogin} />}
          </Route>
          <Route path="/signup">
            {isAuthenticated ? <Redirect to="/dashboard" /> : <SignupPage />}
          </Route>
          <Route path="/dashboard">
            {isAuthenticated ? <DashboardPage /> : <Redirect to="/login" />}
          </Route>
          <Redirect from="/" to="/login" />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
