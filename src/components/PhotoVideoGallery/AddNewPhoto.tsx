import { QuestionMark } from "@mui/icons-material";
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery
} from "@mui/material";
import { green, grey } from "@mui/material/colors";
import { useState } from "react";
import CommonPageHeader from "../CommonPageHeader";
import SaveIcon from '@mui/icons-material/Save';
import ClassSectionSelector from "./ClassSectionSelector";

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
            path: "/extended-sidebar/Teacher/PhotoVideoGalleryBaseScreen",
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
              <Tooltip title={'Save Photo'}>
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
        <Typography variant="h5" gutterBottom sx={{pb:2}}>
          Photo Gallery Details
        </Typography>
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
        <Box pt={2}>
          <Box>
            <ClassSectionSelector classes={classes} getSectionsForClass={getSectionsForClass} />
          </Box>
        </Box>
        <Box display="flex" alignItems="center" flexWrap="wrap" gap={2} p={1} >
          <Typography variant="h6" gutterBottom >
            Associated Section(s):
          </Typography>
          <FormControlLabel
            control={<Checkbox checked={selectAll} onChange={handleSelectAll} />}
            label="Select All"
          />
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
      </Box>
    </Box>
  );
};

export default AddNewPhoto;
