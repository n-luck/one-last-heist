const LoadingPage = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <div className="flex justify-center">
        <div className="w-16 h-16 md:w-36 md:h-36 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default LoadingPage;
