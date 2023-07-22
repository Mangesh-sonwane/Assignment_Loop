import React from 'react';
import MultiSelect from 'multiselect-react-dropdown';
import { useSelector, useDispatch } from 'react-redux';
import { setFilterValues } from '../store/slices/dataSlice';
import { RootState } from '../store/rootReducer';

interface ColumnFilterProps {
  columnName: keyof RootState['data']['data'][0];
}

const ColumnFilter: React.FC<ColumnFilterProps> = ({ columnName }) => {
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.data.data);

  const columnValues = Array.from(
    new Set(data.map((item) => item[columnName]))
  );

  const [selectedValues, setSelectedValues] = React.useState<string[]>([]);

  const handleSelectionChange = (selectedList: any) => {
    setSelectedValues(
      selectedList.map((item: any) =>
        item?.name ? item.name.toString().toLowerCase() : ''
      )
    );
  };

  React.useEffect(() => {
    dispatch(setFilterValues({ column: columnName, values: selectedValues }));
  }, [dispatch, columnName, selectedValues]);

  return (
    <div>
      <MultiSelect
        options={columnValues.map((value) => ({ name: value?.toString() }))}
        selectedValues={selectedValues.map((value) => ({
          name: value?.toString(),
        }))}
        onSelect={handleSelectionChange}
        onRemove={handleSelectionChange}
        displayValue='name'
        showCheckbox={true}
        placeholder={`Search by ${columnName}`}
      />
    </div>
  );
};

export default ColumnFilter;
