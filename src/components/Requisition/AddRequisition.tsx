import AddCircleIcon from '@mui/icons-material/AddCircle';
import Save from '@mui/icons-material/Save';
import SearchTwoTone from '@mui/icons-material/SearchTwoTone';
import SendIcon from '@mui/icons-material/Send';
import { Box, IconButton, TextField, Tooltip } from '@mui/material';
import { green } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { IGetAddItemListBody, IGetItemCategoryBody } from 'src/interfaces/Requisition/IAddRequisition';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import { CDAGetAddItemList, CDAGetItemCategory } from 'src/requests/Requisition/RequestAddRequisition';
import { RootState } from 'src/store';
import CommonPageHeader from '../CommonPageHeader';
import DataTable from '../DataTable';
const AddRequisition = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asUserId = Number(localStorage.getItem('UserId'));
    const [ItemCategory, setItemCategory] = useState();
    const [Itemlist, setItemlist] = useState([]);
    const [regNoOrName, setRegNoOrName] = useState('');
    const [PagedRequisition, setPagedRequisition] = useState([]);

    const USGetItemCategory: any = useSelector((state: RootState) => state.SliceAddRequisition.ISGetItemCategory);
    const USGetAddItemList: any = useSelector((state: RootState) => state.SliceAddRequisition.IsGetAddItemList);
    console.log(USGetAddItemList, "USGetAddItemList");

    const GetItemCategoryBody: IGetItemCategoryBody = {
        asSchoolId: asSchoolId
    };

    const GetAddItemListBody: IGetAddItemListBody = {
        asSchoolId: 18,
        asName: regNoOrName,
        asItemCategoryId: ItemCategory,
        asStartIndex: 1,
        asEndIndex: 100,
        asSortExp: "ORDER BY ItemName"
    };

    const clickSearch = () => {
        if (regNoOrName === '') {
            setItemlist(USGetAddItemList);
        } else {
            setItemlist(
                USGetAddItemList.filter((item) => {
                    const text1Match = item.ItemCode.toLowerCase().includes(
                        regNoOrName.toLowerCase()
                    );
                    const text2Match = item.ItemName.toLowerCase().includes(
                        regNoOrName.toLowerCase()
                    );
                    return text1Match || text2Match;
                })
            );
        }
    };
    const handleRegNoOrNameChange = (value) => {
        setRegNoOrName(value);
    };


    const Columns = [
        {
            id: 'itemCode',
            label: 'Item Code',
            selector: row => row.ItemCode,
            renderCell: row => row.ItemCode
        },
        {
            id: 'itemName',
            label: 'Item Name',
            selector: row => row.ItemName,
            renderCell: row => row.ItemName
        },
        {
            id: 'currentStock',
            label: 'Current Stock',
            selector: row => row.CurrentStock,
            renderCell: row => row.CurrentStock
        },
        {
            id: 'category',
            label: 'Category',
            selector: row => row.ItemCategoryName,
            renderCell: row => row.ItemCategoryName
        },
        {
            id: 'Add Item',
            label: 'Add Item',
            renderCell: row => (
                <IconButton onClick={() => (row.ItemID)}>
                    <AddCircleIcon />
                </IconButton>
            )
        }


    ];

    const ItemCategoryDropdown = (value) => {
        setItemCategory(value);
    };

    const onClickBack = () => {
        navigate('/extended-sidebar/Teacher/ExamResultBase');
    };

    useEffect(() => {
        if (USGetItemCategory.length > 0) {
            setItemCategory(USGetItemCategory[0].Value);
        }
    }, [USGetItemCategory]);

    useEffect(() => {
        setItemlist(USGetAddItemList);
    }, [USGetAddItemList]);

    useEffect(() => {
        dispatch(CDAGetItemCategory(GetItemCategoryBody));
    }, []);

    useEffect(() => {
        dispatch(CDAGetAddItemList(GetAddItemListBody));
    }, []);

   

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

                    <TextField
                        sx={{ width: '15vw' }}
                        fullWidth
                        label={
                            <span>
                                Item Code/Name <span style={{ color: 'red' }}>*</span>
                            </span>
                        }
                        value={regNoOrName}
                        variant={'outlined'}
                        size={"small"}
                        onChange={(e) => {
                            handleRegNoOrNameChange(e.target.value);
                        }}
                    />


                    <IconButton
                        onClick={clickSearch}
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

                    <Tooltip title={'Send Requisition'}>
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
                <DataTable columns={Columns} data={Itemlist} isPagination />
            </Box>
        </Box>
    );
};

export default AddRequisition;
