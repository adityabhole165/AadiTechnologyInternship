import {
  Card,
  Container,
  TextField,
  FormControl,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IUserGroupList } from 'src/interfaces/MessageCenter/MessageCenter';
import PageHeader from 'src/libraries/heading/PageHeader';
import List3 from 'src/libraries/list/List3';
import {
  addRecipients,
  getAdminstaffList,
  getTeacherList,
  removeRecipients
} from 'src/requests/MessageCenter/MessaageCenter';
import { RootState } from 'src/store';
import { useNavigate } from 'react-router-dom';
import ReplyIcon from '@mui/icons-material/Reply';
import { useTheme, Fab } from '@mui/material';
import { Styles } from 'src/assets/style/student-style';


const Recipients = ({displayProperty, RecipientsListDetails, ReplyRecipient}) => {

  let navigate = useNavigate();
  const theme = useTheme();
  const classes = Styles();
  const dispatch = useDispatch();

  const TeacherList: any = useSelector(
    (state: RootState) => state.MessageCenter.TeacherList
  );
  console.log(TeacherList)
  const AdminStaffList: any = useSelector(
    (state: RootState) => state.MessageCenter.AdminStaffList
  );
  const [RecipientsArray,setRecipientsArray] = useState(
    {
      RecipientName : [],
      RecipientId : []
    }
  );

  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asSchoolId = localStorage.getItem('localSchoolId');
  const asStandardId = sessionStorage.getItem('StandardId');
  const asDivisionId = sessionStorage.getItem('DivisionId');
  const asUserId = sessionStorage.getItem('Id');
  const [selectedUserGroup, setselectedUserGroup] = useState<number>(0);
  const [RadioButtonDependent, setRadioButtonDependent] =
    useState<string>('none');

  const teacherList: IUserGroupList = {
    asAcademicYearId: asAcademicYearId,
    asSchoolId: asSchoolId,
    asStdDivId: asDivisionId,
    asUserId: asUserId,
    asSelectedUserGroup: '2',
    abIsSMSCenter: false
  };

  const AdminstaffList: IUserGroupList = {
    asAcademicYearId: asAcademicYearId,
    asSchoolId: asSchoolId,
    asStdDivId: asDivisionId,
    asUserId: asUserId,
    asSelectedUserGroup: '6',
    abIsSMSCenter: false
  };

  const [checked, setChecked] = useState(true);
  const [Id, setId] = useState({ DetailInfo: [], recieverInfo: [] });

  const handleChange = (event) => {

    setChecked(true);
    const { value, name, checked } = event;
    const { DetailInfo, recieverInfo } = Id;

    if (checked) {
      RecipientsArray.RecipientName.push(event.name)
      RecipientsArray.RecipientId.push(event.value.toString())
      setRecipientsArray((prev) => {
        return{
            RecipientName : [...prev.RecipientName],
            RecipientId : [...prev.RecipientId]
        }
      })
      setId({
        DetailInfo: [...DetailInfo, value],
        recieverInfo: [...recieverInfo, name]
      });
    } else {
      let indexOfRedipientName = RecipientsArray.RecipientName.indexOf(event.name);
      let splicedArrayOfRecipientName = RecipientsArray.RecipientName.splice(indexOfRedipientName,1);
      let indexOfRedipientId = RecipientsArray.RecipientId.indexOf(event.value);
      let splicedArrayOfRecipientId = RecipientsArray.RecipientId.splice(indexOfRedipientId,1);
      setRecipientsArray((prev) => {
        return{
            RecipientName : [...prev.RecipientName],
            RecipientId : [...prev.RecipientId]
        }
      })
      setId({
        DetailInfo: DetailInfo.filter((event) => event !== value),
        recieverInfo: recieverInfo.filter((event) => event !== name)
      });
    }

    RecipientsListDetails(RecipientsArray)
  };

  const handleCheckBox = (e) => {
    if (e.target.checked) {
      RecipientsArray.RecipientName.push(e.target.name);
      RecipientsArray.RecipientId.push(e.target.value.toString());
      setRecipientsArray((prev)=>{
        return{
          RecipientName : [...prev.RecipientName],
            RecipientId : [...prev.RecipientId]
        }
      })
    } else {
      let indexOfRedipientName = RecipientsArray.RecipientName.indexOf(e.target.name);
      let splicedArrayOfRecipientName = RecipientsArray.RecipientName.splice(indexOfRedipientName,1);
      let indexOfRedipientId = RecipientsArray.RecipientId.indexOf(e.target.value);
      let splicedArrayOfRecipientId = RecipientsArray.RecipientId.splice(indexOfRedipientId,1);
      setRecipientsArray((prev) => {
        return{
            RecipientName : [...prev.RecipientName],
            RecipientId : [...prev.RecipientId]
        }
      })
    }
    RecipientsListDetails(RecipientsArray)
  };

  const handleRadioButtons = (e) => {
    setselectedUserGroup(e.target.value);
    setRadioButtonDependent('block');
  };

  useEffect(() => {
    dispatch(getTeacherList(teacherList));
    dispatch(getAdminstaffList(AdminstaffList));
  }, [selectedUserGroup]);

  useEffect(()=>{
    if(ReplyRecipient.ReplyRecipientName != undefined){
      RecipientsArray.RecipientName.push(ReplyRecipient.ReplyRecipientName);
      RecipientsArray.RecipientId.push(ReplyRecipient.ReplyRecipientID.toString());
    }
  },[])

  return (
    <div>
      <span
      onClick={() => displayProperty("none")}
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

      <Container>
        <Card sx={{ padding: '20px', backgroundColor: '#ffffffdb' }}>
          <TextField
            fullWidth
            margin="normal"
            label={'To'}
            name="To"
            type="text"
            autoComplete="off"
            variant="standard"
            value={RecipientsArray.RecipientName}
            sx={{ mt: '-0.3rem' }}
          />
          <form>
            <FormControl>
              <div style={{ display: 'flex' }}>
                  <FormControlLabel
                    sx={{marginLeft:'-18px',mt:'-40px'}}
                    control={
                      <Checkbox
                        name={'Software Co-ordinator'}
                        onChange={handleCheckBox}
                        checked={RecipientsArray.RecipientName.includes(
                          'Software Co-ordinator'
                        )}
                        value={'1'}
                        id={'1'}
                      />
                    }
                    label="Software Co-ordinator"
                  />

                  <FormControl >
                    <RadioGroup
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                      onClick={handleRadioButtons}
                      sx={{marginLeft:'-10px'}}
                    >
                      <FormControlLabel
                        value={2}
                        control={<Radio />}
                        name="RecipientList"
                        label="Teacher List"
                      />
                      <FormControlLabel
                        value={6}
                        control={<Radio />}
                        name="RecipientList"
                        label="Admin Staff"
                      />
                    </RadioGroup>
                  </FormControl>
              </div>
            </FormControl>
          </form>
        </Card>
      </Container>
      <div style={{ marginTop: '10px', display: RadioButtonDependent }}>
        {selectedUserGroup == 2
          ? TeacherList == undefined || TeacherList.length == 0
            ? null
            : TeacherList.map((item, i) => {
                const RecipientsListBoolean = RecipientsArray.RecipientName.includes(
                  item.Name
                );
                return (
                  <>
                    <List3
                      data={item}
                      key={i}
                      handleChange={handleChange}
                      check={RecipientsListBoolean}
                      pointerEvent={'none'}
                      Id={item.Id}
                    />
                  </>
                );
              })
          : selectedUserGroup == 6
          ? AdminStaffList == undefined || AdminStaffList.length == 0
            ? null
            : AdminStaffList.map((item, i) => {
                const RecipientsListBoolean = RecipientsArray.RecipientName.includes(
                  item.Name
                );
                return (
                  <>
                    <List3
                      data={item}
                      key={i}
                      handleChange={handleChange}
                      check={RecipientsListBoolean}
                      pointerEvent={'none'}
                      Id={item.Id}
                    />
                  </>
                );
              })
          : null}
      </div>
    </div>
  );
};

export default Recipients;
