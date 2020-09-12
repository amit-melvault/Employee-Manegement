import axios from 'axios';


const EMPLOYEE_API = "api";


class EmployeeServices{
    getEmployee(){
        return axios.get(EMPLOYEE_API);
    }
}
export default new EmployeeServices();