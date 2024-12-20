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
import { useState } from "react";
import CommonPageHeader from "../CommonPageHeader";
import ClassSectionSelector from "./ClassSectionSelector";
import FileUploadComponent from "./FileUploadComponent";

const AddNewPhoto = () => {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const [selectedClasses, setSelectedClasses] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  // Define sections dynamically based on class
  const getSectionsForClass = (className: string) => {
    if (["1", "2", "3"].includes(className)) {
      return ["A", "B", "C", "D", "E"]; // No F, G
    } else if (["4", "5", "6", "7", "8", "9"].includes(className)) {
      return ["A", "B", "C", "D"]; // No E, F, G
    } else if (className === "10") {
      return ["A", "B", "C", "D", "G"]; // No E, F
    }
    return ["A", "B", "C", "D", "E", "F", "G"]; // Default sections
  };

  const classes = [
    "Nursery",
    "Junior KG",
    "Senior KG",
    ...Array.from({ length: 10 }, (_, i) => (i + 1).toString()),
  ];



  const handleSelectAll = (event) => {
    const isChecked = event.target.checked;
    setSelectAll(isChecked);

    // Update all classes and sections based on Select All state
    const updatedClasses = {};
    classes.forEach((className) => {
      const sections = getSectionsForClass(className);
      updatedClasses[className] = isChecked
        ? sections.reduce((acc, section) => {
          acc[section] = true;
          return acc;
        }, {})
        : {};
    });
    setSelectedClasses(updatedClasses);
  };

  const handleClassChange = (className, isChecked) => {
    setSelectedClasses((prevState) => {
      const updatedState = { ...prevState };
      const sections = getSectionsForClass(className);
      if (isChecked) {
        // Select all sections for the class
        updatedState[className] = sections.reduce((acc, section) => {
          acc[section] = true;
          return acc;
        }, {});
      } else {
        // Deselect all sections for the class
        updatedState[className] = {};
      }

      // Check if all classes and sections are selected for "Select All"
      const allClassesSelected = classes.every((c) =>
        getSectionsForClass(c).every((s) => updatedState[c]?.[s])
      );
      setSelectAll(allClassesSelected);

      return updatedState;
    });
  };

  const handleSectionChange = (className, section, isChecked) => {
    setSelectedClasses((prevState) => {
      const updatedClass = { ...prevState[className], [section]: isChecked };
      const allChecked = getSectionsForClass(className).every(
        (s) => updatedClass[s]
      );

      const updatedState = {
        ...prevState,
        [className]: updatedClass,
      };

      // Check if all classes and sections are selected for "Select All"
      const allClassesSelected = classes.every((c) =>
        getSectionsForClass(c).every((s) => updatedState[c]?.[s])
      );
      setSelectAll(allClassesSelected);

      return updatedState;
    });
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
            <ClassSectionSelector classes={classes} getSectionsForClass={getSectionsForClass} />
          </Box>
        </Box>
        <Box sx={{ backgroundColor: "lightgrey", pl: 1, mt: 2, }}>
          <FormControlLabel
            sx={{ mr: 0 }}
            control={<Checkbox checked={selectAll} onChange={handleSelectAll} />} label={""}
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
