import type { GetStaticProps, NextPage } from "next";
import MaxWidthContainer from "../components/Layout/MaxWidthContainer";
import HomeHero from "../components/HomeHero/HomeHero";
import NavbarPadding from "../components/Layout/NavbarPadding";
import QuantenComputingUiPreview from "../components/QuantenComputingUiPreview/QuantenComputingUiPreview";
import SectionContent from "../components/Section/SectionContent";
import Section from "../components/Section/Section";
import PrimaryCTA from "../components/PrimaryCTA/PrimaryCTA";
import Footer from "../components/Footer/Footer";
import { getCmsServerClient } from "../cms/cms.server";
import { GuideDocumentLocalizedPreview } from "../cms/guide/guide.type";
import { getLocalizedHomePageGuidePreviewsQuery } from "../cms/guide/guide.queries";
import DocumentationPreview from "../components/DocumentationPreview/DocumentationPreview";
import { buildCmsImage } from "../cms/cms.images";

interface PageProps {
  guides: GuideDocumentLocalizedPreview[];
}

export default function Home(props: PageProps) {
  return (
    <div className={"w-full flex flex-col items-center"}>
      <MaxWidthContainer>
        <NavbarPadding />
        <Section withVerticalPadding>
          <HomeHero />
        </Section>
        <Section withVerticalPadding>
          <QuantenComputingUiPreview />
        </Section>
        <Section withVerticalPadding>
          <SectionContent
            maxWidthImage={417}
            header={"One-way quantum computing"}
            content={
              "For our AKA Measurement based quantum computing (MBQC) we use single-qubit gates as well as prepare cluster states AKA graph states (entangled state of multiple qubits)."
            }
            imgSrc={"/images/quantum-computer.svg"}
          />
        </Section>
        <Section withVerticalPadding>
          <DocumentationPreview guides={props.guides} />
        </Section>
      </MaxWidthContainer>
      <Section fullWidth withVerticalPadding>
        <PrimaryCTA />
      </Section>
      <MaxWidthContainer>
        <Section withVerticalPadding>
          <SectionContent
            maxWidthImage={300}
            header={"Who are we?"}
            content={
              "As Faculty of Physics of University of Vienna we are internationally highly competitive in various quantum research areas. These cover experimental and theoretical research in foundations of quantum physics, quantum optics, quantum information, strongly correlated quantum systems as well as molecular quantum nanophysics."
            }
            imgSrc={"/images/uni-wien-logo.svg"}
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
