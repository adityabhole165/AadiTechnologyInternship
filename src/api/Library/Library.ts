import http from "../../requests/SchoolService/schoolServices";
import {IBooksDetails,IBookswithmeList,IClaimDetail,ICancelBookReservation,IClaimDetailResult} from "../../interfaces/Student/Library"

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
 

    
const LibraryApi ={
    GetBooksDetailsList,
    GetBookswithmeList,
    ClaimBookDetails,
    GetCancelBookReservation
}
export default LibraryApi;