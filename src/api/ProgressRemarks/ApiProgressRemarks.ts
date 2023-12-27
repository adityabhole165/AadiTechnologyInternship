import http from "../../requests/SchoolService/schoolServices";
import { IAllPrimaryClassTeachersBody,IAllPrimaryClassTeachersResult, IGetTestwiseTermBody,IGetTestwiseTermResult, IStudentswiseRemarkDetailsToExportBody,IStudentswiseRemarkDetailsToExportResult, IUpdateAllStudentsRemarkDetailsBody, IStudentListToCaptureHeighthWeightBody, IStudentListToCaptureHeighthWeightResult, IGetAllStudentswiseRemarkDetailsBody,IGetAllStudentswiseRemarkDetailsResult} from "src/interfaces/ProgressRemarks/IProgressRemarks"

  const ClassTeachers= (data: IAllPrimaryClassTeachersBody) => {
    return http.post<IAllPrimaryClassTeachersResult[]>('Teacher/GetClassTeachers',data);
  };

  const GetTestwiseTerm = (data: IGetTestwiseTermBody) => {
    return http.post<IGetTestwiseTermResult[]>('Teacher/GetTestwiseTerm',data);
  };

  const StudentswiseRemarkDetailsToExport = (data: IStudentswiseRemarkDetailsToExportBody) => {
    return http.post<IStudentswiseRemarkDetailsToExportResult[]>('Teacher/GetStudentswiseRemarkDetailsToExport',data);
  };

  const UpdateAllStudentsRemarkDetails = (data: IUpdateAllStudentsRemarkDetailsBody) => {
    return http.post<"">('Teacher/UpdateAllStudentsRemarkDetails',data);
  };

  const StudentListToCaptureHeighthWeight = (data: IStudentListToCaptureHeighthWeightBody) => {
    return http.post<IStudentListToCaptureHeighthWeightResult[]>('Teacher/GetStudentListToCaptureHeighthWeight',data);
  };

  const GetAllStudentswiseRemarkDetails = (data: IGetAllStudentswiseRemarkDetailsBody) => {
    return http.post<IGetAllStudentswiseRemarkDetailsResult[]>('Teacher/GetAllStudentswiseRemarkDetails',data);
  };


  const ApiProgressRemark={
    ClassTeachers,
    GetTestwiseTerm,
    StudentswiseRemarkDetailsToExport,
    UpdateAllStudentsRemarkDetails,
    StudentListToCaptureHeighthWeight,
    GetAllStudentswiseRemarkDetails
  }
  export default  ApiProgressRemark