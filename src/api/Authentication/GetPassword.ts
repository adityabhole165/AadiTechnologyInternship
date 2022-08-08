
import http from "../../requests/SchoolService/schoolServices";
import { IGetPassword } from "src/interfaces/Authentication/GetPassword";

const GetPasswordResult = (data: IGetPassword) => {
    return http.post<IGetPassword>('School/GetPassword', data);
};

const GetPasswordApi = {
    GetPasswordResult
}

export default GetPasswordApi;
