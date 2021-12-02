import React, { useContext } from "react";
import ProfileSectionHeader from "../ProfileSectionHeader";
import ProfileSection from "../ProfileSection";
import { AuthContext } from "../../../providers/AuthProvider";
import PersonIcon from "@mui/icons-material/Person";
import ProfileContentContainer from "../ProfileContentContainer";

/**
 * @deprecated
 */
export default function ProfileImageSection() {
  const { value: user } = useContext(AuthContext);

  return (
    <ProfileSection>
      <ProfileSectionHeader
        header={"Profile photo"}
        withEditButton
        onClick={() => console.log("onClick")}
      />
      <ProfileContentContainer>
        <div
          className={"h-20 w-20 bg-primaryLight rounded-full text-white p-1"}
        >
          {user!.image ? (
            <img src={user!.image} alt="Profile image of current user" />
          ) : (
            <PersonIcon style={{ height: "100%", width: "100%" }} />
          )}
        </div>
      </ProfileContentContainer>
    </ProfileSection>
  );
}
