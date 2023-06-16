import Card37 from "../card/Card37"
import Card38 from "../card/Card38"

const FeeAccordion = ({ FeesType, Fee, FeesObject,handleChange, expanded,currentYear, IsForCurrentyear,
     OldYearwiseStudentId, internalFees, ApplicableFee, TotalLateFee,SchoolwiseStudentId, NextYearID,
     IsOnlinePaymetCautionMoney, clickPayOnline,OldInternalstudent }) => {
    return <>
        <Card38 FeesType={FeesType} Fee={Fee} FeesObject={FeesObject} expanded={expanded} handleChange={handleChange}
        internalFees={internalFees} />
        <Card37 expanded={expanded} handleChange={handleChange} FeesObject={FeesObject} currentYear={currentYear} 
        IsForCurrentyear={IsForCurrentyear} OldYearwiseStudentId={OldYearwiseStudentId} internalFees={internalFees}
        ApplicableFee={ApplicableFee} TotalLateFee={TotalLateFee} SchoolwiseStudentId={SchoolwiseStudentId} NextYearID={NextYearID}
        IsOnlinePaymetCautionMoney={IsOnlinePaymetCautionMoney} clickPayOnline={clickPayOnline} OldInternalstudent={OldInternalstudent} />
    </>

}
export default FeeAccordion