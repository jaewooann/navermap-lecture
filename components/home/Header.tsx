import useMap from "@/hooks/useMap";
import HeaderComponent from "../common/Header";
import styles from "@/styles/header.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback } from "react";
import copy from 'copy-to-clipboard';
import { CiLink } from "react-icons/ci";
import { CgMoveDown } from "react-icons/cg";

const HomeHeader = () => {
  const { resetMapOptions, getMapOptions } = useMap();

  const router = useRouter();
  const replaceAndCopyUrl = useCallback(() => {
    const mapOptions = getMapOptions();
    const query = `/?zoom=${mapOptions.zoom}&lat=${mapOptions.center[0]}&lng=${mapOptions.center[1]}`;

    router.replace(query);
    copy(location.origin + query);
  }, [router, getMapOptions]);

  return (
    <HeaderComponent onClickLogo={resetMapOptions} rightElements={[
      <button
        key="button"
        className={styles.box}
        style={{marginRight: 8}}
        onClick={replaceAndCopyUrl}
        aria-label="현재 위치 링크 복사"
      >
        <CiLink style={{width: 20, height: 20}} />
      </button>,
      <Link 
        href="/feedback"
        key="link"
        className={styles.box}
        aria-label="피드백 페이지 이동"
      >
        <CgMoveDown style={{width: 20, height: 20}} />
      </Link>
    ]} />
  )
}

export default HomeHeader;