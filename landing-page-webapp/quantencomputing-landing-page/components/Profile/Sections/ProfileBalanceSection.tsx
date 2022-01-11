import React, { useContext } from "react";
import ProfileSection from "../ProfileSection";
import ProfileSectionHeader from "../ProfileSectionHeader";
import { useTranslation } from "react-i18next";
import ProfileContentContainer from "../ProfileContentContainer";
import { AuthContext } from "../../../providers/AuthProvider";

export default function ProfileBalanceSection() {
  const { t } = useTranslation();
  const { value: user } = useContext(AuthContext);

  return (
    <ProfileSection withBottomSpace>
      <ProfileSectionHeader header={t("Your Balance")} />
      <ProfileContentContainer withSpaceBetween>
        <div>
          <span className={"flex space-x-2"}>
            <p>{t("Your balance is currently")}</p>
            <p className={"text-primary font-bold"}>
              {t(`${user?.credits || 0} credits.`)}
            </p>
          </span>
          <p>{t("Credits are used to run experiments.")}</p>
        </div>
        <div>
          <h3 className={"font-bold"}>{t("How much do credits cost?")}</h3>
          <p>
            {t("Credits are free of charge and filled monthly to 50 credits.")}
          </p>
        </div>
        <div>
          <h3 className={"font-bold"}>
            {t("What happens if I have no credits left?")}
          </h3>
          <p>
            {t(
              "Credits are used to run experiments, thus new experiments won’t be possible. By sharing your experiments with friends and on social media, you will gain extra credits."
            )}
          </p>
        </div>
      </ProfileContentContainer>
    </ProfileSection>
  );
}
