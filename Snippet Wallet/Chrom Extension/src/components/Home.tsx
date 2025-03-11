import { FaEdit, FaFolder, FaTrash } from "react-icons/fa";
import { IFolder, ISnippet, IUser } from "../utils/types";
import RenderSnippet from "./shared/RenderSnippet";
import { dbServices } from "../utils/backend";
import toast from "react-hot-toast";
// import { useState } from "react";

const Home = ({
  folders,
  snippets,
  user,
  setActivePath,
  activePath,
}: {
  folders: IFolder[];
  snippets: ISnippet[];
  user: IUser;
  activePath: { $id: string; title: string }[];
  setActivePath: (value: { $id: string; title: string }[]) => void;
}) => {
  // const [editing, setEditing] = useState<boolean>(false);
  return (
    <div className="border m-2 rounded-md  p-2 relative">
      <h1 className="px-4 text-xl font-semibold border-b">
        {activePath[activePath.length - 1].title}
      </h1>
      <div className="flex gap-2  flex-wrap overflow-x-scroll hide-scrollbar ">
        {folders?.map((folder) => (
          <div
            className="flex flex-col items-center justify-center cursor-pointer hover:shadow-xl p-2 rounded-md active:scale-95 transition-all duration-200"
            key={folder?.$id}
            onClick={() => {
              let newPath = [
                ...activePath,
                {
                  $id: folder?.$id!,
                  title: folder?.title!,
                },
              ];
              setActivePath(newPath);
            }}
          >
            <FaFolder className="text-yellow-500 size-12" />
            <p className="text-sm">{folder?.title}</p>
          </div>
        ))}
      </div>

      {activePath[activePath.length - 1].$id !== "root" && (
        <div className="flex gap-2 absolute top-2 right-4">
          <FaEdit className="size-5 text-primary " />
          <FaTrash
            className="size-5 text-red-500 "
            onClick={() => {
              let reallyDelete = confirm(
                `Delete folder "${activePath[activePath.length - 1].title}"`
              );

              if (reallyDelete) {
                dbServices
                  .deleteFolder(activePath[activePath.length - 1].$id)
                  .then(() => {
                    toast.success("Folder deleted successfully");
                    let newPath = [...activePath];
                    newPath.pop();
                    setActivePath(newPath);
                  });
              }

              // console.log(reallyDelete);
            }}
          />
        </div>
      )}

      <div className="flex flex-col gap-2">
        {snippets?.map((snippet) => (
          <RenderSnippet
            key={snippet?.$id}
            code={snippet?.code}
            language={snippet.language}
            description={snippet.description || ""}
            title={snippet?.title}
            snippetId={snippet?.$id!}
            activePath={activePath}
            setActivePath={setActivePath}
            user={user!}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
