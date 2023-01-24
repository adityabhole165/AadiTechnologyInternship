export interface IGetUserEmailSettingsBody{
    asSchoolId: string,
    asUserId: string,
}

export interface IGetUserEmailSettingsResult{

    CanReceiveMail: string,
    EmailAddress: string,
}
