import React, { useContext, useState } from "react";
import ProfileSection from "../ProfileSection";
import ProfileSectionHeader from "../ProfileSectionHeader";
import { useTranslation } from "react-i18next";
import ProfileContentContainer from "../ProfileContentContainer";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
} from "@mui/material";
import { AuthContext } from "../../../providers/AuthProvider";
import { User } from "../../../model/types/type.user";

const tableKeys: (keyof User)[] = ["country", "name", "username", "occupation"];

export default function ProfileDetailSection() {
  const { t } = useTranslation();
  const { value: user, setValue: setUser } = useContext(AuthContext);
  const [isEditing] = useState(false);

  if (!user) return null;

  const handleOnChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    key: keyof User
  ) => {
    setUser((prev) => ({
      ...prev!,
      [key]: e.target.value!,
    }));
  };

  return (
    <ProfileSection withBottomSpace>
      <ProfileSectionHeader header={t("Details")} />
      <ProfileContentContainer>
        <Table>
          <TableBody>
            {Object.keys(user)
              .filter((key) => tableKeys.includes(key as keyof User))
              .map((key, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {key === "username" ? "E-MAIL" : t(key).toUpperCase()}
                  </TableCell>
                  <TableCell>
                    {isEditing ? (
                      <TextField
                        onChange={(e) => handleOnChange(e, key as keyof User)}
                        value={user[key as keyof User]}
                        variant={"standard"}
                        fullWidth
                      />
                    ) : (
                      user[key as keyof User]
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </ProfileContentContainer>
    </ProfileSection>
  );
}
