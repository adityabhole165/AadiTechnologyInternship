import { AddTwoTone } from '@mui/icons-material';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Download from '@mui/icons-material/Download';
import MarkunreadMailboxIcon from '@mui/icons-material/MarkunreadMailbox';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import { default as QuestionMark, default as QuestionMarkIcon } from '@mui/icons-material/QuestionMark';
import SearchTwoTone from '@mui/icons-material/SearchTwoTone';
import SmsIcon from '@mui/icons-material/Sms';
import SmsFailedIcon from '@mui/icons-material/SmsFailed';
import { Box, Card, Grid, IconButton, Stack, TextField, Tooltip, Typography } from '@mui/material';
import { blue, green, grey, red, yellow } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AlertContext } from 'src/contexts/AlertContext';
import { IDeleteSMSBody, IExportSentItemsBody, IGetSentItemsBody } from 'src/interfaces/SentSms/Sentsms';
import SuspenseLoader from 'src/layouts/components/SuspenseLoader';
import { CDADeleteSMSApi, CDAExportSentItems, CDAGetSentItems, CDAResendSMS, CDAResetDelete } from 'src/requests/SentSms/ReqSentsms';
// import SortingArrowheads from 'src/assets/img/sorting icon/icons-sorting-arrowhead.png';
import { Styles } from 'src/assets/style/student-style';
import CommonPageHeader from 'src/components/CommonPageHeader';
import { DeleteScheduleSMSBody, IGetScheduleSMSBody, IMobileNumber, INewSmsList, ISmsCountBody } from 'src/interfaces/Student/SMSCenter';
import ButtonGroupComponent from 'src/libraries/ResuableComponents/ButtonGroupComponent';
import { CDADeleteScheduleSMS, CDAGetScheduleSMS, CDAResetDeleteScheduleSMS, getMobileNumber, getNewSmsList, getSmsCount } from 'src/requests/Student/SMSCenter';

import { encodeURL } from 'src/components/Common/Util';
import SentsmsList from 'src/components/SentSms/SentsmsList';
import SentsmsListAll from 'src/components/SentSms/SentsmsListAll';
import VerticalButtons from 'src/libraries/button/VerticalButtons';
import Legend from 'src/libraries/Legend/Legend';
import { RootState } from 'src/store';
import ReceivedSMSList from './RecievedSMSList';
import SchedulesmsList from './SchedulesmsList';
const PageSize = 20;
const Item = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  height: '61px',
  color: 'black',
  boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)'
}));

function SmsCenter() {
  const [dateFilter, setDateFilter] = useState<{ startDate: Date | null; endDate: Date | null }>({
    startDate: null,
    endDate: null,
  });
  const classes = Styles();
  const [filtered, setFiltered] = useState(false); // State to toggle between original and filtered list
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const SmsList = useSelector((state: RootState) => state.SmsCenter.SmsList);
  const NewSmsList = useSelector((state: RootState) => state.SmsCenter.NewSmsList);
  const SmsCount: any = useSelector((state: RootState) => state.SmsCenter.SmsCountDetails);
  const loading = useSelector((state: RootState) => state.SmsCenter.Loading);
  const MobileNumber = useSelector((state: RootState) => state.SmsCenter.MobileNumber);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const rowsPerPageOptions = [20, 50, 100, 200];
  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asSchoolId = localStorage.getItem('localSchoolId');
  const DesignationName = sessionStorage.getItem('DesignationName');
  const UserId = sessionStorage.getItem('Id');
  const RoleId = sessionStorage.getItem('RoleId');

  const [PagedSMS, setPagedSMS] = useState([]);
  const [NameSubject, setNameSubject] = useState('');
  const [SortExp, setSortExp] = useState('Insert_Date')
  const [SortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  let filteredList = []
  let TotalCount = []
  let uniqueTotalCount = []
  let singleTotalCount = 0
  useEffect(() => {
    filteredList = NewSmsList?.filter((item) => item.TotalRows !== undefined);
    TotalCount = filteredList?.map((item) => item.TotalRows);
    uniqueTotalCount = [...new Set(TotalCount)];
    singleTotalCount = uniqueTotalCount[0];
  }, [NewSmsList])


  const [activeTab, setActiveTab] = useState('');
  const [SortBy, setSortBy] = useState('Date');

  const pathname = window.location.pathname;
  const pageName =
    pathname.indexOf('/RITeSchool/Teacher/SmsCenter/') === -1
      ? pathname.replace('/RITeSchool/Teacher/SmsCenter', '')
      : pathname.replace('/RITeSchool/Teacher/SmsCenter/', '');

  useEffect(() => {
    const MobileNumber_body: IMobileNumber = {
      asSchoolId: asSchoolId,
      asAcademicYearId: asAcademicYearId,
      asUserId: UserId,
      asUserRoleId: RoleId,
    };

    const SmsCountBody: ISmsCountBody = {
      asUserId: UserId,
      asAcademicYearId: asAcademicYearId,
      asSchoolId: asSchoolId,
    };

    localStorage.setItem('url', window.location.pathname);
    dispatch(getMobileNumber(MobileNumber_body));
    dispatch(getSmsCount(SmsCountBody));
    setActiveTab(pageName === '' ? 'Received SMS' : pageName);
  }, []);

  // In your component, remove the `sortedAndFilteredSmsList` declaration and replace it with the following `useEffect`.

  useEffect(() => {
    let filteredAndSortedList = []
    if (NewSmsList.length > 0) {
      filteredAndSortedList = NewSmsList
        .filter(item => {
          if (!dateFilter.startDate && !dateFilter.endDate) return true;
          const itemDate = new Date(item.Date);
          if (dateFilter.startDate && !dateFilter.endDate) return itemDate >= dateFilter.startDate;
          if (!dateFilter.startDate && dateFilter.endDate) return itemDate <= dateFilter.endDate;
          return itemDate >= dateFilter.startDate && itemDate <= dateFilter.endDate;
        })
        .filter(item => {
          // Apply filter based on `NameSubject` input
          return item.UserName.toLowerCase().includes(NameSubject.toLowerCase()) ||
            item.Subject.toLowerCase().includes(NameSubject.toLowerCase());
        })
        .sort((a, b) => {
          let comparison = 0;
          if (SortBy === 'Date') {
            comparison = new Date(a.Date).getTime() - new Date(b.Date).getTime();
          } else if (SortBy === 'UserName') {
            comparison = a.UserName.localeCompare(b.UserName);
          } else if (SortBy === 'Subject') {
            comparison = a.Subject.localeCompare(b.Subject);
          }
          return SortDirection === 'asc' ? comparison : -comparison;
        });
    }
    setPagedSMS(filteredAndSortedList);
  }, [NewSmsList]);
  // }, [NewSmsList, dateFilter, SortBy, SortDirection]);

  const handleStartDateChange = (date: Date | null) => {
    setDateFilter(prevState => ({ ...prevState, startDate: date }));
  };

  const handleEndDateChange = (date: Date | null) => {
    setDateFilter(prevState => ({ ...prevState, endDate: date }));
  };

  const startRecord = (page - 1) * rowsPerPage + 1;
  const endRecord = Math.min(page * rowsPerPage, singleTotalCount);
  const pagecount = Math.ceil(singleTotalCount / rowsPerPage);

  const ChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const PageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  const SmsNewList_body: INewSmsList = {
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId,
    asUserId: UserId,
    asReceiverUserRoleId: RoleId,
    asStartIndex: (page - 1) * rowsPerPage,
    asPageSize: page * rowsPerPage
  };

  useEffect(() => {
    dispatch(getNewSmsList(SmsNewList_body))
  }, [page, rowsPerPage]);

  useEffect(() => {
    if (NewSmsList) {
      setPagedSMS(NewSmsList);
    }
  }, [NewSmsList]);

  const handleFilterClick = () => {
    setFiltered(!filtered);
    setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
  };

  // const displayList = filtered ? sortedAndFilteredSmsList : NewSmsList; // Implement pagination

  const handleTabClick = (tabName: string) => {
    if (tabName === 'Compose SMS') {
      navigate('/RiteSchool/Teacher/ComposeSMS', { state: { fromInternal: true } });
    }
    setActiveTab(tabName);
  };
  const clickClear = () => {
    localStorage.setItem('ViewSMSData', '');
  };
  const handleRegNoOrNameChange = (value) => {
    setNameSubject(value);
  };
  const clickSearch = () => {
    if (NameSubject === '') {
      setPagedSMS(NewSmsList);
    } else {
      const filteredSMS = NewSmsList.filter((item) => {
        const text1Match = item.UserName.toLowerCase().includes(NameSubject.toLowerCase());
        const text2Match = item.Subject.toLowerCase().includes(NameSubject.toLowerCase());
        return text1Match || text2Match;
      });
      setPagedSMS(filteredSMS);
    }
  };

  useEffect(() => {
    // Set PagedSMS to NewSmsList whenever it updates
    setPagedSMS(NewSmsList);
  }, [NewSmsList]);

  const handleSortChange = (column: string) => {
    if (SortBy === column) {
      setSortDirection(SortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDirection('asc');
    }
  };
  let url = "/RITeSchool/Student/viewsms/"



  /// sent sms start 
  const asUserId = Number(localStorage.getItem('UserId'));
  const [SmsName, setSmsName] = useState('');
  const [SmsName1, setSmsName1] = useState('');
  const [SmsListNew, setSmsListNew] = useState([]);
  const [SmsListIDNew, setSmsListIDNew] = useState('');
  const [NewsmsId, SetNewsmsId] = useState('');
  const [rowsPerPageNew, setRowsPerPageNew] = useState(20);
  const rowsPerPageOptionsNew = [20, 50, 100, 200];
  const [pageNew, setPageNew] = useState(1);
  const [pageNewSchedule, setPageNewSchedule] = useState(1);
  const startIndexNew = (pageNew - 1) * rowsPerPageNew;
  const endIndexNew = startIndexNew + rowsPerPageNew;
  const { showAlert, closeAlert } = useContext(AlertContext);
  const [sortExpression, setSortExpression] = useState('ORDER BY Insert_Date DESC ');
  const [sortExpression1, setSortExpression1] = useState('ORDER BY Insert_Date DESC ');
  const isPrincipal = DesignationName == 'Principal' && activeTab == 'AllSendItem';
  const buttonCount = DesignationName == 'Principal' ? 5 : 4;
  const [headerArray, setHeaderArray] = useState([
    { Id: 1, Header: 'To', SortOrder: null, sortKey: 'ORDER BY UserName' },
    { Id: 2, Header: 'SMS Text', SortOrder: null, sortKey: 'ORDER BY SMS_Text' },
    { Id: 3, Header: 'Sent Date', SortOrder: 'DESC', sortKey: 'ORDER BY Insert_Date' },
    { Id: 4, Header: 'Resend', SortOrder: null, sortKey: 'CreaterName' },
    // { Id: 5, Header: 'Status', SortOrder: 'DESC', sortKey: 'Created_Date' },

  ]);


  const [headerArray1, setHeaderArray1] = useState([
    { Id: 0, Header: 'From', SortOrder: null, sortKey: 'ORDER BY UserName' },
    { Id: 1, Header: 'To', SortOrder: null, sortKey: 'ORDER BY UserName' },
    { Id: 2, Header: 'SMS Text', SortOrder: null, sortKey: 'ORDER BY SMS_Text' },
    { Id: 3, Header: 'Sent Date', SortOrder: 'DESC', sortKey: 'ORDER BY Insert_Date' },
    { Id: 4, Header: 'Resend', SortOrder: null, sortKey: 'CreaterName' },
    // { Id: 5, Header: 'Status', SortOrder: 'DESC', sortKey: 'Created_Date' },

  ]);









  const handleHeaderClick = (updatedHeaderArray) => {
    setHeaderArray(updatedHeaderArray);
    const sortField = updatedHeaderArray.find(header => header.SortOrder !== null);
    const newSortExpression = sortField ? `${sortField.sortKey} ${sortField.SortOrder}` : 'Created_Date desc';
    setSortExpression(newSortExpression);
  };

  const handleHeaderClick1 = (updatedHeaderArray) => {
    setHeaderArray1(updatedHeaderArray);
    const sortField = updatedHeaderArray.find(header => header.SortOrder !== null);
    const newSortExpression = sortField ? `${sortField.sortKey} ${sortField.SortOrder}` : 'Created_Date desc';
    setSortExpression1(newSortExpression);
  };


  const USGetSentItems: any = useSelector(
    (state: RootState) => state.SentSms.ISGetSentItems
  );

  const Loading: any = useSelector((state: RootState) => state.SentSms.Loading);


  const totalRowsNew = USGetSentItems.length > 0 ? USGetSentItems[0].TotalRows : null;

  const DeleteSMS = useSelector(
    (state: RootState) => state.SentSms.ISDeleteSMS
  );
  const UsExportSentItems = useSelector(
    (state: RootState) => state.SentSms.ISExportSentItems
  );
  const ResendSMS: any = useSelector(
    (state: RootState) => state.SentSms.ISResendSMS
  );

  const ClickValue = (value) => {
    setSmsName(value);
  };

  const ClickValue1 = (value) => {
    setSmsName1(value);
  };

  const clickSearchNew1 = () => {
    if (SmsName1 === '') {
      setSmsListNew(USGetSentItems);
    } else {
      setSmsListNew(
        USGetSentItems.filter((item) => {
          const text1Match = item.SenderName.toLowerCase().includes(
            SmsName.toLowerCase()
          );
          const text2Match = item.StatusId.toLowerCase().includes(
            SmsName.toLowerCase()
          );
          const text3Match = item.Subject.toLowerCase().includes(
            SmsName.toLowerCase()
          );
          const text4Match = item.Insert_Date.toLowerCase().includes(
            SmsName.toLowerCase()
          );

          return (text1Match || text2Match) || (text3Match || text4Match);
        })
      );
    }
    dispatch(CDAGetSentItems(GetSentItemsBody));
  };


  const clickSearchNew = () => {
    clickSearchNew1()
    if (SmsName === '') {
      setSmsListNew(USGetSentItems);
    } else {
      setSmsListNew(
        USGetSentItems.filter((item) => {
          const text1Match = item.SenderName.toLowerCase().includes(
            SmsName.toLowerCase()
          );
          const text2Match = item.StatusId.toLowerCase().includes(
            SmsName.toLowerCase()
          );


          return text1Match || text2Match;
        })
      );
    }
    dispatch(CDAGetSentItems(GetSentItemsBody));
  };

  const startRecordNew = (pageNew - 1) * rowsPerPageNew + 1;
  const endRecordNew = Math.min(pageNew * rowsPerPageNew, totalRowsNew);
  const pagecountNew = Math.ceil(totalRowsNew / rowsPerPageNew);
  const ChangeRowsPerPageNew = (event) => {
    setRowsPerPageNew(parseInt(event.target.value, 10));
    setPageNew(1);
  };

  const PageChangeNew = (pageNumber) => {
    setPageNew(pageNumber);
  };

  const GetSentItemsBody: IGetSentItemsBody = {
    asSchoolId: Number(asSchoolId),
    asUser_Id: asUserId,
    asReceiver_User_Role_Id: 2,
    asAcademic_Year_Id: Number(asAcademicYearId),
    asSortExp: isPrincipal ? sortExpression1 : sortExpression,
    asprm_StartIndex: startIndexNew,
    asPageSize: endIndexNew,
    asName: SmsName,
    asContent: SmsName1,
    asViewAllSMS: activeTab == 'AllSendItem' ? 1 : 0
  }





  const ExportSentItemsBody: IExportSentItemsBody = {
    asSchoolId: Number(asSchoolId),
    asUser_Id: asUserId,
    asReceiver_User_Role_Id: 2,
    asAcademic_Year_Id: Number(asAcademicYearId),
    asSortExp: isPrincipal ? sortExpression1 : sortExpression,
    asprm_StartIndex: startIndexNew,
    asPageSize: 1000,
    asName: SmsName,
    asContent: SmsName1,
    asViewAllSMS: activeTab == 'AllSendItem' ? 1 : 0

  };

  const clickdelete = () => {
    if (!SmsListIDNew || SmsListIDNew.length === 0) {
      showAlert({
        title: 'Error',
        message: 'At least one SMS should be selected for deletion.',
        variant: 'error',
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        onConfirm: () => {
          closeAlert();
        },
        onCancel: () => {
          closeAlert();
        },

      });
      return;
    }

    const DeleteSMSBody: IDeleteSMSBody = {
      "asSMS_Id": SmsListIDNew.toString(),
      "asSchoolId": Number(asSchoolId)
    };

    showAlert({
      title: 'Please Confirm',
      message:
        'Are you sure you want to delete the selected SMS(s)?',
      variant: 'warning',
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
      onCancel: () => {
        closeAlert();
      },
      onConfirm: () => {
        dispatch(CDADeleteSMSApi(DeleteSMSBody));
        closeAlert();
      }
    });
  };

  useEffect(() => {
    if (DeleteSMS != '') {
      dispatch(CDAResetDelete());
      toast.success(DeleteSMS);

      dispatch(CDAGetSentItems(GetSentItemsBody));

    }
  }, [DeleteSMS]);

  const [SMS_Text, SetSMS_Text] = useState('');
  const [Display_Text, SetDisplay_Text] = useState('');
  const [RoleIdNew, SetRoleIdNew] = useState('');
  const [UserIdNew, SetUserIdNew] = useState('');

  useEffect(() => {
    // Check if ResendSMS has data and set state variables
    if (ResendSMS && ResendSMS.length > 0) {
      const smsData = ResendSMS[0]; // Access the first object in the array
      SetSMS_Text(smsData.SMS_Text);
      SetDisplay_Text(smsData.Display_Text);
      SetRoleIdNew(smsData.RoleId);
      SetUserIdNew(smsData.UserId);
    }
  }, [ResendSMS]);

  const handleClickEdit = (Id) => {

    const ResendSMSBody = {
      asSmsId: Number(Id),
      asSchoolId: Number(asSchoolId),
      asAcademicYearId: Number(asAcademicYearId)
    };

    dispatch(CDAResendSMS(ResendSMSBody));

    if (SMS_Text && Display_Text && RoleIdNew && UserIdNew) {
      let state1 = { SMS_Text, Display_Text, RoleId, UserId, fromInternal: true, };
      navigate('/RITeSchool/Teacher/ComposeSMS', { state: state1 });
    }

  };


  const NewSms = (ViewId) => {
    navigate('/RITeSchool/Teacher/ComposeSMS', { state: { fromInternal: true } });
  };



  const Changevalue = (updatedList) => {
    setSmsListNew(updatedList);
    const activeItems = updatedList.filter(item => item.IsActive).map(item => item.Id);
    setSmsListIDNew(activeItems);
  };

  const clickTitle1 = (Id) => {
    navigate('/RITeSchool/Teacher/ViewSmsNew/' + encodeURL(Id), { state: { fromInternal: true } }
    );
  };

  const convertToCSV = () => {
    let csvContent = ""
    if (UsExportSentItems.length > 0) {
      // Prepare headers
      const headers = [
        'RowID',
        'From',
        'To',
        'SMSText',
        'SendDate',
      ];

      // Prepare rows
      const rows = UsExportSentItems.map(item => {
        const row = [
          item.RowID,
          item.From,
          item.To,
          item.SMSText,
          item.SendDate,



        ];

        return row;
      });

      csvContent = [
        headers.join(','),
        ...rows.map(row =>
          row.map(cell =>
            `"${String(cell || '').replace(/"/g, '""')}"`
          ).join(',')
        ),
      ].join('\n');
    }
    return csvContent;
  };

  const exportToExcel = () => {
    try {
      const csvContent = convertToCSV();
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `SentSmsDetails.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error exporting to CSV:', error);
    }
  };

  const Exportremark = () => {
    const confirmMessage = "This Action will show only saved details. Do you want to continue?";


    showAlert({
      title: 'Please Confirm',
      message: confirmMessage,
      variant: 'warning',
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
      onCancel: () => {
        closeAlert();
      },
      onConfirm: () => {
        exportToExcel();


        closeAlert();
      }
    });

  };


  useEffect(() => {
    dispatch(CDAExportSentItems(ExportSentItemsBody));
  }, [startIndexNew, endIndexNew, sortExpression, sortExpression1, isPrincipal]);

  useEffect(() => {
    dispatch(CDAGetSentItems(GetSentItemsBody));
  }, [rowsPerPageNew, sortExpression, activeTab, sortExpression]);



  useEffect(() => {
    setSmsListNew(USGetSentItems);
  }, [USGetSentItems]);



  //sheduled Sms 

  const GetScheduleSMSList = useSelector((state: RootState) => state.SmsCenter.GetScheduleSMSBodyIS);
  const DeleteScheduleSMS = useSelector((state: RootState) => state.SmsCenter.DeleteScheduleSMSIS);
  const LoadingScheduled = useSelector((state: RootState) => state.SmsCenter.Loading);


  const totalRowsScheduleSMS = GetScheduleSMSList.length > 0 ? GetScheduleSMSList[0].TotalRows : null;
  const [sortExpressionScheduleSMS, setSortExpressionScheduleSMS] = useState('ORDER BY Insert_Date DESC ');
  const [SmsListIDScheduleSMS, setSmsListIDScheduleSMS] = useState('');

  const [rowsPerPageScheduleSMS, setRowsPerPageScheduleSMS] = useState(20);
  const rowsPerPageOptionsScheduleSMS = [20, 50, 100, 200];
  const [pageScheduleSMS, setPageScheduleSMS] = useState(1);
  const startIndexScheduleSMS = (pageScheduleSMS - 1) * rowsPerPageScheduleSMS;
  const endIndexScheduleSMS = startIndexScheduleSMS + rowsPerPageScheduleSMS;


  const startRecordScheduleSMS = (pageScheduleSMS - 1) * rowsPerPageScheduleSMS + 1;
  const endRecordScheduleSMS = Math.min(pageScheduleSMS * rowsPerPageScheduleSMS, totalRowsScheduleSMS);
  const pagecountScheduleSMS = Math.ceil(totalRowsScheduleSMS / rowsPerPageScheduleSMS);

  const ChangeRowsPerPageScheduleSMS = (event) => {
    setRowsPerPageScheduleSMS(parseInt(event.target.value, 10));
    setPageScheduleSMS(1);
  };

  const PageChangeScheduleSMS = (pageNumber) => {
    setPageScheduleSMS(pageNumber);
  };

  const [SmsListScheduleSMS, setSmsListScheduleSMS] = useState([]);
  useEffect(() => {
    setSmsListScheduleSMS(GetScheduleSMSList);
  }, [GetScheduleSMSList]);
  const [headerArrayScheduleSMS, setHeaderArrayScheduleSMS] = useState([
    { Id: 1, Header: 'To', SortOrder: null, sortKey: 'ORDER BY UserName' },
    { Id: 2, Header: 'SMS Text', SortOrder: null, sortKey: 'ORDER BY SMS_Text' },
    { Id: 3, Header: 'Scheduled Date', SortOrder: 'DESC', sortKey: 'ORDER BY Insert_Date' },

    // { Id: 5, Header: 'Status', SortOrder: 'DESC', sortKey: 'Created_Date' },

  ]);

  const handleHeaderClickScheduleSMS = (updatedHeaderArray) => {
    setHeaderArrayScheduleSMS(updatedHeaderArray);
    const sortField = updatedHeaderArray.find(header => header.SortOrder !== null);
    const newSortExpression = sortField ? `${sortField.sortKey} ${sortField.SortOrder}` : 'Created_Date desc';
    setSortExpressionScheduleSMS(newSortExpression);
  };


  const GetScheduleSMSBody: IGetScheduleSMSBody = {
    "asSchoolId": Number(asSchoolId),
    "asUserId": asUserId,
    "asReceiverUserRoleId": 2,
    "asAcademicYearId": Number(asAcademicYearId),
    "asSortExp": sortExpressionScheduleSMS,
    "asStartIndex": startIndexScheduleSMS,
    "asPageSize": endIndexScheduleSMS
  }

  const DeleteScheduleSMSBody: DeleteScheduleSMSBody = {

    "asSMSIds": SmsListIDScheduleSMS.toString(),
    "asSchoolId": Number(asSchoolId),
    "asAcademicYearId": Number(asAcademicYearId)

  }



  const ChangevalueScheduleSMS = (updatedList) => {
    setSmsListScheduleSMS(updatedList);
    const activeItems = updatedList.filter(item => item.IsActive).map(item => item.Id);
    setSmsListIDScheduleSMS(activeItems);
  };


  const clickdeleteScheduleSMS = () => {
    if (!SmsListIDScheduleSMS || SmsListIDScheduleSMS.length === 0) {
      showAlert({
        title: 'Error',
        message: 'At least one SMS should be selected for deletion.',
        variant: 'error',
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        onConfirm: () => {
          closeAlert();
        },
        onCancel: () => {
          closeAlert();
        },

      });
      return;
    }


    showAlert({
      title: 'Please Confirm',
      message:
        'Are you sure you want to delete the selected SMS(s)?',
      variant: 'warning',
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
      onCancel: () => {
        closeAlert();
      },
      onConfirm: () => {
        dispatch(CDADeleteScheduleSMS(DeleteScheduleSMSBody));
        closeAlert();
      }
    });
  };


  useEffect(() => {
    if (DeleteScheduleSMS != '') {
      dispatch(CDAResetDeleteScheduleSMS());
      toast.success(DeleteScheduleSMS);

      dispatch(CDAGetScheduleSMS(GetScheduleSMSBody));

    }
  }, [DeleteScheduleSMS]);




  const clickTitleScheduleSMS = (Id) => {
    navigate('/RITeSchool/Teacher/ViewSmsNew/' + encodeURL(Id), { state: { fromInternal: true } }

    );
  };


  useEffect(() => {

    dispatch(CDAGetScheduleSMS(GetScheduleSMSBody));

  }, [sortExpressionScheduleSMS, startIndexScheduleSMS, endIndexScheduleSMS]);

  const [DefaultValue, setDefaultValue] = useState(2)
  const clickItem = (value) => {
    const foundItem = ItemList.find(Item => Item.Value === value);
    handleTabClick(foundItem.Name)
    setDefaultValue(value)
  }

  const LegendArray = [
    {
      id: 1,
      Name: 'Processed SMS',
      Value: <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <Box
          sx={{
            width: 23,
            height: 23,
            backgroundColor: blue[100],
            border: "1px solid black",

          }}
        />
      </Box>
    }
  ]


  const ItemList = [{
    Id: 1,
    Name: "Compose SMS",
    Value: 1,
    Icon: <AddCircleIcon onClick={clickItem}
      sx={{ mt: 0.5, color: '#38548A' }} className={classes.IconSize} />,
    Badge: ""
  },
  {
    Id: 2,
    Name: "Received SMS",
    Value: 2,
    Icon: <MarkunreadMailboxIcon onClick={clickItem}
      sx={{ mt: 0.5, color: '#38548A' }} className={classes.IconSize} />,
    Badge: ""
  },
  {
    Id: 3,
    Name: "Send Item",
    Value: 3,
    Icon: <SmsIcon onClick={clickItem}
      sx={{ mt: 0.5, color: '#38548A' }} className={classes.IconSize} />,
    Badge: ""
  },
  {
    Id: 4,
    Name: "Scheduled SMS",
    Value: 4,
    Icon: <AccessAlarmIcon onClick={clickItem}
      sx={{ mt: 0.5, color: '#38548A' }} className={classes.IconSize} />,
    Badge: ""
  },]
  return (
    <Box sx={{ px: 2 }}>

      <CommonPageHeader
        navLinks={[
          {
            title: 'SMS Center',
            path: '/RITeSchool/Student/SmsCenter',
          },
        ]}
        rightActions={
          <>

            {activeTab == 'Received SMS' &&
              <>
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  justifyContent="space-between"
                  alignItems="right"
                  gap={1}
                  sx={{
                    mt: { xs: 0, sm: 0 },
                    flexWrap: { xs: 'nowrap', sm: 'nowrap' }
                  }}
                >
                  <Grid
                    item
                    xs={12}
                    display="flex"
                    justifyContent={{ xs: 'flex-start', sm: 'flex-start' }}
                  >
                    <TextField
                      sx={{ width: { xs: '40vw', sm: '20vw' } }}
                      fullWidth
                      label="To / From / SMS Text"
                      value={NameSubject}
                      variant={'outlined'}
                      size={"small"}
                      onChange={(e) => {
                        handleRegNoOrNameChange(e.target.value);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === 'Tab') {
                          clickSearch();
                        }
                      }}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    display="flex"
                    justifyContent={{ xs: 'flex-start', sm: 'flex-start' }}
                  ><Stack
                    direction="row"
                    gap={1}
                    alignItems="right"
                    sx={{
                      flexWrap: { xs: 'wrap', sm: 'nowrap' },
                      justifyContent: { xs: 'flex-start', sm: 'flex-start' }
                    }}
                  >
                      <IconButton
                        onClick={clickSearch}
                        sx={{
                          background: (theme) => theme.palette.primary.main,
                          color: 'white',
                          '&:hover': {
                            backgroundColor: (theme) => theme.palette.primary.dark
                          }
                        }}
                      >
                        <SearchTwoTone />
                      </IconButton>
                      <Box>
                        <Tooltip
                          title={
                            'School SMS will be sent to below listed number(s). To add/update the number, please send the information to admin staff via message center.'
                          }
                        >
                          <IconButton
                            sx={{
                              color: 'white',
                              backgroundColor: yellow[700],
                              height: '36px !important',
                              ':hover': { backgroundColor: yellow[800] },
                            }}
                          >
                            <PriorityHighIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                      <Box>
                        <Tooltip title={`Displays recived sms/ send sms/ scheduled sms/all send sms list.`}>
                          <IconButton
                            sx={{
                              color: 'white',
                              backgroundColor: grey[500],
                              height: '36px !important',
                              ':hover': { backgroundColor: grey[600] },
                            }}
                          >
                            <QuestionMarkIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Stack>
                  </Grid>
                </Stack>
              </>

            }


            {activeTab == 'Send Item' && (
              <>
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  justifyContent="space-between"
                  alignItems="right"
                  gap={1}
                  sx={{
                    mt: { xs: 0, sm: 0 },
                    flexWrap: { xs: 'nowrap', sm: 'nowrap' }
                  }}
                >
                  <Grid
                    item
                    xs={12}
                    display="flex"
                    justifyContent={{ xs: 'flex-start', sm: 'flex-start' }}
                  >
                    <TextField
                      sx={{ width: { xs: '40vw', sm: '20vw' } }}
                      fullWidth
                      label="Name / Reg. No. / User Name :"
                      value={SmsName}
                      variant={'outlined'}
                      size={"small"}
                      inputProps={{ maxLength: 50 }}
                      onChange={(e) => {
                        ClickValue(e.target.value);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === 'Tab') {
                          clickSearchNew();
                        }
                      }}
                    />
                  </Grid><Grid
                    item
                    xs={12}
                    display="flex"
                    justifyContent={{ xs: 'flex-start', sm: 'flex-start' }}
                  >
                    <TextField
                      sx={{ width: { xs: '40vw', sm: '20vw' } }}
                      fullWidth
                      label="Content :"
                      value={SmsName1}
                      variant={'outlined'}
                      size={"small"}
                      inputProps={{ maxLength: 100 }}
                      onChange={(e) => {
                        ClickValue1(e.target.value);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === 'Tab') {
                          clickSearchNew();
                        }
                      }}
                    />
                  </Grid><Grid
                    item
                    xs={12}
                    display="flex"
                    justifyContent={{ xs: 'flex-start', sm: 'flex-start' }}
                  ><Stack
                    direction="row"
                    gap={1}
                    alignItems="right"
                    sx={{
                      flexWrap: { xs: 'wrap', sm: 'nowrap' },
                      justifyContent: { xs: 'flex-start', sm: 'flex-start' }
                    }}
                  >
                      <IconButton
                        onClick={clickSearchNew}
                        sx={{
                          background: (theme) => theme.palette.primary.main,
                          color: 'white',
                          '&:hover': {
                            backgroundColor: (theme) => theme.palette.primary.dark
                          }
                        }}
                      >
                        <SearchTwoTone />
                      </IconButton>


                      {SmsListNew.length > 0 && <Box>
                        <Tooltip title={"Delete"}>
                          <IconButton
                            onClick={clickdelete}

                            sx={{
                              color: 'white',
                              backgroundColor: red[500],
                              '&:hover': {
                                // color: red[300],
                                backgroundColor: red[600]
                              }
                            }}



                          >
                            <DeleteForeverIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>}


                      <Box>
                        <Tooltip title={'Export'}>
                          <IconButton
                            sx={{
                              color: 'white',
                              backgroundColor: blue[500],
                              '&:hover': {
                                backgroundColor: blue[600]
                              }
                            }}
                            onClick={Exportremark}  >
                            <Download />
                          </IconButton>
                        </Tooltip>

                      </Box>
                      <Tooltip title={'New Sms'}>
                        <IconButton
                          onClick={NewSms}
                          sx={{
                            color: 'white',
                            backgroundColor: green[500],
                            height: '36px !important',
                            ':hover': { backgroundColor: green[600] },

                          }}
                        >
                          <AddTwoTone />
                        </IconButton>
                      </Tooltip>


                      <Box>
                        <Tooltip title={' Displays recived sms/ send sms/ scheduled sms/all send sms list.'}>
                          <IconButton
                            sx={{
                              color: 'white',
                              backgroundColor: grey[500],
                              '&:hover': {
                                backgroundColor: grey[600]
                              }
                            }}
                          >
                            <QuestionMark />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Stack>
                  </Grid>
                </Stack>
              </>
            )}


            {activeTab == 'AllSendItem' && (
              <>

                <TextField
                  sx={{ width: { xs: '40vw', sm: '20vw' } }}
                  fullWidth
                  label="Name / Reg. No. / User Name :"
                  value={SmsName}
                  variant={'outlined'}
                  size={"small"}
                  inputProps={{ maxLength: 50 }}
                  onChange={(e) => {
                    ClickValue(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === 'Tab') {
                      clickSearchNew();
                    }
                  }}
                />

                <TextField
                  sx={{ width: { xs: '40vw', sm: '20vw' } }}
                  fullWidth
                  label="Content :"
                  value={SmsName1}
                  variant={'outlined'}
                  size={"small"}
                  inputProps={{ maxLength: 100 }}
                  onChange={(e) => {
                    ClickValue1(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === 'Tab') {
                      clickSearchNew();
                    }
                  }}
                />

                <IconButton
                  onClick={clickSearchNew}
                  sx={{
                    background: (theme) => theme.palette.primary.main,
                    color: 'white',
                    '&:hover': {
                      backgroundColor: (theme) => theme.palette.primary.dark
                    }
                  }}
                >
                  <SearchTwoTone />
                </IconButton>


                {SmsListNew.length > 0 && <Box>
                  <Tooltip title={"Delete"}>
                    <IconButton
                      onClick={clickdelete}

                      sx={{
                        color: 'white',
                        backgroundColor: red[500],
                        '&:hover': {
                          // color: red[300],
                          backgroundColor: red[600]
                        }
                      }}



                    >
                      <DeleteForeverIcon />
                    </IconButton>
                  </Tooltip>
                </Box>}


                <Box>
                  <Tooltip title={'Export'}>
                    <IconButton
                      sx={{
                        color: 'white',
                        backgroundColor: blue[500],
                        '&:hover': {
                          backgroundColor: blue[600]
                        }
                      }}
                      onClick={Exportremark}  >
                      <Download />
                    </IconButton>
                  </Tooltip>

                </Box>
                <Tooltip title={'New Sms'}>
                  <IconButton
                    onClick={NewSms}
                    sx={{
                      color: 'white',
                      backgroundColor: green[500],
                      height: '36px !important',
                      ':hover': { backgroundColor: green[600] },

                    }}
                  >
                    <AddTwoTone />
                  </IconButton>
                </Tooltip>


                <Box>
                  <Tooltip title={' Displays recived sms/ send sms/ scheduled sms/all send sms list.'}>
                    <IconButton
                      sx={{
                        color: 'white',
                        backgroundColor: grey[500],
                        '&:hover': {
                          backgroundColor: grey[600]
                        }
                      }}
                    >
                      <QuestionMark />
                    </IconButton>
                  </Tooltip>
                </Box>




              </>
            )}


            {activeTab == 'Scheduled SMS' && (
              <>
                {SmsListNew.length > 0 && <Box>
                  <Tooltip title={"Delete"}>
                    <IconButton
                      onClick={clickdeleteScheduleSMS}

                      sx={{
                        color: 'white',
                        backgroundColor: red[500],
                        '&:hover': {
                          // color: red[300],
                          backgroundColor: red[600]
                        }
                      }}



                    >
                      <DeleteForeverIcon />
                    </IconButton>
                  </Tooltip>
                </Box>}



                <Tooltip title={'New Sms'}>
                  <IconButton
                    onClick={NewSms}
                    sx={{
                      color: 'white',
                      backgroundColor: green[500],
                      height: '36px !important',
                      ':hover': { backgroundColor: green[600] },

                    }}
                  >
                    <AddTwoTone />
                  </IconButton>
                </Tooltip>


                <Box>
                  <Tooltip title={' Displays recived sms/ send sms/ scheduled sms/all send sms list.'}>
                    <IconButton
                      sx={{
                        color: 'white',
                        backgroundColor: grey[500],
                        '&:hover': {
                          backgroundColor: grey[600]
                        }
                      }}
                    >
                      <QuestionMark />
                    </IconButton>
                  </Tooltip>
                </Box>
              </>
            )}

          </>
        }
      />

      <Box>


        <Grid container item spacing={1}>
          {/* <Grid item sx={{ minWidth: '10%', pr: 1, pb: 2 }}> */}

          <Grid item xs={12} sm={3} md={2} lg={1.5}>
            <VerticalButtons ItemList={ItemList} DefaultValue={DefaultValue} clickItem={clickItem} />
          </Grid>

          {/* <Grid item sx={{ minWidth: '90%', maxWidth: activeTab === 'AllSendItem' ? '90%' : 'auto', p: 2, background: 'white', borderRadius: '10px' }}> */}
          <Grid item xs={12} sm={9} md={10} lg={10.5}>
            {activeTab == 'AllSendItem' && (

              <Box mb={1} sx={{ background: 'white', p: 2 }}>
                {(Loading) && <SuspenseLoader />}
                {SmsListNew.length > 0 && <Box mb={0} sx={{ background: 'white' }}>
                  {
                    SmsListNew.length > 0 ? (
                      <Box style={{ flex: 1, textAlign: 'center' }}>
                        <Typography variant="subtitle1" sx={{ margin: '16px 0', textAlign: 'center' }}>
                          <Box component="span" fontWeight="fontWeightBold">
                            {startRecordNew} to {endRecordNew}
                          </Box>
                          {' '}out of{' '}
                          <Box component="span" fontWeight="fontWeightBold">
                            {totalRowsNew}
                          </Box>{' '}
                          {totalRowsNew === 1 ? 'record' : 'records'}
                        </Typography>
                      </Box>

                    ) : (
                      <span></span>

                    )
                  }
                  <Box>
                    <SentsmsListAll
                      HeaderArray={headerArray1}
                      ItemList={SmsListNew}
                      ClickHeader={handleHeaderClick1}
                      clickEdit={handleClickEdit}
                      clickchange={Changevalue}
                      clickTitle={clickTitle1}
                      isPrincipal={isPrincipal}
                    /></Box>
                  {
                    endRecordNew > 19 ? (
                      <ButtonGroupComponent
                        rowsPerPage={rowsPerPageNew}
                        ChangeRowsPerPage={ChangeRowsPerPageNew}
                        rowsPerPageOptions={rowsPerPageOptionsNew}
                        PageChange={PageChangeNew}
                        pagecount={pagecountNew}
                      />

                    ) : (
                      <span></span>

                    )
                  }
                </Box>
                }

                {
                  SmsListNew.length == 0 && !Loading ? <Typography
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
                    <b>No Records Found.</b>
                  </Typography>
                    : (
                      <span></span>
                    )
                }
              </Box>
            )}

            {activeTab == 'Received SMS' && (
              <Box mb={1} sx={{ background: 'white', p: 2 }}>

                <Grid container item spacing={2}  >
                  <Grid item xs={12} sm={6} md={3} >
                    <Card sx={{ backgroundColor: blue[100], display: 'flex', alignItems: 'center', p: 2, borderRadius: '10px' }}>
                      <SmsIcon sx={{ color: blue[600], fontSize: 36, mr: 2 }} />
                      <Box>
                        <Typography variant="h6" color="blue">
                          Free SMS
                        </Typography>
                        <Typography variant="h4">{SmsCount.AllowedSMSCount ?? 0}</Typography>
                      </Box>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ backgroundColor: green[100], display: 'flex', alignItems: 'center', p: 2, borderRadius: '10px' }}>
                      <SmsIcon sx={{ color: green[600], fontSize: 36, mr: 2 }} />
                      <Box>
                        <Typography variant="h6" color="green">
                          Sent SMS
                        </Typography>
                        <Typography variant="h4">{SmsCount.SentSMSCount ?? 0}</Typography>
                      </Box>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3} >
                    <Card sx={{ backgroundColor: blue[100], display: 'flex', alignItems: 'center', p: 2, borderRadius: '10px' }}>
                      <SmsFailedIcon sx={{ color: blue[600], fontSize: 36, mr: 2 }} />
                      <Box>
                        <Typography variant="h6" color="blue">
                          Balance SMS
                        </Typography>
                        <Typography variant="h4">0</Typography>
                      </Box>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3} >
                    <Card sx={{ backgroundColor: red[100], display: 'flex', alignItems: 'center', p: 2, borderRadius: '10px' }}>
                      <SmsFailedIcon sx={{ color: red[600], fontSize: 36, mr: 1 }} />
                      <Box>
                        <Typography variant="h6" color="red">
                          Exceeded SMS
                        </Typography>
                        <Typography variant="h4">{SmsCount.ExceededSMSCount ?? 0}</Typography>
                      </Box>
                    </Card>
                  </Grid>
                </Grid>

                <Box mb={1} sx={{ p: 1, textAlign: 'center' }}>
                  <Typography variant="h6" >
                    <strong> Mobile Number : {MobileNumber}</strong>
                  </Typography>

                </Box>
                <ReceivedSMSList />

              </Box>
            )}


            {activeTab == 'Send Item' && (
              <Box mb={1} sx={{ background: 'white', p: 2 }}>
                {(Loading) && <SuspenseLoader />}

                {SmsListNew.length > 0 && <Box mb={1} sx={{ background: 'white' }}>
                  {
                    SmsListNew.length > 0 ? (
                      <div style={{ flex: 1, textAlign: 'center' }}>
                        <Typography variant="subtitle1" sx={{ margin: '16px 0', textAlign: 'center' }}>
                          <Box component="span" fontWeight="fontWeightBold">
                            {startRecordNew} to {endRecordNew}
                          </Box>
                          {' '}out of{' '}
                          <Box component="span" fontWeight="fontWeightBold">
                            {totalRowsNew}
                          </Box>{' '}
                          {totalRowsNew === 1 ? 'record' : 'records'}
                        </Typography>
                      </div>

                    ) : (
                      <span></span>

                    )
                  }
                  <SentsmsList
                    HeaderArray={headerArray}
                    ItemList={SmsListNew}
                    ClickHeader={handleHeaderClick}
                    clickEdit={handleClickEdit}
                    clickchange={Changevalue}
                    clickTitle={clickTitle1}

                    isPrincipal={isPrincipal}

                  />

                  {
                    endRecordNew > 19 ? (
                      <ButtonGroupComponent
                        rowsPerPage={rowsPerPageNew}
                        ChangeRowsPerPage={ChangeRowsPerPageNew}
                        rowsPerPageOptions={rowsPerPageOptionsNew}
                        PageChange={PageChangeNew}
                        pagecount={pagecountNew}

                      />

                    ) : (
                      <span></span>

                    )
                  }



                </Box>


                }

                {
                  SmsListNew.length == 0 && !Loading ? <Typography
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
                    <b>No Records Found.</b>
                  </Typography>
                    : (
                      <span></span>
                    )
                }






              </Box>
            )}




            {activeTab === 'Scheduled SMS' && (

              <Box mb={1} sx={{ background: 'white', p: 2 }}>

                <Box sx={{ background: 'white', p: 1, mb: 1 }}>
                  <Legend LegendArray={LegendArray} />
                </Box>

                {/* {(LoadingScheduled) && <SuspenseLoader />} */}

                {SmsListScheduleSMS.length > 0 && <Box mb={1} sx={{ background: 'white' }}>
                  {
                    SmsListScheduleSMS.length > 0 ? (
                      <div style={{ flex: 1, textAlign: 'center' }}>
                        <Typography variant="subtitle1" sx={{ margin: '16px 0', textAlign: 'center' }}>
                          <Box component="span" fontWeight="fontWeightBold">
                            {startRecordScheduleSMS} to {endRecordScheduleSMS}
                          </Box>
                          {' '}out of{' '}
                          <Box component="span" fontWeight="fontWeightBold">
                            {totalRowsScheduleSMS}
                          </Box>{' '}
                          {totalRowsScheduleSMS === 1 ? 'record' : 'records'}
                        </Typography>
                      </div>

                    ) : (
                      <span></span>

                    )
                  }
                  <SchedulesmsList
                    HeaderArray={headerArrayScheduleSMS}
                    ItemList={SmsListScheduleSMS}
                    ClickHeader={handleHeaderClickScheduleSMS}
                    clickchange={ChangevalueScheduleSMS}
                    clickTitle={clickTitleScheduleSMS}

                  />

                  {
                    endRecordScheduleSMS > 19 ? (
                      <ButtonGroupComponent
                        rowsPerPage={rowsPerPageScheduleSMS}
                        ChangeRowsPerPage={ChangeRowsPerPageScheduleSMS}
                        rowsPerPageOptions={rowsPerPageOptionsScheduleSMS}
                        PageChange={PageChangeScheduleSMS}
                        pagecount={pagecountScheduleSMS}

                      />

                    ) : (
                      <span></span>

                    )
                  }

                </Box>


                }

                {
                  SmsListNew.length == 0 && !Loading ? <Typography
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
                    <b>No Records Found.</b>
                  </Typography>
                    : (
                      <span></span>
                    )
                }

              </Box>

            )}

          </Grid>
        </Grid>
        <span
          style={{
            width: '95px',
            position: 'fixed',
            bottom: '70px',
            right: '60px'
          }}
        >
          <RouterLink
            style={{ textDecoration: 'none' }}
            to={`/${location.pathname.split('/')[1]
              }/Teacher/ComposeSMS`}
          >
            <Item onClick={clickClear}
              sx={{ fontSize: '10px', mr: 1, mb: '60px', borderRadius: '15px', backgroundColor: '#38548A', color: 'white' }}
            >
              <AddCircleIcon />
              <br />
              <b>Compose</b>
            </Item>
          </RouterLink>
        </span>
      </Box>
    </Box >
  );
}

export default SmsCenter;
