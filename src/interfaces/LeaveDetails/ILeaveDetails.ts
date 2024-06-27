export interface IGetCategoryDropdownBody {
    asSchoolId: number;
    asId: number;
}
export interface IGetCategoryDropdownResult {
    Id: string;
    Category: string;
}


export interface IGetDeleteLeaveBody {
    asSchoolId: number;
    asUserId: number;
    asUpdatedById: number;
}
