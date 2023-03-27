import React,{useState} from 'react'
import ButtonHomework from 'src/libraries/buttons/HomeworkButton';


function HomeworkNew() {
    const ItemList = [{ Id: "1", Name: "2 Feb", Value: "2 feb", IsActive: true },
    { Id: "2", Name: "3 Feb", Value: "3 feb", IsActive: false },
    { Id: "3", Name: "4 Feb", Value: "4 feb", IsActive: false },
    { Id: "4", Name: "5 Feb", Value: "5 feb", IsActive: false },
    { Id: "5", Name: "6 Feb", Value: "6 feb", IsActive: false },
    { Id: "6", Name: "7 Feb", Value: "15 feb", IsActive: false }]
  
    const [click, SetClick] = useState("");

  
    const ClickButton = (Id) => {
      SetClick(Id)
      console.log(Id)
     
    }
  return (

    <div>
    
    {
          ItemList.map((data, i) => {
           
            return (
              <div key={i}>
             <ButtonHomework Item={data}
             ClickItem={ClickButton} ></ButtonHomework>
              </div>
            )
          })
        }
        
        



    </div>
  )
}

export default HomeworkNew