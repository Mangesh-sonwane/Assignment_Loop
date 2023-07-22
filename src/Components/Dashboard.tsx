import Table from './Table';
import ColumnFilter from './ColumnFilter';

const Dashboard = () => {
  return (
    <div className=''>
      <div className='flex text-center gap-x-2 h-screen text-primary'>
        <div className='w-1/4 space-y-4'>
          <h1 className='bg-bg_1 border-b-1 p-2 text-lg font-semibold rounded-md'>
            Filter Data
          </h1>
          <div className='space-y-4 p-2'>
            <ColumnFilter columnName='number' />
            <ColumnFilter columnName='mod3' />
            <ColumnFilter columnName='mod4' />
            <ColumnFilter columnName='mod5' />
            <ColumnFilter columnName='mod6' />
          </div>
        </div>

        <div className='w-3/4'>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
