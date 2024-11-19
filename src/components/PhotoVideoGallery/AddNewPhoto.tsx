import { Box, Button, Checkbox, FormControlLabel, FormGroup, Grid, IconButton, TextField, Tooltip, Typography, useMediaQuery } from '@mui/material'
import React from 'react'
import CommonPageHeader from '../CommonPageHeader'
import { QuestionMark } from '@mui/icons-material'
import { grey } from '@mui/material/colors'

 const AddNewPhoto = () => {
  
    const isSmallScreen = useMediaQuery("(max-width:600px)");

    const sections = ["A", "B", "C", "D", "E", "F", "G"];
    const classes = [
      "Nursery",
      "Junior KG",
      "Senior KG",
      ...Array.from({ length: 10 }, (_, i) => (i + 1).toString()),
    ];
    return (
      <Box px={2}>
        <CommonPageHeader
          navLinks={[
            { title: 'Photo Video Gallery', path: '/extended-sidebar/Teacher/PhotoVideoGalleryBaseScreen' },
            { title: 'Add Photo Gallery', path: '' }
          ]}
          rightActions={<>

            <Tooltip title={'Create new photo galleries or add photos to existing gallery. You can also view all gallery photos by clicking on SlideShow.You can also add or view videos into gallery.'}>
              <IconButton
                sx={{
                  color: 'white',
                  backgroundColor: grey[500],
                  '&:hover': {
                    backgroundColor: grey[600]
                  }
                }}
              >
                <QuestionMark />
              </IconButton>
            </Tooltip>


          </>}
        />
        <Box padding={2} sx={{backgroundColor:'white'}}>
          <Typography variant="h6" gutterBottom>
            Photo Gallery Details
          </Typography>
          <Grid container spacing={2}>
            {/* Gallery Name */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Gallery Name"
                variant="outlined"
                required
              />
            </Grid>

            {/* Add More Photos */}
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={<Checkbox />}
                label="Add More Photos"
              />
            </Grid>

            {/* Classes and Sections */}
            <Grid item xs={12}>
              <Typography variant="body1">
                Applicable to all staff members and selected Class(es):
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox />}
                label="Select All"
              />
            </Grid>
            {classes.map((className) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={className}
                display="flex"
                flexDirection="column"
              >
                <Typography variant="subtitle2">{className}</Typography>
                <FormGroup row>
                  {sections.map((section) => (
                    <FormControlLabel
                      key={section}
                      control={<Checkbox />}
                      label={section}
                    />
                  ))}
                </FormGroup>
              </Grid>
            ))}
          </Grid>

          {/* Submit Button */}
          <Box marginTop={3}>
            <Button variant="contained" color="primary">
              Save
            </Button>
          </Box>
        </Box>

      </Box>
    )
  }
export default AddNewPhoto