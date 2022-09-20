import {
  Box,
  TextField,
  FormGroup,
  Button,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
  FormControl,
  NativeSelect,
  Container,
  Fab,
  useTheme
} from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {
  GetAdminAndprincipalUsers,
  IUsergroup,
  IGetStudentsUser,
  GetStudentsUserResult
} from 'src/interfaces/AdminSMSCenter/To';
import ErrorMessages from 'src/libraries/ErrorMessages/ErrorMessages';
import Icon2 from 'src/libraries/icon/icon2';
import List3 from 'src/libraries/list/List3';
import {
  GetGetAdminAndprincipalUsers,
  GetUser,
  GetStudent
} from 'src/requests/AdminSMSCenter/To';
import { RootState } from 'src/store';
import PropTypes from 'prop-types';
import ReplyIcon from '@mui/icons-material/Reply';
import { Styles } from 'src/assets/style/student-style';

AdminTeacherRecipientsList.propTypes = {
  displayProperty: PropTypes.any,
  RecipientsListDetails: PropTypes.any,
  ReplyRecipient: PropTypes?.any
};

function AdminTeacherRecipientsList({
  displayProperty,
  RecipientsListDetails,
  ReplyRecipient
}) {
  toast.configure();

  const [RecipientsArray, setRecipientsArray] = useState({
    RecipientName: [],
    RecipientId: []
  });

  const theme = useTheme();
  const classes = Styles();

  // Tool Tip  =================================
  const Note1: string =
    'Do not use any website URL or mobile number in SMS text.Such SMS will not get delivered to selected recipient(s)';

  const [PrincipalChecked, setPrincipalChecked] = useState<any>();

  const [EntireSchookIsChecked, setEntireSchookIsChecked] =
    useState('selected');

  // Input value for teacher list ,student list ,other staff and admin staff
  const [valueFor_APi, ChnageValueForAPI] = useState();

  const [nativeSelectDefault, setnativeSelectDefault] = useState('none');

  const dispatch = useDispatch();

  // Api for Admin principle and Software co-ordinator
  const GetAdminAndprincipalUsersApiBody: any = useSelector(
    (state: RootState) =>
      state.getGetAdminAndprincipalUsers.getGetAdminAndprincipalUsers
  );
  const StaffAndAdmin =
    GetAdminAndprincipalUsersApiBody.GetAdminAndprincipalUsersResult;

  // Check box labels/ names for input box Admin ,Principle ,SWCo_ordinator
  let AdminName;
  let AdminId;
  let PrincipleName;
  let PrincipleId;
  let SWCo_ordinatorName;
  let SWCo_ordinatorId;

  if (StaffAndAdmin == undefined) {
    console.log('null');
  } else {
    AdminName = StaffAndAdmin[0].Name;
    PrincipleName = StaffAndAdmin[1].Name;
    SWCo_ordinatorName = StaffAndAdmin[2].Name;
    AdminId = StaffAndAdmin[0].Id;
    PrincipleId = StaffAndAdmin[1].Id;
    SWCo_ordinatorId = StaffAndAdmin[2].Id;
  }

  // Api for Teacher list ,Student list ,Other staff and admin staff
  const getuserlist: any = useSelector(
    (state: RootState) => state.getuser.GetUser
  );
  const list = getuserlist.GetUsersInGroupResult;

  // Send SMS Api
  const getstudentlist: any = useSelector(
    (state: RootState) => state.getuser.getStudent
  );
  const Student = getstudentlist.GetStudentsUserResult;

  const [getStandardId, setgetStandardId] = useState();

  const [listOpend, setlistOpend] = useState(false);

  // natvie list of To / Recipients Page
  const handleChange = (e) => {
    setgetStandardId(e.target.value);
    setnativeSelectDefault('block');
    setlistOpend(true);
  };

  const [checkedTeacher, setTeacherChecked] = useState(false);
  const [studentclicked, setStudentClicked] = useState(false);
  const [otherStaffClicked, setOtherStaffClicked] = useState(false);
  const [adminStaffClicked, setAdminStaffClicked] = useState(false);

  const [EntireSchoolDependent, setEntireSchoolDependent] = useState<any>();

  //  Call for api based on Value Teacher / Student / OtherStaff / Admin Staff and Displaying Dropdown list
  const getUserListBasedOnRollID = (e) => {
    if (e.target.value == '3') {
      setnativeSelectDefault('block');
      setStudentClicked(true);
      setEntireSchookIsChecked('unselected');
    }
    if (e.target.value == '7') {
      setnativeSelectDefault('none');
      setOtherStaffClicked(true);
      setStudentClicked(false);
      setEntireSchookIsChecked('unselected');
    }
    if (e.target.value == '6') {
      setnativeSelectDefault('none');
      setAdminStaffClicked(true);
      setStudentClicked(false);
      setEntireSchookIsChecked('unselected');
    }
    if (e.target.value == '2') {
      setnativeSelectDefault('none');
      setTeacherChecked(true);
      setStudentClicked(false);
      setEntireSchookIsChecked('unselected');
    }
    // Default call For api based on values passed on radio button
    ChnageValueForAPI(e.target.value);
  };

  // Checking conditions for Admin Principal Software Coordinator
  const AdminAndPrincipalUsers = (e) => {
    if (e.target.checked) {
      if (e.target.name == 'Entire School') {
        RecipientsArray.RecipientName.length = 0;
        RecipientsArray.RecipientName.push('Entire School');
        // RecipientsArray.RecipientId.push(e.target.value);
        setEntireSchookIsChecked('selected');
        setnativeSelectDefault('none');
        setEntireSchoolDependent('none');
      }
      if (e.target.name !== 'Entire School') {
        RecipientsArray.RecipientName.push(e.target.name);
        RecipientsArray.RecipientId.push(e.target.value.toString());
      }
    }
    // On uncheck except "Entire School"
    if (!e.target.checked) {
      let indexOfRedipientName = RecipientsArray.RecipientName.indexOf(
        e.target.name
      );
      let splicedArrayOfRecipientName = RecipientsArray.RecipientName.splice(
        indexOfRedipientName,
        1
      );
      let indexOfRedipientId = RecipientsArray.RecipientId.indexOf(
        e.target.value
      );
      let splicedArrayOfRecipientId = RecipientsArray.RecipientId.splice(
        indexOfRedipientId,
        1
      );
    }
    // On uncheck fro "Entire School"
    if (!e.target.checked) {
      if (e.target.name == 'Entire School') {
        let indexOfRedipientName = RecipientsArray.RecipientName.indexOf(
          e.target.name
        );
        let splicedArrayOfRecipientName = RecipientsArray.RecipientName.splice(
          indexOfRedipientName,
          1
        );
        setRecipientsArray((prev) => {
          return {
            RecipientName: [...prev.RecipientName],
            RecipientId: [...prev.RecipientId]
          };
        });

        setEntireSchoolDependent('flex');
        if (studentclicked) {
          setnativeSelectDefault('block');
        } else {
          setnativeSelectDefault('none');
        }
      }
    }
    setRecipientsArray((prev) => {
      return {
        RecipientName: [...prev.RecipientName],
        RecipientId: [...prev.RecipientId]
      };
    });
  };

  // Input values for list of Students / Teachers / Admin Staff / Other Staff

  const [checked, setChecked] = useState(true);
  const [Id, setId] = useState({ DetailInfo: [], recieverInfo: [] });

  const ListCheckedTeacherStudent = (e) => {
    setChecked(true);
    const { value, name, checked } = e;
    const { DetailInfo, recieverInfo } = Id;

    if (checked) {
      setPrincipalChecked(true);
      RecipientsArray.RecipientName.push(e.name);
      RecipientsArray.RecipientId.push(e.value.toString());
      setRecipientsArray((prev) => {
        return {
          RecipientName: [...prev.RecipientName],
          RecipientId: [...prev.RecipientId]
        };
      });
      setId({
        DetailInfo: [...DetailInfo, value],
        recieverInfo: [...recieverInfo, name]
      });
    }

    if (!checked) {
      let indexOfRedipientName = RecipientsArray.RecipientName.indexOf(e.name);
      let splicedArrayOfRecipientName = RecipientsArray.RecipientName.splice(
        indexOfRedipientName,
        1
      );
      let indexOfRedipientId = RecipientsArray.RecipientId.indexOf(e.value);
      let splicedArrayOfRecipientId = RecipientsArray.RecipientId.splice(
        indexOfRedipientId,
        1
      );
      setRecipientsArray((prev) => {
        return {
          RecipientName: [...prev.RecipientName],
          RecipientId: [...prev.RecipientId]
        };
      });
      setId({
        DetailInfo: DetailInfo.filter((event) => event !== value),
        recieverInfo: recieverInfo.filter((event) => event !== name)
      });
    }
  };

  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asSchoolId = localStorage.getItem('localSchoolId');
  const asStandardId = sessionStorage.getItem('StandardId');
  const asDivisionId = sessionStorage.getItem('DivisionId');
  const asUserId = sessionStorage.getItem('Id');
  const RoleName = localStorage.getItem('RoleName');
  const SchoolName = sessionStorage.getItem('SchoolName');
  const asSchoolName = sessionStorage.getItem('asSchoolName');


  console.log(SchoolName);
  console.log(asSchoolName)

  const AdminAndprincipalUsersApiBody: GetAdminAndprincipalUsers = {
    asAcademicYearId: '9',
    asSchoolId: '120'
  };

  // Teacher / Students / Other Staff / Admin Staff Body
  const body: IUsergroup = {
    asAcademicYearId: '9',
    asSchoolId: '120',
    asStdDivId: ' ',
    asUserId: asUserId,
    asSelectedUserGroup: valueFor_APi,
    abIsSMSCenter: false
  };

  // Standared List
  const body2: IGetStudentsUser = {
    asStdDivId: getStandardId,
    asAcadmeicYearId: '9',
    asSchoolId: '120'
  };

  // Admin / Principle / Software Coordinator body
  useMemo(() => {
    dispatch(GetGetAdminAndprincipalUsers(AdminAndprincipalUsersApiBody));
  }, []);

  // Teacher / Students List / Admin Staff / Other Staff Body
  useEffect(() => {
    dispatch(GetUser(body));
  }, [valueFor_APi, PrincipalChecked]); //SendSMS

  // Standard List Call
  useEffect(() => {
    dispatch(GetStudent(body2));
  }, [getStandardId]);

  useEffect(() => {
    if (ReplyRecipient != undefined) {
      if (ReplyRecipient.ReplyRecipientName != undefined) {
        RecipientsArray.RecipientName.push(ReplyRecipient.ReplyRecipientName);
        RecipientsArray.RecipientId.push(
          ReplyRecipient.ReplyRecipientID.toString()
        );
      }
    }
  }, []);

  const Note: string =
    'Do not use any website URL or mobile number in SMS text. Such SMS will not get delivered to selected recipient(s).';

  return (
    <div>
      <Container>
        <span
          onClick={() => {
            displayProperty('none');
            RecipientsListDetails(RecipientsArray);
          }}
        >
          <Fab
            className={classes.backArrow}
            sx={{
              background: `${theme.colors.gradients.pink1}`,
              position: 'absolute',
              top: '30px',
              left: '35px'
            }}
          >
            <ReplyIcon />
          </Fab>
        </span>
        <Icon2 Note={Note} />
        <Box
          sx={{
            background: `${theme.colors.gradients.pink1}`,
            margin: '-2px',
            backgroundColor: '#FFFFFF',
            minHeight: '25vh',
            borderRadius: '8px'
          }}
        >
          <TextField
            multiline
            placeholder="Selected Recipient"
            value={RecipientsArray.RecipientName}
            variant="outlined"
            id="body"
            fullWidth
            margin="normal"
            style={{ scrollBehavior: 'auto' }}
            sx={{
              marginLeft: 1,
              width: '19.5rem',
              // 19rem
              maxHeight: '60px',
              overflow: 'auto'
            }}
          />
          <FormGroup>
            {RoleName === 'Admin Staff' ? (
              <FormControlLabel
                sx={{
                  marginLeft: 1,
                  marginTop: 1,
                  border: '2px solid black',
                  borderRadius: '10px',
                  width: '19.5rem'
                }}
                control={<Checkbox />}
                onChange={(e) => AdminAndPrincipalUsers(e)}
                value="Entire School"
                name="Entire School"
                label="Entire School"
              />
            ) : null}

            <Box
              sx={{
                display: EntireSchoolDependent,
                flexDirection: 'column',
                marginLeft: 1,
                marginTop: 0.5,
                border: '2px solid black',
                borderRadius: '10px',
                width: '11rem',
                paddingBottom: '42px'
              }}
            >
              {RoleName === 'Student' ? (
                <FormControlLabel
                  sx={{ marginLeft: 0.1 }}
                  control={
                    <Checkbox
                      checked={RecipientsArray.RecipientName.includes(
                        SWCo_ordinatorName
                      )}
                    />
                  }
                  onChange={(e) => AdminAndPrincipalUsers(e)}
                  value={SWCo_ordinatorId}
                  name={SWCo_ordinatorName}
                  label="S/W Co-ordinator"
                />
              ) : (
                <>
                  <FormControlLabel
                    sx={{ marginLeft: 0.1 }}
                    control={
                      <Checkbox
                        checked={RecipientsArray.RecipientName.includes(
                          AdminName
                        )}
                      />
                    }
                    onChange={(e) => AdminAndPrincipalUsers(e)}
                    value={AdminId}
                    name={AdminName}
                    label="Admin"
                  />

                  <FormControlLabel
                    sx={{ marginLeft: 0.1 }}
                    control={
                      <Checkbox
                        checked={RecipientsArray.RecipientName.includes(
                          PrincipleName
                        )}
                      />
                    }
                    onChange={(e) => AdminAndPrincipalUsers(e)}
                    value={PrincipleId}
                    name={PrincipleName}
                    label="Principle"
                  />
                  <FormControlLabel
                    sx={{ marginLeft: 0.1 }}
                    control={
                      <Checkbox
                        checked={RecipientsArray.RecipientName.includes(
                          SWCo_ordinatorName
                        )}
                      />
                    }
                    onChange={(e) => AdminAndPrincipalUsers(e)}
                    value={SWCo_ordinatorId}
                    name={SWCo_ordinatorName}
                    label="S/W Co-ordinator"
                  />
                </>
              )}
            </Box>

            <RadioGroup
              sx={{
                display: EntireSchoolDependent,
                marginLeft: 22,
                marginTop: `${RoleName == 'Student' ? '-90px' : '-175px'} ` ,
                border: '2px solid black',
                borderRadius: '10px',
                width: '8.5rem',
                paddingLeft: '8px'
              }}
            >
              {RoleName === 'Student' ? (
                <div>
                  <FormControlLabel
                    onClick={getUserListBasedOnRollID}
                    value="2"
                    control={<Radio />}
                    label="Teacher"
                  />
                  <FormControlLabel
                    control={<Radio />}
                    onClick={getUserListBasedOnRollID}
                    value="6"
                    label="Admin Staff"
                  />
                </div>
              ) : (
                <>
                  <FormControlLabel
                    onClick={getUserListBasedOnRollID}
                    value="2"
                    control={<Radio />}
                    label="Teacher"
                  />
                  <FormControlLabel
                    control={<Radio />}
                    onClick={getUserListBasedOnRollID}
                    value="3"
                    label="Student"
                  />
                  <FormControlLabel
                    onClick={getUserListBasedOnRollID}
                    control={<Radio />}
                    value="7"
                    label="Other Staff"
                  />
                  <FormControlLabel
                    control={<Radio />}
                    onClick={getUserListBasedOnRollID}
                    value="6"
                    label="Admin Staff"
                  />
                </>
              )}
            </RadioGroup>
          </FormGroup>

          <FormControl
            fullWidth
            sx={{ mt: '0.2rem', mb: '-2', marginLeft: '24px' }}
          >
            {
              <NativeSelect
                sx={{ mr: '48px', display: nativeSelectDefault }}
                onChange={(e) => handleChange(e)}
              >
                <option style={{ backgroundColor: '#e0ffff' }}>
                  Select Class
                </option>
                {list?.map((items: GetStudentsUserResult, i) => {
                  return (
                    <>
                      <option
                        style={{ backgroundColor: '#e0ffff' }}
                        value={items.Id}
                        key={i}
                      >
                        {items.Name}
                      </option>
                    </>
                  );
                })}
              </NativeSelect>
            }
            <br></br>
          </FormControl>
        </Box>
      </Container>

      {(checkedTeacher || otherStaffClicked || adminStaffClicked) &&
      nativeSelectDefault == 'none' ? (
        <h1>
          {list == undefined || list == 0 ? (
            EntireSchookIsChecked == 'selected' ? null : (
              <ErrorMessages Error={'No List Found'} />
            )
          ) : (
            list.map((elm, i) => {
              const RecipientsListBoolean =
                RecipientsArray.RecipientName.includes(elm.Name);
              return (
                <>
                  {EntireSchookIsChecked == 'selected' ? null : (
                    <List3
                      data={elm}
                      key={i}
                      handleChange={ListCheckedTeacherStudent}
                      check={RecipientsListBoolean}
                      pointerEvent={'none'}
                      Id={elm.Id}
                    />
                  )}
                </>
              );
            })
          )}
        </h1>
      ) : null}
      {EntireSchookIsChecked == 'selected' ? null : studentclicked &&
        nativeSelectDefault == 'block' &&
        listOpend ? (
        <h1>
          {Student == undefined || Student == 0 ? (
            <ErrorMessages Error={'No List Found'} />
          ) : (
            Student.map((elm, i) => {
              const RecipientsListBoolean =
                RecipientsArray.RecipientName.includes(elm.Name);

              return (
                <List3
                  data={elm}
                  key={i}
                  handleChange={ListCheckedTeacherStudent}
                  check={RecipientsListBoolean}
                  pointerEvent={'none'}
                  Id={elm.Id}
                />
              );
            })
          )}
        </h1>
      ) : null}
    </div>
  );
}

export default AdminTeacherRecipientsList;
