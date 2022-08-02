import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getSentList } from "src/requests/Student/Sentmessage";
import { useSelector } from "react-redux";
import { RootState } from "src/store";
import { ISentList, GetSentListResult } from "src/interfaces/MessageCenter/Sent_Message";
import { useTheme } from '@mui/material';
import List3 from "src/libraries/list/List3";
import { IgetList } from "src/interfaces/MessageCenter/GetList";
import MoveToTrashApi from 'src/api/MessageCenter/MoveToTrash';
import { Button, Container, Box } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import ReplayIcon from '@mui/icons-material/Replay';
import { toast } from 'react-toastify';
import ErrorMessages from "src/libraries/ErrorMessages/ErrorMessages";

function SentMessage() {

    const theme = useTheme();

    const dispatch = useDispatch();
    const GetSentMessagesList = useSelector((state: RootState) => state.Sent__Message.SentList)

    const asSchoolId = localStorage.getItem('localSchoolId');
    const UserId = sessionStorage.getItem('Id');
    const RoleId = sessionStorage.getItem('RoleId');
    const AcademicYearId = sessionStorage.getItem('AcademicYearId');
    const [PageIndex, setPageIndex] = useState(1)
    

    const getList: IgetList = {
        "asUserId": UserId,
        "asAcademicYearId": AcademicYearId,
        "asUserRoleId": RoleId,
        "asSchoolId": asSchoolId,
        "abIsSMSCenter": "0",
        "asFilter": "",
        "asPageIndex": PageIndex,
        "asMonthId": "0"
    }

    useEffect(() => {
        dispatch(getSentList(getList));
    }, [])

    const [checked, setChecked] = useState(true);
    const [Id, setId] = useState({ DetailInfo: [] })

    const pathname = window.location.pathname
    const pageName = pathname.replace("/extended-sidebar/MessageCenter/msgCenter/", '')

    const handleChange = (event) => {
        setChecked(true);
        const { value } = event.target;

        const { DetailInfo } = Id;

        if (event.target.checked) {
            setId({
                DetailInfo: [...DetailInfo, value],
            })
        }
        else {
            setId({
                DetailInfo: DetailInfo.filter((event) => event !== value),
            })
        }
    };

    const moveToTrash = () => {
        const joinDetails = Id.DetailInfo.join(';')

        const trashbody: any = {
            "asSchoolId": asSchoolId,
            "asMessageRecieverDetailsId": joinDetails,
            "asMessageDetailsId": joinDetails,
            "asIsArchive": "Y",
            "asIsCompeteDelete": 0,
            "asFlag": "Sent"
        }
        MoveToTrashApi.MoveToTrash(trashbody)
            .then((data) => {
                console.log(data);
                
                if (pageName == "Sent") {
                    toast.success("Message deleted successfully")
                    dispatch(getSentList(getList))
                }
                setChecked(false)
                setId({
                    DetailInfo: [],
                })
            })
            .catch((err) => {
                alert("error network")
            })

    }

    const Reset = () => {
        setChecked(false)
        setId({
            DetailInfo: []
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


            <div>

                {
                    (GetSentMessagesList === null)?
                    <ErrorMessages Error={'No message'} />
                    :
                   <>
                     {
                          GetSentMessagesList.map(
                            (GetSentMessagesListitems: GetSentListResult, i) =>
                                <List3 data={GetSentMessagesListitems} key={i} handleChange={handleChange} check={checked} Attachments={GetSentMessagesListitems.Attachment} />)
                     }
                   </>
                }
            </div>

        </>
    )
}

export default SentMessage;