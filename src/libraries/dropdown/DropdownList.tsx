import React,{useState} from 'react'
import Dropdown from './Dropdown';
import CardExam from '../card/CardExam';

const DropdownList = () => {
   
    const UserArray2 = [
        {
            Name: "test1",
            Id: "1"
        },
        {
            Name: "test2",
            Id: "2"
        },
        {
            Name: "test3",
            Id: "3"
        },];
       
        const [Item,setItem] = useState ()
        const ClickMe =(id)=>{
            setItem(id)
        }
    return (
        <div>
            <Dropdown
                Array={UserArray2}
                handleChange={ClickMe}
                label={""}
                defaultValue={Item}
            />
            <br />
            <br />
            <CardExam text1={"Math"}
                text2={"9/10"}
                text3={"90%"} />

        </div>
    )
}

export default DropdownList