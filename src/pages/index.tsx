import { Fragment, useEffect } from "react";
import MapSection from "../../components/home/MapSection";
import { Store } from "@/types/store";
import useStores from "@/hooks/useStores";
import HomeHeader from "../../components/home/Header";
import DetailSection from "../../components/home/DetailSection";
import { NextSeo } from "next-seo";

interface HomeProps {
  stores: Store[];
}

export default function Home({ stores }: HomeProps) {
  const { initializeStores } = useStores();

  useEffect(() => {
    initializeStores(stores);
  }, [initializeStores, stores]);

  return (
    <Fragment>
      <NextSeo
        title="매장 찾기"
        description="매장 찾기 서비스"
      />
      <HomeHeader />
      <main className="relative w-full h-full overflow-hidden">
        <MapSection />
        <DetailSection />
      </main>
    </Fragment>
  )
}

export async function getStaticProps() {
  const stores = (await import('../../public/stores.json')).default;

  return {
    props: { stores },
    revalidate: 60 * 60,
  };
}
