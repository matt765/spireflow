export const Loader = () => {
  return (
    <div
      className="w-screen h-screen flex justify-center items-center fixed top-0 left-0 z-50 bg-loaderBg dark:bg-loaderBgDark"
      role="alert"
      aria-live="assertive"
      aria-busy="true"
    >
      <div className="flex justify-center">
        <span className="circle animate-loader"></span>
        <span className="circle animate-loader animation-delay-200"></span>
        <span className="circle animate-loader animation-delay-400"></span>
      </div>
    </div>
  );
};
