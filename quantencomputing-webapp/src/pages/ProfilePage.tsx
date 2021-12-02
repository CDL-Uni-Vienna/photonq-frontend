import React from "react";
import PageLayout from "../components/Layout/PageLayout";
import NavbarPadding from "../components/Layout/NavbarPadding";
import SectionHeader from "../components/Layout/SectionHeader";
import ContentContainer from "../components/Layout/ContentContainer";
import ProfileDetailSection from "../components/Profile/Sections/ProfileDetailSection";

export default function ProfilePage() {
  return (
    <PageLayout>
      <NavbarPadding />
      <SectionHeader header={"My Profile"} withVerticalSpacing />
      <ContentContainer>
        <ProfileDetailSection />
      </ContentContainer>
    </PageLayout>
  );
}
