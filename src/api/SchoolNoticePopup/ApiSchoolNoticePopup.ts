

import { IGetSchoolNoticePopupBody, IGetSchoolNoticePopupResult } from 'src/interfaces/SchoolNoticePopup/ISchoolNoticePopup';
import http from '../../requests/SchoolService/schoolServices';

const GetSchoolNoticePopup = (data: IGetSchoolNoticePopupBody) => {
    return http.post<IGetSchoolNoticePopupResult>('Teacher/GetNoticeAndEventDetails', data);

};

const SchoolNoticePopupApi = {
    GetSchoolNoticePopup
};

export default SchoolNoticePopupApi;  