import { Fragment } from "react";

import Header from "../../components/common/Header";
import { NextSeo } from "next-seo";

export default function Feedback() {
  return (
    <Fragment>
      <NextSeo
        title="피드백"
        description="피드백 페이지"
      />
      <Header />
      <main></main>
    </Fragment>
  )
}
