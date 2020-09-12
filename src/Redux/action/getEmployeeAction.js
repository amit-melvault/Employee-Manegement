import axios from 'axios';
import {
    GET_EMPLOYEE,
    EDIT_EMPLOYEE, 
    ADD_EMPLOYEE, 
    DELETE_EMPLOYEE,
    SEARCH_EMPLOYEE,
    FETCH_EMPLOYEE_SUCCESS,
    API_BASE_URL
} from './ActionTypes';


export const getEmployee = () => ({  
    type: GET_EMPLOYEE,
}); 

export const editEmployee = (data) => ({  
    type: EDIT_EMPLOYEE,
    data
}); 

export const addEmployee = (data) => ({  
    type: ADD_EMPLOYEE,
    data
}); 

export const deleteEmployee = (employeeId) => ({  
    type: DELETE_EMPLOYEE,
    employeeId
}); 

export const searchEmployee = (data) => ({  
    type: SEARCH_EMPLOYEE,
    data
}); 

export const fetchEmployeeSuccess = (employee) =>({
    type : FETCH_EMPLOYEE_SUCCESS,
    employee:employee
})


export const fetchEmployee = () =>{
    return (dispatch)=>{
       return axios.get(API_BASE_URL+"employee/All")
       .then(response=>{
           const employee = response.data
           dispatch(fetchEmployeeSuccess(employee))
       })
    }
}
export const addEmployeeData = (data) =>{
    var data ={
        name: data.name,
        salary: data.salary,
        exp: data.exp,
        age: data.age
    }
    return (dispatch)=>{
       return axios.post(API_BASE_URL+"employee/add", data)
       .then(response=>{
           const data = response.data
           dispatch(addEmployee(data))
       })
    }
}
export const updateEmployee = (data) =>{
    var data ={
        name: data.name,
        salary: data.salary,
        exp: data.exp,
        age: data.age,
        employeeId: data.employeeId
    }
    return (dispatch)=>{
       return axios.put(API_BASE_URL+"employee/update",data)
       .then(response=>{
           const data = response.data
           dispatch(editEmployee(data))
       })
    }
}

export const deleteEmployeeDetails = (employeeId) =>{
    return (dispatch)=>{
       return axios.get(API_BASE_URL+`employee/${employeeId}`)
       .then(response=>{
           console.log(response)
           dispatch(deleteEmployee(employeeId))
       })
    }
}