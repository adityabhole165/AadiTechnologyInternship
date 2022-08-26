import { useState, useEffect } from 'react';
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
import SuspenseLoader from 'src/layouts/Components/SuspenseLoader';

import SentMessageApi from 'src/api/Student/SentMessage';

const PageNumber = 1;

function SentMessage() {
  const [page, setpage] = useState(PageNumber);

  const theme = useTheme();
  const [state, setstate] = useState<any>();
  const [daataa,setmainData] = useState<any>();

  const dispatch = useDispatch();
  const GetSentMessagesList = useSelector(
    (state: RootState) => state.Sent__Message.SentList
  );

  const [Dummy,setDummy] = useState<any>();

  // useEffect(()=> {
    
  // },[])
  setTimeout(()=>{
    if(GetSentMessagesList != undefined){
      setDummy(GetSentMessagesList)
    }
  },2000)
  // console.log(Dummy);

  const asSchoolId = localStorage.getItem('localSchoolId');
  const UserId = sessionStorage.getItem('Id');
  const RoleId = sessionStorage.getItem('RoleId');
  const AcademicYearId = sessionStorage.getItem('AcademicYearId');
  // const [PageIndex, setPageIndex] = useState(1);

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

  useEffect(() => {
    dispatch(getSentList(getList));
  }, []);

  const [checked, setChecked] = useState(true);
  const [Id, setId] = useState({ DetailInfo: [] });

  const pathname = window.location.pathname;
  const pageName = pathname.replace(
    '/extended-sidebar/MessageCenter/msgCenter/',
    ''
  );
  if(daataa != undefined){
    if(daataa.GetScheduledSMSResult != undefined){
      const a = daataa.GetScheduledSMSResult
      // console.log(a) //Dummy
      // Dummy.concat(a)
      setTimeout(()=>{
        if(a != undefined){
          setDummy([...Dummy,...a])
        }
      },2000)
    }
  }

  const handleChange = (event) => {
    setChecked(true);
    const { value } = event.target;

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

  const scrollToEnd = () => {
    setpage(page + 1);
  };

  const iii = document.getElementById('mainDiv');

  const scrolling = () => {

    if(iii.scrollTop > iii.offsetHeight){
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
        // dispatch(getSentList(getList));
        // SentMessageApi.GetSentMessageList(getListUpdated)
        // .then((data) => {
        //   setmainData(data.data);
        //   // console.log(data.data)
        // })
        // .catch((err) => {
        //   alert('error network');
        // });
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

      {/* <div
        id="mainDiv"
        // onScroll={scrolling}
        style={{
          position: 'absolute',
          width: '100%',
          paddingBottom: '100px',
          height: '570px',
          overflow: 'auto'
        }}
      > */}
        {
          // GetSentMessagesList == undefined
          // ?
          // <SuspenseLoader/>
          // :
        GetSentMessagesList === null || GetSentMessagesList.length ==0 || GetSentMessagesList == undefined? (
          <ErrorMessages Error={'No message found'} />
        ) : (
          <>
            {GetSentMessagesList.map(
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
      {/* </div> */}
    </>
  );
}

export default SentMessage;
