import { Box, Card, Grid, Stack, Typography,Avatar,Paper } from '@mui/material';
import React from 'react';
import { CardDetail2 } from 'src/libraries/styled/AccordianStyled';


function CenterAlign({itemList}) {
  return (
    <div>
      { itemList.map((item,i)=>(
        <div key={i}>
             <Typography variant='body2'>{item.UserName}</Typography> 
             </div>

        
      ))}
      {/* <Card>
         <Stack justifyContent="center" alignItems="center" sx={{textAlign:"center"}} >
         <Avatar alt="user.name" src={ item.Text2 != 0 ? `data:image/png;base64,${item.Text2}`:'/imges/defualtUser.jpg'} sx={{ mt:"10px" ,backgroundColor: "#90caf9", height: "100%" ,width:100}} variant="rounded" aria-label="add" />  
          <Typography variant='body2' >{item.Header}</Typography>
          <Typography variant='body2'>{item.Text1}</Typography>
          </Stack>
      </Card> */}
    </div>
  )
}

export default CenterAlign
