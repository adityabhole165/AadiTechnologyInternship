import { Box, Button, Checkbox, Typography } from '@mui/material'
import React, { useState } from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import FileSelectall from 'src/components/OnlineExam/FileSelectall';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CircleIcon from '@mui/icons-material/Circle';
import { BadgeStyle } from '../styled/DashboardStyled';

const ListCard = ({ itemList, clickItem, selectedItem }) => {
  return (
    <div>
      <Box
      // sx={{ height: '95px', overflow: 'scroll', }}
      >
        {
          itemList?.map((item, index) => (
            // <Button key={index} sx={{ml:'5px',mt:'5px' , backgroundColor:item.IsAnswered == '' ? '' : 'green',height:"30px"}}
            //  variant={selectedItem==item.Name?'contained':'outlined'} 
            // //  startIcon={item.IsAnswered && <CheckCircleIcon sx={{color:'green'}}/>}
            //  onClick={()=>{clickItem(item.Name)}}>
            //     {item.SerialNo}
            // </Button>
            //  --------------------------------------------------------------------------------------------           
            //             <>
            //               {selectedItem == item.Name ?
            //                     <BadgeStyle badgeContent={item.SerialNo}>
            //                 <CircleIcon key={index}
            //                   sx={{ color: selectedItem == item.Name ? item.IsAnswered ? 'green' :'blue' : '',mr:'2px'}}
            //                   // sx={{ backgroundColor: selectedItem==item.Name ? 
            //                   //   item.IsAnswered ? 'green' :
            //                   //    'blue' : ''}}
            //                   onClick={() => { clickItem(item.Name) }}>
            //                   filled
            //                 </CircleIcon></BadgeStyle>
            //                 :
            //                 <BadgeStyle badgeContent={item.SerialNo}>
            //                 <CircleIcon key={index}
            //                 sx={{ color: item.IsAnswered ? 'green' : 'white',border:'3px solid grey',borderRadius:'20px',mr:'2px'}}
            //                 onClick={() => { clickItem(item.Name) }}
            //               >
            //                 check</CircleIcon> </BadgeStyle>
            // }
            //             </>
            //  ------------------------------------------------------------------------------------     
            <>
              {selectedItem == item.Name ?
                <BadgeStyle badgeContent={item.SerialNo}>
                  <CircleIcon key={index}
                    sx={{ color: selectedItem == item.Name ? item.IsAnswered ? 'green' : 'blue' : '', mr: '2px' }}
                    onClick={() => { clickItem(item.Name) }}></CircleIcon></BadgeStyle>
                :
                <BadgeStyle badgeContent={item.SerialNo}>
                  <CircleIcon key={index}
                    sx={{ color: item.IsAnswered ? 'green' : 'white', border: '3px solid grey', borderRadius: '20px', mr: '2px' }}
                    onClick={() => { clickItem(item.Name) }} ></CircleIcon> </BadgeStyle>
              }
            </>
          ))
        }
      </Box>
    </div>
  )
}

export default ListCard