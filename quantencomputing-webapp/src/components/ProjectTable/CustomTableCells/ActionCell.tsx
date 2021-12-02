import React, { useContext, useState } from "react";
import { CustomTableCellProps } from "./type.customTableCells";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton } from "@mui/material";
import ContextMenu from "../ContextMenu";
import { RouteComponentProps, withRouter } from "react-router";
import { AddExperimentDialogProps } from "../../../model/types/type.experiment";
import { deleteExperiment } from "../../../model/model.api";
import { ProjectExperimentDataContext } from "../../../providers/ProjectExperimentDataProvider";

enum ProjectActions {
  AddNewExperiment = "Add new Experiment",
  Run = "Run",
  Download = "Download",
  Delete = "Delete",
  Share = "Share",
}

interface ActionCellProps
  extends CustomTableCellProps<any>,
    RouteComponentProps<any> {
  setData: React.Dispatch<React.SetStateAction<any>>;
  setAddExperimentDialogProps: React.Dispatch<
    React.SetStateAction<AddExperimentDialogProps>
  >;
}

export default withRouter(function ActionCell({
  row,
  setAddExperimentDialogProps,
}: ActionCellProps) {
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
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
      {
        label: ProjectActions.Run,
        action: () => {},
      },
      {
        label: ProjectActions.Download,
        action: () => {
          const blob = new Blob([JSON.stringify(row.original)]);
          const href = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = href;
          link.download = `${row.original.experimentName}.json`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        },
      },
      {
        label: ProjectActions.Delete,
        action: async () => {
          setExperiments((prev) =>
            prev.filter((e) => e.id !== row.original.id)
          );
          await deleteExperiment(row.original.id);
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
});
