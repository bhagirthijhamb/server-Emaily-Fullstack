import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Header';

// Dummy components
// const Header = () => <h2>Header</h2>
const Dashboard = () => <h2>Dashboard</h2>
const SurveyNew = () => <h2>SurveyNew</h2>
const Landing = () => <h2>Landing</h2>

class App extends React.Component {
  render(){
    return (
      <div>
        <BrowserRouter>
          <div className="container">
            <Header />
            <Route exact={true} path='/' component={Landing} />
            <Route exact path='/surveys' component={Dashboard} />
            <Route path='/surveys/new' component={SurveyNew} />
            {/* <Route path='/' component={} /> */}
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;