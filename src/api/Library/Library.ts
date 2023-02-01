import http from "../../requests/SchoolService/schoolServices";
import {IBooksDetails,IBookswithmeList,IClaimList,ICancelBookReservation} from "../../interfaces/Student/Library"

const GetBooksDetailsList = (data: IBooksDetails) => {
    return http.post<IBooksDetails>('Library/GetPagedBookList',data);
  };

  const GetBookswithmeList = (data: IBookswithmeList) => {
    return http.post<IBookswithmeList>('Library/GetIssuedBookDetailsofUser',data);
  };

  const GetClaim = (data: IClaimList) => {
    return http.post<IClaimList>('Library/GetReservedBookDetails',data);
  };
  const GetCancelBookReservation = (data: ICancelBookReservation) => {
    return http.post<ICancelBookReservation>('Library/CancelBookReservation',data);
  };
 

    
const LibraryApi ={
    GetBooksDetailsList,
    GetBookswithmeList,
    GetClaim,
    GetCancelBookReservation
}
export default LibraryApi;