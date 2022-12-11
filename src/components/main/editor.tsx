import React, { useEffect, useState } from "react";
// import { ColumnType, TablePaginationConfig } from "antd/lib/table";
// import { FilterValue, SorterResult } from "antd/lib/table/interface";
import toast from "react-hot-toast";
import ReactHtmlParser from "react-html-parser";
import useSWR, { mutate } from "swr";

import { EditOutlined } from "@ant-design/icons";
import DefaultFul from "../../lib/common/defaultLister";
import QuillEditor from "./quillEditor";
import { postApi } from "../../lib/helperFunctions/fetcher";
import { useLoading } from "../../context/loadingCtx";
import { GetUserDetailsUrl } from "../../lib/common/endpoints";

interface EditorPropType {
  //   getContentUrl: string;
  setContentUrl: string;
}

const Editor = ({ setContentUrl }: EditorPropType) => {
  const { setLoadingStatus } = useLoading();

  // const data = undefined
  const { data } = useSWR(GetUserDetailsUrl);

  const [content, setContent] = useState<string>(DefaultFul());
  useEffect(() => {
    if (data) {
      setContent(data.data.profile.company.description);
    }
  }, [data]);

  const [showEditor, toggleEditor] = useState<boolean>(false);

  const saveContent = (description: string) => {
    setLoadingStatus(true);
    postApi(setContentUrl, { description })
      .then((res) => {
        if (!res.successful) return;
        toast.success(res.message);
        toggleEditor(false);
      })
      .finally(() => setLoadingStatus(false));
  };

  const saveOrCancelEditor = (val: "save" | "cancel") => {
    if (val === "save") {
      saveContent(content);
      return;
    }
    mutate(GetUserDetailsUrl);
    toggleEditor(false);
  };

  return (
    <>
      <div className="">
        {!showEditor && (
          <div className="flex justify-end">
            <EditOutlined
              onClick={() => toggleEditor(true)}
              className="editContent text-lg"
            />
          </div>
        )}
        {!showEditor && ReactHtmlParser(content)}
      </div>
      {showEditor && (
        <QuillEditor
          content={content}
          setContent={setContent}
          defaultVal={content}
          title="Edit Company Profile"
          actionTriggered={saveOrCancelEditor}
        />
      )}
    </>
  );
};

export default Editor;
