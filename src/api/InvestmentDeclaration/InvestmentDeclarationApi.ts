import { IGetInvestmentDetailsBody, IGetInvestmentDetailsResult, IGetRegimeDetailsDropdownBody, IGetRegimeDetailsDropdownResult, SaveInvestmentDetailsBody, SaveInvestmentDetailsResult } from 'src/interfaces/InvestmentDeclaration/InvestmentDeclaration';
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

const InvestmentDeclarationApi = {
    GetInvestmentDetails,
    GetRegimeDropdown,
    GetSaveInvestmentDeclaration

}

export default InvestmentDeclarationApi;