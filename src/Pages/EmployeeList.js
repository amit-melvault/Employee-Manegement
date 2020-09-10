import React from 'react';
import {connect} from 'react-redux'
import AddItem from '../AddItem';
import LandingPage from "../Components/GoogleMap1";
import * as employeeActions from '../Redux/action/getEmployee'
import { bindActionCreators } from 'redux'


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
    this.props.getEmployee();
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
    const EmpData = this.props.employees.filter(i=>i.id !==data.id)
    this.props.deleteEmployee(EmpData)
  }

  
  handleAddItemData = (data) => {
    
    let EmpData = [...this.props.employees];
    data.id = EmpData.length + 1;
    EmpData.push(data);
    this.props.addEmployee(EmpData)
  }

  handleEditItemData = (data, isEdit) => {
    // let EmpData = [...this.state.EmpData];
    // EmpData = EmpData.filter(item => data.id !== item.id);
    
    // EmpData.push(data);
    // this.setState({
    //   EmpData
    // },()=>{
    //   this.state.EmpData.sort((a, b) => a.id - b.id);
    // })

    let EmpData = [...this.props.employees];
    EmpData = EmpData.filter(item => data.id !== item.id);
    EmpData.push(data);
    this.props.editEmployee(EmpData);    
    
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
    console.log(this.props)
    return (
      <div className="container">
         <div className="row" style={{marginTop:"20px"}}>
           <div className="col-sm-6">
              <button className="btn-primary"
              onClick={this.onAddItemClick}>
                Add Field</button>
                {this.state.showModal ? (<AddItem 
                handleItemData ={isEdit ? this.handleEditItemData : this.handleAddItemData}
                editItemData={this.state.editItemData} 
                isEdit={isEdit}
                showModal={this.state.showModal}
                handleModalClose={this.handleModalClose}
                {...this.props}
              />) : null}
           </div>
           <div className="col-sm-6 searchbar">
                    <input type="text" placeholder="serch by name" className="search-style"
                        onChange={this.handleSearch} autoComplete="off"
                        name="search"
                        value={this.state.search}
                      />
                      <button onClick={this.handleClickSearch} className="btn-primary">
                        <i className="fas fa-search"></i>
                      </button>
           </div>
         </div>  
          <div className="row">
             <div className="col-sm-9">
                <table className="table">
                    <thead>
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
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.employees && this.props.employees.map((item)=>{
                            return(
                                <tr key={item.id}>
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
                                        <button onClick={()=>this.handleEdit(item)} className="btn-secondary">
                                        <i className="fas fa-edit"></i></button>
                                        <button onClick={()=>this.handleDelete(item)} className="btn-danger">
                                        <i class="fas fa-trash-alt"></i></button>
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

const mapDispatchToProps = (dispatch, ownProps) => {
    return bindActionCreators({
      ...employeeActions,
  }, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(EmployeeList);
