import Card35 from '../card/ListHeaderCard3ColSel'
import ListCard3ColSel from '../card/ListCard3ColSel'
const List3ColSelAll = ({ Itemlist, refreshData }) => {
    let isCheckAll =
        (!Itemlist.some(obj => obj.isActive === false)) ?
            1 :
            (!Itemlist.some(obj => obj.isActive === true)) ?
                0 :
                2;

    const ClickAll = (value) => {
        Itemlist =
            Itemlist.map((obj) => {
                return { ...obj, isActive: value }
            })
        refreshData(Itemlist)
    }
    const clickSingle = (value) => {
        Itemlist =
            Itemlist.map((obj) =>
                obj.text1 === value.name ?
                    { ...obj, isActive: value.checked } :
                    obj
            )
        refreshData(Itemlist)
    }
    return (
        <div>
            <Card35
                Item={{ text1: '0', text2: 'Select All', isActive: isCheckAll }}
                onChange={ClickAll}
            />
            {
                Itemlist.map((item, index) => (
                    <ListCard3ColSel
                        key={index}
                        Item={item}
                        onChange={clickSingle}
                    />
                ))
            }
        </div>
    )
}

export default List3ColSelAll