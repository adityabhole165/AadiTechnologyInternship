export interface IGetParentPhotosBody{

    aiSchoolId: string,
    aiAcademicYearId: string,
    aiUserId: string,

}


export interface IGetParentPhotosResult{
   
        FatherName: string,
        MotherName: string,
        RelativeName: string,
        FatherPhoto: string,
        MotherPhoto: string,
        RelativePhoto:string,
        IsPhotosSubmitted: boolean,
        IsAllPhotoSaved: boolean,
        IsSiblingPresent: boolean,
        IsFatherPhotoSaved: boolean,
        IsMotherPhotoSaved: boolean,
        IsParentPhotoSaved: boolean
    
};


export interface IsaveParentPhotosBody{

    aiSchoolId: string,
    aiAcademicYearId: string,
    asFatherPhotoFileName:string,
    asMotherPhotoFileName:string,
    asRelativePhotoFileName:string,
    asFatherImgPhoto: string,
    asMotherImgPhoto:string,
    asLocalGuardianPhoto:string,
    aiUserId: string,
    aiIsSubmit: string,
    asRelativeName: string,
    abSaveForSibling: string
}

export interface IsaveParentPhotosResult{

    Message:string
};



export interface ISubmitParentPhotoDetailsBody{

    aiUserId:number,
    aiSchoolId: string,
    aiAcademicYearId: string,
    abSubmitForSibling: boolean
}

export interface ISubmitParentPhotoDetailsResult{
    Message:string
}