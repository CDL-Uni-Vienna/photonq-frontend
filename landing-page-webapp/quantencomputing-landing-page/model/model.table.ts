import { MainTableColumn } from "./types/type.table";
import { TFunction } from "i18next";
import StateCell from "../components/ProjectTable/CustomTableCells/StateCell";
import ProjectNameCell from "../components/ProjectTable/CustomTableCells/ProjectNameCell";
import SortableTableCellHeader from "../components/ProjectTable/CustomTableCells/SortableTableCellHeader";
import ActionCell from "../components/ProjectTable/CustomTableCells/ActionCell";

/**
 *
 */
export function getTableColumns(t: TFunction): MainTableColumn[] {
  return [
    {
      accessor: "experimentName",
      Header: ({ column }) =>
        SortableTableCellHeader({ title: "Experiment", column: column as any }),
      id: "name",
      Cell: ProjectNameCell,
    },
    // {
    //   accessor: "createdAt",
    //   Header: ({ column }) =>
    //     SortableTableCellHeader({ title: "Created", column: column as any }),
    //   id: "createdAt",
    //   Cell: ({ value }) => format(new Date(value), "PP-p"),
    // },
    {
      accessor: "status",
      Header: ({ column }) =>
        SortableTableCellHeader({ title: "Status", column: column as any }),
      id: "status",
      Cell: StateCell,
    },
    {
      accessor: "action",
      Header: "Action",
      id: "action",
      Cell: ActionCell,
      disableSortBy: true,
    },
    // Not relevant for release 1
    // {
    //   accessor: "expander",
    //   id: "expander",
    //   Header: "",
    //   Cell: ExpandCell,
    //   disableSortBy: true,
    // },
  ];
}

export function getNestedTableColumns(t: TFunction): MainTableColumn[] {
  return getTableColumns(t)
    .filter((col) => col.id !== "expander")
    .map((col) => {
      if (col.id === "name")
        return { ...col, Cell: ({ value }) => String(value) };
      return col;
    });
}
