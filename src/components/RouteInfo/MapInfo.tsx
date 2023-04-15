import { useEffect, useState } from 'react';
import { GoogleMap, Marker, Polyline, useLoadScript } from '@react-google-maps/api';
import { API_KEY, LIBRARIES } from '../../const/api';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { setDistance } from '../../redux/setDistance/setDistance';
import { setMarkersArray } from '../../redux/setMarkersArray/setMarkersArray';


// Задаем размеры контейнера карты и ее центр
const mapContainerStyle = {
  height: '300px',
  width: '100%'
};


// Определяем тип маркера
interface MarkerType {
  position: {
    lat: number,
    lng: number
  }
}


// Компонент Map
const MapInfo = () => {

  const id = useAppSelector(state => state.setIdReducer.id);
  const tripInfo = useAppSelector(state => state.fetchReducer.data).filter(e => e.id == id);

  // Используем хук useLoadScript для загрузки карты
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: API_KEY,
    libraries: LIBRARIES
  });
  const dispatch = useAppDispatch();
  // Используем хук useState для хранения списка маркеров
  // const [markers, setMarkers] = useState<MarkerType[]>([]);
  // setMarkers(tripInfo[0].markers);
  let markers:MarkerType[] = tripInfo[0].markers;
  const center = {
    lat: markers[0].position.lat,
    lng: markers[0].position.lng
  };
  // Обработчик клика на карте, который добавляет новый маркер в список


  // Обработчик клика на маркере, который удаляет маркер из списка





  // Если произошла ошибка загрузки карты, показываем соответствующее сообщение
  if (loadError) return <div>Map cannot be loaded right now, sorry.</div>;

  // Если карта загрузилась, рендерим ее и маркеры
  return isLoaded ? (
    <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={17}>
      {markers.map((marker, index) => (
        <Marker key={index} position={marker.position} />
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

export default MapInfo;