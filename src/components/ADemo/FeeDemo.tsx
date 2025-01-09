import { QuestionMark } from '@mui/icons-material';
import { Box, IconButton, Tooltip } from '@mui/material';
import SearchableDropdown1 from 'src/libraries/ResuableComponents/SearchableDropdown1';
import CommonPageHeader from '../CommonPageHeader';

const FeeDemo = () => {
    return (
        <Box px={2}>
            <CommonPageHeader
                navLinks={[
                    {
                        title: 'fee',
                        path: ''
                    }
                ]}
                rightActions={
                    <>
                        <SearchableDropdown1 size={"small"} ItemList={[]}
                            sx={{ minWidth: '12vw' }}
                            defaultValue={undefined} label={'Class'}
                            onChange={(value: any) => { undefined }} />

                        <Box>
                            <Tooltip title={`Student's list from your class. Click on "Edit" button to change details of individual student.`}>
                                <IconButton sx={{
                                    bgcolor: 'grey.500',
                                    color: 'white',
                                    '&:hover': {
                                        bgcolor: 'grey.600'
                                    }
                                }}>
                                    <QuestionMark />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </>
                }
            />


        </Box>
    )
}

export default FeeDemo;
