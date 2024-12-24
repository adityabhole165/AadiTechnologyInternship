import { QuestionMark } from '@mui/icons-material';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip
} from '@mui/material';
import { grey } from '@mui/material/colors';
import CommonPageHeader from '../CommonPageHeader';

const documents = [
  { name: 'Form No. - 16', year: '2024 - 2025', file: 'From.pdf' },
  { name: 'Medical Card', year: '2024 - 2025', file: 'dummy.pdf' }
];

const UserDocumentDetailsBaseScreen = () => {
  const handleDownload = (file: string) => {
    const link = document.createElement("a");
    link.href = `${process.env.PUBLIC_URL}/${file}`; // Path to PDF file
    link.download = file; // File name to download
    document.body.appendChild(link);
    link.click(); // Trigger download
    document.body.removeChild(link);
  };
  return (
    <Box px={2}>
      <CommonPageHeader
        navLinks={[
          {
            title: 'User Document Details',
            path: '/RITeSchool/Teacher/UserDocumentDetailsBaseScreen'
          }
        ]}
        rightActions={
          <>
            <Tooltip title="Displays/ download documents details.">
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
          </>
        }
      />
      <Box sx={{ backgroundColor: (theme) => theme.palette.common.white, p: 2 }}>
        <TableContainer component={Paper}>
          <Table aria-label="simple table" sx={{ border: (theme) => `1px solid ${theme.palette.grey[300]}` }}>
            <TableHead>
              <TableRow sx={{ background: (theme) => theme.palette.secondary.main, color: (theme) => theme.palette.common.white }}>
                <TableCell
                  sx={{ textTransform: 'capitalize', color: 'white', py: 1.5, }}
                >
                  <strong>Document Name</strong>
                </TableCell>
                <TableCell
                  sx={{ textTransform: 'capitalize', color: 'white', py: 1.5, textAlign: 'center', }}
                >
                  <strong>Year</strong>
                </TableCell>
                <TableCell
                  sx={{ textTransform: 'capitalize', color: 'white', py: 1.5, textAlign: 'center', }}
                >
                  <strong>Download</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {documents.map((doc, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ textTransform: 'capitalize', py: 0.5, }}>{doc.name}</TableCell>
                  <TableCell sx={{ textTransform: 'capitalize', py: 0.5, textAlign: 'center', }}>{doc.year}</TableCell>
                  <TableCell sx={{ textTransform: 'capitalize', py: 0.5, textAlign: 'center', }}>
                    <Tooltip title="Download">
                      <IconButton onClick={() => handleDownload(doc.file)}>
                        <FileDownloadOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default UserDocumentDetailsBaseScreen;
