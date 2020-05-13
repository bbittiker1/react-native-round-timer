import React, { useCallback } from 'react'
import { GoogleMap, useLoadScript } from '@react-google-maps/api'
import Config from "../../config";

const options = {
    zoomControlOptions: {
        // position: google.maps.ControlPosition.RIGHT_CENTER // ,
        // ...otherOptions
    }
};

export default function GoogleMapsComponent() {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: Config.googleMapsApiKey // ,
        // ...otherOptions
    });

    const onLoad = useCallback(
        function onLoad (mapInstance) {
            console.log("loaded: ", mapInstance);
        }
    );

    const renderMap = () => {
        // wrapping to a function is useful in case you want to access `window.google`
        // to eg. setup options or create latLng object, it won't be available otherwise
        // feel free to render directly if you don't need that

        return   <GoogleMap
            id="circle-example"
            mapContainerStyle={{
                height: "400px",
                width: "800px"
            }}
            onLoad={onLoad}
            zoom={7}
            center={{
                lat: 37.4012487,
                lng: -122.0243328
            }}
            clickableIcons={false}
        />
    };

    if (loadError) {
        return <div>Map cannot be loaded right now, sorry.</div>
    }

    return isLoaded ? renderMap() : "blah"
}
