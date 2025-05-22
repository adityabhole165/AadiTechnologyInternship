import React from 'react'
import CommonPageHeader from '../CommonPageHeader'
import { Box, Grid, IconButton, TextField, Tooltip } from '@mui/material'
import Legend from 'src/libraries/Legend/Legend';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import MarkEmailReadOutlinedIcon from '@mui/icons-material/MarkEmailReadOutlined';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import UnsubscribeOutlinedIcon from '@mui/icons-material/UnsubscribeOutlined';
import { QuestionMark } from '@mui/icons-material';
import { grey } from '@mui/material/colors';
const UserManagementBase = () => {
  //Legend
      const LegendArray =[
        {
          id: 1,
          Name: 'Active',
          Value: <LockOpenOutlinedIcon
              style={{
                  color: 'green',
                  fontSize: 25,
                  position: 'relative',
                  top: '-2px',
              }}
          />
      },
      {
          id: 2,
          Name: 'Deactive',
          Value: <LockOutlinedIcon
              style={{
                  color: '#ff6347',
                  fontSize: 25,
                  position: 'relative',
                  top: '-2px',
              }}
          />
      },
      {
          id: 3,
          Name: 'Active for SMS/Message',
          Value: <MarkEmailReadOutlinedIcon
              style={{
                  color: 'green',
                  fontSize: 25,
                  position: 'relative',
                  top: '-2px',
              }}
          />
      },
      {
          id: 4,
          Name: 'Deactive for SMS/Message',
          Value: <UnsubscribeOutlinedIcon
              style={{
                  color: '#ff6347',
                  fontSize: 28,
                  position: 'relative',
                
              }}
          />
      },
      ];
  return (
    <Box sx={{ px: 2 }}>
            <CommonPageHeader
                navLinks={[
                    { title: 'User Management', path: '/RITeSchool/Teacher/UserManagementBase' },
                
                ]}

                rightActions={
                    <Box>
                        <Tooltip title={"Lists user's available to the school. Click on 'Lock' to restrict access your school's data to particular user. To change password click on 'Change Password' link. Click on 'Send SMS/Message' to add or remove user from SMS/Message list. To search user, enter Name / Reg. No / User Login and click on 'Search' button."}>
                            <IconButton sx={{
                                    color: 'white',
                                    backgroundColor: grey[500],
                                    ':hover': { backgroundColor: grey[600] 
                                }
                            }}>
                                <QuestionMark />
                            </IconButton>
                        </Tooltip>
                    </Box>
                }
            />

<Box sx={{background: 'white', p:1 , mb:2}}>
                    <Legend  LegendArray={LegendArray}/>
            </Box>
        
        <Box sx={{ background: 'white', p: 2, mb: 2 }}>

        <Grid item xs={12} sm={6} md={3} lg={2}>
            <TextField
                sx={{ width: '15%' }}                    
                size="small"
                label="User Role"
            />
    </Grid>


</Box>
</Box>
)
}

export default UserManagementBase
