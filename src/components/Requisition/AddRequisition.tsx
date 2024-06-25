
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import Save from '@mui/icons-material/Save';
import SearchTwoTone from '@mui/icons-material/SearchTwoTone';
import SendIcon from '@mui/icons-material/Send';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, Checkbox, Dialog, DialogContent, DialogTitle, Grid, IconButton, TextField, Tooltip, Typography } from '@mui/material';
import { green, red } from '@mui/material/colors';
import { ClearIcon } from '@mui/x-date-pickers';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { GetItemImageBody, ICanCreateGenralRequisitionBody, IGetAddItemListBody, IGetItemCategoryBody, IGetNewRequisitionValidateItemQuantityBody, ISaveRequisitionBody, ICanSendRequisitionbody } from 'src/interfaces/Requisition/IAddRequisition';
import ErrorMessage1 from 'src/libraries/ErrorMessages/ErrorMessage1';
import AddRequisitionlist from 'src/libraries/ResuableComponents/AddRequisitionlist';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import { CDACanCreateGenralRequisition, CDAGetAddItemList, CDAGetItemCategory, CDAGetItemImage, CDAGetNewRequisitionValidateItemQuantity, CDASaveRequisition , CDACanSendRequisition} from 'src/requests/Requisition/RequestAddRequisition';
import { RootState } from 'src/store';
import CommonPageHeader from '../CommonPageHeader';
import DataTable from '../DataTable';

const AddRequisition = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asUserId = Number(localStorage.getItem('UserId'));
    const [ItemCategory, setItemCategory] = useState();
    const [Itemlist, setItemlist] = useState([]);
    const [ItemlistNew, setItemlistNew] = useState([]);
    const [Text, setText] = useState(0);
    const [regNoOrName, setRegNoOrName] = useState('');
    const [ItemNewID, SetItemNewID] = useState();
    const [textall, setTextall] = useState('');
    const [textall1, setTextall1] = useState('');
    const [Error, setError] = useState('');
    const [Error1, setError1] = useState('');
    const [Error2, setError2] = useState('');
    const [imageid, Setimageid] = useState('');
    const [AddItemlistNew, setAddItemlistNew] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [ValidateItemQuantity, setValidateItemQuantity] = useState('');
    const [xmlString, setXmlString] = useState('');
    const [xmlString1, setXmlString1] = useState('');

    const [isChecked, setIsChecked] = useState(false);

    const USGetItemCategory: any = useSelector((state: RootState) => state.SliceAddRequisition.ISGetItemCategory);
    const USGetAddItemList: any = useSelector((state: RootState) => state.SliceAddRequisition.IsGetAddItemList);
    const USSaveRequisition: any = useSelector((state: RootState) => state.SliceAddRequisition.ISSaveRequisition);
    const UsSlistGetRequisitionName: any = useSelector((state: RootState) => state.SliceAddRequisition.ISlistGetRequisitionName);
    const USGetNewRequisitionValidateItemQuantity: any = useSelector((state: RootState) => state.SliceAddRequisition.ISGetNewRequisitionValidateItemQuantity);
    const USCanCreateGenralRequisition: any = useSelector((state: RootState) => state.SliceAddRequisition.ISCanCreateGenralRequisition);
    const USCanSendRequisition: any = useSelector((state: RootState) => state.SliceAddRequisition.ISCanSendRequisition);

    console.log(USCanCreateGenralRequisition, "USCanCreateGenralRequisition",USCanSendRequisition);


    // const USGetItemImage: any = useSelector((state: RootState) => state.SliceAddRequisition.ISGetItemImage);
    // const filteredItems1 = USGetItemImage.filter(item => item.ImageUrl);
    // const result1 = filteredItems1.length > 0 ? filteredItems1[0] : null;
    // console.log(result1,"result1");
    const imageUrls: string[] = useSelector((state: RootState) => state.SliceAddRequisition.ISGetItemImage.ImageUrls);
    const itemNames = [...new Set(USSaveRequisition.map(item => item.ItemName))];



    const GetItemCategoryBody: IGetItemCategoryBody = {
        asSchoolId: asSchoolId
    };

    const GetAddItemListBody: IGetAddItemListBody = {
        asSchoolId: asSchoolId,
        asName: regNoOrName,
        asStartIndex: 1,
        asEndIndex: 100,
        asSortExp: "ORDER BY ItemName"
    };

    const GetImageBody: GetItemImageBody = {
        asSchoolId: asSchoolId,
        asItemId: Number(imageid)

    };

    const CanCreateGenralRequisitionBody: ICanCreateGenralRequisitionBody = {
        asSchoolId: asSchoolId,
        asUserId: asUserId

    };

    const CanSendRequisitionbody: ICanSendRequisitionbody = {
        asSchoolId: asSchoolId,
        asUserId: asUserId,
        asAcademicYearId:asAcademicYearId

    };


    const HeaderPublish = [
        { Id: 1, Header: 'Item Code' },
        { Id: 2, Header: 'Item Name' },
        { Id: 3, Header: 'Current Stock' },
        { Id: 4, Header: 'Item Quantity' },
        // { Id: 5, Header: 'Issued Qty' },
        // { Id: 6, Header: 'Returned Qty' },
        // { Id: 7, Header: 'Cancelled Qty' },
        { Id: 8, Header: 'Delete' },

    ];


    // const getXML = () => {
    //     let sXML = '<RequisitionItems>';
    //     AddItemlistNew.map((Item) => {
    //         if( Item.ItemID ==  ItemNewID) {
    //             sXML +=
    //                 '<RequisitionItems ' +
    //                 'ItemID="' + Item.ItemID + '" ' +
    //                 'UOM="0" ' +
    //                 'ItemQty=" ' + Item.Text3 + ' " ' +
    //                 'ItemOrgQty=" '+ Item.Text3 + ' " />';
    //         }
    //     });
    //     return sXML;
    // };



    useEffect(() => {
        const getXML = () => {
            let sXML = '<RequisitionItems>';
            AddItemlistNew.map((Item) => {
                if (Item.ItemID == ItemNewID) {
                    sXML +=
                        '<RequisitionItems ' +
                        'ItemID="' + Item.ItemID + '" ' +
                        'UOM="0" ' +
                        'ItemQty=" ' + Item.Text3 + ' " ' +
                        'ItemOrgQty=" ' + Item.Text3 + ' " />';
                       '</RequisitionItems>' 
                }
            });

            sXML = sXML + '</RequisitionItems>';
            return sXML;
        };
        const xml = getXML();
        setXmlString1(xml);

    }, [AddItemlistNew]);

    useEffect(() => {
        const getXML1 = () => {
            let sXML =
                '<ArrayOfRequisitionData xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">';
            AddItemlistNew.map((Item) => {
                sXML =
                    sXML +
                    '<RequisitionData>' +
                    '<ItemId>' + Item.ItemID + '</ItemId>' +
                    '<Quantity>' + Item.Text3 + '</Quantity>' +
                    '</RequisitionData>';
            });
            sXML = sXML + '</ArrayOfRequisitionData>';
            return sXML;
        };
        const xml = getXML1();
        setXmlString(xml);

    }, [AddItemlistNew]);

    const GetNewRequisitionValidateItemQuantityBody: IGetNewRequisitionValidateItemQuantityBody = {
        asSchoolId: asSchoolId,
        asQuantityDetailsXML: xmlString


    };

    const clicksave = () => {
        let isError = false;
        let errorMessages = [];

        const SaveRequisitionBodyNew: ISaveRequisitionBody = {
            asSchoolId: asSchoolId,
            asRequisitionId: 0,
            asUserId: asUserId,
            asRequisitionName: textall,
            asRequisitionDesc: textall1,
            asAction: "save",
            asRequisitionItemDetailsXml: xmlString1,
            asIsGeneral:isChecked
        };

        if (textall === '') {
            setError('Requisition Name should not be blank.');
            isError = true;
        }

        if (textall1 === '') {
            setError1('Requisition Description should not be blank.');
            isError = true;
        }


        USSaveRequisition.forEach(item => {
            if (Text == 0) {
                errorMessages.push(`Quantity should be greater than zero for item ${item.ItemName}.`);
            }
        });

        if (errorMessages.length > 0) {
            setError2(errorMessages.join("\n"));
            isError = true;
        }

        if (USGetNewRequisitionValidateItemQuantity.Codes != null) {
            setValidateItemQuantity(`Item quantity should not be greater than current stock for item with code : ${USGetNewRequisitionValidateItemQuantity.Codes}`);
            isError = true;
        }



        if (!isError) {
            dispatch(CDASaveRequisition(SaveRequisitionBodyNew));
            toast.success("Requisition is saved (draft) successfully!!!");
            setText(0)
            setTextall('')
            setTextall1('')
            setValidateItemQuantity('')
        }
    };



    const clickSend = () => {
        let isError = false;
        let errorMessages = [];
        const SaveRequisitionBodysend: ISaveRequisitionBody = {
            asSchoolId: asSchoolId,
            asRequisitionId: 0,
            asUserId: asUserId,
            asRequisitionName: textall,
            asRequisitionDesc: textall1,
            asAction: "send",
            asRequisitionItemDetailsXml: xmlString1,
            asIsGeneral:isChecked
        };

        if (textall === '') {
            setError('Requisition Name should not be blank.');
            isError = true;
        }

        if (textall1 === '') {
            setError1('Requisition Description should not be blank.');
            isError = true;
        }

        USSaveRequisition.forEach(item => {
            if (Text == 0) {
                errorMessages.push(`Quantity should be greater than zero for item ${item.ItemName}.`);
            }
        });

        if (errorMessages.length > 0) {
            setError2(errorMessages.join("\n"));
            isError = true;
        }

        if (USGetNewRequisitionValidateItemQuantity.Codes !== null) {
            setValidateItemQuantity(`Item quantity should not be greater than current stock for item with code : ${USGetNewRequisitionValidateItemQuantity.Codes}`);
            isError = true;
        }

        if (USCanSendRequisition == false) {
            isError = true;
        }


        if (!isError) {
            dispatch(CDASaveRequisition(SaveRequisitionBodysend));
            toast.success("Requisition is send successfully!!!");
            navigate('/extended-sidebar/Teacher/Requisition')
            setText(0)
            setTextall('')
            setTextall1('')
            setValidateItemQuantity('')
        }
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


    const [open1, setOpen1] = useState(false);

    const Openimage = () => {
        setOpen1(true);
    };

    const handleClose = () => {
        setOpen1(false);
    };

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    };
    const handleClick = (itemID) => {
        SetItemNewID(itemID);
        setErrorMessage('');
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
            id: 'ImageCount',
            label: 'Item Image',
            selector: row => row.ImageCount,
            renderCell: row => (
                row.ImageCount > 0 ? (
                    <IconButton onClick={() => Setimageid((row.ItemID))} >
                        <VisibilityIcon onClick={Openimage} />
                    </IconButton>

                ) : <div> </div>
            )
        },

        {
            id: 'Add Item',
            label: 'Add Item',
            renderCell: row => (
                <Tooltip title="Add">
                    <IconButton onClick={() => handleClick(row.ItemID)}>
                        <AddCircleIcon sx={{ color: "#29b6f6" }} />
                    </IconButton>
                </Tooltip>
            )
        }
    ];




    const ItemCategoryDropdown = (value) => {
        setItemCategory(value);
    };

    const ClickRestItemLIst = () => {
        setItemlist([]);
        setAddItemlistNew([]);
        setError('')
        setError1('')
        setError2('')
        setText(0)
        setTextall('')
        setTextall1('')
        setErrorMessage('')
        setValidateItemQuantity('')

    }






    useEffect(() => {
        setItemlistNew(USSaveRequisition);
    }, [USSaveRequisition]);

    const ChangeItemQty = (event) => {
        setText(event.target.value);
    };

    const Detailschnageall = (value) => {
        setAddItemlistNew(value)
    }

    const Detailschnageall3 = (event) => {
        setTextall(event.target.value)
    }

    const Detailschnageall2 = (event) => {
        setTextall1(event.target.value)
    }

    const onClickBack = () => {
        navigate('/extended-sidebar/Teacher/ExamResultBase');
    };

    useEffect(() => {
        if (USGetItemCategory.length > 0) {
            setItemCategory(USGetItemCategory[0].Value);
        }
    }, [USGetItemCategory]);

    useEffect(() => {
        dispatch(CDAGetItemCategory(GetItemCategoryBody));
    }, []);

    useEffect(() => {
        dispatch(CDAGetNewRequisitionValidateItemQuantity(GetNewRequisitionValidateItemQuantityBody));
    }, [xmlString]);

    useEffect(() => {
        dispatch(CDACanCreateGenralRequisition(CanCreateGenralRequisitionBody));
    }, []);

    useEffect(() => {
        dispatch(CDACanSendRequisition(CanSendRequisitionbody));
    }, []);

    

    useEffect(() => {
        dispatch(CDAGetAddItemList(GetAddItemListBody));
    }, []);

    useEffect(() => {
        dispatch(CDAGetItemImage(GetImageBody));
    }, [imageid]);




    useEffect(() => {
        if (ItemNewID) {
            const newItem = USGetAddItemList.find(item => item.ItemID === ItemNewID);
            if (newItem) {
                setAddItemlistNew(prevList => {
                    if (!prevList.some(item => item.ItemID === newItem.ItemID)) {
                        return [...prevList, newItem];
                    } else {
                        setErrorMessage(`Item already exists.`);
                        return prevList;
                    }
                });

            }
        }

    }, [ItemNewID]);


    const clickDelete = (ItemNewID) => {
        setAddItemlistNew(AddItemlistNew.filter(item => item.ItemID !== ItemNewID));
        setErrorMessage('')
    };


    return (
        <Box sx={{ px: 2 }}>

            <CommonPageHeader
                navLinks={[
                    { title: 'Requisition', path: '/extended-sidebar/Teacher/Requisition' },
                    { title: 'Requisition Details', path: '/extended-sidebar/Teacher/AddRequisition' }
                ]}

                rightActions={
                    <>
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
                            disabled={Itemlist.length > 0}
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
                                onClick={clicksave}
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
                                onClick={clickSend}
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
                        <Tooltip title={'Change Input'}>
                            {Itemlist.length > 0 ?
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>

                                    <IconButton
                                        onClick={ClickRestItemLIst}
                                        sx={{
                                            background: green[500],
                                            color: 'white',
                                            '&:hover': {
                                                backgroundColor: green[600]
                                            }
                                        }}
                                    >
                                        <ChangeCircleIcon />
                                    </IconButton>
                                </Box> : <span> </span>}
                        </Tooltip>
                    </>}
            />
            <Box display="flex" alignItems="center">

                <TextField
                    sx={{
                        width: '12vw',
                        '& .MuiInputBase-root': {
                            height: '35px',
                            color: 'black', 
                        },
                        '& .MuiInputLabel-root': {
                            top: '-6px',
                            color: 'black', 
                        },
                    }}
                    label="Is General Requisition ? :"
                    disabled
                />

                {USCanCreateGenralRequisition == "N" ? <span> </span> : <Checkbox
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                    sx={{
                        mr: 1,
                        '& .MuiSvgIcon-root': {
                            fontSize: 30,
                        },
                    }}

                />}


            </Box>
            {Error !== '' ?
                <Box mb={1} sx={{ p: 2, background: 'white' }}>

                    <ErrorMessage1 Error={Error}></ErrorMessage1>
                    <ErrorMessage1 Error={Error1}></ErrorMessage1>
                    <ErrorMessage1 Error={Error2}></ErrorMessage1>




                </Box>



                : null}
            <ErrorMessage1 Error={errorMessage}></ErrorMessage1>
            <ErrorMessage1 Error={ValidateItemQuantity}></ErrorMessage1>


            <br></br>

            {Itemlist.length > 0 ?
                <Box mb={1} sx={{ p: 2, background: 'white' }}>
                    <DataTable columns={Columns} data={Itemlist} isPagination />
                </Box> : null}
            {Itemlist.length > 0 && AddItemlistNew.length > 0 ?
                <Box mb={1} sx={{ p: 2, background: 'white' }}>

                    <AddRequisitionlist
                        ItemList={AddItemlistNew}
                        HeaderArray={HeaderPublish}
                        clickDelete={clickDelete}
                        onTextChange2={Detailschnageall}
                    />
                    <br></br>
                    <Grid item xs={3}>
                        <Typography variant="h4" sx={{ mb: 1 }}>
                            Requisition Name:  <Typography component="span" sx={{ color: red[500] }}>*</Typography>
                        </Typography>
                        <TextField
                            multiline
                            rows={3}
                            type="text"
                            value={textall}
                            onChange={Detailschnageall3}
                            sx={{ width: '70%' }}
                        />
                        <br></br>  <br></br>
                        <Typography variant="h4" sx={{ mb: 1 }}>
                            Requisition Description:  <Typography component="span" sx={{ color: red[500] }}>*</Typography>
                        </Typography>
                        <TextField
                            multiline
                            rows={3}
                            type="text"
                            value={textall1}
                            onChange={Detailschnageall2}
                            sx={{ width: '70%' }}
                        />

                    </Grid>
                </Box> : null}


            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, minHeight: '400px', minWidth: '300px' }}>
                <Dialog open={open1} onClose={handleClose} scroll="body" >
                    <Box sx={{ backgroundColor: "#ede7f6" }}>
                        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            Item Images
                            <ClearIcon onClick={handleClose} sx={{ color: 'red' }} />
                        </DialogTitle>
                    </Box>

                    <DialogContent>
                        {imageUrls.map((url, index) => (
                            <img key={index} src={url} alt={`Item ${index + 1}`} />
                        ))}
                    </DialogContent>
                </Dialog>
            </Box>

        </Box>

    );
};

export default AddRequisition;
