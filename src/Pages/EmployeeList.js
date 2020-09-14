import React from 'react';
import {connect} from 'react-redux'
import AddItem from '../AddItem';
import LandingPage from "../Components/GoogleMap1";
import * as employeeActions from '../Redux/action/getEmployeeAction'
import { bindActionCreators } from 'redux'
$(document).ready(function () {
  $('#dtBasicExample').DataTable();
  $('.dataTables_length').addClass('bs-select');
});

class EmployeeList extends React.Component{
  constructor(props){
    super(props)
    this.state={
      isEdit:false,
      select:"",
      search:"",
      itemSearchData:"",
      taskName:"",
      addData:this.props.updatedata,
      editItemData: {},
      showModal: false
    }
  } 
 
  componentDidMount(){
    this.props.fetchEmployee();
  }
 
  onAddItemClick = () => {
   this.setState({
    showModal : true,
    isEdit : false,
    editItemData: {}
   })
  }

  handleChnageSelect=(e)=>{
      this.setState({
        select:e.target.value
      })
  }
  handleEdit = (data) =>{
    
       this.setState({
          isEdit: !this.state.isEdit,
          editItemData: data,
          showModal : true
       })
  }


  handleDelete = (data) =>{
    this.props.deleteEmployeeDetails(data.employeeId)
  }

  
  handleAddItemData = (data) => {
    
    this.props.addEmployeeData(data)
  }

  handleEditItemData = (data, isEdit) => {
        this.props.updateEmployee(data);    
        
  }

  handleModalClose = (isshowModal) => {
    this.setState({
      showModal: isshowModal
    })
  }

  handleSearch=(e)=>{
    this.setState({
      search:e.target.value
    })
   }
   handleClickSearch =()=>{
      let OrignalEmpdata = [...this.props.employees]
      let filterdData = OrignalEmpdata.filter((item)=>{
        return item.name.indexOf(this.state.search) !== -1
       });
       if(!this.state.search){
         this.setState({
           EmpData:this.state.EmpData
         })
       }
      this.props.searchEmployee(filterdData)
   }

  render(){
    const {isEdit} = this.state
    return (
      <div className="container">
         <div className="row" style={{marginTop:"100Px"}} >
           <div className="col-sm-6">
              <button className="btn btn-primary"
              onClick={this.onAddItemClick}>
                Add Field</button>
                {this.state.showModal ? (<AddItem 
                handleItemData ={isEdit ? this.handleEditItemData : this.handleAddItemData}
                title ={isEdit ? "Edit & Update data" : "Add more data"}
                editItemData={this.state.editItemData} 
                isEdit={isEdit}
                showModal={this.state.showModal}
                handleModalClose={this.handleModalClose}
                {...this.props}
              />) : null}
           </div>
           <div className="col-sm-6 searchbar">
                    <input type="text" placeholder="serch by name" className="form-control"
                        onChange={this.handleSearch} autoComplete="off"
                        name="search"
                        value={this.state.search}
                      />
                      <button onClick={this.handleClickSearch} className="btn btn-primary">
                        <i className="fas fa-search"></i>
                      </button>
           </div>
         </div>  
          <div className="row">
             <div className="col-sm-12">
                <table className="table table-bordered table-hover table table-striped table-bordered table-sm" id="dtBasicExample" cellspacing="0" width="100%">
                    <thead className="thead-dark">
                    <tr>
                        <th scope="col">
                        <input type="checkbox"
                            onChange={this.handleChnageSelect}
                        />
                        </th>
                            <th scope="col">Name</th>
                            <th scope="col">Salary</th>
                            <th scope="col">Age</th>
                            <th scope="col">Experiance</th>
                            <th scope="col" style={{textAlign:"center"}}>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.employees && this.props.employees.map((item,i)=>{
                            return(
                                <tr key={i}>
                                    <td>
                                        <input type="checkbox"
                                            onChange={this.handleChnageSelect}
                                            />
                                        </td>
                                        <td>{item.name}</td>
                                        <td>{item.salary}</td>
                                        <td>{item.age}</td>
                                        <td>{item.exp}</td>
                                    <td>
                                        <center>
                                            <button onClick={()=>this.handleEdit(item)} className="btn btn-secondary">
                                            <i className="fas fa-edit"></i></button>
                                            <button onClick={()=>this.handleDelete(item)} className="btn btn-danger ml-5">
                                            <i className="fas fa-trash-alt"></i></button>
                                        </center>
                                    </td>
                                </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
             </div>
          </div>
      </div>
  );
  }
}
  
const mapStateToProps = state => ({  
  employees: state.employeeList && state.employeeList.employees
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
      ...employeeActions,
  }, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(EmployeeList);
