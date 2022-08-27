import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getSentList } from 'src/requests/Student/Sentmessage';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { GetSentListResult } from 'src/interfaces/MessageCenter/Sent_Message';
import List3 from 'src/libraries/list/List3';
import { IgetList } from 'src/interfaces/MessageCenter/GetList';
import MoveToTrashApi from 'src/api/MessageCenter/MoveToTrash';
import { Button, Container, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ReplayIcon from '@mui/icons-material/Replay';
import { toast } from 'react-toastify';
import ErrorMessages from 'src/libraries/ErrorMessages/ErrorMessages';
import SentMessageApi from 'src/api/Student/SentMessage';
import SuspenseLoader from 'src/layouts/Components/SuspenseLoader';


const PageIndex = 1; // Initial page index

function SentMessage() {
  const dispatch = useDispatch();

  const [pageIndex, setpageIndex] = useState<number>(PageIndex); // Page index 
  const [NextPageData, setNextPageData] = useState<any>(); // Next pages data modifications
  const [ManipulatedData, setManipulatedData] = useState([]); // Modified Array for rendering

  const pathname = window.location.pathname;
  const pageName = pathname.replace(
    '/extended-sidebar/MessageCenter/msgCenter/',
    ''
  );

  // Original Array
  const GetSentMessagesList = useSelector(
    (state: RootState) => state.Sent__Message.SentList
  ); 
  const loading:boolean = useSelector(
    (state: RootState) => state.Sent__Message.Loading
  );

  // First time modification 
  if (GetSentMessagesList != undefined) { 
    if (ManipulatedData.length == 0) {
      GetSentMessagesList.forEach((element) => {
        if (element != undefined) {
          ManipulatedData.push(element);
        }
      });
    } 
  // After page increment data modifications
    else {
      if (NextPageData != undefined && ManipulatedData.length != 0) {
        if (NextPageData.GetScheduledSMSResult != undefined) {
          console.log(NextPageData.GetScheduledSMSResult[0].DetailsId);
          console.log(ManipulatedData[0].DetailsId);
          if (
            NextPageData.GetScheduledSMSResult[0].DetailsId !=
            ManipulatedData[0].DetailsId
          ) {
            NextPageData.GetScheduledSMSResult.forEach((element) => {
              if (element != undefined) {
                ManipulatedData.push(element);
              }
            });
          }
        }
      }
    }
  }

  // Session data
  const asSchoolId = localStorage.getItem('localSchoolId');
  const UserId = sessionStorage.getItem('Id');
  const RoleId = sessionStorage.getItem('RoleId');
  const AcademicYearId = sessionStorage.getItem('AcademicYearId');

  // Initial Body
  const SentMessageBody: IgetList = {
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
    dispatch(getSentList(SentMessageBody));
  }, []);

  const [checked, setChecked] = useState(true);
  const [Id, setId] = useState({ DetailInfo: [] });

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

  // Selected data delete operation
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
          dispatch(getSentList(SentMessageBody));
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

  // Selected Data reset operation
  const Reset = () => {
    setChecked(false);
    setId({
      DetailInfo: []
    });
  };

  // Pagination Api call and data setters
  const ScrollableDivRefference = document.getElementById('ScrollableDiv');

  const PageIndexIncrement = (): void => {
    setpageIndex(pageIndex + 1);
  };

  const scrolling = (): void => {
    // (ScrollableDivRefference.scrollHeight - ScrollableDivRefference.scrollTop <= 570) Page end condition
    if (ScrollableDivRefference.scrollHeight - ScrollableDivRefference.scrollTop <= 570) { 
      PageIndexIncrement();
      const UpdatedBody: IgetList = {
        asUserId: UserId,
        asAcademicYearId: AcademicYearId,
        asUserRoleId: RoleId,
        asSchoolId: asSchoolId,
        abIsSMSCenter: '0',
        asFilter: '',
        asPageIndex: pageIndex,
        asMonthId: '0'
      };
      SentMessageApi.GetSentMessageList(UpdatedBody) 
        .then((response) => {
          setNextPageData(response.data); // Next page data setter
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
        id="ScrollableDiv"
        onScroll={scrolling}
        style={{
          position: 'absolute',
          width: '100%',
          paddingBottom: '100px',
          height: '570px',
          overflow: 'auto'
        }}
      >
        {
        loading 
        ? 
        (
          <SuspenseLoader />
        ) 
        : 
        ManipulatedData === null || ManipulatedData.length == 0 
        ? 
        (
          <ErrorMessages Error={'No message found'} />
        ) 
        : 
        (
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
