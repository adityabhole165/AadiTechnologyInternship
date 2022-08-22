import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageHeader from "src/libraries/heading/PageHeader";
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { getTrashList } from "src/requests/MessageCenter/MessaageCenter"
import { ITrashList, GetTrashMessagesResult } from 'src/interfaces/MessageCenter/MessageCenter';
import { RootState } from "src/store";
import List3 from "src/libraries/list/List3";
import { IgetList } from "src/interfaces/MessageCenter/GetList";
import MoveToTrashApi from 'src/api/MessageCenter/MoveToTrash';
import { Button, Container, Box } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import ReplayIcon from '@mui/icons-material/Replay'
import { toast } from 'react-toastify';
import ErrorMessages from "src/libraries/ErrorMessages/ErrorMessages";

function Trash() {

    const trashList = useSelector((state: RootState) => state.MessageCenter.TrashList)
    const dispatch = useDispatch();

    const asSchoolId = localStorage.getItem('localSchoolId');
    const UserId = sessionStorage.getItem('Id');
    const RoleId = sessionStorage.getItem('RoleId');
    const AcademicYearId = sessionStorage.getItem('AcademicYearId');

    
    const getList: IgetList = {
        "asUserId": UserId,
        "asAcademicYearId": AcademicYearId,
        "asUserRoleId": RoleId,
        "asSchoolId": asSchoolId,
        "abIsSMSCenter": "0",
        "asFilter": "",
        "asPageIndex": 1,
        "asMonthId": "0"
    }

    useEffect(() => {
        dispatch(getTrashList(getList))
    }, [])

    const [checked, setChecked] = useState(true);
    const [Id, setId] = useState<any>({ DetailInfo: [], recieverInfo: [] })

    const pathname = window.location.pathname
    const pageName = pathname.replace("/extended-sidebar/MessageCenter/msgCenter/", '')

    const handleChange = (event) => {
        setChecked(true);
        const { value, name, checked } = event;

        var recieverName = ""
        if (name == "0") {
            recieverName = value
        }
        else {
            recieverName = name

        }
        const { DetailInfo, recieverInfo } = Id;

        if (checked) {

            setId({
                DetailInfo: [...DetailInfo, value],
                recieverInfo: [...recieverInfo, recieverName]
            })


        }
        else {

            setId({
                DetailInfo: DetailInfo.filter((event) => event !== value),
                recieverInfo: recieverInfo.filter((event) => event !== recieverName)
            })
        }
    }
    const moveToTrash = () => {
        const joinDetails = Id.DetailInfo.join(';')
        const joinReciever = Id.recieverInfo.join(';')
        const trashbody: any = {
            "asSchoolId": asSchoolId,
            "asMessageRecieverDetailsId": joinReciever,
            "asMessageDetailsId": joinDetails,
            "asIsArchive": "Y",
            "asIsCompeteDelete": 1,
            "asFlag": "Trash"
        }
        MoveToTrashApi.MoveToTrash(trashbody)
            .then((data) => {
                if (pageName == "Trash") {
                    toast.success("Message deleted successfully")
                    dispatch(getTrashList(getList))
                }
                setChecked(false)
                setId({
                    DetailInfo: [],
                    recieverInfo: []
                })
            })
            .catch((err) => {
                alert("error network")
            })


    }

    const Reset = () => {
        setChecked(false)
        setId({
            DetailInfo: [],
            recieverInfo: []
        })
    }

    return (
        <>
            {
                (Id.DetailInfo.length !== 0) ?
                    <>
                        <Container>
                            <Box display="flex" flexDirection="row" justifyContent="flex-end">
                                <Button variant="contained" color="error" size="small" endIcon={<DeleteIcon />} onClick={() => moveToTrash()}>DELETE</Button>&nbsp;&nbsp;
                                <Button variant="contained" color="primary" size="small" endIcon={<ReplayIcon />} onClick={() => Reset()}>RESET</Button>
                            </Box>
                        </Container>
                        <br />
                    </>
                    :
                    null
            }

            {
                (trashList === null || trashList.length == 0) ?
                <ErrorMessages Error={'No message found'} />
                    :
                    <>
                        {
                            trashList.map((trashListitem: GetTrashMessagesResult, i) =>
                                <List3 data={trashListitem} key={i} handleChange={handleChange} check={checked} FromRoute={"/Trash"} />)
                        }
                    </>
            }
        </>
    )
}

export default Trash