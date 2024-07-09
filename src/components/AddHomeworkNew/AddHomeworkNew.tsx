import Close from '@mui/icons-material/Close';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import SaveIcon from '@mui/icons-material/Save';
import SearchTwoTone from '@mui/icons-material/SearchTwoTone';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Stack, TextField, Tooltip, Typography, debounce } from '@mui/material';
import { green, grey, red } from '@mui/material/colors';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { IAllPublishUnpublishAddHomeworkBody, IDeleteHomeworkBody, IGetHomeworkDetailBody, IGetSubjectListForTeacherBody, IGetTeacherSubjectAndClassSubjectBody, IPublishUnPublishHomeworkBody, ISaveHomeworkBody } from 'src/interfaces/AssignHomework/IAddHomework';
import Datepicker from 'src/libraries/DateSelector/Datepicker';
import ErrorMessage1 from 'src/libraries/ErrorMessages/ErrorMessage1';
import MultipleFile from 'src/libraries/File/MultipleFile';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import SubjectList1 from 'src/libraries/ResuableComponents/SubjectList1';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import { GetHomeworkDetails, GetPublishUnpublishHomework, GetTeacherSubjectList, HomeworkDelete, HomeworkSave, PublishUnpublishAllHomework, PublishresetMessageNew, PublishresetMessageNewAll, SubjectListforTeacherDropdown, resetDeleteHomework, resetHomework } from 'src/requests/AssignHomework/requestAddHomework';
import { RootState } from 'src/store';
import UploadMultipleDialog from '../AssignHomework/UploadMultipleDialog';
import { formatDateAsDDMMMYYYY, getCalendarDateFormatDate, isFutureDate1 } from '../Common/Util';
import CommonPageHeader from '../CommonPageHeader';
import SelectedsubjectList from './SelectedsubjectList';
const AddHomeworkNew = () => {
  const { TeacherName, ClassName, SubjectName, SubjectId, MySubject, TeacherId, SelectClass, StandardDivision } =
    useParams();


  const navigate = useNavigate();
  const [Subject, setSubject] = useState(SubjectId);

  const currentDate = new Date();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const formattedDate = currentDate.getDate().toString().padStart(2, '0') + '-' +
    months[currentDate.getMonth()] + '-' +
    currentDate.getFullYear().toString();

  const [Title, setTitle] = useState(SubjectName + ' : ' + formattedDate);
  // const [Title, setTitle] = useState(SubjectName + ' : ' + new Date().toISOString().split('T')[0]);
  const [AssignedDate, setAssignedDate]: any = useState(new Date().toISOString().split('T')[0]);
  //const [AssignedDate1, setAssignedDate1]: any = useState(new Date().toISOString().split('T')[0]);
  const [AssignedDate1, setAssignedDate1] = useState(new Date());
  const [ErrorAssignedDate, setErrorAssignedDate]: any = useState('');

  const [ErrorTitle, setErrorTitle] = useState('');
  //const [CompleteDate, setCompleteDate]: any = useState(null);
  const [CompleteDate, setCompleteDate] = useState<string | null>(null);
  const ValidFileTypes = ['PDF', 'JPG', 'PNG', 'BMP', 'JPEG'];
  const MaxfileSize = 3000000;
  const [fileName, setFileName] = useState('');
  const [base64URL, setbase64URL] = useState('');
  const [openUploadMultipleDialog, setOpenUploadMultipleDialog] = useState(false);
  const [MultipleFiles, setMultipleFiles] = useState([]);
  const [Details, setDetails] = useState('');
  const [ErrorDetails, setErrorDetails] = useState('');
  const [Errorbase64URL, setErrorbase64URL] = useState('');
  const [ErrorCompleteDate, setErrorCompleteDate] = useState('');
  const [SubjectCheckID, setSubjectCheckID] = useState(SubjectId);

  const [searchKeyword, setSearchKeyword] = useState('');
  const [filteredHomeworkList, setFilteredHomeworkList] = useState([]);
  const [publishId, setPublishId] = useState();
  const [openPublishDialog, setOpenPublishDialog] = useState(false);
  const [text, setText] = useState('');
  const [textall, setTextall] = useState('');
  const [HomeworkId, setHomeworkId] = useState('');
  const [openPublishDialogall, setOpenPublishDialogall] = useState(false);
  const [SearchTittle, setSearchTittle] = useState([]);
  const [SearchTittle1, setSearchTittle1] = useState([]);

  const SchoolName = localStorage.getItem('SchoolName');
  const HeaderPublish = [
    { Id: 1, Header: 'Subject 	' },
    { Id: 2, Header: ' 	Title' },
    { Id: 3, Header: 'Assigned Date' },
    { Id: 4, Header: ' 	Complete By Date' },
    { Id: 5, Header: ' ' },
    { Id: 6, Header: 'View' },
    { Id: 7, Header: 'Publish/Unpublish' },
    { Id: 8, Header: 'Edit' },
    { Id: 9, Header: 'Delete' }
  ];

  const HeaderPublish1 = [
    { Id: 1, Header: ' 	' },
    { Id: 2, Header: 'Sr. No' },
    { Id: 3, Header: 'Subject' },
    { Id: 4, Header: 'Title' },
    { Id: 5, Header: 'Is Published? ', align: 'center' },
    { Id: 6, Header: 'Complete By Date' }
  ];

  const HomeworkStatus = [
    { Id: 1, Name: 'All', Value: 'All' },
    { Id: 2, Name: 'Assigned Date', Value: 'AssignedDate' },
    { Id: 3, Name: 'Complete By Date', Value: 'CompleteByDate' }
  ];

  const defaultHomeworkStatus = HomeworkStatus.find(item => item.Name === 'All')?.Value || '';
  const [HomeworkS, setHomeworkS] = useState(defaultHomeworkStatus);

  const dispatch = useDispatch();
  const asSchoolId = Number(localStorage.getItem('localSchoolId'));
  const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
  const StandardDivisionId = Number(
    sessionStorage.getItem('StandardDivisionId')
  );
  const asUpdatedById = localStorage.getItem('Id');
  const asTeacherId = sessionStorage.getItem('TeacherId');

  const [SubjectList, setSubjectList] = useState([]);

  const SiteURL = localStorage.getItem('SiteURL');
  let asFolderName = SiteURL.split('/')[SiteURL.split('/').length - 1];

  const SaveHomework = useSelector(
    (state: RootState) => state.AddHomework.ISSaveHomework
  );

  const ClassSubject: any = useSelector(
    (state: RootState) => state.AddHomework.Subjectlist
  );


  const Subjectlistsforteacher: any = useSelector(
    (state: RootState) => state.AddHomework.SubjectListTeacher
  );

  const DeleteHomework = useSelector(
    (state: RootState) => state.AddHomework.DeleteHomework
  );

  const USPublishUnpublishHomework = useSelector(
    (state: RootState) => state.AddHomework.PublishUnPublishHomework
  );

  const HomeworkDetail: any = useSelector(
    (state: RootState) => state.AddHomework.GetHomeworkDetail
  );

  const AllPublishUnPublishHomeworkNew = useSelector(
    (state: RootState) => state.AddHomework.AllPublishUnpublishHomework
  );

  const GetTeacherSubjectAndClassSubjectBody: IGetTeacherSubjectAndClassSubjectBody =
  {
    asSchoolId: asSchoolId,
    aTeacherId: Number(TeacherId),
    asAcademicYearId: asAcademicYearId,
    asStandardDivisionId: Number(SelectClass)
  };
  const debouncedFetch = useCallback(debounce((body) => {
    dispatch(SubjectListforTeacherDropdown(body));
  }, 500), [dispatch]);
  const asdate = AssignedDate1 ? formatDateAsDDMMMYYYY(new Date(AssignedDate1)) : "";
  const GetSubjectListForTeacherBody: IGetSubjectListForTeacherBody = {
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId,
    asStandardDivisionId: Number(SelectClass),
    asHomeWorkStatus: HomeworkS.toString(),
    asHomeworkTitle: '',
    asAssignedDate: asdate
  }
  const adjustToLocalTimezone = (date) => {
    const localDate = new Date(date);
    return new Date(localDate.getTime() - localDate.getTimezoneOffset() * 60000);
  };
  const HomeworkSaveBody: ISaveHomeworkBody = {
    AsId: Number(HomeworkId),
    asTitle: Title,
    asSubjectId: Number(Subject),
    asStandardDivisionId: Number(SelectClass),
    asAttachmentPath: fileName,
    asDetails: Details,
    asAssignDate: AssignedDate,
    asCompleteByDate: adjustToLocalTimezone(CompleteDate).toISOString(),
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId,
    asInsertedById: Number(asTeacherId),
    asSaveFeature: 'Homework',
    asFolderName: 'PPSN Website',
    asBase64String: base64URL,
    additionalAttachmentFile: MultipleFiles
  };

  const ResetForm = () => {
    setSubjectCheckID('');
    setTitle('');
    setAssignedDate('');
    setCompleteDate(null);
    setFileName('');
    setDetails('');
    setMultipleFiles([]);
  };

  const ResetForm1 = () => {
    setSubjectCheckID('');
    //setTitle('');
    //setAssignedDate('');
    setCompleteDate(null);
    setFileName('');
    setDetails('');
    setMultipleFiles([]);
  };

  const handleEditClick = (Id) => {
    setHomeworkId(Id);


    const GetHomeworkDetailBody: IGetHomeworkDetailBody = {
      asSchoolId: asSchoolId,
      asAcademicyearId: asAcademicYearId,
      asHomeworkId: Number(Id),
    };
    dispatch(GetHomeworkDetails(GetHomeworkDetailBody));
  };


  useEffect(() => {
    if (HomeworkDetail != null) {
      setFileName(HomeworkDetail.AttachmentPath);
      setAssignedDate(getCalendarDateFormatDate(HomeworkDetail.AssignedDate));
      setCompleteDate(getCalendarDateFormatDate(HomeworkDetail.CompleteByDate));
      setTitle(HomeworkDetail.Title);
      setDetails(HomeworkDetail.Details);

    }
  }, [HomeworkDetail]);




  // const ClickSaveHomework = () => {
  //   let isError = false;
  //   if (Title == '') {
  //     setErrorTitle(' Title should not be blank.')
  //     isError = true

  //   } else if (AssignedDate == '') {
  //     setErrorAssignedDate('AssignedDate should not be blank ')
  //     isError = true
  //   }
  //   else if (CompleteDate == '') {
  //     setErrorCompleteDate('Complete by Date should not be blank ')
  //     isError = true
  //   }

  //   else if (Details == '') {
  //     setErrorDetails('Details should not be blank')
  //     isError = true
  //   }

  //   else if (!isError) {
  //     dispatch(HomeworkSave(HomeworkSaveBody))

  //   }

  //   else (!isError)
  //   ResetForm1()

  // }
  const ClickSaveHomework = () => {
    let isError = false;

    if (Title.trim() === '') {
      setErrorTitle('Title should not be blank.');
      isError = true;
    } else {
      setErrorTitle('');
    }

    if (AssignedDate.trim() === '') {
      setErrorAssignedDate('Assigned date should not be blank.');
      isError = true;
    } else if (ErrorAssignedDate) {
      isError = true; // Check if there's an error message for Assigned Date
    } else {
      setErrorAssignedDate('');
    }
    if (!CompleteDate) {
      setErrorCompleteDate('Complete by date should not be blank.');
      isError = true;
    } else {
      setErrorCompleteDate('');
    }

    if (Details.trim() === '') {
      setErrorDetails('Details should not be blank.');
      isError = true;
    } else {
      setErrorDetails('');
    }

    // if (fileName === '') {
    //   setErrorDetails('');
    //   isError = true;
    // } else {
    //   setErrorDetails('');
    // }

    if (!isError) {

      dispatch(HomeworkSave(HomeworkSaveBody));
      ResetForm1();
    }
  };

  useEffect(() => {
    if (SaveHomework != '') {
      dispatch(resetHomework());
      toast.success(SaveHomework);
      dispatch(GetTeacherSubjectList(GetSubjectListForTeacherBody));

    }
  }, [SaveHomework]);



  const Changevalue = (value) => {
    // setitemPublish(value);
    setSearchTittle1(value)
  };

  const ChangeFile = (value) => {
    setbase64URL(value.Value);
    setFileName(value.Name);
  };
  const ChangeMultipleFile = (value) => {
    console.log(value, "MultipleFile");

  }



  // Function to handle change in complete by date
  // const handleCompleteByDateChange = (e) => {
  //   const selectedDate = e.target.value;
  //   const currentDate = new Date().toISOString().split('T')[0];
  //   if (selectedDate < currentDate) {
  //     setErrorCompleteDate('Complete by date cannot be a past date.');
  //   } else {
  //     setErrorCompleteDate('');
  //     setCompleteDate(selectedDate);
  //   }
  // };
  const handleAssignedDateChange = (selectedDate: string) => {
    if (!selectedDate) {
      setErrorAssignedDate('Assigned date should not be blank.');
      setAssignedDate(''); // Reset AssignedDate state if needed
      return;
    }

    const selectedDateISO = new Date(selectedDate).toISOString().split('T')[0];
    const currentDate = new Date().toISOString().split('T')[0];

    if (selectedDateISO < currentDate) {
      setErrorAssignedDate('Assigned date cannot be a past date.');
    } else {
      setErrorAssignedDate('');
      setAssignedDate(selectedDateISO);
    }
  };


  const handleCompleteByDateChange = (selectedDate: string) => {
    // Check if selectedDate is null or undefined
    if (!selectedDate) {
      setErrorCompleteDate('');
      setCompleteDate(null); // or handle it according to your logic
      return;
    }

    const currentDate = new Date().toISOString().split('T')[0];
    const selectedDateISO = new Date(selectedDate).toISOString().split('T')[0];

    if (selectedDateISO < currentDate) {
      setErrorCompleteDate('Complete by date cannot be a past date.');
    } else {
      setErrorCompleteDate('');
      setCompleteDate(selectedDate);
    }
  };

  const clickTitle = (Id) => {
    navigate('/extended-sidebar/Teacher/ViewHomework/' + Id +
      '/' +
      TeacherId +
      '/' +
      TeacherName +
      '/' +
      ClassName +
      '/' +
      SubjectName +
      '/' +
      SubjectId +
      '/' +
      MySubject +
      '/' +
      SelectClass)
  };
  const clickView = (Id) => {
    navigate('/extended-sidebar/Teacher/HomeworkDocuments/' + Id +
      '/' +
      TeacherId +
      '/' +
      TeacherName +
      '/' +
      ClassName +
      '/' +
      SubjectName +
      '/' +
      SubjectId +
      '/' +
      MySubject +
      '/' +
      SelectClass

    );
  };

  const clickDelete = (Id) => {
    // alert(Id)
    if (confirm(' Are you sure you want to delete this record?')) {
      const DeleteHomeworkBody: IDeleteHomeworkBody = {
        asSchoolId: asSchoolId,
        asAcademicYearId: asAcademicYearId,
        asHomeworkId: Id,
        asUpdatedById: Number(asUpdatedById)
      };
      dispatch(HomeworkDelete(DeleteHomeworkBody));
    }
  };

  useEffect(() => {
    if (DeleteHomework != '') {
      toast.success(DeleteHomework);
      dispatch(resetDeleteHomework());
      dispatch(GetTeacherSubjectList(GetSubjectListForTeacherBody));
    }
  }, [DeleteHomework]);


  const getIsPublish = (Id) => {
    let IsPublish = true;
    Subjectlistsforteacher.map((item) => {
      if (item.Id.toString() == Id.toString()) {
        IsPublish = item.IsPublished == 'False' ? true : false;
        return IsPublish;
      }
    });
    return IsPublish;
  };

  const PublishUnpublish = (Id) => {
    let IsPublish = getIsPublish(Id);
    const PublishUnPublishHomeworkBody: IPublishUnPublishHomeworkBody = {
      asSchoolId: asSchoolId,
      asAcademicYearId: asAcademicYearId,
      asHomeworkId: Id,
      asReason: text,
      asUpdatedById: asTeacherId,
      asIsPublish: IsPublish,
      asIsSMSSent: true
    };

    dispatch(GetPublishUnpublishHomework(PublishUnPublishHomeworkBody));

  }


  const clickPublishUnpublish = (Id, Text3) => {
    let IsPublish = getIsPublish(Id);
    const currentDate = new Date().toISOString().split('T')[0];

    if (IsPublish == true && isFutureDate1(new Date(Text3))) {

      alert('Homework for past assigned dates cannot be published. Please change the assigned date of the homework.');
      return;
    }
    if (IsPublish == true && (confirm('Are you sure you want to publish the homework?'))) {
      PublishUnpublish(Id);
    } else if (IsPublish != true) {
      setOpenPublishDialog(true);
      setPublishId(Id);
    }
  };




  const Detailschnage = (event) => {
    setText(event.target.value)
  }

  const Detailschnageall = (event) => {
    setTextall(event.target.value)
  }


  useEffect(() => {
    if (USPublishUnpublishHomework != '') {
      toast.success(USPublishUnpublishHomework);
      dispatch(PublishresetMessageNew());
      dispatch(GetTeacherSubjectList(GetSubjectListForTeacherBody));

    }
  }, [USPublishUnpublishHomework]);




  const ClickOk = () => {
    if (text !== '') {
      setOpenPublishDialog(false);
      setText('');
      PublishUnpublish(publishId);
    } else {
      toast.error('Please provide a reason for unpublishing.');
    }
  };

  const getSelectHomeworkId = () => {
    let arr = []
    SearchTittle1.map(item => {
      if (item.IsActive)
        arr.push(item.Id)

    })
    return arr.toString()
  }



  const getSubjectName = (SubjetId) => {
    let SubjectName = '';
    ClassSubject.map((item) => {
      if (item.Value == SubjetId) SubjectName = item.Name;
    });

    return SubjectName;
  };

  const subjectName = getSubjectName(Subject);
  console.log(subjectName);


  const clickSubjectList = (value) => {
    setSubject(value);
    setTitle(getSubjectName(value) + ' : ' + formattedDate);
  };

  const getPublishErrorList = () => {
    let arr = []
    SearchTittle1.map(item => {
      if (item.IsActive)
        if (item.IsPublished == 'True')
          arr.push(item.Text10)

    })
    return arr.toString()
  }

  const getUnpublishErrorList = () => {
    let arr = []
    SearchTittle1.map(item => {
      if (item.IsActive)
        if (item.IsPublished == 'False')
          arr.push(item.Text10)

    })
    return arr.toString()
  }

  const publishAll = (Id) => {
    const selectedHomeworkIds = getSelectHomeworkId();
    if (selectedHomeworkIds === "") {
      toast.error("At least one subject should be selected to publish.");
      return;
    }
    let publishList = getPublishErrorList();
    if (publishList.length > 0) {
      const publishListString = publishList;
      toast.error(`Homework is already in published state for Sr. No. : ${publishListString}. Please remove selection.`);
      return;
    }
    const confirmPublish = window.confirm('Are you sure you want to publish selected homework(s)?');
    if (!confirmPublish) return;

    const confirmSendSMS = window.confirm(`Do you want to send SMS about Homework assignment?  

SMS Text - Homework is assigned for class ${ClassName} for the day ${AssignedDate} ${SchoolName}`);
    const isSMSSent = confirmSendSMS ? 1 : 0;

    const AllPublishUnpublishAddHomeworkBody = {
      asSchoolId: String(asSchoolId),
      asAcademicYearId: String(asAcademicYearId),
      asHomeWorkLogId: selectedHomeworkIds,
      asUnpublishReason: textall,
      asUpdatedById: asTeacherId,
      IsPublished: 1,
      IsSMSSent: isSMSSent,
    };

    dispatch(PublishUnpublishAllHomework(AllPublishUnpublishAddHomeworkBody));
  };


  const unpublishAll = () => {


    const AllPublishUnpublishAddHomeworkBody: IAllPublishUnpublishAddHomeworkBody = {
      asSchoolId: String(asSchoolId),
      asAcademicYearId: String(asAcademicYearId),
      asHomeWorkLogId: getSelectHomeworkId(),
      asUnpublishReason: textall,
      asUpdatedById: asTeacherId,
      IsPublished: 0,
      IsSMSSent: 0,
    };

    dispatch(PublishUnpublishAllHomework(AllPublishUnpublishAddHomeworkBody));
  };

  const ClickOkall = () => {
    if (textall !== '') {
      setOpenPublishDialogall(false);
      setTextall('');
      unpublishAll();
    } else {
      toast.error('Please provide a reason for unpublishing.');
    }
  };


  useEffect(() => {

    if (AllPublishUnPublishHomeworkNew != '') {
      toast.success(AllPublishUnPublishHomeworkNew);
      dispatch(PublishresetMessageNewAll());
      dispatch(GetTeacherSubjectList(GetSubjectListForTeacherBody));

    }
  }, [AllPublishUnPublishHomeworkNew]);



  // const clickFileName = (value) => {
  //   if (value !== '') {
  //     window.open(
  //       localStorage.getItem('SiteURL') +
  //       '/RITeSchool/DOWNLOADS/Homework/' +
  //       value
  //     );
  //   }
  // };
  const clickTitle1 = (Id) => {
    navigate('/extended-sidebar/Teacher/ViewHomework/' + Id);
  };

  const clickHomeworkStatus = (value) => {
    setHomeworkS(value);


  };

  useEffect(() => {
    // dispatch(SubjectListforTeacherDropdown(GetTeacherSubjectAndClassSubjectBody));
    debouncedFetch(GetTeacherSubjectAndClassSubjectBody);
  }, [TeacherId, SelectClass]);

  useEffect(() => {
    dispatch(GetTeacherSubjectList(GetSubjectListForTeacherBody));

  }, [HomeworkS, AssignedDate1, Subject]);

  //   useEffect(() => {
  //     // Check if AssignedDate1 is valid before dispatching the API call
  //     if (AssignedDate1) {
  //         dispatch(GetTeacherSubjectList(GetSubjectListForTeacherBody));
  //     }
  // }, [AssignedDate1]);

  useEffect(() => {
    setSearchTittle(Subjectlistsforteacher.filter((item) => item.SubjectId === Subject))
  }, [Subjectlistsforteacher])

  // const Homework_assigned_for_other_subjects = Subjectlistsforteacher.filter((item) => item.SubjectId != Subject);

  useEffect(() => {
    setSearchTittle1(Subjectlistsforteacher.filter((item) => item.SubjectId !== Subject)
      .map((item, index) => {
        return {
          ...item,
          Text10: index + 1
        }
      })

    )

  }, [Subjectlistsforteacher])



  const [SearchText, setSearchText] = useState('');


  // const changeSearchText = () => {
  //   if (SearchText === '') {
  //     setSearchTittle(Subjectlistsforteacher.filter((item) => item.SubjectId === Subject));
  //     setSearchTittle1(Subjectlistsforteacher.filter((item) => item.SubjectId !== Subject));
  //   } else {
  //     setSearchTittle(
  //       Subjectlistsforteacher.
  //         filter((item) => item.SubjectId === Subject).
  //         filter((item) => {
  //           return item.Text2 && item.Text2.toLowerCase().includes(SearchText.toLowerCase());
  //         })
  //     );
  //     setSearchTittle1(
  //       Subjectlistsforteacher.
  //         filter((item) => item.SubjectId !== Subject).
  //         filter((item) => {
  //           return item.Text2 && item.Text2.toLowerCase().includes(SearchText.toLowerCase());
  //         })
  //     );
  //   }
  // };
  const changeSearchText = () => {
   // Ensure AssignedDate1 is a Date object
   const selectedDate = AssignedDate1 instanceof Date ? AssignedDate1 : new Date(AssignedDate1);

   // Log selectedDate to check its value
    console.log('selectedDate:', selectedDate);

    // Convert selectedDate to formatted string for display
    //const asdate = formatDateAsDDMMMYYYY(selectedDate);
    const asdate = AssignedDate1 ? formatDateAsDDMMMYYYY(new Date(AssignedDate1)) : "";
    let filteredTittle = [];
    let filteredTittle1 = [];

    if (SearchText === '') {
      filteredTittle = Subjectlistsforteacher.filter((item) => {
        // Check if item matches the selected date
        const itemDate = new Date(item.Date); // Assuming 'Date' is your date field in Subjectlistsforteacher
        return itemDate.toDateString() === selectedDate.toDateString();
      });

      filteredTittle1 = Subjectlistsforteacher.filter((item) => {
        // Check if item does not match the selected date
        const itemDate = new Date(item.Date); // Assuming 'Date' is your date field in Subjectlistsforteacher
        return itemDate.toDateString() !== selectedDate.toDateString();
      });
    } else {
      filteredTittle = Subjectlistsforteacher.filter((item) => {
        // Filter by subject and search text for the selected date
        const itemDate = new Date(item.Date); // Assuming 'Date' is your date field in Subjectlistsforteacher
        return itemDate.toDateString() === selectedDate.toDateString()&&
          item.Text2 && item.Text2.toLowerCase().includes(SearchText.toLowerCase());
      });

      filteredTittle1 = Subjectlistsforteacher.filter((item) => {
        // Filter by subject and search text for dates other than the selected date
        const itemDate = new Date(item.Date); // Assuming 'Date' is your date field in Subjectlistsforteacher
        return itemDate.toDateString() !== selectedDate.toDateString()&&
          item.Text2 && item.Text2.toLowerCase().includes(SearchText.toLowerCase());
      });
    }

    // Update state variables with filtered results
    setSearchTittle(filteredTittle);
    setSearchTittle1(filteredTittle1);

    // Prepare payload for API call
    const GetSubjectListForTeacherBody: IGetSubjectListForTeacherBody = {
      asSchoolId: asSchoolId,
      asAcademicYearId: asAcademicYearId,
      asStandardDivisionId: Number(SelectClass),
      asHomeWorkStatus: HomeworkS.toString(),
      asHomeworkTitle: '',
      asAssignedDate: asdate // Use formatted date for API call
    };

    // Trigger the API call
    dispatch(GetTeacherSubjectList(GetSubjectListForTeacherBody));
  };


  const handleSearchClick = () => {
    changeSearchText();
  };

  const SearchNameChange = (value) => {
    setSearchText(value);
  };


  const ClickOpenDialogbox = () => {
    let UnpublishList = getUnpublishErrorList()
    if (UnpublishList.length > 0) {
      const UnpublishListString = UnpublishList;
      toast.error(`Homework is not in published state for Sr. No. : ${UnpublishListString}. Please remove selection.`);
      return;
    }
    const selectedHomeworkIds = getSelectHomeworkId();

    if (selectedHomeworkIds === "") {
      toast.error("At least one subject should be selected to unpublish.");

    }
    else {
      setOpenPublishDialogall(true);

    }
  };
  const handleFileChange = (files) => {
    setMultipleFiles(files);
  };
  const handleDateChange = (date) => {
    setAssignedDate1(date); // Update AssignedDate1 with selected date object
};

  return (
    <>

      <Box sx={{ px: 2 }}>
        <CommonPageHeader
          navLinks={[
            {
              title: 'Assign Homework',
              path: '/extended-sidebar/Teacher/AssignHomework'
            },
            { title: 'Add Homework', path: '/extended-sidebar/Teacher/AddHomework' },
          ]}
          rightActions={
            <>
              <Box>
                <Tooltip
                  title={`Users can Add/Edit/Delete/Publish and Unpublish homework. And displays homework added by other teachers.`}
                >
                  <IconButton
                    sx={{
                      color: 'white',
                      backgroundColor: grey[500],
                      height: '36px !important',
                      ':hover': { backgroundColor: grey[600] }
                    }}
                  >
                    <QuestionMarkIcon />
                  </IconButton>
                </Tooltip>
              </Box>

              <Box>
                <Tooltip title={`Cancel`}>
                  <IconButton
                    sx={{
                      color: 'white',
                      backgroundColor: red[500],
                      height: '36px !important',
                      ':hover': { backgroundColor: red[600] }
                    }}
                    onClick={ResetForm}
                  >
                    <Close />
                  </IconButton>
                </Tooltip>


              </Box>
              <Box>
                <Tooltip title={`Save`}>
                  <IconButton
                    sx={{
                      color: 'white',
                      backgroundColor: green[500],
                      height: '36px !important',
                      ':hover': { backgroundColor: green[600] }
                    }}
                    onClick={ClickSaveHomework}
                  >
                    <SaveIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </>
          }
        />

        <Box sx={{ background: 'white', p: 3, mt: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <TextField fullWidth label={'Class'} value={ClassName} 
              sx={{ bgcolor: '#F0F0F0', width: '100%' }} 
              inputProps={{ style: { color: 'rgb(0, 0, 0)' } }} />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                label={'Class Teacher'}
                value={TeacherName}
                sx={{ bgcolor: '#F0F0F0', width: '100%' }}
                inputProps={{ style: { color: 'rgb(0, 0, 0)' } }} />
            </Grid>
            <Grid item xs={3}>

              <SearchableDropdown
                ItemList={ClassSubject.filter((Item) => {
                  return MySubject == 'true' ?
                    Item.TeacherId == TeacherId :
                    Item.TeacherId != TeacherId
                })}
                onChange={clickSubjectList}
                defaultValue={Subject}
                sx={{ width: '100%' }}
                label='Select Subject'
              />


            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                value={Title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              
                //error={ErrorTitle !== ''}
                //helperText={ErrorTitle}
                sx={{ width: '100%' }}
                label={
                  <span>
                    Title <span style={{ color: 'red' }}>*</span>
                  </span>
                }
              />
              {ErrorTitle && <ErrorMessage1 Error={ErrorTitle} />}
            </Grid>

            <Grid item xs={3}>


              {/* <TextField
              fullWidth
              label={
                <span>
                  Assigned Date <span style={{ color: 'red' }}>*</span>
                </span>
              }
              InputLabelProps={{
                shrink: true
              }}
              inputProps={{ type: 'date' }}
              value={AssignedDate}
              onChange={handleAssignedDateChange}
              error={ErrorAssignedDate !== ''}
              helperText={ErrorAssignedDate}

            /> */}
              <Datepicker
                DateValue={AssignedDate}
                onDateChange={handleAssignedDateChange}
                label={'Assigned Date'}
                size={"medium"}

              />
              {/* <ErrorMessage1 Error={ErrorAssignedDate}></ErrorMessage1> */}
              {ErrorAssignedDate && <ErrorMessage1 Error={ErrorAssignedDate} />}
            </Grid>
            <Grid item xs={3}>
              {/* <TextField
              fullWidth
              InputLabelProps={{
                shrink: true
              }}
              label={
                <span>
                  Complete By Date <span style={{ color: 'red' }}>*</span>
                </span>
              }
              inputProps={{ type: 'date' }}
              value={CompleteDate}
              onChange={handleCompleteByDateChange}
              error={ErrorCompleteDate !== ''}
              helperText={ErrorCompleteDate}


            /> */}
              <Datepicker
                DateValue={CompleteDate}
                onDateChange={handleCompleteByDateChange}
                label={'Complete By Date'}
                size={"medium"}

              />
              {/* <ErrorMessage1 Error={ErrorCompleteDate}></ErrorMessage1> */}
              {ErrorCompleteDate && <ErrorMessage1 Error={ErrorCompleteDate} />}
            </Grid>

            {/* <Grid item xs={3}>
            <SingleFile
              ValidFileTypes={ValidFileTypes}
              MaxfileSize={MaxfileSize}
              FileName={fileName}
              ChangeFile={ChangeFile}
              FileLabel={'Attachment'}
              width={'100%'}
              height={"52px"}
              isMandatory={false}
            />
          </Grid> */}
            {/* <Grid item xs={3}>
              <MultipleFile
                ValidFileTypes={ValidFileTypes}
                MaxfileSize={MaxfileSize}
                FileName={fileName}
              
                ChangeFile={handleFileChange}
                FileLabel={'Attachments'}
                width={'100%'}
                height={"52px"}
                isMandatory={false}
              />
            </Grid> */}
            <Grid item xs={3}>
              <MultipleFile
                ValidFileTypes={ValidFileTypes}
                MaxfileSize={MaxfileSize}
                ChangeFile={handleFileChange}
                FileLabel={'Attachments'}
                width={'100%'}
                height={'52px'}
                isMandatory={false}

              />
            </Grid>


            {/* 
          <Grid item xs={3}>
            <Button
              startIcon={<CloudUpload />}
              fullWidth
              sx={{ py: 1.6 }} variant={"outlined"}
              onClick={() => setOpenUploadMultipleDialog(true)}
            >
              Upload Multiple Attachments
            </Button>

          </Grid> */}

            <Grid item xs={12}>
              <TextField
                fullWidth
                label={
                  <span>
                    Details <span style={{ color: 'red' }}>*</span>
                  </span>
                }
                multiline
                rows={1}
                value={Details}
                onChange={(e) => {
                  setDetails(e.target.value);
                }}
              // error={ErrorDetails !== ''}
              //  helperText={ErrorDetails}
              />
              {ErrorDetails && <ErrorMessage1 Error={ErrorDetails} />}
            </Grid>

          </Grid>

        </Box>

        <Box sx={{ background: 'white', p: 2, mt: 1 }}>
          <Stack direction={"row"} alignItems={"center"} justifyContent={"flex-end"} gap={1} pb={1}>
            <SearchableDropdown
              sx={{ minWidth: '250px' }}
              ItemList={HomeworkStatus}
              onChange={clickHomeworkStatus}
              defaultValue={HomeworkS.toString()}
              label={'Select Homework Status:'}
              size={"small"}
            />
            <Box sx={{ minWidth: '150px' }}>
              <Datepicker
                DateValue={AssignedDate1}
                onDateChange={handleDateChange}
                label={'Date'}
                size={"small"}

              />
            </Box>
            {/* <TextField
            size={"small"}
            sx={{ with: '250px' }}
            InputLabelProps={{
              shrink: true
            }}
            label={'Date'}
            inputProps={{ type: 'date' }}
            value={AssignedDate1}
            onChange={(e) => {
              setAssignedDate1(e.target.value);
              console.log('EventEndDate :', e.target.value);
            }}
          /> */}

            <TextField
              size={"small"}
              sx={{ with: '250px' }}
              label="Title"
              value={SearchText}
              onKeyDown={(e) => {
                if (e.key === 'Enter' ||e.key === 'Tab'  ) {
                  handleSearchClick();
                }
              }}
              onChange={(e) => {
                SearchNameChange(e.target.value);
              }}
            />
            <IconButton onClick={handleSearchClick} sx={{
              background: (theme) => theme.palette.primary.main,
              color: 'white',
              mr: 2
            }}>
              <SearchTwoTone />
            </IconButton>
          </Stack>
        </Box>
        <Dialog open={openPublishDialog} onClose={() => setOpenPublishDialog(false)} fullWidth
          maxWidth={'sm'}>
          <DialogTitle
            sx={{
              backgroundColor: (theme) => theme.palette.primary.main,
              py: 1
            }}
          ></DialogTitle>
          <DialogContent dividers sx={{ px: 4 }}>
            <Typography variant={"h4"} sx={{ mb: 1 }}>
              Unpublish Reason
            </Typography>
            <TextField
              multiline
              rows={3}
              type="text"
              value={text}
              onChange={Detailschnage}
              sx={{ width: '100%' }}
            />
          </DialogContent>
          <DialogActions sx={{ py: 2, px: 3 }}>
            <Button onClick={() => {
              setOpenPublishDialog(false)
            }} color={'error'}>
              Cancel
            </Button>
            <Button onClick={ClickOk} variant={'contained'} >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>

        <Box sx={{ background: 'white', p: 1, mt: 1 }}>
          <Typography variant={"h4"} my={1}>
            Assigned homework for selected subject :
          </Typography>
          {Subjectlistsforteacher.length > 0 && SearchTittle.length > 0 ? (
            <SelectedsubjectList
              ItemList={SearchTittle}
              clickView={clickTitle}
              clickDelete={clickDelete}
              clickEdit={handleEditClick}
              clickVisibilityIcon={clickView}
              clickpublish={clickPublishUnpublish}
              HeaderArray={HeaderPublish}
            // clickAttachment={clickFileName}
            />

          ) : (
            <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 1, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }}>
              <b>No record found.</b>
            </Typography>
          )}


          <Box my={2}>
            <Typography variant={"h4"} my={1}>
              Homework assigned for other subjects :
            </Typography>
            {Subjectlistsforteacher.length > 0 && SearchTittle1.length > 0 ? (
              <SubjectList1
                ItemList={SearchTittle1}
                HeaderArray={HeaderPublish1}
                onChange={Changevalue}
                clickchange={''}
                clickTitle={clickTitle1}
              />
            ) : (
              <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 1, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }}>
                <b>No record found.</b>
              </Typography>
            )
            }
          </Box>
        </Box>

        <Dialog open={openPublishDialogall} onClose={() => setOpenPublishDialogall(false)} fullWidth
          maxWidth={'sm'}>
          <DialogTitle
            sx={{
              backgroundColor: (theme) => theme.palette.primary.main,
              py: 1
            }}
          ></DialogTitle>
          <DialogContent dividers sx={{ px: 4 }}>
            <Typography variant={"h4"} sx={{ mb: 1 }}>
              Unpublish Reason
            </Typography>
            <TextField
              multiline
              rows={1}
              type="text"
              value={textall}
              onChange={Detailschnageall}
              sx={{ width: '100%' }}
            />
          </DialogContent>
          <DialogActions sx={{ py: 2, px: 3 }}>
            <Button onClick={() => {
              setOpenPublishDialogall(false)
            }} color={'error'}>
              Cancel
            </Button>
            <Button onClick={ClickOkall} 
            // color={'success'} variant={'contained'} 
            sx={{
              color:'green',
                   //  backgroundColor: grey[500],
                    '&:hover': {
                   backgroundColor: green[100]
                   }}}
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>


        {Subjectlistsforteacher.length > 0 && SearchTittle1.length > 0 && (
          <Box mt={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
            <ButtonPrimary style={{ backgroundColor: green[500] }} onClick={publishAll}>
              PUBLISH ALL
            </ButtonPrimary>
            <ButtonPrimary style={{ backgroundColor: red[500] }} onClick={ClickOpenDialogbox}>
              UNPUBLISH ALL
            </ButtonPrimary>
          </Box>
        )}


        {openUploadMultipleDialog && (
          <UploadMultipleDialog
            open={openUploadMultipleDialog}
            MultipleFiles={MultipleFiles}
            setOpen={setOpenUploadMultipleDialog}
            setMultipleFiles={setMultipleFiles}
          />
        )}

      </Box>

    </>

  )
}

export default AddHomeworkNew


