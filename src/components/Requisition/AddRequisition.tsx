
import AddCircleIcon from '@mui/icons-material/AddCircle';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import Save from '@mui/icons-material/Save';
import SearchTwoTone from '@mui/icons-material/SearchTwoTone';
import SendIcon from '@mui/icons-material/Send';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, Checkbox, Dialog, DialogContent, DialogTitle, Grid, IconButton, InputAdornment, TextField, Tooltip, Typography } from '@mui/material';
import { blue, green, grey } from '@mui/material/colors';
import { ClearIcon } from '@mui/x-date-pickers';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import { GetItemImageBody, ICanCreateGenralRequisitionBody, ICanSendRequisitionbody, IGetAddItemListBody, IGetItemCategoryBody, IGetNewRequisitionValidateItemQuantityBody, IGetRequisitionDetailsBody, ISaveRequisitionBody } from 'src/interfaces/Requisition/IAddRequisition';
import ErrorMessage1 from 'src/libraries/ErrorMessages/ErrorMessage1';
import AddRequisitionlist from 'src/libraries/ResuableComponents/AddRequisitionlist';
import ButtonGroupComponent from 'src/libraries/ResuableComponents/ButtonGroupComponent';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import { CDACanCreateGenralRequisition, CDACanSendRequisition, CDAGetAddItemList, CDAGetItemCategory, CDAGetItemImage, CDAGetNewRequisitionValidateItemQuantity, CDAGetRequisitionDetails, CDASaveRequisition } from 'src/requests/Requisition/RequestAddRequisition';
import { RootState } from 'src/store';
import CommonPageHeader from '../CommonPageHeader';
import DataTable from '../DataTable';
import Requisioneditlist from './Requisioneditlist';
import SuspenseLoader from 'src/layouts/components/SuspenseLoader';


const AddRequisition = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { asRequisitionId } = useParams();

    const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asUserId = Number(localStorage.getItem('UserId'));
    const [ItemCategory, setItemCategory] = useState();
    const [Itemlist, setItemlist] = useState([]);
    const [ItemlistNew, setItemlistNew] = useState([]);
    const [Text, setText] = useState(0);
    const [regNoOrName, setRegNoOrName] = useState('');
    const [ItemNewID, SetItemNewID] = useState();
    const [ItemNewID1, SetItemNewID1] = useState();
    const [textall, setTextall] = useState('');
    const [textall1, setTextall1] = useState('');
    const [Error, setError] = useState('');
    const [Error1, setError1] = useState('');
    const [Error2, setError2] = useState('');
    const [imageid, Setimageid] = useState('');
    const [AddItemlistNew, setAddItemlistNew] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [ValidateItemQuantity, setValidateItemQuantity] = useState('');
    const [ValidateSendRequisition, setValidateSendRequisition] = useState('');
    const [ErrorQuantity, setErrorQuantity] = useState('');
    const [text3, settext3] = useState();
    const [TextSearch, SetTextSearch] = useState(false)
    const [xmlString, setXmlString] = useState('');
    const [xmlString1, setXmlString1] = useState('');
    const [error, seterror] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [isSearchEmpty, setIsSearchEmpty] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const [page, setPage] = useState(1);
    const rowsPerPageOptions = [20, 50, 100, 200];
    const USGetItemCategory: any = useSelector((state: RootState) => state.SliceAddRequisition.ISGetItemCategory);
    const USGetAddItemList: any = useSelector((state: RootState) => state.SliceAddRequisition.IsGetAddItemList);
    const USSaveRequisition: any = useSelector((state: RootState) => state.SliceAddRequisition.ISSaveRequisition);
    const UsSlistGetRequisitionName: any = useSelector((state: RootState) => state.SliceAddRequisition.ISlistGetRequisitionName);
    const USGetNewRequisitionValidateItemQuantity: any = useSelector((state: RootState) => state.SliceAddRequisition.ISGetNewRequisitionValidateItemQuantity);
    const USCanCreateGenralRequisition: any = useSelector((state: RootState) => state.SliceAddRequisition.ISCanCreateGenralRequisition);
    const USCanSendRequisition: any = useSelector((state: RootState) => state.SliceAddRequisition.ISCanSendRequisition);
    const CountAddReq: any = useSelector((state: RootState) => state.SliceAddRequisition.ISCountRequisitionList);
    const USGetRequisitionDetails: any = useSelector((state: RootState) => state.SliceAddRequisition.ISGetRequisitionDetails);
    const listGetRequisitionTeacherDetails: any = useSelector((state: RootState) => state.SliceAddRequisition.ISGetRequisitionDetails1);
    const listGetRequisitionPrincipalUserId: any = useSelector((state: RootState) => state.SliceAddRequisition.ISGetRequisitionDetails2);
    const assignIs_General = listGetRequisitionPrincipalUserId.length > 0 ? listGetRequisitionPrincipalUserId[0].Is_General : null;
    const Loading: any = useSelector((state: RootState) => state.SliceAddRequisition.Loading);
    // const USGetItemImage: any = useSelector((state: RootState) => state.SliceAddRequisition.ISGetItemImage);
    // const filteredItems1 = USGetItemImage.filter(item => item.ImageUrl);
    // const result1 = filteredItems1.length > 0 ? filteredItems1[0] : null;
    // console.log(result1,"result1");
    const imageUrls: string[] = useSelector((state: RootState) => state.SliceAddRequisition.ISGetItemImage.ImageUrls);
    const itemNames = [...new Set(USSaveRequisition.map(item => item.ItemName))];

 const ItemQty = USGetRequisitionDetails.map(item => item.Text3)
  
    const GetItemCategoryBody: IGetItemCategoryBody = {
        asSchoolId: asSchoolId
    };

    const GetAddItemListBody: IGetAddItemListBody = {
        asSchoolId: asSchoolId,
        asName: regNoOrName,
        asItemCategoryId: ItemCategory,
        asStartIndex: (page - 1) * rowsPerPage,
        asEndIndex: page * rowsPerPage,
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
        asAcademicYearId: asAcademicYearId

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

    const HeaderPublish1 = [
        { Id: 1, Header: 'Status Changed by' },
        { Id: 2, Header: 'Request Status' },
        { Id: 3, Header: 'Date' },


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
                if (Item.ItemID == ItemNewID ||  asRequisitionId) {
                    sXML +=
                        '<RequisitionItems ' +
                        'ItemID="' + Item.ItemID  + '" ' +
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


    const GetRequisitionDetailsBodynew: IGetRequisitionDetailsBody = {
        asSchoolId: asSchoolId,
        asRequisitionId: Number(asRequisitionId),
        asMode: "Edit"


    };


    useEffect(() => {
        dispatch(CDAGetRequisitionDetails(GetRequisitionDetailsBodynew));
    }, [asRequisitionId]);

    const GEtSalutation = () => {
        let classStudentNames = [];
        AddItemlistNew.forEach((item) => {
            classStudentNames.push(item.ItemName);
        });
        return classStudentNames.join(', ');
    };

    const ItemName = GEtSalutation()

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
            asIsGeneral: isChecked
        };

        if (text3 == undefined || text3 == '' ) {
            setErrorQuantity(`Quantity should be greater than zero for item ${ItemName}.`);
            isError = true;
        } else setErrorQuantity('')

        if (textall === '') {
            setError('Requisition name should not be blank.');
            isError = true;
        } else setError('')

        if (textall1 === '') {
            setError1('Rquisition description should not be blank.');
            isError = true;
        } else setError1('')

        if (errorMessages.length > 0) {
            setError2(errorMessages.join("\n"));
            isError = true;
        } else setError2('')

        if (USGetNewRequisitionValidateItemQuantity.Codes != null) {
            setValidateItemQuantity(`Item quantity should not be greater than current stock for item with code : ${USGetNewRequisitionValidateItemQuantity.Codes}`);
            isError = true;
        } else setValidateItemQuantity('')



        if (!isError) {
            dispatch(CDASaveRequisition(SaveRequisitionBodyNew));
            toast.success("Requisition is saved (draft) successfully.");
            // setText(0)
            // setTextall('')
            // setTextall1('')
            // setValidateItemQuantity('')
            // seterror('')
            // setErrorQuantity('')
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
            asIsGeneral: isChecked
        };


        if (text3 == undefined || text3 == '') {
            setErrorQuantity(`Quantity should be greater than zero for item ${ItemName}.`);
            isError = true;
        } else setErrorQuantity('')

        if (textall === '') {
            setError('Requisition name should not be blank.');
            isError = true;
        } else setError('')

        if (textall1 === '') {
            setError1('Rquisition description should not be blank.');
            isError = true;
        } else setError1('')


        if (errorMessages.length > 0) {
            setError2(errorMessages.join("\n"));
            isError = true;
        } else setError2('')

        if (USGetNewRequisitionValidateItemQuantity.Codes !== null) {
            setValidateItemQuantity(`Item quantity should not be greater than current stock for item with code : ${USGetNewRequisitionValidateItemQuantity.Codes}`);
            isError = true;
        } else setValidateItemQuantity('')

        if (USCanSendRequisition == false) {
            setValidateSendRequisition("You can not send requisition since approval level is not configured or user is not available in approval designation.")
            isError = true;
        } else setValidateSendRequisition('')


        if (!isError) {
            dispatch(CDASaveRequisition(SaveRequisitionBodysend));
            toast.success("Requisition is send successfully.");
            navigate('/extended-sidebar/Teacher/Requisition')
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
            setErrorQuantity('')
        }
    };
    const clickSearch = () => {
        if (regNoOrName == '') {
            seterror('Item Code / Name should not be blank.');
            SetTextSearch(false)
        } else {
            setItemlist(USGetAddItemList);
            SetTextSearch(true)
            setIsSearchEmpty(Itemlist.length === 0);
            seterror('')
        }
    };


    useEffect(() => {
        if (regNoOrName !== '' && TextSearch == true) {
            setItemlist(USGetAddItemList);
        }
    }, [USGetAddItemList]);

    const handleRegNoOrNameChange = (value) => {
        setRegNoOrName(value);

    };

    const handleClear = () => {
        setRegNoOrName('');
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
                    <IconButton onClick={() => Setimageid((row.ItemID))} sx={{ padding: '3px 8px', margin: '0px 15px' }} >
                        <VisibilityIcon onClick={Openimage} sx={{
                            color: "#223354", display: 'flex',
                            alignItems: 'Center'
                        }} />
                    </IconButton>

                ) : <div> </div>
            )
        },

        {
            id: 'Add Item',
            label: 'Add Item',
            renderCell: row => (
                <Tooltip title="Add">
                    <IconButton onClick={() => handleClick(row.ItemID)} sx={{ padding: '3px 8px', margin: '0px 12px' }} >

                        <AddCircleIcon sx={{
                            color: "#223354", display: 'flex',
                            alignItems: 'Center'
                        }} />
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
        setErrorQuantity('')
        SetTextSearch(false)
        setIsSearchEmpty(false);

    }





    useEffect(() => {
        setItemlistNew(USSaveRequisition);
    }, [USSaveRequisition]);

    const ChangeItemQty = (event) => {
        setText(event.target.value);
    };

    const Detailschnageall = (value) => {
       
        setAddItemlistNew(value);
        settext3(value.map(item => item.Text3))

    };

    const Detailschnageall3 = (event) => {
        if (event.target.value.length <= 40) {
            setTextall(event.target.value);
        }
    }

    const Detailschnageall2 = (event) => {
        if (event.target.value.length <= 500) {
            setTextall1(event.target.value);
        }
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
    }, [ItemCategory, page, rowsPerPage, regNoOrName]);

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

    }, [ItemNewID, USGetAddItemList, errorMessage]);


    useEffect(() => {
        if (USGetRequisitionDetails != '') {
            const firstDetail = USGetRequisitionDetails[0];
            if (firstDetail) {
                setTextall(firstDetail.RequisitionName);
                setTextall1(firstDetail.RequisitionDescription);
            }
        }
    }, [USGetRequisitionDetails]);


    useEffect(() => {
        if (asRequisitionId) {
            setAddItemlistNew(USGetRequisitionDetails)
        }
    }, [asRequisitionId,USGetRequisitionDetails]);

    useEffect(() => {
        if (asRequisitionId) {
            settext3(ItemQty)
        }
    }, [asRequisitionId,USGetRequisitionDetails]);
   


    useEffect(() => {
        SetItemNewID(undefined)
    }, [ItemNewID]);

    const clickDelete = (ItemNewID) => {
        setAddItemlistNew(AddItemlistNew.filter(item => item.ItemID !== ItemNewID));
        setErrorMessage('')
        setError('')
        setError1('')
        setError2('')
        setErrorQuantity('')

    };
    const PageChange = (pageNumber) => {
        setPage(pageNumber);
    };
    const ChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(1); // Reset to the first page when changing rows per page
    };
    const startRecord = (page - 1) * rowsPerPage + 1;
    const endRecord = Math.min(page * rowsPerPage, CountAddReq.TotalCount);
    const pagecount = Math.ceil(CountAddReq.TotalCount / rowsPerPage);
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
                            disabled={Itemlist.length > 0}
                            size={"small"}
                        />

                        <TextField
                            sx={{ width: '15vw' }}
                            fullWidth
                            label={
                                <span>
                                    Item Code/Name<span style={{ color: 'red' }}>*</span>
                                </span>
                            }
                            value={regNoOrName}
                            variant={'outlined'}
                            size={"small"}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === 'Tab') {
                                    clickSearch();
                                }
                            }}
                            disabled={Itemlist.length > 0}
                            onChange={(e) => handleRegNoOrNameChange(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleClear}
                                            edge="end"
                                            disabled={Itemlist.length > 0}
                                        >
                                            <ClearIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}

                        />

                        <IconButton
                            onClick={clickSearch}

                            disabled={Itemlist.length > 0}
                            sx={{
                                background: (theme) => theme.palette.primary.main,
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: (theme) => theme.palette.primary.dark,
                                },
                                '&.Mui-disabled': {
                                    color: (theme) => theme.palette.action.disabled,
                                },
                            }}
                        >
                            <SearchTwoTone />
                        </IconButton>


                        <Tooltip title={'Here you can create, modify, view, approve, denied requisition.'}>
                            <IconButton
                                sx={{
                                    color: 'white',
                                    backgroundColor: grey[500],
                                    height: '36px !important',
                                    ':hover': { backgroundColor: grey[600] }
                                }}
                            >
                                <QuestionMarkIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={'Reset'}>
                            {Itemlist.length > 0 ?
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>

                                    <IconButton
                                        onClick={ClickRestItemLIst}
                                        sx={{
                                            color: 'white',
                                            backgroundColor: blue[500],
                                            '&:hover': {
                                                backgroundColor: blue[600]
                                            }
                                        }}
                                    >
                                        <RestartAltIcon />

                                    </IconButton>
                                </Box> : <span> </span>}
                        </Tooltip>

                        {AddItemlistNew.length > 0 ? <Tooltip title={'Save'}>
                            <IconButton
                                onClick={clicksave}
                                sx={{
                                    color: 'white',
                                    backgroundColor: green[500],
                                    height: '36px !important',
                                    ':hover': { backgroundColor: green[600] },
                                    marginLeft: '-4px',
                                }}
                            >
                                <Save />
                            </IconButton>
                        </Tooltip> : <span> </span>}
                        {AddItemlistNew.length > 0 ? <Tooltip title={'Send Requisition'}>
                            <IconButton
                                onClick={clickSend}
                                sx={{
                                    color: 'white',
                                    backgroundColor: blue[500],
                                    '&:hover': {
                                        backgroundColor: blue[600]
                                    }
                                }}
                            >
                                <SendIcon />
                            </IconButton>
                        </Tooltip> : <span> </span>}



                    </>}
            />


            <Box display="flex" alignItems="center">

                <TextField
                    sx={{
                        width: '14vw',
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

                {USCanCreateGenralRequisition == "Y" || assignIs_General == true ? <Checkbox
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                    sx={{
                        mr: 1,
                        '& .MuiSvgIcon-root': {
                            fontSize: 30,
                        },
                    }}

                /> : <span> </span>}


            </Box>
            <br />

            <ErrorMessage1 Error={Error}></ErrorMessage1>
            <ErrorMessage1 Error={Error1}></ErrorMessage1>
            <ErrorMessage1 Error={Error2}></ErrorMessage1>
            <ErrorMessage1 Error={ErrorQuantity}></ErrorMessage1>
            <ErrorMessage1 Error={errorMessage}></ErrorMessage1>
            <ErrorMessage1 Error={ValidateItemQuantity}></ErrorMessage1>
            <ErrorMessage1 Error={ValidateSendRequisition}></ErrorMessage1>
            <ErrorMessage1 Error={error}></ErrorMessage1>


            <br></br>

            {Itemlist.length > 0 ?
                <Box mb={1} sx={{ p: 2, background: 'white' }}>
                    <DataTable columns={Columns} data={Itemlist} isPagination={false} />
                    <br></br>
                    {CountAddReq.TotalCount > rowsPerPage ?
                        <ButtonGroupComponent
                            rowsPerPage={rowsPerPage}
                            ChangeRowsPerPage={ChangeRowsPerPage}
                            rowsPerPageOptions={rowsPerPageOptions}
                            PageChange={PageChange}
                            pagecount={pagecount}
                        />
                        : <span></span>

                    }

                </Box> : (
                    isSearchEmpty && (
                        <Typography
                            variant="body1"
                            sx={{
                                textAlign: 'center',
                                marginTop: 4,
                                backgroundColor: '#324b84',
                                padding: 1,
                                borderRadius: 2,
                                color: 'white',
                            }}
                        >
                            <b>No record found.</b>
                        </Typography>
                    ))}



            {AddItemlistNew.length > 0 ?
                <Box mb={1} sx={{ p: 2, background: 'white' }}>
                   {Loading &&
                        <SuspenseLoader />
                    }
                    <AddRequisitionlist
                        ItemList={AddItemlistNew}
                        HeaderArray={HeaderPublish}
                        clickDelete={clickDelete}
                        onTextChange2={Detailschnageall}
                    />


                    <br></br>
                    <Grid item xs={12}>
                        <TextField
                            label={
                                <span>
                                    Requisition Name <span style={{ color: 'red' }}>*</span>
                                </span>
                            }
                            multiline
                            rows={3}
                            value={textall}
                            onChange={Detailschnageall3}
                            fullWidth
                        />
                    </Grid>
                    <br></br>
                    <Grid item xs={12}>
                        <TextField
                            label={
                                <span>
                                    Requisition Description <span style={{ color: 'red' }}>*</span>
                                </span>
                            }
                            multiline
                            rows={3}
                            value={textall1}
                            onChange={Detailschnageall2}
                            fullWidth
                        />
                    </Grid>
                </Box> : null}


            {listGetRequisitionTeacherDetails != '' ?
                <Box mb={1} sx={{ p: 2, background: 'white' }}>
                    <Requisioneditlist
                        ItemList={listGetRequisitionTeacherDetails}
                        HeaderArray={HeaderPublish1}

                    />
                </Box>
                : <span></span>

            }





            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, minHeight: 'auto', minWidth: '300px' }}>
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
