import {
    GET_EMPLOYEE,
    EDIT_EMPLOYEE, 
    ADD_EMPLOYEE, 
    DELETE_EMPLOYEE,
    SEARCH_EMPLOYEE,
    FETCH_EMPLOYEE_SUCCESS
} from '../action/ActionTypes';
const initialstate = {  
    employees: []  
};

const employeeList = (state = initialstate, action) => {  
    switch (action.type) { 
        case FETCH_EMPLOYEE_SUCCESS :
            return{
                ...state,
                employees: action.employee
            }
        // case GET_EMPLOYEE: 
        //     const employees = [...state.employees] ;
        //     return { 
        //          ...state,
        //          employees
        //     };  
        case EDIT_EMPLOYEE:
            const editemployees = _handleEditEmployess(state, action.data);
            return {
                ...state,
                employees: editemployees
            }
        case ADD_EMPLOYEE:
            const employees = _handleAddEmployess(state, action.data);
            return {
                ...state,
                employees: employees
            }
        case DELETE_EMPLOYEE:            
            const empDelData = _handleDeletedEmployess(state, action.employeeId);
            return {
                ...state,
                employees: empDelData
            }
        case SEARCH_EMPLOYEE:
            return {
                ...state,
                employees: action.data
            }
        default:  
            return state;  
    }  
};  

const _handleAddEmployess = (state, data) =>{
    const empdata = [...state.employees];
    empdata.push(data);
    return empdata;
}

const _handleEditEmployess = (state, data) => {
    let EmpData = [...state.employees];
    const empIndex = EmpData.findIndex(item => data.employeeId === item.employeeId);
    EmpData[empIndex] = {
        ...EmpData[empIndex],
        ...data
    }
    return EmpData;
}

const _handleDeletedEmployess = (state, employeeId) => {
    let EmpData = [...state.employees];
    EmpData = EmpData.filter(item=>item.employeeId !== employeeId);
    return EmpData;

}
  
export default employeeList; 