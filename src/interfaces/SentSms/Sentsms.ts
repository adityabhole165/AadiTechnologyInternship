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

// Personal Address Book Interface
export interface IGetAddressBookListBody {
  asSchoolId: string
  asUserId: string
}

export interface IGetAddressBookListResult {
  PersonalAddressBookId: string
  User_Id: string
  Name: string
  Mobile_No: string
  Is_Deleted: string
  Insert_Date: string
  Inserted_By_id: string
  Update_Date: string
  Updated_By_Id: string
}

export interface ICheckIfPersonalAddressExistsBody {
  asUserId: string
  asSchoolId: string
  personalAddressBookId: string
  userName: string
  userMobileNo: string
}


export interface IInsertPersonalAddressBookBody {
  asSchoolId: string
  userId: Number
  name: string
  mobileNo: string
  isDeleted: boolean
  insertDate: string
  insertedById: Number
}

export interface IDeletePersonalAddressBookBody {
  personalAddressBookId: string
  isDeleted: boolean
  updateDate: string
  updatedById: string
  asSchoolId: string
}

export interface IUpdatePersonalAddressBookBody {
  personalAddressBookId: string
  name: string
  mobileNo: string
  updateDate: string
  updatedById: Number
  asSchoolId: string
}

export interface IGetAddressBookGroupListBody {
  asSchoolId: string
  userId: Number
  asGroupMob: string
}

export interface IGetAddressBookGroupListResult {
  PersonalAddressBookGroupId: string
  User_Id: string
  Name: string
  Is_Deleted: string
  Ischeck: string
}


export interface IGetAddressBookGroupDetailsBody {
  asSchoolId: string
  asUserId: string
  asGroupId: string
}

export interface IGetAddressBookGroupDetailsResult {
  PersonalAddressBookId: string
  User_Id: string
  Name: string
  Mobile_No: string
  Is_Deleted: string
  IsInGroup: string
}

export interface ICheckIfPersonalAddressGroupAlreadyExistsBody {
  asSchoolId: string
  asPersonalBookGroupId: string
  asGroupName: string
  asUserId: string
}

export interface IInsertPersonalAddressBookGroupBody {
  asSchoolId: string
  asGroupName: string
  asGroupDetailXML: string
  asUserId: string
}

export interface IUpdatePersonalAddressBookGroupBody {
  asSchoolId: string
  asGroupId: string
  asGroupName: string
  asGroupDetailXML: string
  asUserId: string
}
