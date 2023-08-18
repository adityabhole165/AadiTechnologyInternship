export interface IUpdateMessageReadUnreadStatusBody {
    aiSchoolId:string,
    aiAcademicYearId:string,
    asMessageReceiverIds:any,
    aiReceiverUserId:string,
    abMarkAsRead:string
}

export interface IUpdateMessageReadUnreadStatusResult {
    UpdationMessage:string
}