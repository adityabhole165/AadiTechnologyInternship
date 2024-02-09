export interface IEventList {
  asMonth: number;
  asAcademicYearId: string;
  asSchoolId: string;
  asYear: string;
  asUserId: string;
}

export interface GetEventsInMonthResult {
  GetEventsInMonthResult: [
    {
      Description: string;
      StartDate: string;
      EndDate: string;
      StandardList: string;
      Id: string;
      EventComment: string;
    }
  ];
}

//Event details

export interface IEventDetails {
  asAcademicYearId: string;
  asSchoolId: string;
  asEventId: string;
}

export interface GetEventsDetailsResult {
  Description: string;
  EndDate: string;
  StartDate: string;
  StandardList: string;
  EventImage: string;
  EventComment: string;
}

//GetEventsInMonth
export default interface IGetEventsInMonth {
  asSchoolId: string;
  asAcademicYearId: string;
  asMonth: string;
  asYear: string;
  asUserId: string;
  abIncludeEvents: string;
  abIncludeHolidays: string;
  abIncludeExams: string;
}

export interface IGetEventsInMonthResult {
  Id: number;
  Description: string;
  StartDate: string;
  EndDate: string;
  StandardList: string;
  EventComment: null;
  TypeId: number;
  DisplayDate: string;
}

export interface IGetEventsMonthResult {
  GetEventsInMonthResult: IGetEventsInMonthResult[];
}
export interface IGetFilePathBody {
  aiSchoolId: string;
  aiAcademicYearId: string;
}

//Teacher module
export interface   IGetAllStandardsBody
    {
      asSchoolId:number,
      asAcademicYearId:number
    }
    export interface   IGetAllStandardsResult
    {
        school_id: string,
        original_standard_id:string,
        standard_id: string,
        standard_name: string
        
    }
    export interface  IGetAllMonthsDropDownBody
    {
      
    asSchoolId:number
    }
    export interface  IGetAllMonthsDropDownResult
        {
        
            MonthID: string,
            Month: string,
            MonthAbbreviation: string
        }
        export interface  IGetAcadamicYearDropDownBody
    {
      
      asSchoolId:number,
      asUserId:number,
      asUserRoleId:number
    }
    export interface  IGetAcadamicYearDropDownResult
    {
      
      Academic_Year_ID: string,
      School_Id: string,
      YearValue: string,
      Start_date: string,
      End_Date: string,
      School_ReOpen_Date: string,
      Is_Current_Year: string,
      Is_Close_Year: string,
      Is_NewlyCreated:string,
      Is_FinalYear_Generated: string,
      Is_Deleted: string,
      School_Name: string
    }
    export interface  IGetAllEventsBody
    {
      
      asSchoolId:number,
      asUserId:number,
      asUserRoleId:number
    }
    export interface  IGetAllEventsResult
    {
      
      EventId: string,
        EventDescription: string,
        StartDate: string,
        EndDate: string,
        Standards: string,
        Display_On_Homepage: string
    }