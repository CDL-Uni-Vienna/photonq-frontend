import type { GetStaticProps, NextPage } from "next";
import MaxWidthContainer from "../components/Layout/MaxWidthContainer";
import HomeHero from "../components/HomeHero/HomeHero";
import QuantenComputingUiPreview from "../components/QuantenComputingUiPreview/QuantenComputingUiPreview";
import SectionLogos from "../components/Section/SectionLogos";
import SectionFade from "../components/Section/SectionFade";
import Section from "../components/Section/Section";
import PrimaryCTA from "../components/PrimaryCTA/PrimaryCTA";
import Footer from "../components/Footer/Footer";
import { getCmsServerClient } from "../cms/cms.server";
import { GuideDocumentLocalizedPreview } from "../cms/guide/guide.type";
import { getLocalizedHomePageGuidePreviewsQuery } from "../cms/guide/guide.queries";
import DocumentationPreview from "../components/DocumentationPreview/DocumentationPreview";
import { buildCmsImage } from "../cms/cms.images";
import Head from "next/head";

interface PageProps {
  guides: GuideDocumentLocalizedPreview[];
}

export default function Home(props: PageProps) {
  return (
    <div className={"w-full flex flex-col items-center"}>
      <Head>
        <title>PhotonQ Quantum Computing</title>
      </Head>
      <Section fullWidth>
        <HomeHero />
      </Section>
      <MaxWidthContainer>
        <Section withVerticalPadding>
          <QuantenComputingUiPreview />
        </Section>
      </MaxWidthContainer>
      <Section withVerticalPadding fullWidth>
        <SectionFade
          header={"One-way quantum computing"}
          content={
            "PhotonQ provides cloud-based access to a real photonic one-way computer backend. Our system exploits cutting-edge quantum photonic technology to realize a photonic quantum computing platform. The quantum processing unit can be accessed and programmed through our customized user interface."
          }
          imgSrc={"/images/quantenComputer.jpg"}
        />
      </Section>
      <MaxWidthContainer>
        <Section withVerticalPadding>
          <DocumentationPreview guides={props.guides} />
        </Section>
      </MaxWidthContainer>
      <Section fullWidth withVerticalPadding>
        <PrimaryCTA />
      </Section>
      <MaxWidthContainer>
        <Section withVerticalPadding>
          <SectionLogos
            header={"Who are we?"}
            content={
              "We are a team of scientists, designers, and software developers at the Christian Doppler Laboratory for Photonic Quantum Computing at the Faculty of Physics at the University of Vienna. Our research focus is on the development and operation of a photonic quantum computer platform and we are committed to providing free online access to a photonic quantum computer through cloud-based services. You can already experiment with our four-qubit processor today!"
            }
            imgTopSrc={"/images/uni-wien-logo.svg"}
            imgBotSrc={"/images/CDG_Logo.svg"}
          />
        </Section>
      </MaxWidthContainer>
      <Section fullWidth>
        <div className={"pt-16 lg:pt-28 2xl:pt-32"}>
          <Footer />
        </div>
      </Section>
    </div>
  );
}

export const getStaticProps: GetStaticProps<PageProps> = async ({
  preview,
  locale,
}) => {
  const client = getCmsServerClient();
  const guides = await client.fetch<GuideDocumentLocalizedPreview[]>(
    getLocalizedHomePageGuidePreviewsQuery(locale)
  );

  return {
    props: {
      guides: guides.map((guide) => ({
        ...guide,
        mainImage: buildCmsImage(guide.mainImage)
          .format("webp")
          .size(350, 250)
          .url()!,
      })),
    },
    revalidate: 1,
  };
};
