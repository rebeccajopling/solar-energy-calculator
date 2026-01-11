import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";

const Map = ({ lat, lng }) => (
  <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_API_KEY}>
    <GoogleMap
      mapContainerStyle={{ height: "400px", width: "100%" }}
      center={{ lat, lng }}
      zoom={15}
    >
      <Marker position={{ lat, lng }} />
    </GoogleMap>
  </LoadScript>
);

export default Map;
