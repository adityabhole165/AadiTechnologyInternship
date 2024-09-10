export interface IGetMenuDetailsBody {
  aiSchoolId: number,
  aiUserRoleId?: string,
  aiMenuId?: string,
  IsRefresh?: boolean
}

export interface IGetMenuDetailsResult {
  MenuDetails: [MenuDetails];
}
export interface MenuDetails {
  MenuId: number;
  MenuName: string;
  Priority: number;
  ParentMenuId: number;
  MenuContent: string;
  MenuTypeId: number;
  LinkName: string;
  FilePath: string;
  LevelIndex: number;
}
