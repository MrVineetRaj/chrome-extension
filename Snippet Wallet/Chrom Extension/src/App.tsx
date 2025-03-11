import { useEffect, useState } from "react";
import { authServices, dbServices } from "./utils/backend";
import { IFolder, ISnippet, IUser } from "./utils/types";
import Navbar from "./components/Navbar";

import Loader from "./components/shared/Loader";
import Home from "./components/Home";
import { FaHome } from "react-icons/fa";
import { Toaster } from "react-hot-toast";
import CreateNew from "./components/shared/CreateNew";

const App = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [view, setView] = useState<string>("login");
  const [loading, setLoading] = useState<boolean>(false);
  const [folders, setFolder] = useState<IFolder[]>([]);
  const [snippets, setSnippets] = useState<ISnippet[]>([]);
  const [creatingNew, setCreatingNew] = useState<boolean>(false);

  const [activePath, setActivePath] = useState<
    {
      $id: string;
      title: string;
    }[]
  >([{ $id: "root", title: "~root" }]);

  useEffect(() => {
    authServices.getAccount().then((res) => {
      setUser(res!);
      setLoggedIn(!!res);
      setView("loading-backend");
    });
  }, []);

  useEffect(() => {
    let intervalId = setInterval(() => {
      console.log(loggedIn);
      console.log("trying....");
      dbServices.isBackendRunning(10 * 1000).then((res) => {
        if (res.success) {
          setView("home");
          clearInterval(intervalId);
        }
      });
    }, 10 * 1000);
  }, []);

  useEffect(() => {
    if (!!user) {
      setLoading(true);
      const currentDirectoryId = activePath[activePath.length - 1].$id;
      dbServices.loadFolders(currentDirectoryId, user?.$id!).then((res) => {
        setFolder(res);
      });

      dbServices.loadSnippets(currentDirectoryId, user?.$id!).then((res) => {
        setSnippets(res);
        setLoading(false);
      });
    }
  }, [user, activePath]);

  useEffect(() => {
    console.log("current directory", activePath[activePath.length - 1]);
  }, [activePath]);

  return (
    <div className="w-[100%] h-[100%] ">
      <Navbar loggedIn={loggedIn} />
      {view === "login" && <p>Login Page</p>}

      {view === "loading-backend" && <Loader />}

      {/* path */}

      {loggedIn && view !== "loading-backend" && (
        <div className="flex items-center justify-between p-2">
          <div className="flex  items-center gap-2 p-2">
            <span className=" text-lg" onClick={() => {}}>
              <FaHome
                className="size-5"
                onClick={() => {
                  setActivePath([{ $id: "root", title: "~root" }]);
                }}
              />
            </span>
            {activePath?.length > 1 && activePath?.length <= 3 && (
              <>
                <span
                  className=" text-lg"
                  onClick={() => {
                    if (activePath.length === 2) {
                      return;
                    }
                    let newPath = [...activePath];
                    newPath.pop();
                    setActivePath(newPath);
                  }}
                >
                  {"/ " + activePath[1].title}
                </span>
                {activePath.length === 3 && (
                  <span className=" text-lg" onClick={() => {}}>
                    {"/ " + activePath[2].title}
                  </span>
                )}
              </>
            )}
          </div>
          <button
            onClick={() => {
              setCreatingNew(true);
            }}
            className="p-2 border border-primary font-thin text-primary"
          >
            Create New
          </button>
          {/* <CreateNew/> */}
        </div>
      )}
      {loading
        ? view === "home" && <Loader />
        : view === "home" && (
            <Home
              folders={folders}
              snippets={snippets}
              user={user!}
              setActivePath={setActivePath}
              activePath={activePath}
            />
          )}
      {/* {view == "home" && (
        <>
          {" "}
          {user?.name}
          <button
            onClick={() => {
              const chromeInstance =
                typeof globalThis !== "undefined"
                  ? (globalThis as any).chrome
                  : undefined;

              chromeInstance?.tabs.create({
                url: "https://snippetwallet.unknownbug.tech",
              });
            }}
          >
            Logout
          </button>
          {folders.length > 0 && JSON.stringify(folders)}
        </>
      )} */}
      <Toaster />
      {creatingNew && (
        <CreateNew
          userId={user?.$id!}
          setActivePath={setActivePath}
          activePath={activePath}
          setCreating={setCreatingNew}
        />
      )}
    </div>
  );
};

export default App;
