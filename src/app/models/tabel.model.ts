import { SortTypes } from './../utilities/enums';

export interface TableColumn {
    title: string,
    field: string,
    sortable?: boolean,
    sorted?: SortTypes | null
};

export type TableColumns = TableColumn[];
