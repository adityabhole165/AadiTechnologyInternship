
// export default interface IWdays{
//     asSchoolId:string,
//     asAcademicYearId:string
//     }

//     export  interface GetWdaysResult{
//         WeekDay: string
//     }

//     export interface ItimeTable{
// asStandardDivId:string,
// asTeacherId:number,
// asIsTeacher:number,
// asAcademicYearId:string,
// asSchoolId:string
//     }

//     export interface GettimeTable{
//       LectureNumber: string,
//       WeekDay: string,
//       Subject: string,
//       WeekDayId:string,
//       AdditionalLecture:string
//     }import { string } from "prop-types"

export default interface IWdays{
    asSchoolId:string,
    asAcademicYearId:string
    }

    export  interface GetWdaysResult{
        WeekDay: string
    }
    export interface ItimeTable{
asStandardDivId:string,
asTeacherId:string,
asIsTeacher:number,
asAcademicYearId:string,
asSchoolId:string
    }

    export interface GettimeTable{
       LectureNumber: string,
        WeekDay: string,
        Subject: string,
        WeekDayId:string,

    }
// Additional
    export interface AdditionalLecture{
        Name: string,
        Number:string,
        ClassName:string,
        Day:string
    }