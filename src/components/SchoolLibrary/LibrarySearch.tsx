import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchableDropdown from "src/libraries/ResuableComponents/SearchableDropdown";
import { getLanguagesDetails } from "src/requests/Library/Library";
import { GetSelectStandardRes } from "src/requests/TExamschedule/TExamschedule";
import { RootState } from "src/store";
const LibrarySearch = () => {
    const dispatch = useDispatch()
    const [BookTitle, setBookTitle] = useState("");
    const [AccessionNumber, setAccessionNumber] = useState("");
    const [Author, setAuthor] = useState("");
    const [Publisher, setPublisher] = useState("");
    const [StandardId, setStandardId] = useState("0");
    const [LanguageId, setLanguageId] = useState("0");
    const asSchoolId = localStorage.getItem("localSchoolId");
    const asAcademicYearId = sessionStorage.getItem("AcademicYearId");
    const StandardList: any = useSelector((state: RootState) => state.StandardAndExamList.SelectStandard);
    const GetLanguageList = useSelector((state: RootState) => state.library.LanguageList);
    useEffect(() => {
        const GetAllStandardsBody = { asSchoolId: asSchoolId, asAcademicYearId: asAcademicYearId };
        dispatch(GetSelectStandardRes(GetAllStandardsBody));
        dispatch(getLanguagesDetails({ aiSchoolId: asSchoolId }));
    }, [])
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
    const clickSearch = () => {
        const GetLibrarySearchBody = {
            BookTitle: BookTitle,
            AccessionNumber: AccessionNumber,
            Author: Author,
            Publisher: Publisher,
            MediaTypeId: 1,
            StandardId: StandardId,
            LanguageId: LanguageId
        }
        console.log(GetLibrarySearchBody, "GetLibrarySearchBody");
    }
    return (

        <Box sx={{ p: 2, background: 'white' }}>
            <Typography variant='h4' pb={1} color={'#38548A'}> Search Criteria  </Typography>
            <Grid container spacing={2}>
                <Grid item xs={4} md={3}>
                    <TextField fullWidth label="Book Title"
                        value={BookTitle} onChange={(e) => clickBookTitle(e.target.value)} />
                </Grid>
                <Grid item xs={4} md={3} >
                    <TextField fullWidth label="Accession Number"
                        value={AccessionNumber} onChange={(e) => clickAccessionNumber(e.target.value)} />
                </Grid>
                <Grid item xs={6} md={3}>
                    <TextField fullWidth label="Author"
                        value={Author} onChange={(e) => clickAuthor(e.target.value)} />
                </Grid>
                <Grid item xs={6} md={3}>
                    <TextField fullWidth label="Publisher"
                        value={Publisher} onChange={(e) => clickPublisher(e.target.value)} />
                </Grid>
                <Grid item xs={12} md={3}>
                    <SearchableDropdown
                        sx={{ minWidth: '20vw' }}
                        ItemList={StandardList}
                        defaultValue={StandardId}
                        onChange={clickStandardId}
                        label='Standard '
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <SearchableDropdown
                        sx={{ minWidth: '20vw' }}
                        ItemList={GetLanguageList}
                        defaultValue={LanguageId}
                        onChange={clickLanguageId}
                        label='Language'
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <Button variant='contained' fullWidth onClick={clickSearch}>Search</Button>
                </Grid>
            </Grid>
        </Box>

    )
}

export default LibrarySearch