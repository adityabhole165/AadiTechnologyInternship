export interface GetStudentTransportDetailsBody {
  aiUserId: number;
  aiSchoolId: number;
  aiAcademicYearId: number;
  aiTypeId: number;
}

export interface GetStudentTransportDetailsResult {
  VehicleId: number;
  VehicleRoute: string;
  VehicleNumber: string;
  VehicleType: string;
  PickupTime: string;
  DropTime: string;
  TransportShiftName: string;
  StopName: string;
  RouteName: string;
  LinkUrl: string;
  TrackingURL: string;
  TrackingMessage: string;
  TransportStaffDetails: [TransportStaffDetails];
  StopDetails: [StopDetails];
  ShowStaffContactDetails: boolean;
  ShowStops: boolean;
  ShowVehicleOfficialContactNo: boolean;
  VehicleOfficialContactNo: string;
}

export interface TransportStaffDetails {
  TransportStaffName: string;
  MobileNo: string;
  Designation: string;
}

export interface StopDetails {
  StopNumber: number;
  StopName: string;
  PickupTime: string;
  DropTime: string;
}
