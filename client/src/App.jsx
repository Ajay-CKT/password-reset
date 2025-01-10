import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className="w-full flex flex-col items-center gap-10">
      <h1 className="text-4xl">Password Reset Flow</h1>
      <div className="w-96 p-4 flex flex-col justify-around">
        <Outlet />
      </div>
    </div>
  );
};

export default App;
