import { Paper } from "@mui/material";
import Header from "../Header/Header";
import RouteList from "../RouteList/RouteList";
import RouteInfo from "../RouteInfo/RouteInfo";
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import { useAppSelector } from '../../redux/hook';



const Main = () => {
    const show = useAppSelector(state => state.setShowRouteInfoReducer.show)


    return (
        <Paper elevation={3} style={{ minHeight: 600, width: '900px', marginTop: '1rem', marginBottom: '1rem' }}>
            <Header />
            <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={2}
                height='500px'
                marginRight='1rem'
            // justifyContent={'space-evenly'}
            >
                <RouteList />
                {show ? <RouteInfo /> : <></>}

            </Stack>
        </Paper>
    );
};

export default Main