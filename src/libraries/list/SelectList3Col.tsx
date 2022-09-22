import ListCard4ColSel from '../card/ListCard4ColSel'
import ErrorMessages from '../../libraries/ErrorMessages/ErrorMessages';

const SelectList3Col = ({ Itemlist, refreshData}) => {
    console.log(Itemlist)
    const clickSingle = (value) => {
        Itemlist =
            Itemlist.map((obj) =>
                obj.Id === value.name ?
                    { ...obj, isActive: value.checked } :
                    obj
            )
        refreshData(Itemlist)
    }
  return (
    <div>
                    {Itemlist?.length===0?
                    <ErrorMessages Error="No records found"></ErrorMessages>:

                Itemlist.map((item, index) => (
                    <ListCard4ColSel
                       key={index}
                        Item={item}
                        onChange={clickSingle}
                    />
                ))
            }

    </div>
  )
}

export default SelectList3Col