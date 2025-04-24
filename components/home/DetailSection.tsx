import { IoIosArrowUp } from "react-icons/io";
import styles from "@/styles/detail.module.scss";
import useSWR from "swr";
import { CURRENT_STORE_KEY } from "@/hooks/useCurrentStore";
import { Store } from "@/types/store";
import { useState } from "react";
import DetailContent from "./DetailContent";
import DetailHeader from "./DetailHeader";

const DetailSection = () => {
  const {data: currentStore} = useSWR<Store>(CURRENT_STORE_KEY);
  const [expanded, setExpanded] = useState(false);

  const onClickArrow = () => {
    setExpanded(!expanded);
  }

  if (!currentStore) return null;

  return (
    <div className={`${styles.detailSection} ${currentStore ? styles.selected : ""} ${expanded ? styles.expanded : ""}`}>
      <DetailHeader currentStore={currentStore} expanded={expanded} onClickArrow={onClickArrow} />
      <DetailContent currentStore={currentStore} expanded={expanded} />
    </div>
  )
}

export default DetailSection;