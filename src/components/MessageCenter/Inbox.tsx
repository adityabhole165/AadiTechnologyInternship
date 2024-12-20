import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import ReplayIcon from '@mui/icons-material/Replay';
import { Avatar, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import InboxMessageApi from 'src/api/MessageCenter/InboxMessage';
import MoveToTrashApi from 'src/api/MessageCenter/MoveToTrash';
import { IgetList } from 'src/interfaces/MessageCenter/GetList';
import { GetInboxMessageResult } from 'src/interfaces/MessageCenter/InboxMessage';
import SuspenseLoader from 'src/layouts/components/SuspenseLoader';
import ErrorMessages from 'src/libraries/ErrorMessages/ErrorMessages';
import List3 from 'src/libraries/list/List3';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import {
  getInboxList,
  getNextPageInboxList
} from 'src/requests/Student/InboxMessage';
import { RootState } from 'src/store';

const PageIndex = 2; // Initial page index

function Inbox() {
  const dispatch = useDispatch();
  const [pageIndex, setpageIndex] = useState<number>(PageIndex); // Page index
  const [NextPageData, setNextPageData] = useState<any>(); // Next pages data modifications
  const [ManipulatedData, setManipulatedData] = useState([]); // Modified Array for rendering
  const [displayMoveToTop, setdisplayMoveToTop] = useState<string>('none');
  const [pageIndexUpdated, setpageIndexUpdated] = useState(false);

  const GetInboxMessageList = useSelector(
    (state: RootState) => state.InboxMessage.InboxList
  );
  const loading: boolean = useSelector(
    (state: RootState) => state.InboxMessage.Loading
  );
  const FilterData: boolean = useSelector(
    (state: RootState) => state.InboxMessage.FilterData
  );

  // First time modification
  if (GetInboxMessageList != undefined) {
    if (ManipulatedData.length == 0 && pageIndexUpdated == false) {
      GetInboxMessageList.forEach((element) => {
        if (element != undefined) {
          ManipulatedData.push(element);
        }
      });
    }
    // For Filter
    if (FilterData == true) {
      if (ManipulatedData.length != 0 && GetInboxMessageList.length != 0) {
        ManipulatedData.length = 0;
        GetInboxMessageList.forEach((element) => {
          if (element != undefined) {
            ManipulatedData.push(element);
          }
        });
      } else {
        ManipulatedData.length = 0;
      }
    }
    // After page increment data modifications
    else {
      if (
        NextPageData != undefined &&
        ManipulatedData.length != 0 &&
        pageIndexUpdated == true
      ) {
        if (
          NextPageData.GetMessagesResult != undefined &&
          NextPageData.GetMessagesResult.length != 0
        ) {
          if (
            NextPageData.GetMessagesResult[0].DetailsId !=
            ManipulatedData[0].DetailsId
          ) {
            NextPageData.GetMessagesResult.forEach((element) => {
              if (element != undefined) {
                ManipulatedData.push(element);
              }
            });
          }
        }
      }
    }
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
    asMonthId: '0',
    asOperator: '',
    asDate: '',
    asSortExp: "Insert_Date",
    asSortDirection: "DESC"
  };

  useEffect(() => {
    dispatch(getInboxList(getList));
  }, []);

  const [checked, setChecked] = useState(true);
  const [Id, setId] = useState({ DetailInfo: [], recieverInfo: [] });
  const pathname = window.location.pathname;
  const pageName = pathname.replace(
    '/RITeSchool/MessageCenter/msgCenter/',
    ''
  );

  const handleChange = (event) => {
    setChecked(true);
    const { value, name, checked } = event;
    // const { value, name } = event.target;

    const { DetailInfo, recieverInfo } = Id;

    if (checked) {
      setId({
        DetailInfo: [...DetailInfo, value],
        recieverInfo: [...recieverInfo, name]
      });
    } else {
      setId({
        DetailInfo: DetailInfo.filter((event) => event !== value),

        recieverInfo: recieverInfo.filter((event) => event !== name)
      });
    }
  };

  const moveToTrash = () => {
    const joinDetails = Id.DetailInfo.join(';');
    const joinReciever = Id.recieverInfo.join(';');
    const trashbody: any = {
      asSchoolId: asSchoolId,
      asMessageRecieverDetailsId: joinReciever,
      asMessageDetailsId: joinDetails,
      asIsArchive: 'Y',
      asIsCompeteDelete: 0,
      asFlag: 'Inbox'
    };

    MoveToTrashApi.MoveToTrash(trashbody)
      .then((data) => {
        if (pageName == 'Inbox') {
          toast.success('Message has been moved to the trash.');
          dispatch(getNextPageInboxList(getList));
        }
        setChecked(false);
        setId({
          DetailInfo: [],
          recieverInfo: []
        });
      })
      .catch((err) => {
        alert('error network');
      });
  };

  const Reset = () => {
    setChecked(false);
    setId({
      DetailInfo: [],
      recieverInfo: []
    });
  };

  const ScrollableDivRefference = document.getElementById('ScrollableDiv');

  const PageIndexIncrement = (): void => {
    setpageIndex(pageIndex + 1);
  };

  const scrolling = (): void => {
    //(ScrollableDivRefference.scrollHeight - ScrollableDivRefference.scrollTop <= 570) Page end condition
    if (ScrollableDivRefference.scrollTop >= 400) {
      setdisplayMoveToTop('flex');
    }
    if (ScrollableDivRefference.scrollTop < 400) {
      setdisplayMoveToTop('none');
    }
    if (
      ScrollableDivRefference.scrollHeight -
      ScrollableDivRefference.scrollTop <=
      570
    ) {
      setpageIndexUpdated(true);
      const UpdatedBody: IgetList = {
        asUserId: UserId,
        asAcademicYearId: AcademicYearId,
        asUserRoleId: RoleId,
        asSchoolId: asSchoolId,
        abIsSMSCenter: '0',
        asFilter: '',
        asPageIndex: pageIndex,
        asMonthId: '0',
        asOperator: '',
        asDate: '',
        asSortExp: "Insert_Date",
        asSortDirection: "DESC"
      };
      InboxMessageApi.GetInboxList(UpdatedBody)
        .then((response) => {
          setNextPageData(response.data); // Next page data setter
        })
        .catch((err) => {
          alert('error network');
        });
      PageIndexIncrement();
    }
  };

  const MoveToTop = (e) => {
    ScrollableDivRefference.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      setdisplayMoveToTop('none');
    }, 10);
  };

  return (
    <>
      {Id.DetailInfo.length !== 0 ? (
        <>
          <Box sx={{ px: 2 }}>
            <Box display="flex" flexDirection="row" justifyContent="flex-end">
              <ButtonPrimary
                color="primary"
                endIcon={<DeleteIcon />}
                onClick={() => moveToTrash()}
              >
                DELETE
              </ButtonPrimary>
              &nbsp;&nbsp;
              <ButtonPrimary
                color="secondary"
                endIcon={<ReplayIcon />}
                onClick={() => Reset()}
              >
                RESET
              </ButtonPrimary>
            </Box>
          </Box>
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
        {loading ? (
          <SuspenseLoader />
        ) : ManipulatedData === null ||
          ManipulatedData.length == 0 ||
          ManipulatedData == undefined ? (
          <ErrorMessages Error={'No message found'} />
        ) : (
          <>
            {ManipulatedData.map(
              (GetInboxMessageListitem: GetInboxMessageResult, i) => (
                <List3
                  data={GetInboxMessageListitem}
                  key={i}
                  handleChange={handleChange}
                  check={checked}
                  Attachments={GetInboxMessageListitem.Attachment}
                  FromRoute={'/Inbox'}
                />
              )
            )}
          </>
        )}
        <Avatar
          sx={{
            display: displayMoveToTop,
            position: 'fixed',
            bottom: '95px',
            zIndex: '4',
            left: '15px',
            p: '2px',
            width: 50,
            height: 50,
            backgroundColor: 'white',
            boxShadow:
              '5px 5px 10px rgba(163, 177, 198, 0.4), -5px -5px 10px rgba(255, 255, 255, 0.3) !important'
          }}
          onClick={MoveToTop} // Close function
        >
          <KeyboardArrowUpRoundedIcon fontSize="large" color="success" />
        </Avatar>
      </div>
    </>
  );
}

export default Inbox;
