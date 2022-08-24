import http from "../../requests/SchoolService/schoolServices";
import {IBooksDetails,IBookswithmeList,IClaimList} from "../../interfaces/Student/Library"

const GetBooksDetailsList = (data: IBooksDetails) => {
    return http.post<IBooksDetails>('Library/GetPagedBookList',data);
  };

  const GetBookswithmeList = (data: IBookswithmeList) => {
    return http.post<IBookswithmeList>('Library/GetIssuedBookDetailsofUser',data);
  };

  const GetClaim = (data: IClaimList) => {
    return http.post<IClaimList>('Library/GetReservedBookDetails',data);
  };
 

    
const LibraryApi ={
    GetBooksDetailsList,
    GetBookswithmeList,
    GetClaim,
}
export default LibraryApi;