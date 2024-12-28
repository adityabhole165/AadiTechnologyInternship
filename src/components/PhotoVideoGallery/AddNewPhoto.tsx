import { QuestionMark } from "@mui/icons-material";
import SaveIcon from '@mui/icons-material/Save';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  useMediaQuery
} from "@mui/material";
import { green, grey, red } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import { IAllClassesAndDivisionsBody } from "src/interfaces/Common/Holidays";
import { IGetPhotoDetailsBody, IManagePhotoGalleryBody } from "src/interfaces/Common/PhotoGallery";
import ErrorMessage1 from "src/libraries/ErrorMessages/ErrorMessage1";
import { GetAllClassAndDivision } from "src/requests/Holiday/Holiday";
import { CDAManagePhotoGalleryMsg, resetManagePhotoGalleryMsg } from "src/requests/PhotoGallery/PhotoGallery";
import { CDAGetPhotoDetails } from "src/requests/Reqphoto/ReqPhoto";
import { RootState } from "src/store";
import CommonPageHeader from "../CommonPageHeader";
import FileUploadComponent from "./FileUploadComponent";
import SelectListHierarchy1 from "./SelectListHierarchy1";
const AddNewPhoto = () => {
  const dispatch = useDispatch();
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const [selectedClasses, setSelectedClasses] = useState({});
  // const [selectAll, setSelectAll] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [ItemList, setitemList] = useState([]);
  const [GalleryName, setGalleryName] = useState('');
  const [selected, setSelected] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [GalleryNameError, setGalleryNameError] = useState('');

  //console.log(ItemList, "ItemList");


  const ValidFileTypes2 = ['JPG', 'JPEG', 'PNG', 'BMP'];
  const MaxfileSize2 = 3000000;
  const [base64URL2, setbase64URL2] = useState('');
  const [ImageFile, setImageFile] = useState('');
  //console.log(base64URL2, "base64URL2123");

  const asSchoolId = Number(localStorage.getItem('localSchoolId'));
  const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
  const asUserId = Number(localStorage.getItem('UserId'));

  const ClassesAndDivisionss = useSelector((state: RootState) => state.Holidays.AllClassesAndDivisionss);
  const ClassesAndDivisionss1 = useSelector((state: RootState) => state.Holidays.AllClassesAndDivisionss1);
  const USManagePhotoGallery: any = useSelector((state: RootState) => state.PhotoGalllary.IManagePhotoGalleryMsg);
  const USPhotoGallery: any = useSelector((state: RootState) => state.Photo.ISGetPhotoDetils)

  const USStandardDivisionName: any = useSelector((state: RootState) => state.PhotoGalllary.IStandardDivisionName);

  const StandardDivisionName: IAllClassesAndDivisionsBody = {
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId,
    associatedStandard: "",
  }
  useEffect(() => {
    dispatch(GetAllClassAndDivision(StandardDivisionName))
  }, []);

  const PhotoDetailsBody: IGetPhotoDetailsBody = {
    asSchoolId: asSchoolId,
    asSortExp: "",
    asStartIndex: 0,
    asPageSize: 20,
    asAcademicYearId: asAcademicYearId,
    asGalleryNameFilter: "",
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
  const ClickSave = async () => {
    let isValid = true;
    if (!GalleryName.trim()) {
      setGalleryNameError('Gallery name should not be blank.');
      isValid = false;
    }
    const SavephotoGallery: IManagePhotoGalleryBody = {
      asSchool_Id: asSchoolId,
      asOrg_Gallery_Name: "",
      asGallery_Name: GalleryName,
      asGallery_DetailsXML: "",
      asInserted_By_id: asUserId,
      asAssociatedSection: "1,2,3",
      asClassesIds: ClassSelected,
      Gallery_ID: 0
    }
    dispatch(CDAManagePhotoGalleryMsg(SavephotoGallery))
    //setGalleryNameError('');
  }
  useEffect(() => {
    if (USManagePhotoGallery !== "") {
      toast.success(USManagePhotoGallery);
      dispatch(resetManagePhotoGalleryMsg());
      dispatch(CDAGetPhotoDetails(PhotoDetailsBody));
    }
  }, [GalleryName, ClassSelected]);


  // function getXML() {
  //  // <PhotoGallery>
  //             <PhotoGallery
  //               imagePath="Images/Gallery/Screenshot (2)10436.png"
  //               imageSrNo="1"
  //               comment=""
  //             />
  //              </PhotoGallery>
  // }


  // function getXML() {
  //   let asUpdateSelectXML = "<PhotoGallery>";
  //   let SrNo=0;
  //   asUpdateSelectXML +=

  //   selectedd.forEach(item => {

  //     asUpdateSelectXML += "<PhotoGallery Image_Path=\"+item.ImagePath+"Image_SrNo=\"+1+"
  //                                           Comment=\"+item.comment+" />" 

  //   });
  //   asUpdateSelectXML += "</PhotoGallery>";
  //   return asUpdateSelectXML;
  // }


  useEffect(() => {
    setitemList(ClassesAndDivisionss);
  }, [ClassesAndDivisionss]);

  const ClickChild = (value) => {
    setitemList(value);
  };

  //console.log(ClassSelected, "ClassSelected1234");

  const ChangeFile2 = (value) => {
    setImageFile(value.Name);
    setbase64URL2(value.Value);
  };

  const ClickGalleryName = (value) => {
    setGalleryName(value);
  };


  return (
    <Box px={2}>
      <CommonPageHeader
        navLinks={[
          {
            title: "Photo Video Gallery",
            path: "/RITeSchool/Teacher/PhotoVideoGalleryBaseScreen",
          },
          { title: "Add Photo Gallery", path: "" },
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
                <Tooltip title={'Update Photo'}>
                  <IconButton
                    sx={{
                      color: 'white',
                      backgroundColor: green[500],
                      '&:hover': {
                        backgroundColor: green[600],
                      },
                    }}

                  // onClick={handleUpdate}
                  // disabled={!formData.url || !formData.title}
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
      <Box padding={2} sx={{ backgroundColor: "white" }}>
        {/* <Typography variant="h5" gutterBottom sx={{pb:2}}>
          Photo Gallery Details
        </Typography> */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth
              label={
                <span>
                  Gallery Name <span style={{ color: 'red' }}> *</span>
                </span>
              }
              variant="outlined"
              onChange={(e) => {
                ClickGalleryName(e.target.value);
              }}
              value={GalleryName}
            />
            <Box>
              <ErrorMessage1 Error={GalleryNameError}></ErrorMessage1>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControlLabel control={<Checkbox />} label="Add More Photos" />
          </Grid>
        </Grid>
        <Grid xs={12} sm={6}>
          <FileUploadComponent />

        </Grid>
        <Box pt={2} >
          <Box>
            <SelectListHierarchy1
              ItemList={ItemList}
              ParentList={ClassesAndDivisionss1}
              ClickChild={ClickChild}
            ></SelectListHierarchy1>
          </Box>
        </Box>
        <Box sx={{ backgroundColor: "lightgrey", pl: 1, mt: 2, }}>
          <FormControlLabel
            sx={{ mr: 0 }}
            control={<Checkbox checked={selectAll} onChange={undefined} />} label={""}
          />
          <strong>Associated Sections</strong>

        </Box>
        <Grid container spacing={2} alignItems="center" >
          <Grid item xs={12}>
            <Box pl={1}>
              <FormControlLabel
                control={<Checkbox checked={undefined} onChange={undefined} />}
                label="Pre-Primary"
              />
              <FormControlLabel
                control={<Checkbox checked={undefined} onChange={undefined} />}
                label="Primary"
              />
              <FormControlLabel
                control={<Checkbox checked={undefined} onChange={undefined} />}
                label="Secondary"
              />
            </Box>
          </Grid>
        </Grid>
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
  );
};

export default AddNewPhoto;
