import Dashboard from './Components/Dashboard';
function App() {
  return (
    <>
      <div className='flex flex-col h-screen '>
        <header className=' flex items-center text-2xl font-semibold p-4 border-b-1 borer-slate-500 bg-bg_1'>
          <h1 className='text-primary ml-4'>Dashboard</h1>
        </header>
        <main className='flex flex-col p-5'>
          <Dashboard />
        </main>
      </div>
    </>
  );
}

export default App;
