import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SearchTwoTone from "@mui/icons-material/SearchTwoTone";
import { Box, Grid, IconButton, TextField, Tooltip, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchableDropdown from "src/libraries/ResuableComponents/SearchableDropdown";
import { getLanguagesDetails } from "src/requests/Library/Library";
import { GetSelectStandardRes } from "src/requests/TExamschedule/TExamschedule";
import { RootState } from "src/store";
interface LibrarySearchProps {
    BookTitle: string;
    AccessionNumber: string;
    Author: string;
    Publisher: string;
    StandardId: string;
    LanguageId: string;
    IsPrintable: string;
    setBookTitle: (value: string) => void;
    setAccessionNumber: (value: string) => void;
    setAuthor: (value: string) => void;
    setPublisher: (value: string) => void;
    setStandardId: (value: string) => void;
    setLanguageId: (value: string) => void;
    setIsPrintable: (value: string) => void;
    clickSearch,
    clickReset
}
const LibrarySearch: React.FC<LibrarySearchProps> = ({
    BookTitle,
    AccessionNumber,
    Author,
    Publisher,
    StandardId,
    LanguageId,
    IsPrintable,
    setBookTitle,
    setAccessionNumber,
    setAuthor,
    setPublisher,
    setStandardId,
    setLanguageId,
    setIsPrintable,
    clickSearch,
    clickReset
}) => {
    // const LibrarySearch = () => {
    const dispatch = useDispatch()
    //const [BookTitle, setBookTitle] = useState("");
    //const [AccessionNumber, setAccessionNumber] = useState("");
    // const [Author, setAuthor] = useState("");
    // const [Publisher, setPublisher] = useState("");
    // const [StandardId, setStandardId] = useState("0");
    // const [LanguageId, setLanguageId] = useState("0");
    const mediaTypeOptions = [
        { id: '', Name: 'All', Value: '' },
        { id: '1', Name: 'Printable', Value: '1' },
        { id: '2', Name: 'Non-Printable', Value: '2' }
    ];

    const asSchoolId = localStorage.getItem("localSchoolId");
    const asAcademicYearId = sessionStorage.getItem("AcademicYearId");
    const StandardList: any = useSelector((state: RootState) => state.StandardAndExamList.SelectStandard);
    const GetLanguageList = useSelector((state: RootState) => state.library.LanguageList);
    useEffect(() => {
        const GetAllStandardsBody = { asSchoolId: asSchoolId, asAcademicYearId: asAcademicYearId };
        dispatch(GetSelectStandardRes(GetAllStandardsBody));
        dispatch(getLanguagesDetails({ aiSchoolId: asSchoolId }));
    }, [])
    useEffect(() => {
        if (!LanguageId && GetLanguageList.length > 0) {
            const defaultLanguage = GetLanguageList.find((item) => item.Value === "");
            if (defaultLanguage) {
                setLanguageId(defaultLanguage.Value);
            }
        }
    }, [LanguageId, GetLanguageList, setLanguageId]);
    useEffect(() => {
        if (IsPrintable === '0') {
            setIsPrintable('');
        }
    }, [IsPrintable, setIsPrintable]);
    const clickBookTitle = (Value) => {
        setBookTitle(Value);
    }
    const clickAccessionNumber = (Value) => {
        setAccessionNumber(Value);
    }
    const clickAuthor = (Value) => {
        setAuthor(Value);
    }
    const clickPublisher = (Value) => {
        setPublisher(Value);
    }
    const clickStandardId = (Value) => {
        setStandardId(Value);
    }
    const clickLanguageId = (Value) => {
        setLanguageId(Value);
    }
    const clickIsPrintable = (Value) => {
        setIsPrintable(Value);
    };

    return (

        <Box sx={{ p: 2, background: 'white' }}>
            <Typography variant='h4' pb={1} color={'#38548A'}> Search Criteria  </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                    <TextField
                        fullWidth
                        label="Book Title"
                        value={BookTitle}
                        onChange={(e) => clickBookTitle(e.target.value.slice(0, 100))}
                        inputProps={{ maxLength: 100 }}
                        size={"medium"}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === 'Tab') {
                                clickSearch();
                            }
                        }}
                    />

                </Grid>
                <Grid item xs={12} md={3}>
                    <TextField
                        fullWidth
                        size={"medium"}
                        label="Accession Number"
                        value={AccessionNumber}
                        onChange={(e) => clickAccessionNumber(e.target.value.slice(0, 100))}
                        inputProps={{ maxLength: 100 }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === 'Tab') {
                                clickSearch();
                            }
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <TextField
                        fullWidth
                        label="Author"
                        size={"medium"}
                        value={Author}
                        onChange={(e) => clickAuthor(e.target.value.slice(0, 100))}
                        inputProps={{ maxLength: 100 }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === 'Tab') {
                                clickSearch();
                            }
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <TextField
                        fullWidth
                        label="Publisher"
                        size={"medium"}
                        value={Publisher}
                        onChange={(e) => clickPublisher(e.target.value.slice(0, 100))}
                        inputProps={{ maxLength: 100 }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === 'Tab') {
                                clickSearch();
                            }
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <SearchableDropdown
                        size={"medium"}
                        sx={{ width: '100%' }}
                        ItemList={GetLanguageList}
                        defaultValue={LanguageId}
                        onChange={clickLanguageId}
                        label='Language'
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <SearchableDropdown
                        size={"medium"}
                        sx={{ width: '100%' }}
                        ItemList={StandardList}
                        defaultValue={StandardId}
                        onChange={clickStandardId}
                        label='Standard '
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <SearchableDropdown
                        size={"medium"}
                        sx={{ width: '100%' }}
                        ItemList={mediaTypeOptions} // Using the mediaTypeOptions array
                        defaultValue={IsPrintable}
                        onChange={clickIsPrintable}
                        label='Media Type'
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <Tooltip title={"Search"}>
                        <IconButton
                            sx={{
                                background: (theme) => theme.palette.primary.main,
                                color: 'white',
                                mt: 1,
                                '&:hover': {
                                    backgroundColor: (theme) => theme.palette.primary.dark
                                }
                            }}
                            onClick={clickSearch}
                        >
                            <SearchTwoTone />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={'Reset'}>
                        <IconButton
                            sx={{
                                color: 'white',
                                mt: 1,
                                ml: 1.5,
                                backgroundColor: blue[500],
                                '&:hover': {
                                    backgroundColor: blue[600]
                                }
                            }}
                            onClick={clickReset} >
                            <RestartAltIcon />
                        </IconButton>
                    </Tooltip>
                </Grid>
            </Grid>
        </Box>

    )
}

export default LibrarySearch