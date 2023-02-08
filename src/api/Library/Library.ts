import http from "../../requests/SchoolService/schoolServices";
import {IBooksDetails,IBookswithmeList,IClaimDetail,IStandardsBody,IStandardsList,ICancelBookReservation,ILanguagesDetailsList,IClaimDetailResult,ILanguagesDetails,ILanguagesDetailsResult} from "../../interfaces/Student/Library"

const GetBooksDetailsList = (data: IBooksDetails) => {
    return http.post<IBooksDetails>('Library/GetPagedBookList',data);
  };

  const GetBookswithmeList = (data: IBookswithmeList) => {
    return http.post<IBookswithmeList>('Library/GetIssuedBookDetailsofUser',data);
  };

  const ClaimBookDetails = (data: IClaimDetail) => {
    return http.post<IClaimDetailResult>('Library/GetReservedBookDetails',data);
  };
  const GetCancelBookReservation = (data: ICancelBookReservation) => {
    return http.post<ICancelBookReservation>('Library/CancelBookReservation',data);
  };

  const GetLanguage = (data: ILanguagesDetails) => {
    return http.post<ILanguagesDetailsList>('Library/GetLanguages',data);
  };
  const GetStandards = (data: IStandardsBody) => {
    return http.post<IStandardsList>('Library/GetAssociatedStandards',data);
  };
 

    
const LibraryApi ={
    GetBooksDetailsList,
    GetBookswithmeList,
    ClaimBookDetails,
    GetCancelBookReservation,
    GetLanguage,
    GetStandards
}
export default LibraryApi;