import http from "../../requests/SchoolService/schoolServices";
import { IGetUserEmailSettingsBody, IGetUserEmailSettingsResult} from "src/interfaces/MessageCenter/IEmailSettings";

const EmailSettingsapi = (data: IGetUserEmailSettingsBody) => {
    return http.post<IGetUserEmailSettingsResult>('MessageCenter/GetUserEmailSettings',data);
  };
  const ApiEmailSettings ={
    EmailSettingsapi
  }
  export default ApiEmailSettings;