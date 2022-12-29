export interface INewRelease {
    asDeviceType: string,
    asUserCurrentVersion: string
}

export interface GetNewRelease {
    GetNewAppVersionDetailsResult:{
    ReleaseNotes:string
    Version: string,
    AppStoreUrl: string,
    DeviceType: string,
    IsForceUpdate: string,
    IsRefreshSchoolSettings: boolean,
    LastFetchDate: string,
}
}