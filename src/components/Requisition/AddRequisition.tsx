import DeleteIcon from '@mui/icons-material/Delete';
import Save from '@mui/icons-material/Save';
import SearchTwoTone from '@mui/icons-material/SearchTwoTone';
import SendIcon from '@mui/icons-material/Send';
import { Box, IconButton, TextField, Tooltip, Typography } from '@mui/material';
import { green } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import DynamicList2 from 'src/libraries/list/DynamicList2';
import { RootState } from 'src/store';
import CommonPageHeader from '../CommonPageHeader';
import { CDAGetItemCategory } from 'src/requests/Requisition/RequestAddRequisition';
import { IGetItemCategoryBody } from 'src/interfaces/Requisition/IAddRequisition';

const AddRequisition = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asUserId = Number(localStorage.getItem('UserId'));
    const [ItemCategory, setItemCategory] = useState();

    const HeaderList = [
        'Item Code',
        'Item Name',
        'Current Stock',
        'Item Quantity',
        'Delete',
    ];
    const IconList = [
        {
            Id: 2,
            Icon: <DeleteIcon />,
            Action: 'Delete'
        },
    ];

    const Requision = useSelector(
        (state: RootState) => state.SliceRequisition.Requisition
    );
    console.log(Requision, 'StatusRequisition');


    const USGetItemCategory :any = useSelector(
        (state: RootState) => state.SliceAddRequisition.ISGetItemCategory
    );
    

    const GetItemCategoryBody: IGetItemCategoryBody = {
        asSchoolId: asSchoolId
      };

      
    useEffect(() => {
        dispatch(CDAGetItemCategory(GetItemCategoryBody));
    }, []);
    
    const ItemCategoryDropdown = (value) => {
        setItemCategory(value);
    };
    const ClickItem = (value) => { };


    const onClickBack = () => {
        navigate('/extended-sidebar/Teacher/ExamResultBase');
    };
   
   
   

  

    return (
        <Box sx={{ px: 2 }}>
            <CommonPageHeader
                navLinks={[
                    { title: 'Requisition', path: '/extended-sidebar/Teacher/Requisition' },
                    { title: 'Requisition Details', path: '/extended-sidebar/Teacher/AddRequisition' }
                ]}
                rightActions={<>

                    <SearchableDropdown
                        sx={{ minWidth: '250px' }}
                        ItemList={USGetItemCategory}
                        onChange={ItemCategoryDropdown}
                        label={'Category'}
                        defaultValue={ItemCategory} 
                        mandatory
                        size={"small"}
                    />
                    {/* <TextField
                        sx={{ minWidth: '250px' }}
                        fullWidth
                        label="Item Code/Name"
                        value={regNoOrName}
                        variant={'outlined'}
                        size={"small"}
                        onChange={(e) => {
                            handleRegNoOrNameChange(e.target.value);
                        }}
                    /> */}
                    <IconButton
                      
                        // disabled={selectClasstecaher === '0'}
                        sx={{
                            background: (theme) => theme.palette.primary.main,
                            color: 'white',
                            '&:hover': {
                                backgroundColor: (theme) => theme.palette.primary.dark
                            }
                        }}
                    >
                        <SearchTwoTone />
                    </IconButton>
                    <Tooltip title={'Save'}>
                        <IconButton
                            sx={{
                                background: green[500],
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: green[600]
                                }
                            }}
                        >
                            <Save />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title={'send Requisition'}>
                        <IconButton
                            onClick={onClickBack}
                            sx={{
                                background: green[500],
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: green[600]
                                }
                            }}
                        >
                            <SendIcon />
                        </IconButton>
                    </Tooltip>

                </>}
            />
            <Box mb={1} sx={{ p: 2, background: 'white' }}>
                
            </Box>
        </Box>
    );
};
export default AddRequisition;
