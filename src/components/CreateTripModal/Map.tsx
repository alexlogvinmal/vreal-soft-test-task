import { useEffect, useState } from 'react';
import { GoogleMap, Marker, Polyline, useLoadScript } from '@react-google-maps/api';
import { API_KEY, LIBRARIES } from '../../const/api';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { setDistance } from '../../redux/setDistance/setDistance';
import { setMarkersArray } from '../../redux/setMarkersArray/setMarkersArray';


// Задаем размеры контейнера карты и ее центр
const mapContainerStyle = {
  height: '400px',
  width: '100%'
};
const center = {
  lat: 48.4648,
  lng: 35.0463
};

// Определяем тип маркера
interface MarkerType {
  position: {
    lat: number,
    lng: number
  }
}


// Компонент Map
const Map = () => {

  // Используем хук useLoadScript для загрузки карты
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: API_KEY,
    libraries: LIBRARIES
  });
  const dispatch = useAppDispatch();
  // Используем хук useState для хранения списка маркеров
  const [markers, setMarkers] = useState<MarkerType[]>([]);

  // Обработчик клика на карте, который добавляет новый маркер в список
 const handleMapClick =  (event: any) =>{
    if (event.latLng) {
      const newMarker: MarkerType = {
        position: {
          lat: event.latLng.lat(),
          lng: event.latLng.lng()
        }
      };
      setMarkers([...markers, newMarker]);// Обновляем список маркеров
        
    }
  };

  // Обработчик клика на маркере, который удаляет маркер из списка
  const  handleMarkerClick =  (index: number) => {
    const newMarkers = [...markers]; // Создаем копию списка маркеров
    newMarkers.splice(index, 1); // Удаляем маркер по индексу
    setMarkers(newMarkers); // Обновляем список маркеров
   
  };


  useEffect(() => {
    createLength();
    dispatch(setMarkersArray(markers));
  }, [markers]);


  const createLength = () => {
    if(markers.length>1){
    let sum = 0;     
    const distances = markers.slice(0, -1).map((marker, i) => {
        const point1 = new google.maps.LatLng(marker.position.lat, marker.position.lng);
        const point2 = new google.maps.LatLng(markers[i+1].position.lat, markers[i+1].position.lng);
        return google.maps.geometry.spherical.computeDistanceBetween(point1, point2);
      });
      distances.map((item:number) => sum += item);
      dispatch(setDistance(Math.round(sum)));
    //   setLength(Math.round(sum));

    }else{
        // setLength(0);
        dispatch(setDistance(0));
    }
  }

  // Если произошла ошибка загрузки карты, показываем соответствующее сообщение
  if (loadError) return <div>Map cannot be loaded right now, sorry.</div>;

  // Если карта загрузилась, рендерим ее и маркеры
  return isLoaded ? (
    <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={17} onClick={handleMapClick}>
      {markers.map((marker, index) => (
        <Marker key={index} position={marker.position} onClick={() => handleMarkerClick(index)} />
      ))}
      {/* Если есть более одного маркера, соединяем их линией */}
      {markers.length > 1 && (
        <Polyline path={markers.map(marker => marker.position)} options={{ strokeColor: '#FF0000' }} />
      )}
    </GoogleMap> 

  ) : (
    <div>Loading...</div>
  );
};

export default Map;