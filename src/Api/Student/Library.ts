import http from "../../Client_Api/SchoolService/schoolServices";
import {IBooksDetails,IBookswithmeList,IClaimList} from "../../Interface/Student/Library"

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