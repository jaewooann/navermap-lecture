import { MAP_KEY } from "@/hooks/useMap";
import { STORE_KEY } from "@/hooks/useStores";
import { NaverMap } from "@/types/map";
import { Store } from "@/types/store";
import useSWR from "swr";
import Marker, { generateStoreMarkerIcon } from "./Marker";
import useCurrentStore, { CURRENT_STORE_KEY } from "@/hooks/useCurrentStore";

const Markers = () => {
  const { data: map } = useSWR<NaverMap>(MAP_KEY);
  const { data: stores } = useSWR<Store[]>(STORE_KEY);

  const { data: currentStore } = useSWR<Store>(CURRENT_STORE_KEY);
  const { setCurrentStore, clearCurrentStore } = useCurrentStore();

  if (!map || !stores) return null;
  return (
    <>
      {stores.map((store) => {
        return (
          <Marker 
            key={store.nid} 
            map={map} 
            coordinates={store.coordinates} 
            icon={generateStoreMarkerIcon(store.season, false)} 
            onClick={() => {
              setCurrentStore(store);
            }} 
          />
        )
      })}
      {currentStore && (
        <Marker 
          map={map} 
          coordinates={currentStore.coordinates} 
          icon={generateStoreMarkerIcon(currentStore.season, true)}
          onClick={() => {
            clearCurrentStore();
          }}
          key={currentStore.nid}
        />
      )}
    </>
  )
}

export default Markers;