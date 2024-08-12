import QueAns from "./QueAns"

const QueAnsList = ({ ItemList, ChangeItem }) => {
    const onChange = (Item, Value) => {
        ChangeItem(ItemList.map((item, i) => {
            return {
                ...item,
                Answer: (item.Id == Item.Id) ? Value : item.Answer
            }
        })
        )
    }
    return (
        <div>
            {ItemList.map((item, i) => {
                return (
                    <div key={i}>
                        <QueAns Item={item} ChangeItem={onChange} />
                    </div>
                )
            })

            }
        </div>
    )
}

export default QueAnsList