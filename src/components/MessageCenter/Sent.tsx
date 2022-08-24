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
import InfiniteScroll from "react-infinite-scroll-component";
import SentMessageApi from 'src/api/Student/SentMessage';

const PageNumber = 1;

function SentMessage() {
  const [page, setpage] = useState(PageNumber);

  const theme = useTheme();
  const [state, setstate] = useState<any>();
  const [ddd,setddd] = useState<any>([]);
//   if(state !== undefined){
//     console.log(state.GetScheduledSMSResult);
//     ddd.push([...state.GetScheduledSMSResult]);
//   }
//   console.log(ddd)
if(state !== undefined){
    ddd.concat(state.GetScheduledSMSResult);
}
console.log(ddd);

  const dispatch = useDispatch();
  const GetSentMessagesList = useSelector(
    (state: RootState) => state.Sent__Message.SentList
  );
//   console.log(GetSentMessagesList)
//   console.log(state)
//   if(state != undefined){
//     console.log(state.GetScheduledSMSResult);
//     GetSentMessagesList.concat(state.GetScheduledSMSResult)
//   }

//   setddd(GetSentMessagesList)

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
    asPageIndex: page,
    asMonthId: '0'
  };

  useEffect(() => {
    dispatch(getSentList(getList));
    SentMessageApi.GetSentMessageList(getList)
    .then((data) => {
        setstate(data.data)
      })
      .catch((err) => {
        alert('error network');
      });
  }, [page]);

  const [checked, setChecked] = useState(true);
  const [Id, setId] = useState({ DetailInfo: [] });

  const pathname = window.location.pathname;
  const pageName = pathname.replace(
    '/extended-sidebar/MessageCenter/msgCenter/',
    ''
  );

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
    if(iii.offsetHeight > iii.scrollTop){
        scrollToEnd();
        SentMessageApi.GetSentMessageList(getList)
    .then((data) => {
        setstate(data.data)
      })
      .catch((err) => {
        alert('error network');
      });
        // GetSentMessagesList.concat(dispatch(getSentList(getList)))
    }
  };

  const fetchMoreData = () => {
    console.log("fetchMoreData")
    if(iii.offsetHeight > iii.scrollTop){
        scrollToEnd();
        dispatch(getSentList(getList));
    }
  }

  window.onscroll = function(ev) {
    console.log("hello")
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        console.log("hello")
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
        // onScroll={scrolling}
        style={{
          position: 'absolute',
          width: '100%',
          paddingBottom: '100px',
          height: '570px',
          overflow: 'auto'
        }}
      >
        {GetSentMessagesList === null || GetSentMessagesList.length == 0 ? (
          <ErrorMessages Error={'No message found'} />
        ) : (
          <>
          {/* <InfiniteScroll
          dataLength={5}
          next={fetchMoreData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        > */}
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
            {/* </InfiniteScroll> */}
          </>
        )}
      </div>
    </>
  );
}

export default SentMessage;
