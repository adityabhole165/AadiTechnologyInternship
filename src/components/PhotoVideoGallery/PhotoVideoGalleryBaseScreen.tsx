import { AddPhotoAlternate, QuestionMark, VideoLibrary } from '@mui/icons-material';
import { Box, FormControlLabel, IconButton, Radio, RadioGroup, Tooltip, Typography } from '@mui/material';
import { blue, grey } from '@mui/material/colors';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ButtonGroupComponent from 'src/libraries/ResuableComponents/ButtonGroupComponent';
import { RootState } from 'src/store';
import CommonPageHeader from '../CommonPageHeader';
import PhotopageTableCard from './PhotopageTableCard';
import VideoPageTableCard from './VideoPageTableCard';
import {  useNavigate } from 'react-router';

const PhotoVideoGalleryBaseScreen = () => {
    const [selectedOption, setSelectedOption] = useState<string>('photo');
    const [view, setView] = useState<"table" | "card">("table");
    const [SelectResult, setSelectResult] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const [page, setPage] = useState(1);
    const rowsPerPageOptions = [20, 50, 100, 200];
    const navigate = useNavigate();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(event.target.value);
    };
    const photoData = [
        {
            galleryName: "Janmashtami Aug 24",
            className: "Nursery, Junior KG, Senior KG",
            lastUpdated: "26 Aug 2024",
        },
        {
            galleryName: "Test New",
            className: "Nursery, Junior KG, Senior KG",
            lastUpdated: "26 Aug 2024",
        },
        {
            galleryName: "Sanskrit Divas",
            className: "Junior KG",
            lastUpdated: "22 Aug 2024",
        },
        {
            galleryName: "Raksha Bandhan",
            className: "Senior KG",
            lastUpdated: "20 Aug 2024",
        },
        {
            galleryName: "Raksha Bandhan",
            className: "Senior KG",
            lastUpdated: "20 Aug 2024",
        },
        {
            galleryName: "Raksha Bandhan",
            className: "Senior KG",
            lastUpdated: "20 Aug 2024",
        },
        {
            galleryName: "Raksha Bandhan",
            className: "Senior KG",
            lastUpdated: "20 Aug 2024",
        },
        {
            galleryName: "Raksha Bandhan",
            className: "Senior KG",
            lastUpdated: "20 Aug 2024",
        },
        {
            galleryName: "Raksha Bandhan",
            className: "Senior KG",
            lastUpdated: "20 Aug 2024",
        },
    ];
    const videoData = [
        { videoName: "Video Test1111", lastUpdated: "26 Aug 2024" },
        { videoName: "Gokulashtami", lastUpdated: "26 Aug 2024" },
        { videoName: "Mock Parliament (Primary Section)", lastUpdated: "25 Feb 2021" },
        { videoName: "EumInd Song", lastUpdated: "12 Jul 2016" },
      ];
    
      const handleView = (videoName: string) => {
        alert(`View clicked for ${videoName}`);
      };
    
      const handleEdit = (videoName: string) => {
        alert(`Edit clicked for ${videoName}`);
      };
    
      const handleDelete = (videoName: string) => {
        alert(`Delete clicked for ${videoName}`);
      };
    const CountGetPagedRequisition: any = useSelector(
        (state: RootState) => state.SliceRequisition.RequisitionListCount

    );
    const GetRequisitionStatusDropdown = (value) => {
        setSelectResult(value);
        setRowsPerPage(20)
        setPage(1);
    };
    const startRecord = (page - 1) * rowsPerPage + 1;
    const endRecord = Math.min(page * rowsPerPage, CountGetPagedRequisition.TotalCount);
    const pagecount = Math.ceil(CountGetPagedRequisition.TotalCount / rowsPerPage);
    const ChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(1);
    };

    const PageChange = (pageNumber) => {
        setPage(pageNumber);
    };

    const AddNewPhoto = (value) => {
        navigate('/extended-sidebar/Teacher/AddNewPhoto');
      };
      const AddNewVideo = (value) => {
        navigate('/extended-sidebar/Teacher/AddNewVideo');
      };

    return (
        <Box sx={{ px: 2 }}>
            <CommonPageHeader
                navLinks={[
                    { title: 'Photo Video Gallery', path: '/extended-sidebar/Teacher/PhotoVideoGalleryBaseScreen' }
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

                    {selectedOption === 'photo' && (
                        <Tooltip title="Add Photo">
                            <IconButton
                                sx={{
                                    color: 'white',
                                    backgroundColor: blue[500],
                                    '&:hover': {
                                        backgroundColor: blue[600]
                                    }
                                }}
                                 onClick={AddNewPhoto} // Dummy link for Photo Page
                            >
                                <AddPhotoAlternate />
                            </IconButton>
                        </Tooltip>
                    )}
                    {selectedOption === 'video' && (
                        <Tooltip title="Add Video">
                            <IconButton
                                sx={{
                                    color: 'white',
                                    backgroundColor: blue[500],
                                    '&:hover': {
                                        backgroundColor: blue[600]
                                    } }}
                                onClick={AddNewVideo} // Dummy link for Video Page
                            >
                                <VideoLibrary />
                            </IconButton>
                        </Tooltip>
                    )}

                </>}
            />


            {/* Radio Buttons */}
            <Box sx={{ backgroundColor: 'white', p: 1, mb: 1 }}>
                <RadioGroup
                    row
                    value={selectedOption}
                    onChange={handleChange}
                //   sx={{ mb: 4 }}
                >
                    <FormControlLabel value="photo" control={<Radio />} label="Photo" />
                    <FormControlLabel value="video" control={<Radio />} label="Video" />
                </RadioGroup>
            </Box>
            <Box sx={{ backgroundColor: 'white' }}>
                {/* Display Page Content */}
                {selectedOption === 'photo' ? (
                    <Box sx={{ p: 2 }}>
                        <Typography variant="h4" gutterBottom>
                            Photo Gallery
                        </Typography>

                        {/* Record Format */}
                        {photoData.length > 0 ? (
                            <Typography variant="subtitle1" sx={{ margin: '10px 0', textAlign: 'center' }}>
                                <Box component="span" fontWeight="fontWeightBold">
                                    {startRecord} to {endRecord}
                                </Box>
                                {' '}out of{' '}
                                <Box component="span" fontWeight="fontWeightBold">
                                    {photoData.length}
                                </Box>{' '}
                                {photoData.length === 1 ? 'record' : 'records'}
                            </Typography>
                        ) : (
                            <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 1, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }}>
                                <b>No record found.</b>
                            </Typography>
                        )}

                        {/* Render the PhotoPage */}
                        <PhotopageTableCard data={photoData} view={view} />

                        {/* Add ButtonGroupComponent */}
                        {/* {photoData.length > 19 && (
                            <ButtonGroupComponent
                            rowsPerPage={rowsPerPage}
                            ChangeRowsPerPage={ChangeRowsPerPage}
                            rowsPerPageOptions={rowsPerPageOptions}
                            PageChange={PageChange}
                            pagecount={pagecount}
                        />
                        )} */}
                    </Box>
                ) : (
                    <Box p={2}>
                        <Typography variant="h4" gutterBottom>
                            Video Gallery
                        </Typography>

                        {/* Record Format */}
                        {videoData.length > 0 ? (
                            <Typography variant="subtitle1" sx={{ margin: '10px 0', textAlign: 'center' }}>
                                <Box component="span" fontWeight="fontWeightBold">
                                    {startRecord} to {endRecord}
                                </Box>
                                {' '}out of{' '}
                                <Box component="span" fontWeight="fontWeightBold">
                                    {/* {videoData.length} */}
                                </Box>{' '}
                                {videoData.length === 1 ? 'record' : 'records'}
                            </Typography>
                        ) : (
                            <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 1, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }}>
                                <b>No record found.</b>
                            </Typography>
                        )}

                        {/* Render the VideoPage */}
                        <VideoPageTableCard
                            data={videoData}
                            onView={handleView}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />

                        {/* Add ButtonGroupComponent */}
                        {/* {videoData.length > 19 && (
                            <ButtonGroupComponent
                                rowsPerPage={rowsPerPage}
                                ChangeRowsPerPage={ChangeRowsPerPage}
                                rowsPerPageOptions={rowsPerPageOptions}
                                PageChange={PageChange}
                                pagecount={pagecount}
                            />
                        )} */}
                    </Box>
                )}
            </Box>
        </Box>
    );
};



export default PhotoVideoGalleryBaseScreen