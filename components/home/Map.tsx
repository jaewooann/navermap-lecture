import { INITIAL_CENTER, INITIAL_ZOOM } from "@/hooks/useMap";
import { NaverMap } from "@/types/map";
import { Coordinates } from "@/types/store";
import Script from "next/script";
import { useEffect, useRef } from "react";
import styles from "@/styles/map.module.scss";

interface MapProps {
  mapId?: string;
  initialCenter?: Coordinates;
  initialZoom?: number;
  onLoad?: (map: NaverMap) => void;
}

const Map = ({   
  mapId = 'map',
  initialCenter = INITIAL_CENTER,
  initialZoom = INITIAL_ZOOM,
  onLoad, 
}: MapProps) => {
  const mapRef = useRef<NaverMap | null>(null);
  
  const initializeMap = () => {
    const mapOptions = {
      center: new window.naver.maps.LatLng(...initialCenter),
      zoom: initialZoom,
      minZoom: 9,
      scaleControl: false,
      mapDataControl: false,
      logoControlOptions: {
        position: naver.maps.Position.BOTTOM_LEFT,
      },
    };

    const map = new window.naver.maps.Map(mapId, mapOptions);
    mapRef.current = map;

    if (onLoad) {
      onLoad(map);
    }
  }

  useEffect(() => {
    return () => {
      mapRef.current?.destroy();
    }
  }, []);

  return (
    <>
      <Script 
        strategy="afterInteractive" 
        type="text/javascript"
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NCP_CLIENT_ID}`} 
        onReady={initializeMap}
      /> 
      <div id={mapId} style={{width: "100%", height: "100%"}} className={styles.map}></div>
    </>
  )
}

export default Map;