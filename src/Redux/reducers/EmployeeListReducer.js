
const initialstate = {  
    employees: [  
        { id: 1, name: "Employee 1", salary: "2000", age:"36",exp:"3year"},  
        { id: 2, name: "Employee 2", salary: "3000", age:"36",exp:"3year"},  
        { id: 3, name: "Employee 3", salary: "4000", age:"36",exp:"3year" }  
    ]  
};

const employeeList = (state = initialstate, action) => {  
    console.log(action)
    switch (action.type) {  
        case 'GET_EMPLOYEE': 
            const employees = [...state.employees] ;
            return { 
                 ...state,
                 employees
            };  
        case 'EDIT_EMPLOYEE':
            return {
                ...state,
                employees: action.data
            }
        case 'ADD_EMPLOYEE':
            return {
                ...state,
                employees: action.data
            }
        case 'DELETE_EMPLOYEE':
            return {
                ...state,
                employees: action.data
            }
        case 'SEARCH_EMPLOYEE':
            return {
                ...state,
                employees: action.data
            }
        default:  
            return state;  
    }  
};  
  
export default employeeList; 