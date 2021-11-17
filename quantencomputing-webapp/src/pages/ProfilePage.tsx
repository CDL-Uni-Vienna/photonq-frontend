import React from "react";
import PageLayout from "../components/Layout/PageLayout";
import NavbarPadding from "../components/Layout/NavbarPadding";
import SectionHeader from "../components/Layout/SectionHeader";
import ContentContainer from "../components/Layout/ContentContainer";
import ProfileImageSection from "../components/Profile/Sections/ProfileImageSection";
import ProfileDetailSection from "../components/Profile/Sections/ProfileDetailSection";
import ProfileBalanceSection from "../components/Profile/Sections/ProfileBalanceSection";

export default function ProfilePage() {
  return (
    <PageLayout>
      <NavbarPadding />
      <SectionHeader header={"My Profile"} withVerticalSpacing />
      <ContentContainer>
        <ProfileImageSection />
        <ProfileDetailSection />
        <ProfileBalanceSection />
      </ContentContainer>
    </PageLayout>
  );
}
