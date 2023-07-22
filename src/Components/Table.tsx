import { useEffect } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { useSelector, useDispatch } from 'react-redux';
import { fetchData } from '../store/slices/dataSlice';
import { RootState } from '../store/rootReducer';
import { ThunkDispatch } from 'redux-thunk';

interface DataRow {
  number: string;
  mod3: string;
  mod4: string;
  mod5: string;
  mod6: string;
}

const Table = () => {
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();
  const data = useSelector((state: RootState) => state.data.data);
  const filters = useSelector((state: RootState) => state.data.filters);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const columns: TableColumn<DataRow>[] = [
    {
      name: 'Number',
      selector: (row: DataRow) => row.number,
      sortable: true,
    },
    {
      name: 'Mod 3',
      selector: (row: DataRow) => row.mod3,
      sortable: true,
    },
    {
      name: 'Mod 4',
      selector: (row: DataRow) => row.mod4,
      sortable: true,
    },
    {
      name: 'Mod 5',
      selector: (row: DataRow) => row.mod5,
      sortable: true,
    },
    {
      name: 'Mod 6',
      selector: (row: DataRow) => row.mod6,
      sortable: true,
    },
  ];

  const filteredData = data.filter((row) => {
    for (const column in filters) {
      const selectedOptions = filters[column as keyof DataRow];
      if (selectedOptions && selectedOptions.length > 0) {
        const columnValue = String(row[column as keyof DataRow]).toLowerCase();

        if (
          !selectedOptions
            .map((option) => option.toLowerCase())
            .includes(columnValue)
        ) {
          return false;
        }
      }
    }
    return true;
  });

  const paginationOptions = {
    rowsPerPageText: 'Rows per page:',
    rangeSeparatorText: 'of',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'All',
  };

  return (
    <div className='mx-auto p-4'>
      <div className=''>
        <DataTable
          columns={columns}
          data={filteredData}
          striped
          pagination
          paginationComponentOptions={paginationOptions}
          highlightOnHover
          pointerOnHover
          paginationPerPage={20}
        />
      </div>
    </div>
  );
};

export default Table;
