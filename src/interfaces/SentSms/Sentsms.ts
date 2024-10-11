export interface IGetSentItemsBody {
    asSchoolId: number
    asUser_Id: number
    asReceiver_User_Role_Id: number
    asAcademic_Year_Id: number
    asSortExp: string
    asprm_StartIndex: number
    asPageSize: number
    asName: string
    asContent: string
    asViewAllSMS: number
  }

  export interface IGetSentItemsResult {
    RowID: string
    TotalRows: string
    Read_Message_Flag: string
    UserName: string
    Subject: string
    Insert_Date: string
    SMS_Id: string
    SMS_Receiver_Details_Id: string
    StatusId: string
    SenderName: string
    SMSShootId: string
  }
  