export interface IGetRequisitionStatusBody {
  asSchoolId: number;
}
export interface IGetRequisitionStatusResult {
  StatusID: string;
  StatusName: string;
  Sort_Order: string;
  Is_Deleted: string;
  Insert_Date: string;
  Inserted_By_id: string;
  Update_Date: string;
  Updated_By_Id: string;
}

export interface IGetPagedRequisitionBody {
  asSchoolId: number;
  asStartIndex: number;
  asEndIndex: number;
  asSortExp: string;
  asStatusID: number;
  asUserId: number;
}
export interface IGetPagedRequisitionResult {
  RequisitionID: string
  RequisitionCode: string
  RequisitionName: string
  StatusName: string
  School_Id: string
  Created_Date: string
  StatusID: string
  CreatedId: string
  CreaterName: string
  NextDesignationId: string
  ExpiryDate: string
  Editble: string
  IsDelete: string
  IsFinalApproval: string
}
export interface IGetDeleteRequisitionBody {
  asRequisitionId: number;
  asSchoolId: number;
}
export interface IGetCancelRequisitionBody {
  asRequisitionId: number;
  asReasonText: string;
  asSchoolId: number;
  asUpdatedById: number;
  asCanceledById: number;
}







