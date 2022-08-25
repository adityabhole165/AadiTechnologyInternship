import { useState, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { getSentList } from 'src/requests/Student/Sentmessage';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import {
  ISentList,
  GetSentListResult
} from 'src/interfaces/MessageCenter/Sent_Message';
import { useTheme } from '@mui/material';
import List3 from 'src/libraries/list/List3';
import { IgetList } from 'src/interfaces/MessageCenter/GetList';
import MoveToTrashApi from 'src/api/MessageCenter/MoveToTrash';
import { Button, Container, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ReplayIcon from '@mui/icons-material/Replay';
import { toast } from 'react-toastify';
import ErrorMessages from 'src/libraries/ErrorMessages/ErrorMessages';
import SentMessageApi from 'src/api/Student/SentMessage';

const PageNumber = 1;

function SentMessage() {
  const [page, setpage] = useState(PageNumber);

  const theme = useTheme();

  const dispatch = useDispatch();
  const GetSentMessagesList = useSelector(
    (state: RootState) => state.Sent__Message.SentList
  );

  const [mainData, setmainData] = useState<any>();
  const [ManipulatedData, setManipulatedData] = useState<any>([]);

  if (ManipulatedData != undefined && GetSentMessagesList != undefined) {
    console.log(ManipulatedData[0] == GetSentMessagesList[0]);
    if (ManipulatedData[0] !== GetSentMessagesList[0]) {
      GetSentMessagesList.forEach((element) => {
        if (element != undefined) {
          ManipulatedData.push(element);
        }
      });
    }
    // else{
    //   // console.log(GetSentMessagesList.length)
    //   if(mainData != undefined){
    //     if(mainData.GetScheduledSMSResult != undefined){
    //       ManipulatedData.concat(mainData.GetScheduledSMSResult)
    //     }
    //   }
    // }
  }

  const asSchoolId = localStorage.getItem('localSchoolId');
  const UserId = sessionStorage.getItem('Id');
  const RoleId = sessionStorage.getItem('RoleId');
  const AcademicYearId = sessionStorage.getItem('AcademicYearId');

  const getList: IgetList = {
    asUserId: UserId,
    asAcademicYearId: AcademicYearId,
    asUserRoleId: RoleId,
    asSchoolId: asSchoolId,
    abIsSMSCenter: '0',
    asFilter: '',
    asPageIndex: 1,
    asMonthId: '0'
  };

  useMemo(() => {
    dispatch(getSentList(getList));
  }, []);

  const [checked, setChecked] = useState(true);
  const [Id, setId] = useState({ DetailInfo: [] });

  const pathname = window.location.pathname;
  const pageName = pathname.replace(
    '/extended-sidebar/MessageCenter/msgCenter/',
    ''
  );

  const handleChange = (event) => {
    setChecked(true);
    const { value, checked } = event;

    const { DetailInfo } = Id;

    if (event.target.checked) {
      setId({
        DetailInfo: [...DetailInfo, value]
      });
    } else {
      setId({
        DetailInfo: DetailInfo.filter((event) => event !== value)
      });
    }
  };

  const moveToTrash = () => {
    const joinDetails = Id.DetailInfo.join(';');

    const trashbody: any = {
      asSchoolId: asSchoolId,
      asMessageRecieverDetailsId: joinDetails,
      asMessageDetailsId: joinDetails,
      asIsArchive: 'Y',
      asIsCompeteDelete: 0,
      asFlag: 'Sent'
    };
    MoveToTrashApi.MoveToTrash(trashbody)
      .then((data) => {
        if (pageName == 'Sent') {
          toast.success('Message deleted successfully');
          dispatch(getSentList(getList));
        }
        setChecked(false);
        setId({
          DetailInfo: []
        });
      })
      .catch((err) => {
        alert('error network');
      });
  };

  const Reset = () => {
    setChecked(false);
    setId({
      DetailInfo: []
    });
  };


  const DivElement = document.getElementById('mainDiv');

  const scrolling = () => {
    // console.log(DivElement.scrollTop)
    // console.log(DivElement.scrollTop);
    // console.log(DivElement.scrollHeight - DivElement.scrollTop)
    // if (DivElement.scrollHeight - DivElement.scrollTop <= 580) {
    //   console.log('call for api');
    // }
    // console.log(window.scrollY)
    // if(DivElement.scrollTop > window.innerHeight){
      const scrollToEnd = () => {
        setpage(page + 1);
      };

    if (DivElement.scrollHeight - DivElement.scrollTop <= 580) {
      scrollToEnd();
      const getListUpdated: IgetList = {
        asUserId: UserId,
        asAcademicYearId: AcademicYearId,
        asUserRoleId: RoleId,
        asSchoolId: asSchoolId,
        abIsSMSCenter: '0',
        asFilter: '',
        asPageIndex: page,
        asMonthId: '0'
      };
      // dispatch(getSentList(getListUpdated));
      SentMessageApi.GetSentMessageList(getListUpdated)
        .then((data) => {
          setmainData(data.data);
          // console.log(data.data)
        })
        .catch((err) => {
          alert('error network');
        });
    }
  };

  return (
    <>
      {Id.DetailInfo.length !== 0 ? (
        <>
          <Container>
            <Box display="flex" flexDirection="row" justifyContent="flex-end">
              <Button
                variant="contained"
                color="error"
                size="small"
                endIcon={<DeleteIcon />}
                onClick={() => moveToTrash()}
              >
                DELETE
              </Button>
              &nbsp;&nbsp;
              <Button
                variant="contained"
                color="primary"
                size="small"
                endIcon={<ReplayIcon />}
                onClick={() => Reset()}
              >
                RESET
              </Button>
            </Box>
          </Container>
          <br />
        </>
      ) : null}

      <div
        id="mainDiv"
        // display="block"
        onScroll={scrolling}
        style={{
          position: 'absolute',
          width: '100%',
          paddingBottom: '100px',
          height: '570px',
          overflow: 'auto'
        }}
      >
        {ManipulatedData === null || ManipulatedData.length == 0 ? (
          <ErrorMessages Error={'No message found'} />
        ) : (
          <>
            {ManipulatedData.map(
              (GetSentMessagesListitems: GetSentListResult, i) => (
                <List3
                  data={GetSentMessagesListitems}
                  key={i}
                  handleChange={handleChange}
                  check={checked}
                  Attachments={GetSentMessagesListitems.Attachment}
                  FromRoute={'/Sent'}
                />
              )
            )}
          </>
        )}
      </div>
    </>
  );
}

export default SentMessage;
