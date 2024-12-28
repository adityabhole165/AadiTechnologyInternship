import CloseTwoTone from "@mui/icons-material/CloseTwoTone"
import DeleteTwoTone from "@mui/icons-material/DeleteTwoTone"
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Stack, Typography } from "@mui/material"
import React, { useCallback } from "react"
import { useDropzone } from 'react-dropzone'

type Props = {
    open: boolean
    MultipleFiles: File[]
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    setMultipleFiles: React.Dispatch<React.SetStateAction<File[]>>
}

const UploadMultipleDialog = ({
    open,
    MultipleFiles,
    setOpen,
    setMultipleFiles
}: Props) => {
    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader()

            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading has failed')
            reader.onload = () => {
                // Do whatever you want with the file contents
                const binaryStr = reader.result
                //console.log(binaryStr)
            }
            reader.readAsArrayBuffer(file)

            setMultipleFiles((prev) => [...prev, file])
        })

    }, [
        setMultipleFiles
    ])

    const handleConfirm = () => {
        //console.log("Confirmed files:", MultipleFiles)
        setOpen(false);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            fullWidth
            maxWidth={"sm"}
        >
            <DialogTitle variant="h4" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                Upload Multiple Files
                <IconButton
                    onClick={() => setOpen(false)}
                    color="error"
                >
                    <CloseTwoTone />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <Box sx={{
                    border: (theme) => `1px dashed ${theme.colors.primary.main}`,
                    p: 3,
                    textAlign: 'center'
                }} {...getRootProps()}>
                    <input {...getInputProps()} />
                    {
                        isDragActive ?
                            <Typography variant={"h4"}>Drop the files here ...</Typography> :
                            <Typography variant={"h5"}>Drag 'n' drop some files here, or click to select files</Typography>
                    }
                </Box>
                <Stack gap={1} mt={2}>
                    <Box>
                        <p >( Attachment supports files of types - .BMP, .DOC, .DOCX, .JPG, .JPEG, .PNG, .PDF, .XLS, .XLSX upto 5 MB )</p>
                        <Typography variant={"h5"}>Selected Files:</Typography>
                    </Box>
                    {MultipleFiles.map((file, index) => (
                        <Box key={index} sx={{ p: 1, border: '1px solid green', color: 'green', fontWeight: 'bold' }}>
                            <Stack direction={"row"} justifyContent={'space-between'} alignItems={'center'}>
                                {index + 1}. {' '}
                                {file.name}
                                <IconButton
                                    color={"error"}
                                    onClick={() => {
                                        setMultipleFiles((prev) => prev.filter((_, i) => i !== index))
                                    }}
                                >
                                    <DeleteTwoTone />
                                </IconButton>
                            </Stack>
                        </Box>
                    ))}
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button color={"error"} onClick={() => setOpen(false)}>Close</Button>
                <Button color={"primary"} variant={"contained"} onClick={handleConfirm}>Confirm</Button>
            </DialogActions>
        </Dialog>
    )
}

export default UploadMultipleDialog;
