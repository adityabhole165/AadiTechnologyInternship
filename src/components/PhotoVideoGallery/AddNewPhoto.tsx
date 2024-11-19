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

const AddNewPhoto = () => {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const [selectedClasses, setSelectedClasses] = useState({});
  const [selectAll, setSelectAll] = useState(false);
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

            <Tooltip title="Add Photo">
            <IconButton
             
             sx={{
              color: "white",
              backgroundColor: green[500],
              "&:hover": {
                backgroundColor: green[600],
              },
            }}
            >
             <SaveIcon />
            </IconButton>
          </Tooltip>
      
          {/* Update Photo Button */}
          <Tooltip title="Update Photo">
            <IconButton
              sx={{
                color: "white",
                backgroundColor: green[500],
                "&:hover": {
                  backgroundColor: green[600],
                },
              }}
            >
              <SaveIcon />
            </IconButton>
          </Tooltip>
          </>
        }
      />
      <Box padding={2} sx={{ backgroundColor: "white" }}>
        <Typography variant="h6" gutterBottom>
          Photo Gallery Details
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Gallery Name" variant="outlined" required />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControlLabel control={<Checkbox />} label="Add More Photos" />
          </Grid>
        </Grid>
        <Box pt={2}>
          <Box display="flex" alignItems="center" gap={2}>
            <Typography variant="h6" gutterBottom>
              Applicable to all staff members and selected Class(es):
            </Typography>
            <FormControlLabel
              control={<Checkbox checked={selectAll} onChange={handleSelectAll} />}
              label="Select All"
            />
          </Box>

          {/* Table Layout with No Gap */}
          <Grid container spacing={0}>
            {[0, 1].map((columnIndex) => (
              <Grid
                item
                xs={12}
                md={6}
                key={columnIndex}
                sx={{
                  borderRight: columnIndex === 0 ? "1px solid #ddd" : "none",
                }}
              >
                <TableContainer component={Box} sx={{ boxShadow: "none" }}>
                  <Table sx={{
                    border: (theme) => `1px solid ${theme.palette.grey[300]}`,
                    overflow: 'hidden'
                  }}>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ py: 1 }}><strong>Class</strong></TableCell>
                        <TableCell sx={{ py: 1 }}><strong>Select Class</strong></TableCell>
                        <TableCell sx={{ py: 1 }}><strong>Sections</strong></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {classes
                        .filter((_, i) => i % 2 === columnIndex)
                        .map((className) => {
                          const sections = getSectionsForClass(className);
                          return (
                            <TableRow key={className}>
                              <TableCell sx={{ py: 0 }}>{className}</TableCell>
                              <TableCell sx={{ py: 0 }}>
                                <Checkbox
                                  checked={sections.every(
                                    (section) =>
                                      selectedClasses[className]?.[section]
                                  )}
                                  onChange={(e) =>
                                    handleClassChange(className, e.target.checked)
                                  }
                                />
                              </TableCell>
                              <TableCell sx={{ py: 0 }}>
                                <FormGroup row>
                                  {sections.map((section) => (
                                    <FormControlLabel
                                      key={section}
                                      control={
                                        <Checkbox
                                          size="small"
                                          checked={
                                            selectedClasses[className]?.[section] ||
                                            false
                                          }
                                          onChange={(e) =>
                                            handleSectionChange(
                                              className,
                                              section,
                                              e.target.checked
                                            )
                                          }
                                        />
                                      }
                                      label={section}
                                    />
                                  ))}
                                </FormGroup>
                              </TableCell>

                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box display="flex" alignItems="center" flexWrap="wrap" gap={2} p={1} sx={{border: (theme) => `1px solid ${theme.palette.grey[300]}`,}}>
          <Typography variant="h6" gutterBottom>
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
