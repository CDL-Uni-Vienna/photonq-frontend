import React, { useContext, useState } from "react";
import { CustomTableCellProps } from "./type.customTableCells";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton } from "@mui/material";
import ContextMenu from "../ContextMenu";
import { AddExperimentDialogProps } from "../../../model/types/type.experiment";
import { deleteExperiment } from "../../../model/model.api";
import { ProjectExperimentDataContext } from "../../../providers/ProjectExperimentDataProvider";
import { downloadData } from "../../../utils/utils.download";
import { useConnectedUser } from "../../../hook/hook.user";

enum ProjectActions {
  AddNewExperiment = "Add new Experiment",
  Run = "Run",
  Download = "Download",
  Delete = "Delete",
  Share = "Share",
}

interface ActionCellProps extends CustomTableCellProps<any> {
  setData: React.Dispatch<React.SetStateAction<any>>;
  setAddExperimentDialogProps: React.Dispatch<
    React.SetStateAction<AddExperimentDialogProps>
  >;
}

export default function ActionCell({
  row,
  setAddExperimentDialogProps,
}: ActionCellProps) {
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const user = useConnectedUser();
  const {
    experiments: { setValue: setExperiments },
  } = useContext(ProjectExperimentDataContext);

  const handleOnClick = (
    e: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
    setAnchorEl(anchorEl ? null : e.currentTarget);
    setIsContextMenuOpen((prev) => !prev);
  };

  const getBaseActions = () => {
    return [
      // {
      //   label: ProjectActions.Run,
      //   action: () => {
      //     router.push(getPathWithId(row.original.id, Path.ExperimentResult));
      //   },
      // },
      {
        label: ProjectActions.Download,
        action: () => {
          downloadData(row.original.experimentName, row.original);
        },
      },
      {
        label: ProjectActions.Delete,
        action: async () => {
          setExperiments((prev) =>
            prev.filter((e) => e.experimentId !== row.original.experimentId)
          );
          await deleteExperiment(row.original.experimentId, user!.token);
        },
      },
      // Not relevant for release 1
      // {
      //   label: ProjectActions.Share,
      //   action: () => {},
      // },
    ];
  };

  const getActions = () => {
    if ("projectId" in row.original) {
      return getBaseActions();
    }
    return [
      {
        label: ProjectActions.AddNewExperiment,
        action: () =>
          setAddExperimentDialogProps({ open: true, projectId: "projectId" }),
      },
      ...getBaseActions(),
    ];
  };

  return (
    <React.Fragment>
      <IconButton onClick={handleOnClick}>
        <MoreVertIcon />
      </IconButton>
      <ContextMenu
        actions={getActions()}
        isOpen={isContextMenuOpen}
        setIsOpen={setIsContextMenuOpen}
        anchorEl={anchorEl}
      />
    </React.Fragment>
  );
}
