import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { ListItemIcon } from '@material-ui/core';
import StarIcon from '@mui/icons-material/Star';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useAppDispatch } from '../../redux/hook';
import { setId } from '../../redux/setId/setId';
import { setShowRouteInfo } from '../../redux/setShowRouteInfo/setShowRouteInfo';

interface TripListType {
    id: string,
    favorite: boolean,
    distance: number,
    title: string,
    shortdescription: string,
    fulldescription: string,
    markers: []
}


const ShortTripInfo = ({ id, favorite, distance, title, shortdescription }: TripListType) => {

    const dispatch = useAppDispatch();
    let stringdistance = '';
    if (distance > 999) {
        stringdistance = `${distance / 1000} km`
    } else {
        stringdistance = `${distance} m`
    }

    const handleClick = () => {
        dispatch(setId(id));
        dispatch(setShowRouteInfo(true));
    }

    return (
        <ListItemButton sx={{ backgroundColor: '#a0a0a01c', marginTop: '0.5rem', borderRadius: 1 }} onClick={handleClick}>
            <ListItemIcon>{favorite ? <StarIcon /> : <></>}</ListItemIcon>
            <ListItemText sx={{ width: '8rem', minHeight: '40px' }} primary={title} secondary={shortdescription} />
            <ListItemText primary={stringdistance} />
            <ListItemIcon><ArrowForwardIosIcon fontSize='small' sx={{ marginLeft: 'auto' }} /></ListItemIcon>
        </ListItemButton>
    );
};

export default ShortTripInfo