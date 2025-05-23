import { QuestionMark } from "@mui/icons-material";
import AddIcon from '@mui/icons-material/Add';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import { Box, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import { blue, green } from "@mui/material/colors";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import CommonPageHeader from "src/components/CommonPageHeader";
import { AlertContext } from 'src/contexts/AlertContext';
import { ICheckIfPersonalAddressExistsBody, ICheckIfPersonalAddressGroupAlreadyExistsBody, IDeletePersonalAddressBookBody, IDeletePersonalAddressBookGroupBody, IGetAddressBookGroupDetailsBody, IGetAddressBookGroupListBody, IGetAddressBookListBody, IGetDetailsOfGroupsBody, IInsertPersonalAddressBookBody, IInsertPersonalAddressBookGroupBody, IUpdatePersonalAddressBookBody, IUpdatePersonalAddressBookGroupBody } from "src/interfaces/SentSms/Sentsms";
import SuspenseLoader from "src/layouts/components/SuspenseLoader";
import RadioButton1 from "src/libraries/RadioButton/RadioButton1";
import { CDAGetAddressBookGroupDetails, CDAGetAddressBookGroupList, CDAGetCheckIfPersonalAddressExists, CDAGetCheckIfPersonalAddressGroupAlreadyExists, CDAGetClearAddPersonalAddBookMsg, CDAGetClearDeletePersonalAddressBookGroupMsg, CDAGetClearDeletePersonalAddressBookMsg, CDAGetClearInsertPersonalAddressBookGroupMsg, CDAGetClearIsPersonalAddressExists, CDAGetClearIsPersonalAddressGroupAlreadyExists, CDAGetClearUpdatePersonalAddressBookGroupMsg, CDAGetDeletePersonalAddressBook, CDAGetDeletePersonalAddressBookGroup, CDAGetGetDetailsOfGroups, CDAGetPersonalAddressBookList } from "src/requests/SentSms/ReqSentsms";
import AddPersonalContact from "./AddPersonalContact";
import AddPersonalContactGroup from "./AddPersonalContactGroup";
import GroupPhoneBookList from "./GroupPhoneBookList";
import PhoneBookList from "./PhoneBookList";

interface PersonalAddressBookProps {
    PersonalAddressBookId: string
    User_Id: string
    Name: string
    Mobile_No: string
    Is_Deleted: string
    Insert_Date: string
    Inserted_By_id: string
    Update_Date: string
    Updated_By_Id: string
    IsActive: boolean;
}
interface PersonalAddressBookGroupProps {
    PersonalAddressBookGroupId: string
    User_Id: string
    Name: string
    Is_Deleted: string
    IsActive: boolean
}

const PersonalAddressBook = () => {
    const dispatch = useDispatch();
    const currentDate = new Date();
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;
    const { showAlert, closeAlert } = useContext(AlertContext);
    const formattedDate = currentDate.toISOString().split('T')[0] + " " + currentDate.toLocaleTimeString('en-US', { hour12: true });
    const schoolId = localStorage.getItem('SchoolId');
    const userId = sessionStorage.getItem('Id');
    const personalAddressbookList: any = useSelector((state: any) => state.SentSms.ISPersonalAddressBookList);
    const isPersonalContactExists: any = useSelector((state: any) => state.SentSms.ISCheckIfPersonalAddressExists);
    const AddPersonalAddBookMsg: any = useSelector((state: any) => state.SentSms.ISAddPersonalAddBookMsg);
    const DeletePersonalAddressBookMsg: any = useSelector((state: any) => state.SentSms.ISDeletePersonalAddressBookMsg);
    const GetAddressBookGroupList: any = useSelector((state: any) => state.SentSms.ISGetAddressBookGroupList);
    const GetAddressBookGroupDetails: any = useSelector((state: any) => state.SentSms.ISGetAddressBookGroupDetails);
    const ISUpdatePersonalAddressBookGroupMsg: any = useSelector((state: any) => state.SentSms.ISUpdatePersonalAddressBookGroupMsg);
    const CheckIfPersonalAddressGroupAlreadyExists: any = useSelector((state: any) => state.SentSms.ISCheckIfPersonalAddressGroupAlreadyExists);
    const InsertPersonalAddressBookGroupMsg: any = useSelector((state: any) => state.SentSms.ISInsertPersonalAddressBookGroupMsg);
    const DeletePersonalAddressBookGroupMsg: any = useSelector((state: any) => state.SentSms.ISDeletePersonalAddressBookGroupMsg);
    const GetDetailsOfGroups: any = useSelector((state: any) => state.SentSms.ISGetDetailsOfGroups);
    const isLoading: any = useSelector((state: any) => state.SentSms.Loading);
    const RadioListCT = [
        { Value: '1', Name: 'Individual Details' },
        { Value: '2', Name: 'Group Details' }
    ];
    const [RadioValue, setRadioValue] = useState('1');
    const [personalAddressBoolList, setPersonalAddressBoolList] = useState<PersonalAddressBookProps[]>();
    const [personalAddressBookGroupList, setPersonalAddressBookGroupList] = useState<PersonalAddressBookGroupProps[]>();
    const [AddressBookGroupDetails, setAddressBookGroupDetails] = useState();
    const [showAddContact, setShowAddContact] = useState(false);
    const [showAddGroupContact, setShowAddGroupContact] = useState(false);
    const [iContactName, setIContactName] = useState('');
    const [iContactNumber, setIContactNumber] = useState('');
    const [formType, setFormType] = useState('');
    const [formGroupType, setFormGroupType] = useState('');
    const [showNotExists, setShowNotExists] = useState(false);
    const [showNotExistsGroup, setShowNotExistsGroup] = useState(false);
    const [personalAddressBookId, setPersonalAddressBookId] = useState('');
    const [GroupName, setGroupName] = useState('');
    const [GroupId, setGroupId] = useState('');
    useEffect(() => {
        if (isPersonalContactExists !== 'NoResponse') {
            if (isPersonalContactExists !== '') {
                setShowNotExists(true)
            }
        }
        else {
            setShowNotExists(false);
        }
    }, [isPersonalContactExists]);
    // CheckIfPersonalAddressGroupAlreadyExists
    useEffect(() => {
        if (CheckIfPersonalAddressGroupAlreadyExists !== 'NoResponse') {
            if (CheckIfPersonalAddressGroupAlreadyExists !== '') {
                setShowNotExistsGroup(true)
            }
        }
        else {
            setShowNotExistsGroup(false);
        }
    }, [CheckIfPersonalAddressGroupAlreadyExists]);

    useEffect(() => {
        if (DeletePersonalAddressBookMsg !== '') {
            toast.success(DeletePersonalAddressBookMsg);
            dispatch(CDAGetClearDeletePersonalAddressBookMsg());
            const apiBody: IGetAddressBookListBody = {
                "asSchoolId": schoolId,
                "asUserId": userId
            }
            dispatch(CDAGetPersonalAddressBookList(apiBody))
        }
    }, [DeletePersonalAddressBookMsg])

    useEffect(() => {
        if (AddPersonalAddBookMsg !== '') {
            toast.success(AddPersonalAddBookMsg);
            dispatch(CDAGetClearAddPersonalAddBookMsg());
            setIContactName('');
            setIContactNumber('');
            setFormType('Add')
            const apiBody: IGetAddressBookListBody = {
                "asSchoolId": schoolId,
                "asUserId": userId
            }
            dispatch(CDAGetPersonalAddressBookList(apiBody))
        }
    }, [AddPersonalAddBookMsg])
    useEffect(() => {
        if (InsertPersonalAddressBookGroupMsg !== '') {
            toast.success(InsertPersonalAddressBookGroupMsg);
            dispatch(CDAGetClearInsertPersonalAddressBookGroupMsg());
            setGroupName('');
            setFormGroupType('Add')
            const apiBody1: IGetAddressBookGroupListBody = {
                "asSchoolId": schoolId,
                "userId": Number(userId),
                "asGroupMob": state?.mobileNumbers.length > 0 ? state?.mobileNumbers : '0'
            }
            const apiBody2: IGetAddressBookGroupDetailsBody = {
                "asSchoolId": schoolId,
                "asUserId": userId,
                "asGroupId": '0'
            }
            dispatch(CDAGetAddressBookGroupList(apiBody1));
            dispatch(CDAGetAddressBookGroupDetails(apiBody2));
        }
    }, [InsertPersonalAddressBookGroupMsg])
    // DeletePersonalAddressBookGroupMsg
    useEffect(() => {
        if (DeletePersonalAddressBookGroupMsg !== '') {
            toast.success(DeletePersonalAddressBookGroupMsg);
            dispatch(CDAGetClearDeletePersonalAddressBookGroupMsg());
            setGroupName('');
            setFormGroupType('Add')
            const apiBody1: IGetAddressBookGroupListBody = {
                "asSchoolId": schoolId,
                "userId": Number(userId),
                "asGroupMob": state?.mobileNumbers.length > 0 ? state?.mobileNumbers : '0'
            }
            dispatch(CDAGetAddressBookGroupList(apiBody1));
        }
    }, [DeletePersonalAddressBookGroupMsg])
    useEffect(() => {
        if (ISUpdatePersonalAddressBookGroupMsg !== '') {
            toast.success(ISUpdatePersonalAddressBookGroupMsg);
            dispatch(CDAGetClearUpdatePersonalAddressBookGroupMsg());
            setGroupName('');
            setFormGroupType('Add')
            const apiBody1: IGetAddressBookGroupListBody = {
                "asSchoolId": schoolId,
                "userId": Number(userId),
                "asGroupMob": state?.mobileNumbers.length > 0 ? state?.mobileNumbers : '0'
            }
            const apiBody2: IGetAddressBookGroupDetailsBody = {
                "asSchoolId": schoolId,
                "asUserId": userId,
                "asGroupId": '0'
            }
            dispatch(CDAGetAddressBookGroupList(apiBody1));
            dispatch(CDAGetAddressBookGroupDetails(apiBody2));
        }
    }, [ISUpdatePersonalAddressBookGroupMsg])
    useEffect(() => {
        const apiBody: IGetAddressBookListBody = {
            "asSchoolId": schoolId,
            "asUserId": userId
        }
        const apiBody1: IGetAddressBookGroupListBody = {
            "asSchoolId": schoolId,
            "userId": Number(userId),
            "asGroupMob": state?.mobileNumbers.length > 0 ? state?.mobileNumbers : '0'
        }
        if (RadioValue === '1') {
            dispatch(CDAGetPersonalAddressBookList(apiBody))
        }
        else {
            dispatch(CDAGetAddressBookGroupList(apiBody1));
        }
    }, [RadioValue])
    useEffect(() => {
        if (personalAddressbookList.length > 0 && state?.mobileNumbers.length > 0) {
            // Split the mobile numbers and trim each number to remove spaces
            let numbersList = state.mobileNumbers.split(',').map(num => num.trim());

            // Use map to modify the list
            let updatedList = personalAddressbookList.map((item) => {
                let isActive = numbersList.includes(item.Mobile_No);
                return {
                    ...item,
                    IsActive: isActive
                };
            });

            setPersonalAddressBoolList(updatedList);
        } else {
            setPersonalAddressBoolList(personalAddressbookList);
        }
    }, [personalAddressbookList, state?.mobileNumbers]);
    useEffect(() => {
        if (GetAddressBookGroupList.length > 0) {
            setPersonalAddressBookGroupList(GetAddressBookGroupList)
        }
    }, [GetAddressBookGroupList])
    useEffect(() => {
        if (GetAddressBookGroupDetails.length > 0) {
            setAddressBookGroupDetails(GetAddressBookGroupDetails)
        }
    }, [GetAddressBookGroupDetails])


    const ClickRadio = (value) => {
        setRadioValue(value);
    };
    function clickRow(list: any) {
        setPersonalAddressBoolList(list)
    }
    function clickRow1(list: any) {
        setPersonalAddressBookGroupList(list)
    }
    function clickRow2(list: any) {
        setAddressBookGroupDetails(list)
    }

    function handleIContactListEdit(item: any) {
        setShowAddContact(true);
        setFormType('Edit')
        setIContactName(item.Name);
        setIContactNumber(item.Mobile_No);
        setPersonalAddressBookId(item.PersonalAddressBookId);
    }
    function handleGroupDetailsEdit(item: any) {
        const apiBody2: IGetAddressBookGroupDetailsBody = {
            "asSchoolId": schoolId,
            "asUserId": userId,
            "asGroupId": item?.PersonalAddressBookGroupId
        }
        //console.log('❌❌❌', item);

        setGroupId(item.PersonalAddressBookGroupId)
        //console.log('🤞🤞🤞', GroupId);

        setShowAddGroupContact(true);
        setGroupName(item.Name)
        setFormGroupType('Edit')
        dispatch(CDAGetAddressBookGroupDetails(apiBody2));

    }
    function handleIContactListAdd() {
        setShowAddContact(true)
        setFormType('Add')
        setIContactName('')
        setIContactNumber('')
    }
    function handleClearForIndividualContact() {
        setFormType('Add')
        setIContactName('')
        setIContactNumber('')
        dispatch(CDAGetClearIsPersonalAddressExists())
    }
    function handleGroupContactListAdd() {
        const apiBody2: IGetAddressBookGroupDetailsBody = {
            "asSchoolId": schoolId,
            "asUserId": userId,
            "asGroupId": "0"
        }
        dispatch(CDAGetAddressBookGroupDetails(apiBody2));
        setShowAddGroupContact(true)
        setGroupName('')
        setGroupId('')
        setFormGroupType('Add')
    }
    function handleClearForGroupContact() {
        const apiBody2: IGetAddressBookGroupDetailsBody = {
            "asSchoolId": schoolId,
            "asUserId": userId,
            "asGroupId": "0"
        }
        dispatch(CDAGetAddressBookGroupDetails(apiBody2));
        setGroupName('')
        setGroupId('')
        setFormGroupType('Add')
    }
    function handleContactNoChange(item: string) {
        const numericValue = item.replace(/\D/g, '');
        if (!isNaN(Number(numericValue)) && numericValue.length <= 10) {
            setIContactNumber(numericValue);
        }
    }
    function addIPersonalContact() {
        dispatch(CDAGetClearIsPersonalAddressExists())
        const apiBody: ICheckIfPersonalAddressExistsBody = {
            "asUserId": userId,
            "asSchoolId": schoolId,
            "personalAddressBookId": personalAddressBookId !== '' ? personalAddressBookId : "0",
            "userName": iContactName,
            "userMobileNo": iContactNumber,
        }
        const apiBody1: IInsertPersonalAddressBookBody = {
            "asSchoolId": schoolId,
            "userId": Number(userId),
            "name": iContactName,
            "mobileNo": iContactNumber,
            "isDeleted": false,
            "insertDate": formattedDate,
            "insertedById": Number(userId)
        }
        const apiBody2: IUpdatePersonalAddressBookBody = {
            "personalAddressBookId": personalAddressBookId,
            "name": iContactName,
            "mobileNo": iContactNumber,
            "updateDate": formattedDate,
            "updatedById": Number(userId),
            "asSchoolId": schoolId
        }
        dispatch(CDAGetCheckIfPersonalAddressExists(apiBody, apiBody1, apiBody2, formType));
    }
    // #region XML function
    function GroupDetailXML(contacts) {
        // Filter contacts where IsActive is true
        const activeContacts = contacts.filter(contact => contact.IsActive === true);
        let xmlString = '<PersonalAddressBook>';
        activeContacts.forEach(contact => {
            xmlString += `<PersonalAddressBook PersonalAddressBookId="${contact.PersonalAddressBookId}" />`;
        });
        xmlString += '</PersonalAddressBook>';
        return xmlString;
    }

    function addIPersonalContactGroup() {
        dispatch(CDAGetClearIsPersonalAddressGroupAlreadyExists())
        const apiBody: ICheckIfPersonalAddressGroupAlreadyExistsBody = {
            "asSchoolId": schoolId,
            "asPersonalBookGroupId": GroupId !== '' ? GroupId : "0",
            "asGroupName": GroupName,
            "asUserId": userId
        }
        const apiBody1: IInsertPersonalAddressBookGroupBody = {
            "asSchoolId": schoolId,
            "asGroupName": GroupName,
            "asGroupDetailXML": GroupDetailXML(AddressBookGroupDetails),
            "asUserId": userId
        }
        const apiBody2: IUpdatePersonalAddressBookGroupBody = {
            "asSchoolId": schoolId,
            "asGroupId": GroupId !== '' ? GroupId : "0",
            "asGroupName": GroupName,
            "asGroupDetailXML": GroupDetailXML(AddressBookGroupDetails),
            "asUserId": userId
        }
        dispatch(CDAGetCheckIfPersonalAddressGroupAlreadyExists(apiBody, apiBody1, apiBody2, formGroupType));
        //console.log('✨✌️👌', apiBody, apiBody1, apiBody2, formType);

    }
    function handleDelete(item: any) {
        const apiBodyForDelete: IDeletePersonalAddressBookBody = {
            "personalAddressBookId": item?.PersonalAddressBookId,
            "isDeleted": true,
            "updateDate": formattedDate,
            "updatedById": userId,
            "asSchoolId": schoolId,
        }
        showAlert({
            title: 'Please Confirm',
            message: 'Are you sure you want to delete this contact detail?',
            variant: 'warning',
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
            onConfirm: () => {
                closeAlert();
                dispatch(CDAGetDeletePersonalAddressBook(apiBodyForDelete));
            },
            onCancel: closeAlert
        });

    }
    function handleGroupDelete(item: any) {
        //console.log('👌', item);

        const apiBodyForDelete: IDeletePersonalAddressBookGroupBody = {
            "asSchoolId": schoolId,
            "asPersonalAddressBookGroupId": item?.PersonalAddressBookGroupId,
            "asUserId": userId
        }
        showAlert({
            title: 'Please Confirm',
            message: 'Are you sure you want to delete this contact group detail?',
            variant: 'warning',
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
            onConfirm: () => {
                closeAlert();
                dispatch(CDAGetDeletePersonalAddressBookGroup(apiBodyForDelete));
            },
            onCancel: closeAlert
        });

    }
    function getActiveMobileNumbers(data) {
        // Filter out objects where IsActive is true
        const activeUsers = data.filter(item => item.IsActive);

        // Map through the filtered data to extract the Mobile_No values
        const mobileNumbers = activeUsers.map(item => item.Mobile_No);

        // Join the mobile numbers into a comma-separated string
        let activeNoList = mobileNumbers.join(', ');
        if (activeNoList.length === 0) {
            showAlert({
                title: 'Please Confirm',
                message: 'No user is selected. Are you sure you want to continue?',
                variant: 'warning',
                confirmButtonText: 'Confirm',
                cancelButtonText: 'Cancel',
                onConfirm: () => {
                    closeAlert();
                    navigate('/RITeSchool/Teacher/ComposeSMS', { state: { activeNoList, fromInternal: true } });
                },
                onCancel: closeAlert
            });
        } else {
            navigate('/RITeSchool/Teacher/ComposeSMS', { state: { activeNoList, fromInternal: true } });
        }
    }
    function getActiveGroupIds(groups) {
        // Filter active groups and return a comma-separated string of PersonalAddressBookGroupId
        return groups
            .filter(({ IsActive }) => IsActive)
            .map(({ PersonalAddressBookGroupId }) => PersonalAddressBookGroupId)
            .join(',');
    }

    async function getMobileNumbers() {
        try {
            const activeGroupListValues = getActiveGroupIds(personalAddressBookGroupList);

            if (!activeGroupListValues) {
                console.warn('No active groups found.');
                return;
            }

            const apiBody: IGetDetailsOfGroupsBody = {
                asSchoolId: schoolId,
                asGroupId: activeGroupListValues
            };

            await dispatch(CDAGetGetDetailsOfGroups(apiBody));

            const activeNoList = GetDetailsOfGroups?.map(({ Mobile_No }) => Mobile_No).join(',');

            if (!isLoading) {
                navigate('/RITeSchool/Teacher/ComposeSMS', { state: { activeNoList, fromInternal: true } });
            }

            //console.log(activeNoList);
        } catch (error) {
            console.error('Error fetching mobile numbers:', error);
        }
    }

    async function getActiveGroupMobileNumbers() {
        const activeGroupListValues = getActiveGroupIds(personalAddressBookGroupList);

        if (!activeGroupListValues) {
            showAlert({
                title: 'Please Confirm',
                message: 'No user is selected. Are you sure you want to continue?',
                variant: 'warning',
                confirmButtonText: 'Confirm',
                cancelButtonText: 'Cancel',
                onConfirm: () => {
                    closeAlert();
                    navigate('/RITeSchool/Teacher/ComposeSMS', { state: { fromInternal: true } });
                },
                onCancel: closeAlert
            });
            return;
        }

        // Call to fetch mobile numbers
        await getMobileNumbers();
    }

    return (
        <Box px={2}>
            <CommonPageHeader
                navLinks={[
                    {
                        title: 'Compose SMS', path: '/RITeSchool/Teacher/ComposeSMS'
                    },
                    {
                        title: 'Select User To Send Message', path: ''
                    }
                ]}
                rightActions={
                    <>
                        <Tooltip title={`Add selected users.`}>
                            <IconButton
                                onClick={() => {
                                    if (RadioValue === '1') {
                                        getActiveMobileNumbers(personalAddressBoolList);
                                    } else {
                                        getActiveGroupMobileNumbers();
                                    }


                                }}
                                sx={{
                                    bgcolor: blue[500], color: 'white', '&:hover': { bgcolor: blue[600] }
                                }}>
                                <FactCheckIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={'Add new contact.'}>
                            <IconButton
                                sx={{
                                    color: 'white',
                                    backgroundColor: green[500],
                                    '&:hover': {
                                        backgroundColor: green[600]
                                    }
                                }}
                                onClick={() => { RadioValue === '1' ? handleIContactListAdd() : handleGroupContactListAdd() }}
                            >
                                <AddIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={`Personalise your phone book and select name and click on OK button. Also you can create groups of selected users.`}>
                            <IconButton sx={{ bgcolor: 'grey.500', color: 'white', '&:hover': { bgcolor: 'grey.600' } }}>
                                <QuestionMark />
                            </IconButton>
                        </Tooltip>
                    </>}
            />

            {isLoading && <SuspenseLoader />}
            <Grid sx={{ backgroundColor: 'white', mb: 1, p: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <RadioButton1 Array={RadioListCT} ClickRadio={ClickRadio} defaultValue={RadioValue} />
                </Box>
            </Grid>
            {RadioValue === '1' &&
                <Box sx={{ background: 'white', p: 1 }}>
                    {personalAddressbookList.length > 0 ?
                        <PhoneBookList clickDelete={(item) => { handleDelete(item) }} clickRow={clickRow} clickEdit={(item) => { handleIContactListEdit(item) }} itemList={personalAddressBoolList} />
                        :
                        <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 1, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }}>
                            <b>No record found.</b>
                        </Typography>
                    }
                </Box>}
            {RadioValue === '2' &&
                <Box sx={{ background: 'white', p: 1 }}>
                    {GetAddressBookGroupList.length > 0 ?
                        <GroupPhoneBookList itemList={personalAddressBookGroupList} clickRow={clickRow1} clickEdit={(item) => { handleGroupDetailsEdit(item) }} clickDelete={(item) => { handleGroupDelete(item) }} />
                        :
                        <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 1, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }}>
                            <b>No record found.</b>
                        </Typography>
                    }
                </Box>}

            <AddPersonalContact
                handleClear={handleClearForIndividualContact}
                isExistsError={showNotExists ? isPersonalContactExists : ''}
                Open={showAddContact}
                OnClose={() => {
                    setShowAddContact(false)
                    dispatch(CDAGetClearIsPersonalAddressExists())
                }}
                Value1={iContactName}
                Value2={iContactNumber}
                formType={formType}
                OnChange1={(item) => { setIContactName(item) }}
                OnChange2={(item) => { handleContactNoChange(item) }}
                onSubmit={() => { addIPersonalContact() }} />

            <AddPersonalContactGroup
                clearForm={handleClearForGroupContact}
                isExistsError={showNotExistsGroup ? CheckIfPersonalAddressGroupAlreadyExists : ''}
                Open={showAddGroupContact}
                OnClose={() => {
                    setShowAddGroupContact(false)
                    dispatch(CDAGetClearIsPersonalAddressGroupAlreadyExists())

                }}
                clickRow={clickRow2}
                Value1={GroupName}
                Value2={iContactNumber}
                formType={formGroupType}
                ItemList2={AddressBookGroupDetails}
                OnChange1={(item) => { setGroupName(item) }}
                onSubmit={() => { addIPersonalContactGroup() }} />


        </Box>

    )
}

export default PersonalAddressBook