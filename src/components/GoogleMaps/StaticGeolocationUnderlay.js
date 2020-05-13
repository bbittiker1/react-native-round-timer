import React, {useCallback, useEffect, useState} from 'react'

import {
    StaticGoogleMap,
    Marker,
    Path,
} from 'react-static-google-map';

import Config from "../../config";

// const options = {
//     zoomControlOptions: {
//         // position: google.maps.ControlPosition.RIGHT_CENTER // ,
//         // ...otherOptions
//     }
// };



export default function StaticGeolocationUnderlay() {

    const [userLocation, setUserLocation] = useState( { lat: 0, lng: 0 });
    // const [isMarkerShown, setMarkerShown] = useState( false);
    const [loading, setLoading] = useState( true);

    const [mapUrl, setMapUrl] = useState(null);
    // const [styles, setStyles] = useState(null);


    const styles =  {
        mapContainer: {
            height: 1356,
            backgroundImage: `url(${mapUrl})`,
            backgroundSize: 'cover',
            opacity: '0.4'
        }
    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;

                console.log(latitude, longitude);

                setUserLocation({ lat: latitude, lng: longitude });
                setLoading(false);


                const url = `https://maps.googleapis.com/maps/api/staticmap?center=${userLocation.lat},${userLocation.lng}&zoom=15&size=400x400&maptype=roadmap&key=${Config.googleMapsApiKey}`;
                setMapUrl(url);

                // setStyles(styles(url));

                setLoading(false);


                console.log("url: " + url);
            },
            () => {
              setLoading(false);
            }
        );
    }, [loading, userLocation, mapUrl   ]);


    // const { isLoaded, loadError } = useLoadScript({
    //     googleMapsApiKey: Config.googleMapsApiKey // ,
    //     // ...otherOptions
    // });
    //
    // const onLoad = useCallback(
    //     function onLoad (mapInstance) {
    //
    //         navigator.geolocation.getCurrentPosition(
    //             position => {
    //                 const { latitude, longitude } = position.coords;
    //
    //                 console.log(latitude, longitude);
    //
    //                 setUserLocation({ lat: latitude, lng: longitude });
    //                 setLoading(false);
    //             },
    //             () => {
    //                 setLoading(false);
    //             }
    //         );
    //
    //         console.log("loaded: ", mapInstance);
    //     }
    // );
    //
    // const mapContainerStyle = {
    //     height: "200px",
    //     width: "400px"
    // };
    return (
        <div style={{ backgroundImage: `url(${mapUrl})`, height: '100%', width: '100%', backgroudImageSize: 'cover' }}>

            {/*<StaticGoogleMap size="600x600" className="img-fluid" apiKey="AIzaSyBZpx0iJxPNtZxPpJKJAAgMbVUfrDCQ4sM">*/}
            {/*    <Marker location={userLocation} color="blue" label="You!" />*/}
            {/*</StaticGoogleMap>*/}
        </div>
    );
}
