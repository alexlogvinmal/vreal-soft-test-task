import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import ClearIcon from '@mui/icons-material/Clear';
import { IconButton } from '@mui/material';
import { withStyles } from '@material-ui/core/styles';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import Map from './Map';
import Form from './Form';
import { setOpenModal } from '../../redux/setOpenModal/setOpenModal';


const CreateTripModal = () => {
    const dispatch = useAppDispatch();  
    const open = useAppSelector(state => state.setOpenModalReducer.modal);
    const handleClose = () => {
        dispatch(setOpenModal(false))
    };
    
    const CustomDialog = withStyles({
        paper: {
          minWidth: '800px',
        },
      })(Dialog);

    return (
        <>
            <CustomDialog open={open} onClose={handleClose}>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static" sx={{ backgroundColor: 'white', boxShadow: 0, borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>
                        <Toolbar>
                            <Typography component="div" sx={{ flexGrow: 1, color: 'black', fontSize: 15 }}>
                                Add new path
                            </Typography>
                            <IconButton
                                onClick={handleClose}
                                size="small"
                                sx={{ ml: 2 }}>
                                <ClearIcon sx={{ width: 32, height: 32, color: 'black' }} />
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                </Box>
                <DialogContent>
                    <Stack
                        direction="row"
                        divider={<Divider orientation="vertical" flexItem />}
                        spacing={2}
                        justifyContent={'space-evenly'}
                    >
                       <Form/>
                        <Stack
                            component="form"
                            sx={{
                                width: '40ch',
                            }}
                            spacing={2}
                            noValidate
                            autoComplete="off">
                            <Map/>
                        </Stack>
                    </Stack>
                </DialogContent>
            </CustomDialog>
        </>
    );
};

export default CreateTripModal