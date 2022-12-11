/* eslint-disable no-plusplus */
/* eslint-disable object-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable max-len */
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Form, Input, Select, Tag } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import randomColor from "randomcolor";
import toast from "react-hot-toast";

// import { ColumnType, TablePaginationConfig } from "antd/lib/table";
// import { FilterValue, SorterResult } from "antd/lib/table/interface";
// import { ProfileInfo } from "../../models/listers";
// import { dummyProfileInfo } from "../../lib/common/listerBoard";
import { useSWRConfig } from "swr";
import ButtonUI from "../utilities/ButtonUI";
import ModalPopUp from "../utilities/modal";
import DropFile from "../utilities/DropFile";
import { Dependencies } from "../../models/dependencies";
import { ListerProject } from "../../models/listers";
import { fetcher, postApi } from "../../lib/helperFunctions/fetcher";
import { useLoading } from "../../context/loadingCtx";
import { DependenciesUrl } from "../../lib/common/endpoints";

const { Option } = Select;

interface ProjectEntryType {
  isModalVisible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  initialValues?: ListerProject | null;
}

const ProjectEntry = ({
  isModalVisible,
  setIsModalVisible,
  initialValues,
}: ProjectEntryType) => {
  // const [profileInfo, setProfileInfo] = useState<ProfileInfo>(dummyProfileInfo);
  const { loading, setLoadingStatus } = useLoading();
  const { mutate } = useSWRConfig();

  const [form] = Form.useForm();
  const [ProjectPicture, setProjectPicture] = useState<File[]>([]);
  const tag = useRef<any>(null);
  const [Tags, setTags] = useState<string[]>([]);
  const [dependencies, setDependencies] = useState<Dependencies | null>(null);
  const onFilter = (input: any, option: any) =>
    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;

  const onProjectEntry = (payload: FormData) => {
    setLoadingStatus(true);
    postApi("Project/add", payload)
      .then((res) => {
        mutate("Project/my-projects");
        if (!res.successful) {
          toast.error(res.message);
          return;
        }
        toast.success(res.message);
        form.resetFields();
        setIsModalVisible(false);
      })
      .finally(() => setLoadingStatus(false));
    // push("listers");
  };

  const saveToDraft = () => {
    const payload: ListerProject = {
      ...form.getFieldsValue(),
      IsDraft: true,
      Tags,
      ProjectPicture,
    };
    const formDataVal = new FormData();

    Object.entries(payload).forEach((val) => {
      if (val[0] === "ProjectPicture") {
        for (let x = 0; x < val[1].length; x++) {
          formDataVal.append("ProjectPicture", val[1][x]);
        }
      } else {
        formDataVal.append(val[0], val[1]);
      }
    });
    formDataVal.forEach((res) => {
      console.warn(res);
    });
    onProjectEntry(formDataVal);
  };

  const onSubmit = (values: ListerProject) => {
    console.log(values, Tags);
    const payload: ListerProject = {
      ...values,
      IsDraft: false,
      Tags,
      ProjectPicture,
    };
    const formDataVal = new FormData();

    Object.entries(payload).forEach((val) => {
      if (val[0] === "ProjectPicture") {
        for (let x = 0; x < val[1].length; x++) {
          formDataVal.append("ProjectPicture", val[1][x]);
        }
      } else {
        formDataVal.append(val[0], val[1]);
      }
    });
    formDataVal.forEach((res) => {
      console.warn(res);
    });
    onProjectEntry(formDataVal);
    // setIsModalVisible(false);
  };

  const onError = (values: any) => {
    console.log(values);
  };

  const addToTags = () => {
    const inputRef: HTMLInputElement = tag?.current?.input;
    const val = inputRef?.value;
    if (val && val !== "") {
      if (Tags.find((tag) => tag === val)) return;
      setTags([...Tags, val]);
      form.resetFields(["tag"]);
      tag.current.focus();
      inputRef.focus();
    }
  };

  const removeTag = (tag: string) => {
    const index = Tags.findIndex((tg) => tg === tag);
    if (index < 0) return;
    Tags.splice(index, 1);
    setTags(Tags);
  };

  const getDependencies = () => {
    setLoadingStatus(true);
    fetcher(DependenciesUrl)
      .then((res) => {
        if (res.successful) {
          setDependencies(res.data);
        }
      })
      .finally(() => setLoadingStatus(false));
  };

  useMemo(() => {
    setTags(initialValues?.Tags ?? []);
  }, [initialValues]);

  useEffect(() => {
    getDependencies();
  }, []);

  // useEffect(() => {
  //   setProfileInfo(dummyProfileInfo);
  // }, []);

  return (
    <ModalPopUp
      setIsModalVisible={setIsModalVisible}
      isModalVisible={isModalVisible}
      title="Add New Project"
    >
      <Form
        form={form}
        name="basic"
        layout="vertical"
        initialValues={initialValues ?? {}}
        onFinish={onSubmit}
        onFinishFailed={onError}
        autoComplete="off"
      >
        <Form.Item
          label="Project Type"
          name="ProjectType"
          rules={[{ required: true, message: "Project Type is required!" }]}
        >
          <Select
            showSearch
            placeholder="Select a project type"
            optionFilterProp="children"
            filterOption={onFilter}
          >
            {dependencies &&
              dependencies.projectTypes &&
              dependencies.projectTypes.map((option) => (
                <Option key={option} value={option}>
                  {option}
                </Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Project Name"
          name="ProjectName"
          rules={[
            {
              required: true,
              message: "No organisation account name found!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Project Description"
          name="ProjectDescription"
          rules={[
            {
              required: true,
              message: "Kindly fill in a description for your project!",
            },
          ]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item
          label="Tonnes of co2"
          name="CO2Tonnes"
          rules={[
            {
              required: true,
              message: "No organisation account name found!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <DropFile
          title="Pictures?"
          acceptedFileTypes={["jpeg", "jpg", "png", "svg"]}
          files={ProjectPicture}
          setFiles={setProjectPicture}
          allowMultiple={true}
        />
        <Form.Item
          label="Add external link describing this project"
          name="ExternalLinks"
          rules={[
            {
              required: true,
              message: "No organisation account name found!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Add Tags" name="Tags">
          <>
            <Input ref={tag} className="w-[90%]" />
            <PlusCircleOutlined
              className="text-xl ml-2 opacity-60"
              onClick={addToTags}
            />
            <div className="gap-y-4 mt-1 w-[90%]">
              {Tags.length > 0 &&
                Tags.map((tag) => (
                  <Tag
                    closable
                    onClose={() => removeTag(tag)}
                    color={randomColor()}
                    key={tag}
                  >
                    {tag}
                  </Tag>
                ))}
            </div>
          </>
        </Form.Item>

        <Form.Item className="mt-4">
          <div className="flex gap-x-2 justify-end w-full ">
            <ButtonUI
              bg="secondary-high"
              color="primary-high"
              className="bg-secondary-high h-[35px]"
              disabled={loading}
              htmlType="button"
              onClickTrigger={() => setIsModalVisible(false)}
              width="25%"
            >
              Cancel
            </ButtonUI>
            <ButtonUI
              bg="tertiary-mid"
              className="bg-tertiary-mid hover:bg-tertiary-mid h-[35px]"
              disabled={loading}
              onClickTrigger={() => saveToDraft()}
              htmlType="button"
              width="25%"
            >
              Save As Draft
            </ButtonUI>
            <ButtonUI
              className="h-[35px]"
              disabled={loading}
              htmlType="submit"
              width="25%"
            >
              Submit
            </ButtonUI>
          </div>
        </Form.Item>
      </Form>
    </ModalPopUp>
  );
};

export default ProjectEntry;
