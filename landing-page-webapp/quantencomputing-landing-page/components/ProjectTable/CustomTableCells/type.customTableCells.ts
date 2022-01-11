import { Row, UseExpandedRowProps } from "react-table";
import { Experiment } from "../../../model/types/type.experiment";

export interface CustomTableCellProps<T> {
  value: T;
  row: UseExpandedRowProps<any> & Row<Experiment>;
}
