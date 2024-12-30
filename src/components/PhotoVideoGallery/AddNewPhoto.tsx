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
import { blue, green, grey, red } from "@mui/material/colors";
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


const dropdownItems = [
  { Value: '1', Name: 'Pre-Primary' },
  { Value: '2', Name: 'Primary' },
  { Value: '3', Name: 'Secondary' },

];
const AddNewPhoto = () => {
  const dispatch = useDispatch();
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const [selectedClasses, setSelectedClasses] = useState({});
  // const [selectAll, setSelectAll] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [ItemList, setitemList] = useState([]);
  const [GalleryName, setGalleryName] = useState('');
  const [selected, setSelected] = useState([]);
  // const [selectAll, setSelectAll] = useState(false);
  const [GalleryNameError, setGalleryNameError] = useState('');
  const [SelectImageError, setSelectImageError] = useState('');
  const [AssociatedSectionsError, setAssociatedSectionsError] = useState('');
  const [ClassesAndDivisionssError, setClassesAndDivisionssError] = useState('');
  const [checkedValues, setCheckedValues] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [AddMorePhotos, setAddMorePhotos] = useState(false); //setAddMorePhoto
  //console.log(AddMorePhotos, "AddMorePhoto");

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

  const [files, setFiles] = useState<File[]>([]);
  const [comment, setComment] = useState("");
  const [fileList, setFileList] = useState<{ fileNames: string[]; comment: string }[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files);
      setFiles(selectedFiles);
    }
  };

  const handleAddFile = () => {
    if (files.length === 0) {
      setSelectImageError('At least one file should be selected.');

      return;
    }

    if (!comment.trim()) {
      alert("Please add a comment.");
      return;
    }

    const newEntry = {
      fileNames: files.map((file) => file.name),
      comment,
    };

    setFileList([...fileList, newEntry]);
    setFiles([]); // Reset file input
    setComment(""); // Reset comment field
  };

  const getXML1 = () => {
    let Image_SrNo = 0;
    let xml = '<PhotoGallery>\n';

    fileList.forEach((entry) => {
      entry.fileNames.forEach((fileName) => {
        Image_SrNo++; // Increment for each file
        xml += `  <PhotoGallery Image_Path="${fileName}" Image_SrNo="${Image_SrNo}" Comment="${entry.comment}" />\n`;
      });
    });

    xml += '</PhotoGallery>';
    return xml;

  };
  const ClickSave = async () => {
    let isValid = true;
    if (!GalleryName.trim()) {
      setGalleryNameError('Gallery name should not be blank.');
      isValid = false;
    }
    if (files.length === 0) {
      setSelectImageError('At least one file should be selected.');
      isValid = false;
    }
    if (!ClassSelected.trim()) {
      setClassesAndDivisionssError('At least one class should be selected.');
      isValid = false;
    }
    if (checkedValues.length === 0) {
      setAssociatedSectionsError('At least one section should be associated for photo gallery.');
      isValid = false;
    }
    const SavephotoGallery: IManagePhotoGalleryBody = {
      asSchool_Id: asSchoolId,
      asOrg_Gallery_Name: "",
      asGallery_Name: GalleryName,
      asGallery_DetailsXML: getXML1(),
      asInserted_By_id: asUserId,
      asAssociatedSection: checkedValues.toString(),
      asClassesIds: ClassSelected,
      Gallery_ID: 0
    }
    dispatch(CDAManagePhotoGalleryMsg(SavephotoGallery))
  }
  useEffect(() => {
    if (USManagePhotoGallery !== "") {
      toast.success(USManagePhotoGallery);
      dispatch(resetManagePhotoGalleryMsg());
      dispatch(CDAGetPhotoDetails(PhotoDetailsBody));
    }
  }, [GalleryName, ClassSelected]);

  const handleChange = (event) => {
    const { value, checked } = event.target;

    if (checked) {
      setCheckedValues((prev) => {
        const updatedValues = [...prev, value];
        if (updatedValues.length === dropdownItems.length) {
          setSelectAll(true);
        }
        return updatedValues;
      });
    } else {
      setCheckedValues((prev) => {
        const updatedValues = prev.filter((item) => item !== value);
        setSelectAll(false);
        return updatedValues;
      });
    }
  };

  const handleSelectAll = (event) => {
    const { checked } = event.target;
    setSelectAll(checked);
    if (checked) {
      setCheckedValues(dropdownItems.map((item) => item.Value));
    } else {
      setCheckedValues([]);
    }
  };
  // function AddMorePhoto(event: SyntheticEvent<Element, Event>, checked: boolean): void {
  //   throw new Error("Function not implemented.");
  // }

  const AddMorePhoto = (event) => {
    const { checked } = event.target;
    setAddMorePhotos(checked);
  }

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
                "Create new photo galleries or add photos to existing gallery. You can also view all gallery photos by clicking on Slideshow."
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

          <Grid item xs={12} sm={6} >
            <FormControlLabel
              onChange={AddMorePhoto}
              control={<Checkbox />}
              label="Add More Photos" />
          </Grid>
        </Grid>
        <Grid xs={3} sm={3}>
          <FileUploadComponent
            files={files}
            comment={comment}
            setFiles={setFiles}
            setComment={setComment}
            setFileList={setFileList}
            fileList={fileList}
            handleFileChange={handleFileChange}
            handleAddFile={handleAddFile}
          // AddMorePhoto={setAddMorePhotos}
          />
          <ErrorMessage1 Error={SelectImageError}></ErrorMessage1>


          {AddMorePhotos === true ? (
            <Button
              onClick={handleAddFile}
              sx={{

                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 1, // Adds spacing between the text field and button


                mt: 1, color: '#38548A',
                //  backgroundColor: grey[500],
                '&:hover': {
                  color: '#38548A',
                  backgroundColor: blue[100]
                }
              }}

            >
              Add Photos
            </Button>

          ) : (
            <span></span>
          )}

        </Grid>

        <Box pt={2} >
          <Box>
            <SelectListHierarchy1
              ItemList={ItemList}
              ParentList={ClassesAndDivisionss1}
              ClickChild={ClickChild}
            ></SelectListHierarchy1>
            <ErrorMessage1 Error={ClassesAndDivisionssError}></ErrorMessage1>
          </Box>
        </Box>
        <Box sx={{ backgroundColor: "lightgrey", pl: 1, mt: 2, }}>
          <FormControlLabel
            sx={{ mr: 0 }}
            control={
              <Checkbox
                checked={selectAll}
                onChange={handleSelectAll}
              />
            }
            label="Associated Sections"
          />
        </Box>
        <Grid container spacing={2} alignItems="center" >
          <Grid item xs={12}>
            <Box pl={1}>
              {dropdownItems.map((item) => (
                <FormControlLabel
                  key={item.Value}
                  control={
                    <Checkbox
                      value={item.Value}
                      checked={checkedValues.includes(item.Value)}
                      onChange={handleChange}
                    />
                  }
                  label={item.Name}
                />
              ))}
            </Box>
            <ErrorMessage1 Error={AssociatedSectionsError}></ErrorMessage1>
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
