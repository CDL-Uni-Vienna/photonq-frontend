import React from "react";
import { GuideDocumentLocalizedPreview } from "../../cms/guide/guide.type";
import { GetStaticProps } from "next";
import { getCmsServerClient } from "../../cms/cms.server";
import { getLocalizedGuidePreviewsQuery } from "../../cms/guide/guide.queries";
import { buildCmsImage } from "../../cms/cms.images";
import Section from "../../components/Section/Section";
import SectionHeader from "../../components/Section/SectionHeader";
import GuidePreviewGrid from "../../components/DocumentationPreview/GuidePreviewGrid";
import NavbarPadding from "../../components/Layout/NavbarPadding";
import MaxWidthContainer from "../../components/Layout/MaxWidthContainer";
import GuideFilter from "../../components/GuideFilter/GuideFilter";
import { useGuideFilter } from "../../components/GuideFilter/hook.guideFilter";
import Head from 'next/head'

interface PageProps {
  guides: GuideDocumentLocalizedPreview[];
}

export default function Home({ guides }: PageProps) {
  const { currentCategory, setCurrentCategory, filteredGuides, isLoading } =
    useGuideFilter(guides);

  return (
    <div className={"flex flex-col items-center"}>
      <Head><title>PhotonQ Quantum Computing</title></Head>
      <MaxWidthContainer className={"space-y-12"}>
        <NavbarPadding />
        <Section>
          <div className={"flex flex-col items-center space-y-5"}>
            <SectionHeader text={"Documentation and How-To-Guides"} />
            <p className={"md:w-8/12 md:text-center"}>
              Each of these guides and documentation contains advice and
              research to give you guidelines for your successful quantum
              computing experiment.
            </p>
          </div>
        </Section>
        <GuideFilter
          currentCategory={currentCategory}
          setCurrentCategory={setCurrentCategory}
        />
        <Section>
          {isLoading ? (
            <div className={"flex justify-center"}>
              <span className="h-10 w-10 animate-ping inline-flex rounded-full bg-primary opacity-75" />
              <p>Loading...</p>
            </div>
          ) : (
            <div className={"pb-8"}>
              <GuidePreviewGrid guides={filteredGuides} />
            </div>
          )}
        </Section>
      </MaxWidthContainer>
    </div>
  );
}

export const getStaticProps: GetStaticProps<PageProps> = async ({
  preview,
  locale,
}) => {
  const client = getCmsServerClient();
  const guides = await client.fetch<GuideDocumentLocalizedPreview[]>(
    getLocalizedGuidePreviewsQuery(locale)
  );

  return {
    props: {
      guides: guides.map((guide) => ({
        ...guide,
        mainImage: buildCmsImage(guide.mainImage)
          .quality(75)
          .format("webp")
          .size(350, 300)
          .url()!,
      })),
    },
    revalidate: 1,
  };
};
