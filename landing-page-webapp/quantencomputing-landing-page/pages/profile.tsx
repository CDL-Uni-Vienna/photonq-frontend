import React from "react";
import NavbarPadding from "../components/Layout/NavbarPadding";
import SectionHeader from "../components/Layout/SectionHeader";
import ContentContainer from "../components/Layout/ContentContainer";
import ProfileDetailSection from "../components/Profile/Sections/ProfileDetailSection";
import Head from "next/head";

export default function ProfilePage() {
  return (
    <div className={"pb-4"}>
      <Head>
        <title>PhotonQ - Photonic Quantum Computing</title>
      </Head>
      <NavbarPadding />
      <SectionHeader header={"My Profile"} withVerticalSpacing />
      <ContentContainer>
        <ProfileDetailSection />
      </ContentContainer>
    </div>
  );
}
