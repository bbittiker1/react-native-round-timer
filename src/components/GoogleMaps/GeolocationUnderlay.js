import React, {useCallback, useEffect, useState} from 'react'
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api'

import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import Config from "../../config";

const options = {
    zoomControlOptions: {
        // position: google.maps.ControlPosition.RIGHT_CENTER // ,
        // ...otherOptions
    }
};

export default function GeolocationUnderlay() {

    const [userLocation, setUserLocation] = useState( { lat: 0, lng: 0 });
    // const [isMarkerShown, setMarkerShown] = useState( false);
    const [loading, setLoading] = useState( true);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;

                console.log(latitude, longitude);

                setUserLocation({ lat: latitude, lng: longitude });
                setLoading(false);

            },
            () => {
              setLoading(false);
            }
        );
    }, [loading, userLocation]);


    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: Config.googleMapsApiKey // ,
        // ...otherOptions
    });

    const onLoad = useCallback(
        function onLoad (mapInstance) {

            navigator.geolocation.getCurrentPosition(
                position => {
                    const { latitude, longitude } = position.coords;

                    console.log(latitude, longitude);

                    setUserLocation({ lat: latitude, lng: longitude });
                    setLoading(false);
                },
                () => {
                    setLoading(false);
                }
            );

            console.log("loaded: ", mapInstance);
        }
    );

    const mapContainerStyle = {
        height: "200px",
        width: "400px"
    };

    const renderMap = () => {
        // wrapping to a function is useful in case you want to access `window.google`
        // to eg. setup options or create latLng object, it won't be available otherwise
        // feel free to render directly if you don't need that

        // return <Map google={google} initialCenter={userLocation} zoom={10} />;

        return   <GoogleMap
            id="circle-example"
            mapContainerStyle={mapContainerStyle}
            onLoad={onLoad}
            zoom={15}
            center={userLocation}
            onClick={() => {return false;}}
            onDrag={()=> {return false;}}
            options={{
                // styles: mapStyle,
                // these following 7 options turn certain controls off see link below
                streetViewControl: false,
                scaleControl: false,
                mapTypeControl: false,
                panControl: false,
                zoomControl: false,
                rotateControl: false,
                fullscreenControl: false,
            }}
        >
            <Marker
                onLoad={onLoad}
                position={userLocation}
                clickable={false}
                />
        </GoogleMap>
    };

    if (loadError) {
        return <div>Map cannot be loaded right now, sorry.</div>
    }

    return isLoaded ? renderMap() :<CircularProgress variant="static" value={100} />
}
