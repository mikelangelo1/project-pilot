/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";

import { PhotoProvider, PhotoView } from "react-photo-view";
import { DeleteFilled } from "@ant-design/icons";
import useSWR, { mutate } from "swr";
import ListerDropFile from "../utilities/ListerDropFile";
import { deleteApi, postApi } from "../../lib/helperFunctions/fetcher";
import { ResApi } from "../../models/utilities";
import { useLoading } from "../../context/loadingCtx";
import ModalPopUp2 from "../utilities/modal2";

interface ImageType {
  idType: number;
  name: string;
  path: string;
  pictureId: number;
  url: string;
}

interface GalleryPropType {
  imageListUrl: string;
  deleteUrl: string;
  addUrl: string;
}

const Gallery = ({ imageListUrl, deleteUrl, addUrl }: GalleryPropType) => {
  const { setLoadingStatus } = useLoading();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedID, setSelectedID] = useState<number | null>(null);

  const data = undefined
  // const { data } = useSWR<ResApi<ImageType[]>>(imageListUrl);

  const [images, setImages] = useState<ImageType[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  const onAdd = (selectedFiles: File[]) => {
    setLoadingStatus(true);
    const formData = new FormData();
    formData.append("Picture", selectedFiles[0]);
    postApi(addUrl, formData)
      .then((res) => {
        if (!res.successful) return;
        setImages(res.data);
        mutate(imageListUrl);
      })
      .finally(() => setLoadingStatus(false));
  };


  const remove = (item: ImageType) => {
    setIsModalVisible(true);
    setSelectedID(item.pictureId);
  };

  const onOk = () => {
    setIsModalVisible(false);
    if (!selectedID) return;
    setLoadingStatus(true);
    deleteApi(`${deleteUrl}/${selectedID}`)
      .then((res) => {
        if (!res.successful) return;
        setImages(res.data);
        mutate(imageListUrl);
      })
      .finally(() => setLoadingStatus(false));
  };

  // useEffect(() => {
  //   if (!data || !data?.data?.length) return;
  //   setImages(data.data);
  // }, [data]);

  return (
    <>
      <ModalPopUp2
        handleOk={onOk}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        title="Remove Photo?"
        okText="Delete"
      >
        <p className="mb-4">Are you sure you want to delete this photo?</p>
      </ModalPopUp2>
      <PhotoProvider>
        <div className="flex flex-wrap justify-center sm:justify-start gap-4 my-3 items-center cursor-pointer">
          {images.map((item) => (
            <div key={item.pictureId} className="flex flex-col">
              <PhotoView src={item.url}>
                <img
                  src={item.url}
                  alt={item.name}
                  className="object-cover w-[250px] h-[250px] border"
                />
              </PhotoView>
              <DeleteFilled
                onClick={() => remove(item)}
                className="py-1 rounded-b-xl bg-primary-high text-xl text-[#dd3a3a]"
              />
            </div>
          ))}
          <ListerDropFile
            onAdd={onAdd}
            acceptedFileTypes={["jpg", "jpeg", "png"]}
            allowMultiple={false}
            files={files}
            setFiles={setFiles}
          />
        </div>
      </PhotoProvider>
    </>
  );
};

export default Gallery;
