
export interface IGetItemCategoryBody {
    asSchoolId: number;
}


export interface IGetItemCategoryResult {

    Id: string,
    Name: string

}

export interface IGetAddItemListBody {
    asSchoolId: number
    asName: string
    asItemCategoryId: number
    asStartIndex: number
    asEndIndex: number
    asSortExp: string
  }

  export interface IGetAddItemListResult {
    ItemID: string
    ItemCode: string
    ItemName: string
    ItemQty: string
    CurrentStock: string
    ItemCategoryName: string
    ItemReorderLevelQty: string
    IsConsiderForDetailLevel: string
    ConsiderUnitQuantity: string
    ConsiderUnitReorderLevel: string
    UOMUnit: string
    PieceCount: string
    ItemCategoryID: string
  }
  