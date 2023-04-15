import { useState, useEffect } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../utils/firebase';
import ShortTripInfo from './ShortTripInfo';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import List from '@mui/material/List';
import { Box } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { fetchFiles } from '../../redux/fetchData/action';
import { TripListTypeNew } from '../../redux/fetchData/reducer';



const RouteList = () => {


    const dispatch = useAppDispatch();
    const update = useAppSelector(state => state.setUpdateReducer.update);

    const tripList = useAppSelector(state => state.fetchReducer.data);
    useEffect(() => {
        dispatch(fetchFiles());
    }, [update]);

    // Сортировка массива данных
    function compare(a: TripListTypeNew, b: TripListTypeNew) {
        if (a.favorite && !b.favorite) {
            return -1;
        }
        if (!a.favorite && b.favorite) {
            return 1;
        }
        return 0;
    }
    tripList.sort(compare);



    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Paper
                component="form"
                elevation={3}
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, marginLeft: '1rem', marginTop: '1rem' }}
            >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search..."
                    inputProps={{ 'aria-label': 'search trip' }}
                />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                </IconButton>
            </Paper>
            <List
                sx={{

                    width: '100%',
                    maxWidth: '95%',
                    position: 'relative',
                    overflow: 'auto',
                    maxHeight: 500,
                    marginTop: '1rem',
                    marginLeft: '1rem'

                }}

            >
                {tripList.map(info => <ShortTripInfo {...info} key={info.id} />)}
            </List>

        </Box>
    );
};

export default RouteList