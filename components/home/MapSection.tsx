import useMap, { INITIAL_CENTER, INITIAL_ZOOM } from "@/hooks/useMap";
import Map from "./Map";
import { NaverMap } from "@/types/map";
import { Fragment, useMemo } from "react";
import Markers from "./Markers";
import useCurrentStore from "@/hooks/useCurrentStore";
import { useRouter } from "next/router";

const MapSection = () => {
  const router = useRouter();
  const query = useMemo(() => new URLSearchParams(router.asPath), [router.asPath]);

  const initialZoom = useMemo(() => (
    query.get('zoom') ? Number(query.get('zoom')) : INITIAL_ZOOM
  ), [query])

  const initialCenter = useMemo(() => {
    const lat = query.get('lat');
    const lng = query.get('lng');

    if (lat && lng) {
      return [Number(lat), Number(lng)] as [number, number];
    } else {
      return INITIAL_CENTER;
    }
  }, [query])

  // console.log(router.asPath);

  // onLoadMap
  const { initializeMap } = useMap();
  const { clearCurrentStore } = useCurrentStore();
  
  const onLoadMap = (map: NaverMap) => {
    initializeMap(map);
    naver.maps.Event.addListener(map, 'click', clearCurrentStore);
  }

  return (
    <Fragment>
      <Map onLoad={onLoadMap} initialZoom={initialZoom} initialCenter={initialCenter} />
      <Markers />
    </Fragment>
  )
}

export default MapSection;