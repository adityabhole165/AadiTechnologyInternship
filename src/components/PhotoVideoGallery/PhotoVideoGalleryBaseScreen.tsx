import { AddPhotoAlternate, QuestionMark, VideoLibrary } from '@mui/icons-material';
import SearchTwoTone from '@mui/icons-material/SearchTwoTone';
import { Box, FormControlLabel, IconButton, Radio, RadioGroup, TextField, Tooltip, Typography } from '@mui/material';
import { blue, grey } from '@mui/material/colors';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import { AlertContext } from 'src/contexts/AlertContext';
import { IDeletePhotoBody, IGetCountBody, IGetPhotoDetailsBody } from 'src/interfaces/Common/PhotoGallery';
import ButtonGroupComponent from 'src/libraries/ResuableComponents/ButtonGroupComponent';
import { CDADeletePhoto, CDAGetCount, CDAGetPhotoDetails, resetDeletePhoto } from 'src/requests/Reqphoto/ReqPhoto';
import { RootState } from 'src/store';
import CommonPageHeader from '../CommonPageHeader';
import PhotopageTableCard from './PhotopageTableCard';
import VideoPageTableCard from './VideoPageTableCard';

const PhotoVideoGalleryBaseScreen = () => {
    const dispatch = useDispatch();
    // let { galleryName } = useParams();

    // useEffect(() => {
    //     if (galleryName !== undefined)
    //         // galleryName = decodeURL(galleryName)
    //         console.log(galleryName, "1234567")


    // }, [galleryName])
    let { RowID } = useParams();

    useEffect(() => {
        if (RowID !== undefined) {
            // galleryName = decodeURL(galleryName)
            //console.log(RowID, "1234567")
        }
    }, [RowID])


    const [selectedOption, setSelectedOption] = useState<string>('photo');
    const [view, setView] = useState<"table" | "card">("table");
    const [SelectResult, setSelectResult] = useState(0);
    const [PhotoDetails, SetPhotoDetails] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const [page, setPage] = useState<number>(1);
    const [SearchPhotoGallery, setSearchPhotoGallery] = useState('');
    const rowsPerPageOptions = [20, 50, 100, 200];
    const { showAlert, closeAlert } = useContext(AlertContext);
    const navigate = useNavigate();
    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asUserId = Number(localStorage.getItem('UserId'));
    const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));


    const [SortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    const [SortBy, setSortBy] = useState('Update_Date');



    const USPhotoGallery: any = useSelector((state: RootState) => state.Photo.ISGetPhotoDetils)
    const USDeletePhoto = useSelector((state: RootState) => state.Photo.ISDeletePhoto);
    const UScount = useSelector((state: RootState) => state.Photo.ISCount);


    const singleTotalCountNew: number = useMemo(() => {
        if (!Array.isArray(UScount)) {
            return 0;
        }
        return UScount.reduce((acc: number, item: any) => {
            const count = Number(item.TotalRecordCount);
            if (isNaN(count)) {
                return acc;
            }
            return acc + count;
        }, 0);
    }, [UScount]);

    const GetCountList: IGetCountBody = {
        asSchoolId: asSchoolId,
    }

    useEffect(() => {
        dispatch(CDAGetCount(GetCountList))
    }, []);

    const startIndexNew = (page - 1) * rowsPerPage;

    const photoD1ata: IGetPhotoDetailsBody = {
        asSchoolId: asSchoolId,
        asSortExp: "ORDER BY " + SortBy + " " + SortDirection,
        asStartIndex: startIndexNew,
        asPageSize: page * rowsPerPage,
        asAcademicYearId: asAcademicYearId,
        asGalleryNameFilter: SearchPhotoGallery

    }
    useEffect(() => {
        dispatch(CDAGetPhotoDetails(photoD1ata))
    }, [page, rowsPerPage, SortDirection, SortBy, startIndexNew])



    const handleDelete = (GalleryName) => {


        const DeletePhotoGallery: IDeletePhotoBody = {
            asGalleryName: GalleryName,
            asSchoolId: asSchoolId

        }

        showAlert({
            title: 'Please Confirm',
            message:
                'Are you sure you want to delete this photo gallery?',
            variant: 'warning',
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
            onCancel: () => {
                closeAlert();
            },
            onConfirm: () => {
                dispatch(CDADeletePhoto(DeletePhotoGallery));

                closeAlert();
            }
        });
    }



    useEffect(() => {
        if (USDeletePhoto != "") {
            toast.success(USDeletePhoto);
            dispatch(resetDeletePhoto());
            dispatch(CDAGetPhotoDetails(photoD1ata));
        }
    }, [USDeletePhoto])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(event.target.value);
    };

    useEffect(() => {
        SetPhotoDetails(USPhotoGallery)
    }, [USPhotoGallery]);

    //Video Section
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

    // const handleDelete = (videoName: string) => {
    //     alert(`Delete clicked for ${videoName}`);
    // };


    const startRecord = (page - 1) * rowsPerPage + 1;
    const endRecord = Math.min(page * rowsPerPage, singleTotalCountNew);
    const pagecount = Math.ceil(singleTotalCountNew / rowsPerPage);

    const ChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 20));
        setPage(1);
    };

    const PageChange = (pageNumber) => {
        setPage(pageNumber);
    };

    const handleSortChange = (column: string) => {
        if (SortBy === column) {
            setSortDirection(SortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(column);
            setSortDirection('asc');
        }
    };
    const AddNewPhoto = (value) => {
        navigate('/RITeSchool/Teacher/AddNewPhoto');
    };
    const AddNewVideo = (value) => {
        navigate('/RITeSchool/Teacher/AddNewVideo');
    };
    const handleSearchGalleryName = (Value) => {
        setSearchPhotoGallery(Value);
    }
    const clickSearch = () => {

        dispatch(CDAGetPhotoDetails(photoD1ata))
    }




    return (
        <Box sx={{ px: 2 }}>
            <CommonPageHeader
                navLinks={[
                    { title: 'Photo/Video Gallery', path: '/RITeSchool/Teacher/PhotoVideoGalleryBaseScreen' }
                ]}
                rightActions={<>
                    <TextField
                        sx={{ width: '15vw' }}
                        fullWidth
                        label="Photo/Video Gallery"
                        value={SearchPhotoGallery}
                        variant={'outlined'}
                        size={"small"}
                        onChange={(e) => {
                            handleSearchGalleryName(e.target.value);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === 'Tab') {
                                clickSearch();
                            }
                        }}
                    />

                    <Tooltip title={'Search'}>
                        <IconButton
                            onClick={clickSearch}
                            sx={{
                                background: (theme) => theme.palette.primary.main,
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: (theme) => theme.palette.primary.dark
                                }
                            }}

                        >
                            <SearchTwoTone />
                        </IconButton>
                    </Tooltip>
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
                                    }
                                }}
                                onClick={AddNewVideo} // Dummy link for Video Page
                            >
                                <VideoLibrary />
                            </IconButton>
                        </Tooltip>
                    )}

                </>}
            />


            {/* Radio Buttons */}
            <Box sx={{ backgroundColor: 'white', px: 2, mb: 1, py: 1 }}>
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
                    <Box sx={{ px: 2, pt: 1 }}>
                        {/* <Typography variant="h4" gutterBottom>
                            Photo Gallery
                        </Typography> */}

                        {/* Record Format */}
                        {singleTotalCountNew > 0 ? (
                            <Typography variant="subtitle1" sx={{ margin: '2px 0', textAlign: 'center' }}>
                                <Box component="span" fontWeight="fontWeightBold">
                                    {startRecord} to {endRecord}
                                </Box>
                                {' '}out of{' '}
                                <Box component="span" fontWeight="fontWeightBold">
                                    {singleTotalCountNew}
                                </Box>{' '}
                                {singleTotalCountNew === 1 ? 'record' : 'records'}
                            </Typography>
                        ) : (
                            <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 1, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }}>
                                <b>No record found.</b>
                            </Typography>
                        )}

                        {/* Render the PhotoPage */}
                        <PhotopageTableCard data={USPhotoGallery} handleDelete={handleDelete} view={'table'}
                            handleSortChange={handleSortChange}
                            SortBy={SortBy}
                            SortDirection={SortDirection}


                        />

                        {/* Add ButtonGroupComponent */}

                        {endRecord > 19 ? (
                            <ButtonGroupComponent
                                rowsPerPage={rowsPerPage}
                                ChangeRowsPerPage={ChangeRowsPerPage}
                                rowsPerPageOptions={rowsPerPageOptions}
                                PageChange={PageChange}
                                pagecount={pagecount}
                            />
                        ) : (
                            <span></span>

                        )}
                    </Box>
                ) : (
                    <Box sx={{ px: 2, py: 1 }}>
                        {/* <Typography variant="h4" gutterBottom>
                            Video Gallery
                        </Typography> */}

                        {/* Record Format */}
                        {videoData.length > 0 ? (
                            <Typography variant="subtitle1" sx={{ margin: '2px 0', textAlign: 'center' }}>
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