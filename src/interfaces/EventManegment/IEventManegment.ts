//1.EventList
export interface IEventListBody {

  asEventDate: string,
  asSchoolId: number,
  asAcademicYearId: number,
  asStandardId: number,
  asDivisionId: number

}

export interface IEventlIstResult {

  Event_Id: string,
  Event_Name: string,
  Event_Start_Date: string,
  Event_End_Date: string,
  Display_On_Homepage: string,
  StdDivId: string,
  SchoolWiseEventDetailsId: string

}

//2.EventDetails
export interface IEventDetailsBody {

  asSchoolId: number,
  asAcademicYearId: number,
  asEventId: number

}

export interface IEventDetailsResult {

  Event_Id: string,
  Event_Name: string,
  Event_Description: string,
  Event_Start_Date: string,
  Event_End_Date: string,
  Display_On_Homepage: string,
  Event_Image: string,
  School_Id: string,
  Academic_Year_ID: string,
  Is_Deleted: string,
  Insert_Date: string,
  Inserted_By_id: string,
  Update_Date: string,
  Updated_By_Id: string

}

//3.GetAllClassesAndDivisions
export interface IAllClassesAndDivisionsBody {

  asSchoolId: number,
  asAcademicYearId: number

}

export interface IAllClassesAndDivisionsResult {

  SchoolWise_Standard_Division_Id: string,
  Standard_Id: string,
  Standard_Name: string,
  Division_Id: string,
  Division_Name: string

}

//4.SelectedStandardAndDivisionCheckBox
export interface ISelectedStandardAndDivisionCheckBoxBody {

  asSchoolId: number,
  asEventId: number

}

export interface ISelectedStandardAndDivisionCheckBoxResult {

  StandardDivisionId: string,
  Event_Id: string,
  Standard_Name: string,
  Division_Name: string

}

//6.SaveUpadateEvent
export interface IUpdateEventBody {

  asEventId: number,
  asEventName: string,
  asEventDescription: string,
  asEventStartDate: string,
  asEventEndDate: string,
  asDisplayOnHomepage: boolean,
  asEventImageName: string,
  asSchoolId: number,
  asAcademicYearId: number,
  asInsertedById: string,
  asUpdatedById: string,
  asStandardDivisions: string

}

//7.deleteEvenet
export interface IDeleteEventBody {

  asSchoolId: number,
  asEventId: number

}

//8.DeleteEventImage
export interface DeleteEventImageBody {

  asSchoolId: number,
  asAcademicYearId: number,
  asEventId: number
}
