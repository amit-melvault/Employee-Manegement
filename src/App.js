import React from 'react';
import {connect} from 'react-redux'
import EmployeeList from './Pages/EmployeeList';



class App extends React.Component{
  render(){
    return(
      <div>
         <EmployeeList />
      </div>
    )
  }
}

export default connect()(App);