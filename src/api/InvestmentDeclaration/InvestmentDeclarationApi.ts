import { IGetInvestmentDetailsBody, IGetInvestmentDetailsResult, IGetRegimeDetailsDropdownBody, IGetRegimeDetailsDropdownResult, SaveInvestmentDetailsBody, SaveInvestmentDetailsResult, SubmitInvestmentDetailsBody, SubmitInvestmentDetailsResult } from 'src/interfaces/InvestmentDeclaration/InvestmentDeclaration';
import http from '../../requests/SchoolService/schoolServices';

const GetInvestmentDetails = (data: IGetInvestmentDetailsBody) => {
    return http.post<IGetInvestmentDetailsResult>('Teacher/GetInvestmentDetails', data);
};

const GetRegimeDropdown = (data: IGetRegimeDetailsDropdownBody) => {
    return http.post<IGetRegimeDetailsDropdownResult[]>('Teacher/GetRegimeDetails', data);
}

const GetSaveInvestmentDeclaration = (data: SaveInvestmentDetailsBody) => {
    return http.post<SaveInvestmentDetailsResult>('Teacher/SaveInvestmentDetails', data);
}

const GetSubmitInvestmentDeclaration = (data: SubmitInvestmentDetailsBody) => {
    return http.post<SubmitInvestmentDetailsResult>('Teacher/SubmitInvestmentDetails', data);
}

const InvestmentDeclarationApi = {
    GetInvestmentDetails,
    GetRegimeDropdown,
    GetSaveInvestmentDeclaration,
    GetSubmitInvestmentDeclaration

}

export default InvestmentDeclarationApi;