import { Box, IconButton, Tooltip } from '@mui/material';
import { grey } from '@mui/material/colors';
const Actions = ({ Icon = undefined, ClickIcon = undefined, title = undefined,
    handleMouseEnter = undefined, handleMouseLeave = undefined,
    IconType = undefined, DiplayText = undefined }) => {
    return (
        // <Tooltip title={title}
        //     onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        //     <IconButton onClick={ClickIcon}>
        //         {IconType == "Label" ?
        //             <IconButton sx={{ mt: -1, pr: 1 }} >
        //                 <Box sx={{
        //                     display: 'flex',
        //                     alignItems: 'center',
        //                     justifyContent: 'center',
        //                     width: '30px',      // Circle diameter
        //                     height: '30px',     // Circle diameter
        //                     borderRadius: '50%', // Makes the Box a circle
        //                     backgroundColor: '#38548A', // Secondary background color
        //                     color: 'white',      // Text color
        //                     fontSize: '0.8rem',
        //                 }}> <b>{DiplayText}</b></Box>
        //             </IconButton> :
        //             <Icon sx={{
        //                 color: '#38548A', borderRadius: '7px',
        //                 mt: '4px', cursor: 'pointer',
        //                 '&:hover': { backgroundColor: grey[600] }
        //             }} />

        //         }
        //     </IconButton>
        // </Tooltip>
        <Tooltip title={title}
            onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <Box onClick={ClickIcon}>
              {IconType == "Label" ?
        <IconButton>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '30px',      // Circle diameter
                height: '30px',     // Circle diameter
                borderRadius: '50%', // Makes the Box a circle
                backgroundColor: '#38548A', // Secondary background color
                color: 'white',      // Text color
                fontSize: '0.8rem',
            }}> <b>{DiplayText}</b></Box>
        </IconButton>:
                    <Icon sx={{
                        color: '#38548A', borderRadius: '7px',
                        mt: '4px', cursor: 'pointer',
                        '&:hover': { backgroundColor: grey[600] }
                    }} />
                }
        </Box>
        </Tooltip>
    )
}

export default Actions