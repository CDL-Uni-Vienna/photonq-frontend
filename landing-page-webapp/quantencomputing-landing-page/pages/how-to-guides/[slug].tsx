import React from "react";
import { getCmsServerClient } from "../../cms/cms.server";
import { GetStaticPaths, GetStaticProps } from "next";
import { AtomicSlugItem } from "../../cms/types";
import {
  getGuideSlugsQuery,
  getLocalizedGuideBySlugQuery,
} from "../../cms/guide/guide.queries";
import { GuideDocumentLocalized } from "../../cms/guide/guide.type";
import { buildCmsImage } from "../../cms/cms.images";
import NavbarPadding from "../../components/Layout/NavbarPadding";
import { PortableText } from "../../components/PortableText/PortableText";
import PortableTextContainer from "../../components/Layout/PortableTextContainer";
import MaxWidthContainer from "../../components/Layout/MaxWidthContainer";
import { useRouter } from "next/router";
import { GuideSkeleton } from "../../components/GuideSkeleton/BlogPostSkeleton";
import Section from "../../components/Section/Section";
import GuideHeader from "../../components/GuideHeader/GuideHeader";
import Head from "next/head";

interface PageProps {
  guide: GuideDocumentLocalized;
}

export default function Home(props: PageProps) {
  const { isFallback } = useRouter();

  if (isFallback) {
    return (
      <div className="prose">
        <NavbarPadding />
        <Section withVerticalPadding>
          <PortableTextContainer>
            <GuideSkeleton />
          </PortableTextContainer>
        </Section>
      </div>
    );
  }

  if (!props.guide) return <div>No Guide</div>;

  return (
    <div className={"flex flex-col items-center"}>
      <Head>
        <title>PhotonQ Quantum Computing</title>
      </Head>
      <NavbarPadding />
      <Section fullWidth withVerticalPadding>
        <GuideHeader
          title={props.guide.title}
          subtitle={props.guide.subtitle}
          category={props.guide.category}
          content_type={props.guide.content_type}
          mainImage={props.guide.mainImage}
        />
      </Section>
      <MaxWidthContainer>
        <PortableTextContainer>
          <div className={"pb-16 lg:pb-28 2xl:pb-32 prose"}>
            <PortableText blocks={props.guide.body} />
          </div>
        </PortableTextContainer>
      </MaxWidthContainer>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const items = await getCmsServerClient(false).fetch<AtomicSlugItem[]>(
    getGuideSlugsQuery()
  );
  return {
    paths: items.map((item) => ({ params: { slug: item.slug.current } })),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<PageProps> = async ({
  preview,
  locale,
  params,
}) => {
  const client = getCmsServerClient(false);
  const guide = await client.fetch<GuideDocumentLocalized>(
    getLocalizedGuideBySlugQuery(locale),
    { slug: params?.slug }
  );

  return {
    props: {
      guide: {
        ...guide,
        mainImage: buildCmsImage(guide.mainImage)
          .quality(95)
          .format("webp")
          .height(300)
          .url()!,
      },
    },
    revalidate: 1,
  };
};
