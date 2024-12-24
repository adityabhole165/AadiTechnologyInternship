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
import { IAllClassesAndDivisionsBody } from "src/interfaces/Common/Holidays";
import { GetAllClassAndDivision } from "src/requests/Holiday/Holiday";
import { RootState } from "src/store";
import CommonPageHeader from "../CommonPageHeader";
import FileUploadComponent from "./FileUploadComponent";
import SelectListHierarchy1 from "./SelectListHierarchy1";
const AddNewPhoto = () => {
  const dispatch = useDispatch();
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const [selectedClasses, setSelectedClasses] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [ItemList, setitemList] = useState([]);
  const asSchoolId = Number(localStorage.getItem('localSchoolId'));
  const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));

  const ClassesAndDivisionss = useSelector((state: RootState) => state.Holidays.AllClassesAndDivisionss);
  const ClassesAndDivisionss1 = useSelector((state: RootState) => state.Holidays.AllClassesAndDivisionss1);

  const USStandardDivisionName: any = useSelector((state: RootState) => state.PhotoGalllary.IStandardDivisionName);

  const StandardDivisionName: IAllClassesAndDivisionsBody = {
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId,
    associatedStandard: "",
  }
  useEffect(() => {
    dispatch(GetAllClassAndDivision(StandardDivisionName))
  }, []);

  useEffect(() => {
    setitemList(ClassesAndDivisionss);
  }, [ClassesAndDivisionss]);

  const ClickChild = (value) => {
    setitemList(value);
  };
  const isClassSelected = () => {
    let arr = []
    ItemList.map(item => {
      if (item.IsActive)
        arr.push(item.Id)


    })

    return arr.toString()
  }

  const ClassSelected = String(isClassSelected());

  console.log(ClassSelected, "ClassSelected1234");

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
            />
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
            {/* <ClassSectionSelector classes={classes} getSectionsForClass={getSectionsForClass} /> */}
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
              // onClick={ClickSave1}
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
