// import {GET_EMPLOYEE,EDIT_EMPLOYEE, ADD_EMPLOYEE, DELETE_EMPLOYEE, SEARCH_EMPLOYEE} from './ActionTypes';


export const getEmployee = () => ({  
    type: 'GET_EMPLOYEE'
}); 

export const editEmployee = (data) => ({  
    type: 'EDIT_EMPLOYEE',
    data
}); 

export const addEmployee = (data) => ({  
    type: 'ADD_EMPLOYEE',
    data
}); 

export const deleteEmployee = (data) => ({  
    type: 'DELETE_EMPLOYEE',
    data
}); 

export const searchEmployee = (data) => ({  
    type: 'SEARCH_EMPLOYEE',
    data
}); 