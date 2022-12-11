/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import { Dispatch, SetStateAction, useEffect } from "react";
import ButtonUI from "../utilities/ButtonUI";

const ReactQuill =
  typeof window === "object" ? require("react-quill") : () => false;

const modules = {
  toolbar: [
    [{ header: [3, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link"],
  ],
};

interface QuillEditorType {
  title: string;
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
  defaultVal: string;
  actionTriggered: (val: "save" | "cancel") => void;
}

const QuillEditor = ({
  title,
  content,
  setContent,
  defaultVal,
  actionTriggered,
}: QuillEditorType) => {
  useEffect(() => {
    console.log(defaultVal);
  }, [content]);

  return (
    <div className="flex flex-col gap-y-2 bg-secondary-high rounded-l mb-10">
      <div className="flex justify-between items-center">
        <h2 className="text-base font-header">{title}</h2>
        <div className="flex gap-x-3">
          <ButtonUI
            onClickTrigger={() => actionTriggered('cancel')}
            htmlType="button"
            className="h-[33px]"
            bg="secondary-low"
            color="primary-high"
          >
            Cancel
          </ButtonUI>
          <ButtonUI
            onClickTrigger={() => actionTriggered("save")}
            htmlType="button"
            className="h-[33px]"
          >
            Save
          </ButtonUI>
        </div>
      </div>
      <ReactQuill
        defaultValue={defaultVal}
        onChange={setContent}
        modules={modules}
      />
    </div>
  );
};

export default QuillEditor;
