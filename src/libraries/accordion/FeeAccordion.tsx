import Card37 from "../card/Card37"
import Card38 from "../card/Card38"

const FeeAccordion = ({ FeesType, Fee, FeesObject,handleChange, expanded }) => {
    return <>
        <Card38 FeesType={FeesType} Fee={Fee} FeesObject={FeesObject} expanded={expanded} handleChange={handleChange} />
        <Card37 expanded={expanded} handleChange={handleChange} FeesObject={FeesObject}/>
    </>

}
export default FeeAccordion