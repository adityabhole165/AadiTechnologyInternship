import { string } from "prop-types"

export interface IGetAddAadharCardDetailsBody {
    asSchoolId:number,
    asUserId:number
    }
 export interface IGetAddAadharCardDetailsResult {
        School_Id: string,
        SchoolWise_Student_Id: string,
        User_Id: string,
        AadharCardNo: string,
        AadharCard_Photo_Copy_Path: string,
        StudentFullName: string
       
    } 
 export interface IGetSubmitAadharDetailsBody {
        asUserId:number, 
        asSchoolId:number, 
        asAadharCardNo:string,
         asAadharCardPhotoCopyPath:string, 
         asStudentNameOnAadharCard:string,
          asMotherTongue:string,
          asEmail:string,
           asUpdatedById:string,
           asSaveFeature:string,
           asFolderName:string, 
           asBase64String:string
        }   
    export interface IGetSubmitAadharDetailsResult{
            Message : string
        }        