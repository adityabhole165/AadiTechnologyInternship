import {
    IBookclaimedBody,
    IBookclaimedResult,
    IGetAllBooksDetailsBody,
    IGetAllBooksDetailsResult,
    IGetLibraryBookIssueDetailsBody,
    IGetLibraryBookIssueDetailsResult,
    IGetReserveBookDetailsBody,
    IGetReserveBookDetailsResult,
    IGetReserveBooksCountperpersonBody,
    IGetReserveBooksCountperpersonResult,
    IGetTotalBooksCountsBody,
    IGetTotalBooksCountsResult,
    ITotalBooksCountsBody,
    ITotalBooksCountsResult
} from "src/interfaces/SchoolLibrary/ILibraryBaseScreen";
import http from '../../requests/SchoolService/schoolServices';


// const GetAllBooksDetails = (data: IGetAllBooksDetailsBody) => {
//     return http.post<IGetAllBooksDetailsResult[]>('Teacher/GetAllBooksDetails', data);
// };
const GetLibraryBookIssueDetails = (data: IGetLibraryBookIssueDetailsBody) => {
    return http.post<IGetLibraryBookIssueDetailsResult[]>('Teacher/GetLibraryBookIssueDetails', data);
};
const BookClimedMsg = (data: IBookclaimedBody) => {
    return http.post<IBookclaimedResult>('Teacher/Bookclaimed', data);
};
const GetTotalBooksCounts = (data: IGetTotalBooksCountsBody) => {
    return http.post<IGetTotalBooksCountsResult>('Teacher/GetTotalBooksCounts', data);
};
const GetReserveBookDetails = (data: IGetReserveBookDetailsBody) => {
    return http.post<IGetReserveBookDetailsResult>('Teacher/GetReserveBookDetails', data);
}
const GetTotalLibraryBooksCounts = (data: ITotalBooksCountsBody) => {
    return http.post<ITotalBooksCountsResult>('Teacher/GetTotalBooksCounts', data)
}
const GetReserveBooksCountperperson = (data: IGetReserveBooksCountperpersonBody) => {
    return http.post<IGetReserveBooksCountperpersonResult[]>('Teacher/GetReserveBooksCountperperson', data)
}
const GetAllBooksDetails = (data: IGetAllBooksDetailsBody) => {
    return http.post<IGetAllBooksDetailsResult>('Teacher/GetAllBooksDetails', data);
}

const ApiLibraryBaseScreen = {
    //GetAllBooksDetails,
    GetLibraryBookIssueDetails,
    BookClimedMsg,
    GetTotalBooksCounts,
    GetReserveBookDetails,
    GetTotalLibraryBooksCounts,
    GetReserveBooksCountperperson,
    GetAllBooksDetails
};

export default ApiLibraryBaseScreen;
