import { QuestionMark } from '@mui/icons-material'
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { Accordion, AccordionDetails, AccordionSummary, Alert, Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, IconButton, Stack, TextField, Tooltip, Typography } from '@mui/material'
import { green, grey, red } from '@mui/material/colors'

import SaveIcon from '@mui/icons-material/Save'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IAllClassesAndDivisionsBody } from 'src/interfaces/Common/Holidays'
import { IInsertVideoGallaryBody } from 'src/interfaces/Common/PhotoGallery'
import { IGetUserRoleBody } from 'src/interfaces/ContactGroup/IContactGroup'
import SelectListHierarchy from 'src/libraries/SelectList/SelectListHierarchy'
import { CDAGetUserRole } from 'src/requests/ContactGroup/ReqContactGroup'
import { GetAllClassAndDivision } from 'src/requests/Holiday/Holiday'
import { CDAInsertVideoGallaryMsg } from 'src/requests/PhotoGallery/PhotoGallery'
import { RootState } from 'src/store'
import CommonPageHeader from '../CommonPageHeader'
import VideoUrlComponent from './VideoUrlComponent'



const AddNewVideo = () => {
  const dispatch = useDispatch();
  const [selectAll, setSelectAll] = useState(false);
  const [checkedValues, setCheckedValues] = useState([]);
  const [ItemList, setItemList] = useState([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [UrlSource, setUelSource] = useState('YouTube');
  const [VedioName, setVedioName] = useState('Arun');

  const [videoUrl, setVideoUrl] = useState("");
  const [title, setTitle] = useState("");
  const [videoList, setVideoList] = useState<{ url: string; title: string }[]>([]);


  const USGetUserRole: any = useSelector((state: RootState) => state.ContactGroup.IGetUserRole);
  const ClassesAndDivisionss = useSelector((state: RootState) => state.Holidays.AllClassesAndDivisionss);
  const ClassesAndDivisionss1 = useSelector((state: RootState) => state.Holidays.AllClassesAndDivisionss1);
  const InsertVideoGallary = useSelector((state: RootState) => state.PhotoGalllary.IInsertVideoGallaryMsg);
  console.log(InsertVideoGallary, "InsertVideoGallary🤞🤞");

  const UserRole: IGetUserRoleBody = {
    asSchoolId: 18,
  };
  useEffect(() => {
    dispatch(CDAGetUserRole(UserRole));
  }, []);

  const StandardDivisionName: IAllClassesAndDivisionsBody = {
    asSchoolId: 18, //asSchoolId,
    asAcademicYearId: 55, // asAcademicYearId,
    associatedStandard: "",
  }
  useEffect(() => {
    dispatch(GetAllClassAndDivision(StandardDivisionName))
  }, []);

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
        `<SaveVideoDetails ` +
        `VideoId="${0}" ` +
        `Comment="${subject.title || ''}" ` +
        `VideoURL="${subject.url || ''}" />`;
    });

    sXML += '</ArrayOfSaveVideoDetails>';
    return sXML;
  };

  const ClickSave = async () => {
    const SaveVedioGallery: IInsertVideoGallaryBody = {
      asSchoolId: 18,
      asVideoId: 0,
      asVideoName: 'newRITE',
      asVideoDetails: getXML(),
      asStartDate: "1900-01-01 00:00:00",
      asEndDate: "1900-01-01 00:00:00",
      asUserRoleIds: checkedValues.toString(), // "1,2,3,6,7",
      asStandardDivIds: ClassSelected,// "1177,1178,1179,1180,1181,1182,1201,1230,1250,1270",
      asSubjectId: 0,
      asShowOnExternalWebsite: "1",
      asInsertedById: 1071,
      asAddMoreSubjects: "0",
      asOldSubjectId: 0,
      asId: 0,
      asUrlSourceId: 1
    }
    dispatch(CDAInsertVideoGallaryMsg(SaveVedioGallery))
  }
  useEffect(() => {

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



  //console.log(ClassSelected, "ItemList🤞🤞")
  const ClickChild = (value) => {
    setItemList(value);
  };
  const ClickUrlSource = (value) => {
    setUelSource(value)
  }
  const ClickVideoName = (value) => {
    setVedioName(value)
  }

  const handleAddVideo = () => {
    if (!videoUrl.trim() || !title.trim()) {
      alert("Both Video URL and Title are required.");
      return;
    }

    // Add video URL and title to the list
    setVideoList([...videoList, { url: videoUrl, title }]);

    // Clear inputs
    setVideoUrl("");
    setTitle("");
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
                // onClick={handleAdd}
                // disabled={!formData.url || !formData.title}
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
              value={VedioName} />
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


          <Grid item xs={12} sm={4}>
            <FormControlLabel control={<Checkbox />} label="Show On External Website? " />
          </Grid>
        </Grid>

        <Box>
          <VideoUrlComponent
            handleAddVideo={handleAddVideo}
            setVideoUrl={setVideoUrl}
            setTitle={setTitle}
            videoList={videoList}
            title={title}
            videoUrl={videoUrl}


          />

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
            {/* <ErrorMessage1 Error={ClassSelectedError}></ErrorMessage1> */}
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
