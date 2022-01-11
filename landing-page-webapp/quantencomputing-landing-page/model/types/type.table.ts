import { Column } from "react-table";

export type MainTableColumn = Column & {
  sortType?: string;
  disableSortBy?: boolean;
};
