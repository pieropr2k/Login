import { ImFileEmpty } from "react-icons/im";

export function DashboardPage() {
  return (
    <>
      <div className="flex justify-center items-center p-10">
          <div>
            <ImFileEmpty className="text-6xl text-gray-400 m-auto my-2" />
            <h1 className="font-bold text-xl">
              Dashboard solo para los de mayor rango
            </h1>
          </div>
        </div>
      
    </>
  );
}
