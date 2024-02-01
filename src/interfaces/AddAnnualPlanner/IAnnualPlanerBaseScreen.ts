
export interface  IGetAssociatedStdLstForTeacherDropDownBody
{

    asSchoolId:number,
    asAcademicYearId:number,
    asUserId:number

}

export interface  IGetAssociatedStdLstForTeacherDropDownResult
{
    StandardId: string ,
    Original_Standard_Id: string,
    Teacher_Id: string,
    Standard_Name: string,
    User_Id: string
    
}

export interface  IGetAllDivisionsForStandardDropDownBody
{

    
    asSchoolId:number,
    asAcademicYearId:number,
    asStandardId:number
    
    }

    export interface  IGetAllDivisionsForStandardDropDownResult
    {
    
        SchoolWise_Standard_Division_Id: string,
        division_id: string,
        division_name: string
        
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
         
        
    export interface   IGetYearsForAnnualPalannerDropDownBody
    {
        asSchoolId:number
    
    }

   export interface  IGetYearsForAnnualPalannerDropDownResult
        {
            Year: string
        }
         
        
export interface   IGetEventsDataListBody
    {
        asSchoolId:number ,
        asAcademicYearId:number,
        asMonthId:number,
        asYear:number,
        asStandardId:number,
        asDivisionId:number
    
    }

    export interface   IGetEventsDataListResult
    {
        Day: string
        Event_Date: string,
        Event_Desc: string,
        Event_Title: string,
        Event_ForeColor: string,
        Event_BackColor: string,
        Sort_Order: string,
        Event_Id: string,
        Schoolwise_Event_Detail_Id:string,
        Standard_Id: string

    }
    export interface   IGetAssociatedStandardsBodyP
    {
        asSchoolId:number,
        asAcademicYearId:number
    }
    export interface   IGetAssociatedStandardsResultP
    {
        school_id: string,
        original_standard_id:string,
        standard_id: string,
        standard_name: string
    }