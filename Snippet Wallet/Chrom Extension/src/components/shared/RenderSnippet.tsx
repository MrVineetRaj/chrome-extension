import { FaEdit, FaTrash } from "react-icons/fa";
import PrismCodeRenderer from "./PrismCodeRenderer";
import { dbServices } from "../../utils/backend";
import toast from "react-hot-toast";
import { useState } from "react";
import CreateNew from "./CreateNew";
import { IUser } from "../../utils/types";

const RenderSnippet = ({
  language,
  code,
  title,
  description = "",
  snippetId,
  activePath,
  setActivePath,
  user,
}: {
  language: string;
  code: string;
  title: string;
  description: string;
  snippetId: string;
  activePath: { $id: string; title: string }[];
  setActivePath: (val: { $id: string; title: string }[]) => void;
  user: IUser;
}) => {
  const [editing, setEditing] = useState<boolean>(false);
  return (
    <div className="p-2 relative border border-gray-300 rounded-md">
      <h1 className="text-lg font-bold text-black">{title}</h1>
      <p className="text-sm">{description}</p>
      <PrismCodeRenderer code={code} language={language} />
      <div className="absolute -top-4 bg-white/50 p-2  -right-4 flex gap-2">
        <FaEdit
          className="size-5 text-primary cursor-pointer"
          onClick={() => {
            setEditing(true);
          }}
        />
        <FaTrash
          className="size-5 text-red-500 cursor-pointer"
          onClick={() => {
            let reallyWantToDelete = confirm("Sure want to delete the snippet");
            if (reallyWantToDelete) {
              dbServices.deleteSnippet(snippetId).then(() => {
                toast.success("Deleted");
                let newPath = [...activePath];
                setActivePath(newPath);
              });
            }
          }}
        />
      </div>

      {editing && (
        <CreateNew
          userId={user?.$id!}
          setActivePath={setActivePath}
          activePath={activePath}
          setCreating={setEditing}
          updating="SNIPPET"
          docId={snippetId!}
        />
      )}
    </div>
  );
};

export default RenderSnippet;
