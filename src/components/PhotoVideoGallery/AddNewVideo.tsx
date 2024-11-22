import { QuestionMark } from '@mui/icons-material'
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { Accordion, AccordionDetails, AccordionSummary, Alert, Box, Checkbox, FormControlLabel, FormGroup, Grid, IconButton, TextField, Tooltip, Typography, useMediaQuery } from '@mui/material'
import { green, grey } from '@mui/material/colors'

import SaveIcon from '@mui/icons-material/Save'
import { useState } from 'react'
import CommonPageHeader from '../CommonPageHeader'
import ClassSectionSelector from './ClassSectionSelector'



const AddNewVideo = () => {
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

  const [roles, setRoles] = useState({
    selectAll: false,
    admin: false,
    teacher: false,
    student: false,
    adminStaff: false,
    otherStaff: false,
  });
  // const handleCheckboxChange = (event) => {
  //   const { name, checked } = event.target;

  //   if (name === "selectAll") {
  //     // If "Select All" is checked/unchecked, update all other roles
  //     const updatedRoles = Object.keys(roles).reduce((acc, key) => {
  //       acc[key] = checked;
  //       return acc;
  //     }, {});
  //     setRoles(updatedRoles);
  //   } else {
  //     // Update individual checkboxes
  //     setRoles((prev) => ({
  //       ...prev,
  //       [name]: checked,
  //       selectAll: false, // Reset "Select All" if individual roles are unchecked
  //     }));
  //   }
  // };

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
              <b>Note 1:</b> Video should be from <strong>www.youtube.com</strong>, URL Example: http://www.youtube.com/v/bAUT_Pux73w.
            </Alert>
            <Alert variant="filled" severity="info">
              <b>Note 2:</b> When you edit any gallery, changes made to the gallery name, dates, user roles, and classes will be applied to all subjects of the respective gallery.
            </Alert>
          </AccordionDetails>
        </Accordion>
      </Box>
      <Box padding={2} sx={{ backgroundColor: "white" }}>
        <Typography variant="h5" gutterBottom sx={{pb:2}}>
          Video Gallery Details :
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField fullWidth variant="outlined"  
             label={
              <span>
              Video Name <span style={{ color: 'red' }}> *</span>
              </span>
            } />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField fullWidth  variant="outlined"
             label={
              <span>
              Url Source <span style={{ color: 'red' }}> *</span>
              </span>
            } />

          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControlLabel control={<Checkbox />} label="Show On External Website? " />
          </Grid>
        </Grid>
        <Box pt={2}>
          <Box>
            <ClassSectionSelector classes={classes} getSectionsForClass={getSectionsForClass} />
          </Box>

          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12}>
              <Typography variant="h4" sx={{ fontWeight: "bold", pt: 2 }}>
                Associated User Role(s):
              </Typography>
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="selectAll"
                      checked={roles.selectAll}
                      // onChange={handleCheckboxChange}
                    />
                  }
                  label="Select All"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="admin"
                      checked={roles.admin}
                      // onChange={handleCheckboxChange}
                    />
                  }
                  label="Admin"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="teacher"
                      checked={roles.teacher}
                      // onChange={handleCheckboxChange}
                    />
                  }
                  label="Teacher"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="student"
                      checked={roles.student}
                      // onChange={handleCheckboxChange}
                    />
                  }
                  label="Student"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="adminStaff"
                      checked={roles.adminStaff}
                      // onChange={handleCheckboxChange}
                    />
                  }
                  label="Admin Staff"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="otherStaff"
                      checked={roles.otherStaff}
                      // onChange={handleCheckboxChange}
                    />
                  }
                  label="Other Staff"
                />
              </FormGroup>
            </Grid>
          </Grid>
        </Box>
      
      </Box>
    </Box>
  )
}
export default AddNewVideo
