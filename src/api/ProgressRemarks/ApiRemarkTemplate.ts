
import { IGetAllGradesForStandardBody, IGetAllGradesForStandardResult, IGetRemarkTemplateDetailsBody, IGetRemarkTemplateDetailsResult, IGetRemarksCategory, IGetRemarksCategoryResult } from 'src/interfaces/ProgressRemarks/IRemarkTemplate';
import http from '../../requests/SchoolService/schoolServices';

const ReamrksCategory = (data: IGetRemarksCategory) => {
    return http.post<IGetRemarksCategoryResult[]>(
        'Teacher/GetRemarksCategory', data
    );
};

const Grades = (data: IGetAllGradesForStandardBody) => {
    return http.post<IGetAllGradesForStandardResult[]>(
        'Teacher/GetAllGradesForStandard', data
    );
};

const ReamrkTemplateDetails = (data: IGetRemarkTemplateDetailsBody) => {
    return http.post<IGetRemarkTemplateDetailsResult[]>(
        'Teacher/GetRemarkTemplateDetails', data
    );
};

const ApiRemarkTemplate = {
    ReamrksCategory,
    Grades,
    ReamrkTemplateDetails
};

export default ApiRemarkTemplate;