import { Box, Card, Link, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
// import { getWithoutHTML, sitePath } from "../Common/Util";
import { sitePath } from '../Common/Util';
import CommonPageHeader from '../CommonPageHeader';
export function getWithoutHTML(value) {
    var div = document.createElement('div');
    div.innerHTML = value;
    var text = div.textContent || div.innerText || '';
    return text;
};
const NavContent = () => {
    const GetNavbarmenu: any = useSelector((state: RootState) => state.NavbarMenu.GetNavbarMenuDetails);
    const MenuDescription: any = useSelector((state: RootState) => state.NavbarMenu.MenuDescription);
    const ChildMenuId: any = useSelector((state: RootState) => state.NavbarMenu.ChildMenuId);
    const [MenuContent, setMenuContent] = useState('')

    useEffect(() => {
        if (MenuDescription.length > 0) {
            setMenuContent(MenuDescription[0].MenuContent)
        }
    }, [MenuDescription])
    const IsFile = () => {
        let returnVal = false
        GetNavbarmenu
            .filter((item) => { return item.MenuId == ChildMenuId })
            .map((item, index) => {
                if (item.FilePath != "")
                    returnVal = true
            })
        return returnVal
    }
    const IsAttachment = () => {
        let returnVal = false
        GetNavbarmenu
            .filter((item) => { return item.MenuId == ChildMenuId })
            .map((item, index) => {
                if (item.FilePath != "" && !item.IsURL)
                    returnVal = true
            })
        return returnVal
    }

    const IsURL = () => {
        let returnVal = false
        GetNavbarmenu
            .filter((item) => { return item.MenuId == ChildMenuId })
            .map((item, index) => {
                if (item.FilePath != "" && item.IsURL)
                    returnVal = true
            })
        return returnVal
    }
    return (
        <>
            <Box sx={{ px: 2 }}>
                <CommonPageHeader
                    navLinks={[
                        {
                            title: MenuDescription[0]?.MenuName,
                            path: ''
                        }
                    ]}
                    rightActions={
                        <></>
                    }
                />

                {MenuContent != "" &&
                    <>
                        <Card component={Box} padding={1} mt={1}>
                            <div dangerouslySetInnerHTML={{
                                __html: getWithoutHTML(MenuContent)
                            }}></div>
                        </Card>
                        <br />
                    </>
                }
                {/* {IsFile() &&
                    <Grid item xs={12}>
                        <Card component={Box} padding={1} mt={1}>
                            {
                                GetNavbarmenu
                                    .filter((item) => { return item.MenuId == ChildMenuId })
                                    .map((item, index) => {
                                        return (<>
                                            {(item.FilePath != "" && !item.IsURL) &&

                                                (<>
                                                    {IsAttachment() &&
                                                        <Typography variant='h6' style={{ fontWeight: 'bold' }}>Attachments:{item.IsURL.toString()}</Typography>
                                                    }

                                                    <Link href={sitePath + item.FilePath} target="_blank">{item.LinkName}</Link><br />{item.IsURL}
                                                </>)
                                            }
                                            {
                                                (item.FilePath != "" && item.IsURL) &&

                                                (<>
                                                    {IsURL() &&
                                                        <Typography variant='h6' style={{ fontWeight: 'bold' }}>URLs:</Typography>
                                                    }
                                                    <Link href={item.FilePath} target="_blank">{item.LinkName}</Link><br />{item.IsURL}
                                                </>)
                                            }
                                        </>)
                                    })
                            }
                        </Card>
                    </Grid>
                } */}
                {IsFile() &&
                    <Table>
                        <TableHead sx={{ background: (theme) => theme.palette.secondary.main, }}>
                            <TableRow>
                                <TableCell sx={{
                                    // textTransform: 'capitalize',
                                    color: (theme) => theme.palette.common.white,
                                }} >
                                    <Typography variant='h4'>
                                        {MenuDescription[0]?.MenuName} - Attachment(s)
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                GetNavbarmenu
                                    .filter((item) => { return item.MenuId == ChildMenuId })
                                    .map((item, index) => {
                                        return (
                                            <TableRow sx={{ backgroundColor: 'white' }}>
                                                <TableCell sx={{ paddingTop: '10px', paddingBottom: '10px' }}>
                                                    <>
                                                        {(item.FilePath != "" && !item.IsURL) &&
                                                            (<>
                                                                {/* {IsAttachment() &&
                                                                <Typography variant='h6' style={{ fontWeight: 'bold' }}>Attachments:{item.IsURL.toString()}</Typography>
                                                            } */}

                                                                <Link href={sitePath + item.FilePath} target="_blank">{item.LinkName}</Link><br />{item.IsURL}
                                                            </>)
                                                        }
                                                        {
                                                            (item.FilePath != "" && item.IsURL) &&

                                                            (<>
                                                                {/* {IsURL() &&
                                                                <Typography variant='h6' style={{ fontWeight: 'bold' }}>URLs:</Typography>
                                                            } */}
                                                                <Link href={item.FilePath} target="_blank">{item.LinkName}</Link><br />{item.IsURL}
                                                            </>)
                                                        }
                                                    </>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })
                            }
                        </TableBody>
                    </Table>
                }
                {!IsFile() && MenuContent === "" &&
                    <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 2, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }}>
                        <b>No record found.</b>
                    </Typography>
                }
            </Box>
        </>

    )
}

export default NavContent