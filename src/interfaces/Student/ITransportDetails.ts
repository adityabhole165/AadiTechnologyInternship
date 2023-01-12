export interface GetStudentTransportDetailsBody{

    aiUserId: number,
    aiSchoolId:number,
    aiAcademicYearId:number,
    aiTypeId:number
}

export interface GetStudentTransportDetailsResult {
    VehicleId: number,
    VehicleRoute: string,
    VehicleNumber: string,
    VehicleType: string,
    PickupTime: string,
    DropTime: string,
    TransportShiftName: string,
    StopName: string,
    StopNumber: number,
    RouteName: string,
   
    LinkUrl: string,
    TrackingURL:string,
    TrackingMessage: string,
    TransportStaffName:string,
     MobileNo: string,
   Designation: string,
}  
           
            
        
    
    
        
            
    
