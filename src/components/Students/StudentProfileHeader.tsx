import { Avatar, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { RootState } from 'src/store';

const StudentProfileHeader: React.FC = () => {
    const location = useLocation();
    const { Name, standardId, DivisionId, YearWise_Student_Id, SchoolWise_Student_Id, StandardDivision_Id, Enrolment_Number, } = location.state || {};
    const [profilePhoto, setprofilePhoto] = useState(null);
    const USGetSingleStudentDetails = useSelector((state: RootState) => state.StudentUI.ISGetSingleStudentDetails);
    const UsGetSchoolSettings: any = useSelector((state: RootState) => state.ProgressReportNew.IsGetSchoolSettings);

    const studentDetails = USGetSingleStudentDetails[0] || {};
    const {
        Photo_File_Path,
        Photo_file_Path_Image,
        ConfirmedByText,
        UpdatedByText,
        AdmissionStandard,
        ResidenceName
    } = studentDetails;

    const showConfirmedByName = UsGetSchoolSettings?.GetSchoolSettingsResult?.ShowConfirmedByName === true;

    console.log('💀studentDetails on profile header:', studentDetails);

    useEffect(() => {
        if (Photo_File_Path && Photo_file_Path_Image) {
            const base64Image = Photo_file_Path_Image;
            const newImageName = Photo_File_Path.split('/').pop(); // Extract file name
            const fileExtension = Photo_File_Path.split('.').pop(); // Extract file extension
            const imageData = `data:image/${fileExtension};base64,${Photo_file_Path_Image}`;

            setprofilePhoto({
                src: imageData,                      //`data:image/jpeg;base64,${personal.photoFilePathImage}`,
                name: newImageName,                 //personal.photoFilePath.split('/').pop(), // Extract file name
                base64: base64Image, // Use the file path from API
            });
        }
    }, [Photo_File_Path, Photo_file_Path_Image]);
    //console.log('Show Confirmed By Name:', showConfirmedByName);
    // Function to format text with first two words in bold
    const formatTextWithBoldFirstTwo = (text: string) => {
        if (!text) return null;

        // Split the text into words
        const words = text.split(' ');

        // Take first two words and join them
        const boldPart = words.slice(0, 2).join(' ');

        // Join the rest of the words
        const remainingPart = words.slice(2).join(' ');

        return (
            <Typography variant="body1" sx={{ textAlign: 'left' }}>
                <b>{boldPart}</b> {remainingPart}
            </Typography>
        );
    };

    return (
        <Grid container spacing={2} sx={{ padding: '1px' }}>
            {/* Left Side - Student Photo, Name, Class */}

            <Grid item xs={12} sm={8} container alignItems="center">
                <Avatar
                    src={profilePhoto}// Replace with actual photo URL
                    alt={profilePhoto || "Student photo"}
                    sx={{ width: 80, height: 80, marginRight: '16px' }}
                />
                <div>
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{Name}</Typography>
                    <Typography variant="subtitle1">Class: {StandardDivision_Id}</Typography>
                    <Typography variant="subtitle1">Roll Number: {SchoolWise_Student_Id}</Typography>
                    <Typography variant="subtitle1">Registration Number: {Enrolment_Number}</Typography>
                </div>
            </Grid>

            {/* Right Side - Confirmation and Update Info */}
            <Grid item xs={6} sm={4} container direction="column" justifyContent="flex-start" alignItems="flex-start">
                {showConfirmedByName ? (
                    <>
                        {/* {ConfirmedByText && (
                            <Typography variant="body1" sx={{ textAlign: 'left' }}>
                                {ConfirmedByText}
                            </Typography>
                        )}
                        {UpdatedByText && (
                            <Typography variant="body1" sx={{ textAlign: 'left' }}>
                                {UpdatedByText}
                            </Typography>
                        )} */}
                        {ConfirmedByText && formatTextWithBoldFirstTwo(ConfirmedByText)}

                        {UpdatedByText && formatTextWithBoldFirstTwo(UpdatedByText)}

                        {AdmissionStandard && (
                            <Typography variant="body1" sx={{ textAlign: 'left' }}>
                                <b>Admitted In:</b> {AdmissionStandard}
                            </Typography>
                        )}
                        {ResidenceName && (
                            <Typography variant="body1" sx={{ textAlign: 'left' }}>
                                <b>Residence Type:</b> {ResidenceName}
                            </Typography>
                        )}
                    </>
                ) : (
                    // Render this when showConfirmedByName is false
                    // UpdatedByText && (
                    //     <Typography variant="body1" sx={{ textAlign: 'left' }}>
                    //         {UpdatedByText}
                    //     </Typography>
                    // )
                    UpdatedByText && formatTextWithBoldFirstTwo(UpdatedByText)
                )}
            </Grid>
        </Grid>
    );
};

export default StudentProfileHeader;
