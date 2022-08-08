import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetInboxMessageResult } from 'src/interfaces/MessageCenter/InboxMessage';
import { RootState } from "src/store";
import ErrorMessages from "src/libraries/ErrorMessages/ErrorMessages";
import List3 from "src/libraries/list/List3";
import { IgetList } from "src/interfaces/MessageCenter/GetList";
import { Button, Container, Box } from "@mui/material";
import MoveToTrashApi from 'src/api/MessageCenter/MoveToTrash';
import { getInboxList } from "src/requests/Student/InboxMessage";
import DeleteIcon from '@mui/icons-material/Delete';
import ReplayIcon from '@mui/icons-material/Replay';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';


function Inbox() {

  const GetInboxMessageList = useSelector((state: RootState) => state.InboxMessage.InboxList)
  const dispatch = useDispatch()

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
      dispatch(getInboxList(getList));
  }, [])

  const [checked, setChecked] = useState(true);
  const [Id, setId] = useState({ DetailInfo: [], recieverInfo: [] })
  const pathname = window.location.pathname;
  const pageName = pathname.replace("/extended-sidebar/MessageCenter/msgCenter/", '');
  const pageName2 = pathname.replace("/extended-sidebar/MessageCenter/", '')
  console.log(pageName,pageName2)

  const handleChange = (event) => {
    setChecked(true);
    const { value, name } = event.target;

    const { DetailInfo, recieverInfo } = Id;

    if (event.target.checked) {

      setId({
        DetailInfo: [...DetailInfo, value],
        recieverInfo: [...recieverInfo, name]
      })
    }
    else {
      setId({
        DetailInfo: DetailInfo.filter((event) => event !== value),

        recieverInfo: recieverInfo.filter((event) => event !== name)
      })
    }
  };

  const moveToTrash = () => {
    const joinDetails = Id.DetailInfo.join(';')
    const joinReciever = Id.recieverInfo.join(';')

    const trashbody: any = {
      "asSchoolId": asSchoolId,
      "asMessageRecieverDetailsId": joinReciever,
      "asMessageDetailsId": joinDetails,
      "asIsArchive": "Y",
      "asIsCompeteDelete": 0,
      "asFlag": "Inbox"
    }

    MoveToTrashApi.MoveToTrash(trashbody)
      .then((data) => {
        if (pageName == "Inbox" || "pagename /extended-sidebar/MessageCenter/msgCenter") {
          toast.success("Message deleted successfully")
          dispatch(getInboxList(getList))

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
        (GetInboxMessageList === null) ?
          <ErrorMessages Error={'No Record Found'} />
          :
          <>
            {
              GetInboxMessageList.map(
                (GetInboxMessageListitem: GetInboxMessageResult, i) =>
                  <List3 data={GetInboxMessageListitem} key={i} handleChange={handleChange} check={checked} Attachments={GetInboxMessageListitem.Attachment} />)
            }
          </>
      }
    </>
  )
}

export default Inbox;