import { QuestionMark } from '@mui/icons-material'
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { Accordion, AccordionDetails, AccordionSummary, Alert, Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, IconButton, Stack, TextField, Tooltip, Typography } from '@mui/material'
import { green, grey, red } from '@mui/material/colors'

import SaveIcon from '@mui/icons-material/Save'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { IAllClassesAndDivisionsBody } from 'src/interfaces/Common/Holidays'
import { IInsertVideoGallaryBody } from 'src/interfaces/Common/PhotoGallery'
import { IGetUserRoleBody } from 'src/interfaces/ContactGroup/IContactGroup'
import { IGetVideoGalleryBody } from 'src/interfaces/VideoGalleryInterface/IVideoGallery'
import ErrorMessage1 from 'src/libraries/ErrorMessages/ErrorMessage1'
import SelectListHierarchy from 'src/libraries/SelectList/SelectListHierarchy'
import { CDAGetUserRole } from 'src/requests/ContactGroup/ReqContactGroup'
import { GetAllClassAndDivision } from 'src/requests/Holiday/Holiday'
import { CDAInsertVideoGallaryMsg, resetInsertVideoGallaryMsg } from 'src/requests/PhotoGallery/PhotoGallery'
import { CDAVideoDetails } from 'src/requests/RVideoGallery/ReqVideo'
import { RootState } from 'src/store'
import CommonPageHeader from '../CommonPageHeader'
import VideoUrlComponent from './VideoUrlComponent'



const AddNewVideo = () => {
  const dispatch = useDispatch();
  const [selectAll, setSelectAll] = useState(false);
  const [checkedValues, setCheckedValues] = useState([]);
  const [ItemList, setItemList] = useState([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [UrlSource, setUrlSource] = useState('YouTube');
  const [VedioName, setVedioName] = useState('');
  const [VideoNameError, setVideoNameError] = useState('');
  const [UrlSourceError, setUrlSourceError] = useState('');
  const [UserRolesError, setUserRolesError] = useState('');
  const [ClassesAndDivisionssError, setClassesAndDivisionssError] = useState('');
  const [ShowOnExternalWebsite, setShowOnExternalWebsite] = useState<number>(0);
  const [videoUrl, setVideoUrl] = useState("");
  const [title, setTitle] = useState("");
  const [videoList, setVideoList] = useState<{ url: string; title: string }[]>([]);

  const asSchoolId = Number(localStorage.getItem('localSchoolId'));
  const asUserId = Number(localStorage.getItem('UserId'));
  const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));

  const USGetUserRole: any = useSelector((state: RootState) => state.ContactGroup.IGetUserRole);
  const ClassesAndDivisionss = useSelector((state: RootState) => state.Holidays.AllClassesAndDivisionss);
  const ClassesAndDivisionss1 = useSelector((state: RootState) => state.Holidays.AllClassesAndDivisionss1);
  const USInsertVideoGallary = useSelector((state: RootState) => state.PhotoGalllary.IInsertVideoGallaryMsg);

  const UserRole: IGetUserRoleBody = {
    asSchoolId: asSchoolId,
  };
  useEffect(() => {
    dispatch(CDAGetUserRole(UserRole));
  }, []);

  const StandardDivisionName: IAllClassesAndDivisionsBody = {
    asSchoolId: asSchoolId, //asSchoolId,
    asAcademicYearId: asAcademicYearId, // asAcademicYearId,
    associatedStandard: "",
  }
  useEffect(() => {
    dispatch(GetAllClassAndDivision(StandardDivisionName))
  }, []);
  const VideoData1: IGetVideoGalleryBody = {
    asSchoolId: asSchoolId,
    asSortExp: "ORDER BY Update_Date desc",
    asStartIndex: 0,
    asPageSize: 20,
    asIsFromExternalWebsite: 0,
    asVideoNameFilter: ""

  }

  const isClassSelected = () => {
    let arr = []
    ItemList.map(item => {
      if (item.IsActive)
        arr.push(item.Id)
    })
    return arr.toString()
  }
  const ClassSelected = String(isClassSelected());
  useEffect(() => {
    setItemList(ClassesAndDivisionss);
  }, [ClassesAndDivisionss]);

  const getXML = () => {
    let sXML =
      '<ArrayOfSaveVideoDetails xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">';

    videoList.forEach((subject) => {
      sXML +=
        "<SaveVideoDetails>" +
        "<VideoId>" + 0 + "</VideoId>" +
        "<Comment>" + (subject.title) + "</Comment>" +
        "<VideoURL>" + (subject.url) + "</VideoURL>" +
        "</SaveVideoDetails>";
    });

    sXML += '</ArrayOfSaveVideoDetails>';
    return sXML;
  };

  const ClickSave = async () => {
    let isValid = true;
    if (!VedioName.trim()) {
      setVideoNameError('Video name should not be blank.');
      isValid = false;
    }
    if (!checkedValues.length || checkedValues.every(item => item === '')) {
      setUserRolesError('At least one user role should be selected for video gallery.');
      isValid = false;
    }
    if (!videoUrl.trim()) {
      setUrlSourceError('At least one video URL should be set.');
      isValid = false;
    }

    if (!ClassSelected.trim()) {
      setClassesAndDivisionssError('At least one class should be selected for video gallery.');
      isValid = false;
    }
    if (!isValid) return;
    const SaveVedioGallery: IInsertVideoGallaryBody = {
      asSchoolId: asSchoolId,
      asVideoId: 0,
      asVideoName: VedioName,
      asVideoDetails: getXML(),
      asStartDate: "1900-01-01 00:00:00",
      asEndDate: "1900-01-01 00:00:00",
      asUserRoleIds: checkedValues.toString(), // "1,2,3,6,7",
      asStandardDivIds: ClassSelected,// "1177,1178,1179,1180,1181,1182,1201,1230,1250,1270",
      asSubjectId: 0,
      asShowOnExternalWebsite: ShowOnExternalWebsite.toString(),
      asInsertedById: asUserId,
      asAddMoreSubjects: "0",
      asOldSubjectId: 0,
      asId: 0,
      asUrlSourceId: 1
    }
    dispatch(CDAInsertVideoGallaryMsg(SaveVedioGallery))
  }
  useEffect(() => {
    if (USInsertVideoGallary !== "") {
      toast.success(USInsertVideoGallary);
      dispatch(resetInsertVideoGallaryMsg());
      // dispatch(CDAInsertVideoGallaryMsg(PhotoDetailsBody));
      dispatch(CDAVideoDetails(VideoData1))
    }
  }, [checkedValues, ClassSelected]);


  const handleSelectAll = (event) => {
    const isChecked = event.target.checked;
    setSelectAll(isChecked);
    if (isChecked) {
      setCheckedValues(USGetUserRole.map((role) => role.Value));
    } else {
      setCheckedValues([]);
    }
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setCheckedValues((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value) // Uncheck
        : [...prev, value] // Check
    );
  };
  const ClickChild = (value) => {
    setItemList(value);
  };
  const ClickUrlSource = (value) => {
    setUrlSource(value)
  }
  const ClickVideoName = (value) => {
    setVedioName(value)
  }

  const handleAddVideo = () => {
    if (!videoUrl.trim()) {
      // alert("Both Video URL and Title are required.");
      setUrlSourceError('At least one video URL should be set.');
      return;
    }
    if (!title.trim()) {

    }
    setVideoList([...videoList, { url: videoUrl, title }]);
    setVideoUrl("");
    setTitle("");
  };
  const AddMoreWebsite = (event) => {
    const { checked } = event.target;
    setShowOnExternalWebsite(checked ? 1 : 0);
  }

  const ClickCancel = () => {
    setCheckedValues([]);
    setUrlSource('');
    setVedioName('');
    setVideoNameError('');
    setUrlSourceError('');
    setClassesAndDivisionssError('');
    setUserRolesError('');
    setShowOnExternalWebsite(0);
    setVideoUrl('');
    setTitle('');

  };
  return (
    <Box px={2}>
      <CommonPageHeader
        navLinks={[
          {
            title: "Photo/Video Gallery",
            path: "/RITeSchool/Teacher/PhotoVideoGalleryBaseScreen",
          },
          { title: "Add Video Gallery", path: "" },
        ]}
        rightActions={
          <>
            <Tooltip
              title={
                "Create new photo galleries or add photos to existing gallery. You can also view all gallery photos by clicking on SlideShow.You can also add or view videos into gallery."
              }
            >
              <IconButton
                sx={{
                  color: "white",
                  backgroundColor: grey[500],
                  "&:hover": {
                    backgroundColor: grey[600],
                  },
                }}
              >
                <QuestionMark />
              </IconButton>
            </Tooltip>

            {editId ? (
              <>
                <Tooltip title={'Update'}>
                  <IconButton
                    sx={{
                      color: 'white',
                      backgroundColor: green[500],
                      '&:hover': {
                        backgroundColor: green[600],
                      },
                    }}

                  >
                    <SaveIcon />
                  </IconButton>
                </Tooltip>
              </>
            ) : (
              <Tooltip title={'Save'}>
                <IconButton
                  sx={{
                    color: 'white',
                    backgroundColor: green[500],
                    '&:hover': {
                      backgroundColor: green[600],
                    },
                  }}
                  onClick={ClickSave}
                >
                  <SaveIcon />
                </IconButton>
              </Tooltip>
            )}

          </>
        }
      />
      <Box sx={{ backgroundColor: 'white', mb: 1 }}>
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography style={{ fontWeight: 'bold', fontSize: '20px' }}>
              Important Notes
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{ gap: 0.1, display: 'flex', flexDirection: 'column' }}
          >
            <Alert variant="filled" severity="info" sx={{ mb: 1, mt: '0.1px' }}>
              Video should be from <strong>www.youtube.com</strong>, URL Example: http://www.youtube.com/v/bAUT_Pux73w.
            </Alert>
            <Alert variant="filled" severity="info">
              When you edit any gallery, changes made to the gallery name, dates, user roles, and classes will be applied to all subjects of the respective gallery.
            </Alert>
          </AccordionDetails>
        </Accordion>
      </Box>
      <Box padding={2} sx={{ backgroundColor: "white" }}>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField fullWidth variant="outlined"
              label={
                <span>
                  Video Name <span style={{ color: 'red' }}> *</span>
                </span>
              }
              onChange={(e) => {
                ClickVideoName(e.target.value.slice(0, 50));
              }}
              value={VedioName} /> <Box>
              <ErrorMessage1 Error={VideoNameError}></ErrorMessage1>
            </Box>
          </Grid>

          {/* For devloper add searchable Dropdown for Url Source  */}
          <Grid item xs={12} sm={4}>
            <TextField fullWidth variant="outlined"
              label={
                <span>
                  Url Source <span style={{ color: 'red' }}> *</span>
                </span>
              }
              //variant="outlined"
              onChange={(e) => {
                ClickUrlSource(e.target.value.slice(0, 50));
              }}
              value={UrlSource}
            />
          </Grid>
          <Grid item xs={12} sm={4} >
            <FormControlLabel
              onChange={AddMoreWebsite}
              control={<Checkbox />}
              label="Show On External Website? " />
          </Grid>
          {/* <Grid item xs={12} sm={4}>

            <FormControlLabel control={<Checkbox />} label="Show On External Website? " />
          </Grid> */}
        </Grid>
        <Box>
          <VideoUrlComponent
            handleAddVideo={handleAddVideo}
            setVideoUrl={setVideoUrl}
            setTitle={setTitle}
            videoList={videoList}
            title={title}
            videoUrl={videoUrl}
            UrlSourceError={UrlSourceError}
          />
          {/* <ErrorMessage1 Error={VideoNameError}></ErrorMessage1> */}
        </Box>
        <Box sx={{ backgroundColor: "lightgrey", paddingLeft: 1, mt: 1 }}>
          <FormControlLabel
            sx={{ mr: 0 }}
            control={
              <Checkbox
                checked={selectAll}
                onChange={handleSelectAll}
              />}
            label={''}
          />
          <strong> Associated User Roles  </strong>
        </Box>
        <Grid container spacing={2} alignItems="center" pl={1}>
          <Grid item xs={12}>
            <FormGroup row>
              <FormControl component="fieldset">
                <Grid container direction="row" alignItems="center" spacing={2}>
                  {USGetUserRole.map(
                    (item, index) => (
                      <Grid item key={index}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              value={item.Value}
                              checked={checkedValues.includes(item.Value)}
                              onChange={handleChange}
                            />
                          }
                          label={item.Name}
                        />

                      </Grid>

                    )
                  )}
                </Grid>
              </FormControl>
            </FormGroup>
            <ErrorMessage1 Error={UserRolesError}></ErrorMessage1>
          </Grid>
        </Grid>
        {/* <Grid container pl={2} > */}
        {checkedValues.includes('3') && (
          <Grid item xs={12} md={12} mt={1}>
            {/* <Typography variant="h4" py={1}>
                Associated Classes  <span style={{ color: 'red' }}>*</span>
              </Typography> */}
            <SelectListHierarchy
              ItemList={ItemList}
              ParentList={ClassesAndDivisionss1}
              ClickChild={ClickChild}
            />
            <ErrorMessage1 Error={ClassesAndDivisionssError}></ErrorMessage1>
          </Grid>
        )}
        {/* </Grid> */}
        {/* <Box pt={2}>
          <Box>
            <ClassSectionSelector classes={classes} getSectionsForClass={getSectionsForClass} />
          </Box>
        </Box> */}
        <Grid item xs={12} md={12} mt={2}>
          <Stack direction={"row"} gap={2} alignItems={"center"}>
            <Button
              onClick={ClickCancel}
              // onClick={resetForm}
              sx={{
                // backgroundColor: green[100],
                color: 'red',
                ':hover': { backgroundColor: red[100] }
              }}>
              Cancel
            </Button>
            <Button
              onClick={ClickSave}
              sx={{
                // backgroundColor: green[100],
                color: 'green',
                ':hover': { backgroundColor: green[100] }
              }} >
              Save
            </Button>
          </Stack>
        </Grid>
      </Box>
    </Box>
  )
}
export default AddNewVideo
