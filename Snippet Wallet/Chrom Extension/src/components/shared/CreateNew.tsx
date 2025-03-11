import { useEffect, useState } from "react";
import FormField from "./FormField";

import { availableLanguages } from "../../utils/constants";
import PrismCodeRenderer from "./PrismCodeRenderer";
import { FaX } from "react-icons/fa6";
import { FaCircleNotch } from "react-icons/fa";
import { dbServices } from "../../utils/backend";
interface IFormData {
  title: string;
  createNew: string;
  language: string;
  code: string;
  description: string;
}
const CreateNew = ({
  setCreating,
  userId,
  setActivePath,
  activePath,
  updating = "",
  docId = "",
}: {
  setCreating: (value: boolean) => void;
  userId: string;
  activePath: { $id: string; title: string }[];
  setActivePath: (value: { $id: string; title: string }[]) => void;
  updating?: string;
  docId?: string;
}) => {
  const [loading, setLoading] = useState<boolean>();
  const [isCreatingSnippet, setIsCreatingSnippet] = useState<boolean>(false);
  const [formData, setFormData] = useState<IFormData>({
    title: "",
    createNew: "",
    language: "",
    code: "",
    description: "",
  });

  useEffect(() => {
    if (updating === "SNIPPET") {
      setIsCreatingSnippet(true);
      dbServices.loadOneSnippet(docId).then((res) => {
        let updatedFormData: IFormData = {
          title: res.title!,
          language: res.language!,
          code: res.code!,
          description: res.description! || "",
          createNew: "SNIPPET",
        };

        setFormData(updatedFormData);
      });
    }
  }, [updating]);

  async function handleSubmit() {
    setLoading(true);
    if (!updating) {
      if (formData.createNew === "FOLDER") {
        await dbServices.createFolder(
          formData.title,
          activePath[activePath.length - 1].$id,
          userId
        );

        setLoading(false);
      } else if (formData.createNew === "SNIPPET") {
        await dbServices.createSnippet(
          formData.title,
          activePath[activePath.length - 1].$id,
          userId,
          formData.language,
          formData.code,
          formData.description
        );

        setLoading(false);
      }
    } else {
      if (formData.createNew === "SNIPPET") {
        await dbServices.updateSnippet(docId, {
          title: formData.title,
          description: formData.description,
          code: formData.code,
          language: formData.language,
        });

        setLoading(true);
      } else if (formData.createNew === "FOLDER") {
        await dbServices.updateFolder(docId, {
          title: formData.title,
        });

        setLoading(true);
      }
    }
    setFormData({
      title: "",
      createNew: "",
      language: "",
      code: "",
      description: "",
    });
    setCreating(false);

    let newPath = [...activePath];
    setActivePath(newPath);
    setLoading(false);
  }
  return (
    <div className="fixed bg-black/40 w-full h-full top-0 left-0 p-4 overflow-y-scroll">
      <div className=" relative w-full rounded-md bg-white top-0 left-0 mt-10">
        <span
          onClick={() => {
            setCreating(false);
          }}
        >
          <FaX className=" absolute top-4 right-4  text-red-500 text-2xl" />
        </span>

        <form
          action=""
          className=" flex flex-col w-full overflow-y-scroll gap-4  p-5 rounded-md shadow-lg shadow-black/50 mb-5"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <legend className="text-2xl font-bold text-black">Create New</legend>
          {!updating && (
            <FormField
              value={formData?.createNew! || ""}
              label="Create New *"
              type="select"
              handleChange={(val) => {
                setIsCreatingSnippet(val === "SNIPPET");
                setFormData({
                  ...formData,
                  createNew: val,
                });
              }}
              name="createNew"
              selectOptions={[
                { value: "SNIPPET", label: "Snippet" },
                { value: "FOLDER", label: "folder" },
              ]}
            />
          )}
          <FormField
            value={formData?.title! || ""}
            label="Title *"
            type="text"
            handleChange={(val) => {
              setFormData({
                ...formData,
                title: val,
              });
            }}
            name="title"
          />

          {isCreatingSnippet && (
            <>
              <FormField
                value={formData?.language! || ""}
                label="Language *"
                type="select"
                handleChange={(val) => {
                  setFormData({
                    ...formData,
                    language: val,
                  });
                }}
                name="language"
                selectOptions={availableLanguages}
              />
              <FormField
                value={formData?.description! || ""}
                label="Description"
                type="textarea"
                handleChange={(val) => {
                  setFormData({
                    ...formData,
                    description: val,
                  });
                }}
                name="description"
                noOfRows={4}
                maxChar={200}
                isRequired={false}
              />
              <PrismCodeRenderer
                code={formData?.code! || ""}
                label="Code *"
                handleChange={(val) => {
                  setFormData({
                    ...formData,
                    code: val,
                  });
                }}
                name="code"
                noOfRows={12}
                maxChar={10000}
                language={formData.language}
                asInputField={true}
              />
            </>
          )}
          <button className="bg-primary text-white p-2" disabled={loading}>
            {loading ? <FaCircleNotch className=" animate-spin" /> : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateNew;
