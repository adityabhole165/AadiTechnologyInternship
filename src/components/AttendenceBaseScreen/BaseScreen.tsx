import React from 'react'
import {Box, IconButton, Tooltip} from '@mui/material'
import CommonPageHeader from '../CommonPageHeader'
import { CalendarMonth } from '@mui/icons-material'
import green from '@mui/material/colors/green'
import { useNavigate } from 'react-router'

const BaseScreen = () => {
    const navigate = useNavigate(); // Correct way to use navigation

    const Monthwise = () => {
        navigate("../Monthwise");
    }
    return (
    // 
    <Box sx={{px:2}}>
        <CommonPageHeader
            navLinks={[
            
                {
                    title: 'Attendence',
                    path: '/RITeSchool/Teacher/AttendenceBaseScreen',
                },
                
            ]}
            rightActions={<>
            <Box>
                <Tooltip title={"Monthwise Attendence"} >
                <IconButton
                    sx={{
                        bgcolor: green[500],
                        color: 'white',
                        '&hover': {
                            bgcolor: green[600]
                            }

                            }} onClick={() => Monthwise()}
                        >
                        <CalendarMonth />
                    </IconButton>
                </Tooltip>
            </Box>
        </>}
        />
    </Box>
)
}

export default BaseScreen
