import Print from '@mui/icons-material/Print'
import QuestionMark from '@mui/icons-material/QuestionMark'
import Search from '@mui/icons-material/Search'
import { Box, IconButton, Tooltip } from '@mui/material'
import { grey } from '@mui/material/colors'
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown'
import Dropdown from 'src/libraries/dropdown/Dropdown'
import CommonPageHeader from '../CommonPageHeader'

type Props = {}

const ViewResultAll = (props: Props) => {
    return (
        <Box px={2}>
            <CommonPageHeader
                navLinks={[
                    {
                        title: 'Final Result',
                        path: '/extended-sidebar/Teacher/FinalResult'
                    },
                    {
                        title: 'View Result All',
                        path: ''
                    }
                ]}
                rightActions={<>
                    <Box>
                        <SearchableDropdown
                            onChange={(value) => {

                            }}
                            ItemList={[]}
                            size='small'
                            sx={{ width: '250px' }}
                            label='Class Teacher'
                        />
                    </Box>
                    <Box>
                        <Dropdown
                            Array={[]}
                            handleChange={(value) => { }}
                            size='small'
                            variant='outlined'
                            width={'250px'}
                            label={"Student"}
                        />
                    </Box>
                    <Box>
                        <Tooltip title={"View result of all/selected student."}>
                            <IconButton
                                sx={{
                                    color: 'white',
                                    backgroundColor: grey[500],
                                    '&:hover': {
                                        backgroundColor: grey[600]
                                    }
                                }}
                            >
                                <QuestionMark />
                            </IconButton>
                        </Tooltip>
                    </Box>
                    <Box>
                        <Tooltip title={"Search"}>
                            <IconButton
                                sx={{
                                    color: 'white',
                                    backgroundColor: grey[500],
                                    '&:hover': {
                                        backgroundColor: grey[600]
                                    }
                                }}
                            >
                                <Search />
                            </IconButton>
                        </Tooltip>
                    </Box>
                    <Box>
                        <Tooltip title={"Print Preview"}>
                            <IconButton
                                sx={{
                                    color: 'white',
                                    backgroundColor: grey[500],
                                    '&:hover': {
                                        backgroundColor: grey[600]
                                    }
                                }}
                            >
                                <Print />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </>}
            />
            <Box sx={{ p: 2, background: 'white' }}>

            </Box>
        </Box>
    )
}

export default ViewResultAll