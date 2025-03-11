const ExtensionSection = () => {
  return (
    <div className="grid  md:grid-cols-2 z-50 my-8">
      <div className="w-full flex flex-col justify-center gap-4">
        <h1 className="text-2xl font-semibold">
          <span className="text-primary">Snippet Wallet</span> Chrome Extension
        </h1>

        <h3 className="font-semibold">Steps to use Extension</h3>
        <nav className="list-decimal flex flex-col gap-2">
          <li>
            Authenticate{" "}
            <a
              href={import.meta.env.BASE_URL}
              className="underline text-blue-500"
            >
              here
            </a>{" "}
            with github
          </li>
          <li>
            Install extension from{" "}
            <a
              href="https://snippetwallet.unknownbug.tech"
              target="_blank"
              className="underline text-blue-500"
            >
              here
            </a>
          </li>
          <li>Start using it by clicking on create new</li>
          <li>Give us some feedback </li>
        </nav>
      </div>
      <img
        src="/snippet-1.png"
        alt=""
        className="w-full hidden md:inline-block rounded-2xl"
      />
    </div>
  );
};

export default ExtensionSection;
