
import React from 'react';
import {connect} from 'react-redux'
import { 
    Modal
  } from 'react-bootstrap';
  
  class AddItem extends React.Component {
    constructor(props, context){
      super(props, context);
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.state = {
          Name: props.isEdit ? props.editItemData.name : '',
          salary:props.isEdit ? props.editItemData.salary : '',
          age:props.isEdit ? props.editItemData.age : '',
          exp:props.isEdit ? props.editItemData.exp : '',
          employeeId: props.isEdit ? props.editItemData.employeeId : null
      }
  }
  handleChange(e){
    this.setState({
       [e.target.name]:e.target.value
    })
  }
  handleSubmit(e){
      e.preventDefault();
      let data = {
          name:this.state.Name,
          salary:this.state.salary,
          age:this.state.age,
          exp:this.state.exp,
          employeeId: this.state.employeeId
      }
      
      this.props.handleItemData(data);
      this.props.handleModalClose(false);   
  }

  handleClose = () => {
      this.props.handleModalClose(false)
  }
  

  render() {
      return (
         <div>
            <Modal show={this.props.showModal} onHide={this.handleClose}>
               <Modal.Header closeButton>
                 <Modal.Title>{this.props.title}</Modal.Title>
               </Modal.Header>
               <Modal.Body>
                    <form onSubmit={this.handleSubmit}>
                        <label>Name: </label><br/>
                        <input type="text"
                            className="form-control" 
                            onChange={this.handleChange}
                            name="Name"
                            value={this.state.Name}
                        /><br/>
                        <label>Salary:</label><br/>
                        <input type="text" 
                            className="form-control"
                            onChange={this.handleChange}
                            name="salary"
                            value={this.state.salary}
                        /><br/>
                         <label>Age :  </label><br/>
                        <input type="text" 
                            className="form-control"
                            onChange={this.handleChange}
                            name="age"
                            value={this.state.age}
                        /><br/>
                        <label>Exp : </label><br/>
                        <input type="text" 
                           className="form-control"
                            onChange={this.handleChange}
                            name="exp"
                            value={this.state.exp}
                        /><br/><br/>
                      <button 
                      className="btn btn-primary"
                      >Update</button>
                    </form>
               </Modal.Body>
            </Modal>
          </div>
      )
    }
  }


  export default connect()(AddItem);
