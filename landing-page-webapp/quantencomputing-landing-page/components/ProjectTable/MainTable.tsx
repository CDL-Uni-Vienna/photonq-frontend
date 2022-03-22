import React, { useContext, useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { getTableColumns } from "../../model/model.table";
import { useTranslation } from "react-i18next";
import { useExpanded, useSortBy, useTable } from "react-table";
import { AddExperimentDialogProps } from "../../model/types/type.experiment";
import { ProjectExperimentDataContext } from "../../providers/ProjectExperimentDataProvider";
import { getPathWithId, Path } from "../../model/model.routes";
import { useRouter } from "next/router";
import ContextMenu from "./ContextMenu";

interface MainTableProps {
  setAddExperimentDialogProps: React.Dispatch<
    React.SetStateAction<AddExperimentDialogProps>
  >;
}

export default function MainTable({
  setAddExperimentDialogProps,
}: MainTableProps) {
  const {
    experiments: { value: data, setValue: setData },
  } = useContext(ProjectExperimentDataContext);
  const { t } = useTranslation();
  const [mainTableColumns] = useState(getTableColumns(t));
  const router = useRouter();
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [actions, setActions] = useState<any>();

  const { getTableProps, getTableBodyProps, rows, prepareRow, columns } =
    useTable(
      {
        columns: mainTableColumns,
        data,
        // @ts-ignore
        setData, // Passes setData to all cells as prop
        setAddExperimentDialogProps: setAddExperimentDialogProps, // Passes setAddExperimentDialogProps to all cells as props
        toggleContextMenu: (
          element: HTMLElement | null,
          isOpen: boolean,
          actions: any
        ) => {
          setAnchorEl((prev) => {
            setIsContextMenuOpen(
              prev !== element || (prev === element && !isOpen)
            );

            return element;
          });
          setActions(actions);
        },
      },
      useSortBy,
      useExpanded
    );

  return (
    <>
      <TableContainer component={Paper}>
        <Table {...getTableProps()}>
          <TableHead className={"p-8"}>
            <TableRow className={"bg-gray-100"}>
              {columns.map((column, index) => (
                <TableCell
                  // @ts-ignore
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  style={{ textTransform: "uppercase" }}
                  key={index}
                >
                  {column.render("Header")}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {rows.map((row, rowIndex) => {
              prepareRow(row);
              return (
                <React.Fragment key={rowIndex}>
                  <TableRow
                    className={"cursor-pointer hover:bg-gray-100"}
                    {...row.getRowProps()}
                    onClick={() =>
                      router.push(
                        getPathWithId(
                          //@ts-ignore
                          row.original.experimentId,
                          Path.SingleExperiment
                        )
                      )
                    }
                  >
                    {row.cells.map((cell, index) => (
                      <TableCell
                        onClick={
                          cell.column.id === "expander"
                            ? (e) => e.stopPropagation()
                            : undefined
                        }
                        {...cell.getCellProps()}
                        key={index}
                      >
                        {cell.render("Cell")}
                      </TableCell>
                    ))}
                  </TableRow>
                  {/*<NestedTableContainer*/}
                  {/*  key={rowIndex + rows.length}*/}
                  {/*  row={row as any}*/}
                  {/*  mainTableColumns={mainTableColumns}*/}
                  {/*/>*/}
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <ContextMenu
        isOpen={isContextMenuOpen}
        setIsOpen={setIsContextMenuOpen}
        anchorEl={anchorEl}
        actions={actions}
      />
    </>
  );
}

/**
 * Not Relevant for Release 1
 */
// function NestedTableContainer(props: {
//   row: Row & UseExpandedRowProps<any>;
//   mainTableColumns: MainTableColumn[];
// }) {
//   return (
//     <AnimatePresence>
//       {props.row.isExpanded && (
//         <motion.tr
//           transition={{ duration: 0.4 }}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//         >
//           <TableCell colSpan={props.mainTableColumns.length}>
//             <NestedTable />
//           </TableCell>
//         </motion.tr>
//       )}
//     </AnimatePresence>
//   );
// }
