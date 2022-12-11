import { useLoading } from "../../context/loadingCtx";

const LoadingComp = () => {
  const { loading } = useLoading();

  return (
    <div>
      {loading && (
        <div
          style={{ backgroundColor: "#000" }}
          className="h-[100vh] w-[100vw] opacity-40 fixed top-0 z-[1000] flex justify-center items-center bg-black"
        >
          <div className="lds-ripple">
            <div></div>
            <div></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoadingComp;
