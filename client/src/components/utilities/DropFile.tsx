import {
  CloseOutlined,
  CloudUploadOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import React, { useEffect, useMemo, useState } from "react";
import Dropzone from "react-dropzone";
import { toast } from "react-hot-toast";
import formatBytes from "../../lib/helperFunctions/formatBytes";
import formatFileName from "../../lib/helperFunctions/formatFileName";

type FileTypes = "pdf" | "jpg" | "jpeg" | "png" | "gif" | "svg";

interface DropFileProp {
  allowMultiple: boolean;
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  acceptedFileTypes: FileTypes[];
  title?: string;
}

const DropFile = ({
  allowMultiple,
  files,
  setFiles,
  acceptedFileTypes,
  title,
}: DropFileProp) => {
  const [refresh, triggerRefresh] = useState({});

  useEffect(() => {}, [refresh]);

  const processFile = (acceptedFile: File[], errors: any) => {
    //   toast.error("Hello")
    if (errors && errors.length) {
      toast.error(errors[0].errors[0].message);
      return;
    }
    if (acceptedFile.length) {
      const file = acceptedFile;
      if (!allowMultiple) return setFiles(file);
      setFiles((selectedFile) => [...file, ...selectedFile]);
    }
  };

  const removeFile = (file: File) => {
    const fileIndex = files?.findIndex((fl) => fl.name === file.name);
    if (fileIndex < 0 || !files.length) return;
    files.splice(fileIndex, 1);
    setFiles(files);
    triggerRefresh({});
  };

  const acceptedFileType = useMemo(() => {
    const fileType: any = {};
    fileType[`image/*`] = [];
    acceptedFileTypes.forEach((file) => {
      if (
        file === "jpg" ||
        file === "png" ||
        file === "jpeg" ||
        file === "gif" ||
        file === "pdf"
      ) {
        fileType[`image/*`] = [...fileType[`image/*`], `.${file}`];
      }
    });
    return fileType;
  }, [acceptedFileTypes]);

  const expand = (cert: File) => {
    window.open(URL.createObjectURL(cert), "_blank", "fullScreen=yes");
  };

  return (
    <div className="mb-2">
      {title && <h2 className="pb-2">{title}</h2>}
      <Dropzone
        onDrop={processFile}
        accept={acceptedFileType}
        multiple={allowMultiple}
      >
        {({ getRootProps, getInputProps }) => (
          <section className="border border-primary-lower px-3 rounded py-3">
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <div className="flex flex-col items-center justify-center">
                <CloudUploadOutlined className="text-xl bg-tertiary-low rounded-3xl px-2 py-1" />
                <p>
                  <span>Click to upload</span>
                  <span> or drag and drop</span>
                </p>
                <small>{acceptedFileTypes.join(" | ").toUpperCase()}</small>
              </div>
            </div>
          </section>
        )}
      </Dropzone>
      <div className="mb-6">
        {files.length > 0 &&
          files.map((file) => (
            <p
              key={`${file.name}${file.lastModified}`}
              className="flex items-center justify-between bg-tertiary-low p-2 my-2 rounded"
            >
              <span className="flex gap-x-4 items-center">
                <CloseOutlined
                  className="text-xs"
                  onClick={() => removeFile(file)}
                />
                <span>{formatFileName(file.name)}</span>
              </span>
              <span>{formatBytes(file.size)}</span>
              <EyeOutlined onClick={() => expand(file)} />
            </p>
          ))}
      </div>
    </div>
  );
};

export default DropFile;
