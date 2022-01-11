import React, { useContext, useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { getNestedTableColumns } from "../../model/model.table";
import { useTranslation } from "react-i18next";
import { useTable } from "react-table";
import { ProjectExperimentDataContext } from "../../providers/ProjectExperimentDataProvider";

export default function NestedTable() {
  const { t } = useTranslation();
  const {
    experiments: { value: data },
  } = useContext(ProjectExperimentDataContext);
  const [nestedTableColumns] = useState(getNestedTableColumns(t));

  const { getTableProps, getTableBodyProps, rows, prepareRow } = useTable({
    columns: nestedTableColumns,
    data,
  });

  return (
    <TableContainer component={Paper}>
      <Table {...getTableProps()}>
        <TableBody {...getTableBodyProps()}>
          {rows.map((row, index) => {
            prepareRow(row);
            return (
              <TableRow
                className={"bg-primaryLightBg"}
                {...row.getRowProps()}
                key={index}
              >
                {row.cells.map((cell, index) => (
                  <TableCell {...cell.getCellProps()} key={index}>
                    {cell.render("Cell")}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
