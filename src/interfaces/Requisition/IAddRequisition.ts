
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


export interface ISaveRequisitionBody {
    asSchoolId: number
    asRequisitionId: number
    asUserId: number
    asRequisitionName: string
    asRequisitionDesc: string
    asAction: string
    asRequisitionItemDetailsXml: string
    asIsGeneral: number
}


export interface ISaveRequisitionResult {
    listRequisitionnItemDetails: [
        {
            ItemID: string
            ItemCode: string
            ItemName: string
            ItemQty: string
            IssueQty: string
            ReturnQty: string
            CurrentStock: string
            RequisitionDetailsID: string
            RequisitionID: string
            ItemStatus: string
            UOMUnit: string
            RequisitionDescription: string
            NextDesignationId: string
            Creator_Id: string
            CanEdit: string
            ItemOrgQty: string
            ConsiderUnitQuantity: string
            UOMPieceCount: string
            CancelQty: string
        }
    ],
    listGetRequisitionName: [
        {
            RequisitionID: string
            RequisitionCode: string
            RequisitionName: string
        }
    ],



}

