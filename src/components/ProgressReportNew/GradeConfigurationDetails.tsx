import { Typography, Dialog, DialogTitle, DialogContent,Link,Box } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear';
import React from 'react'
import GradeConfigurationList from 'src/libraries/ResuableComponents/GradeConfigurationList'

const GradeConfigurationDetails = ({handleClick,open1,handleClose,USGetAllMarksGradeConfiguration,USGetAllMarksGradeConfiguration1,headerArray}) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
    <Link href="#" underline="none" onClick={handleClick} sx={{ display: 'flex', alignItems: 'center' }}>
      <Typography variant="h4">Grade Configuration Details</Typography>
    </Link>

    <Dialog
      open={open1}
      onClose={handleClose}
      maxWidth="md" scroll="body"
      sx={{ minHeight: '400px' }}
      PaperProps={{
        sx: {
          borderRadius: "15px",
        }
      }}>
      <DialogTitle sx={{ bgcolor: '#223354' }}>

        <ClearIcon onClick={handleClose}
          sx={{
            color: 'white',
            // background:'white',
            borderRadius: '7px',
            position: 'absolute',
            top: '5px',
            right: '8px',
            cursor: 'pointer',
            '&:hover': {
              color: 'red'
            }
          }} />
      </DialogTitle>

      <DialogContent>
        <Typography variant="h3" my={1}>
          Grade Configuration Details
        </Typography>
        <Typography variant="h4" my={1}>
          Subjects :-
        </Typography>
        <GradeConfigurationList
          configurationList={USGetAllMarksGradeConfiguration.filter((item) => item.Standard_Id !== "")}
          HeaderArray={headerArray}
        />
      </DialogContent>
      <DialogContent>
        <Typography variant="h4" >
          Co-Curricular Subjects :-
        </Typography>
        <GradeConfigurationList
          configurationList={USGetAllMarksGradeConfiguration1.filter((item) => item.Standard_Id !== "")}
          HeaderArray={headerArray}
        />
      </DialogContent>
    </Dialog>
  </Box>
  )
}

export default GradeConfigurationDetails