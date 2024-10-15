import { useEffect, useRef, useState } from "react";
import { ImageModalProps, ImageType } from "../../types/types";
import { getSingleImage } from "../../api/images";
import { useApp } from "../../context/AppContext";
import Info from "../../assets/info.svg";
import Close from "../../assets/close.svg";
import ImageDetail from "../ImageDetail/ImageDetail";

const ImageModal = ({ showModal, setShowModal, id }: ImageModalProps) => {
  const { theme } = useApp();
  const [image, setImage] = useState<ImageType | null>(null);
  const [showImageData, setShowImageData] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (showModal && id) {
      getImage();
    }
  }, [showModal, id]);

  const getImage = async () => {
    try {
      const response = await getSingleImage(id);
      const { data } = response.data;
      //   console.log(data);
      setImage(data[0]);
    } catch (error) {
      console.error("Error fetching image:", error);
      setImage(null);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setShowModal(false);
      }
    };

    if (showModal) {
      window.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showModal, setShowModal]);

  if (!image) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1000]">
      <div
        ref={modalRef}
        className={`w-[800px] h-[500px] p-4 pt-10 rounded-[10px] font-semibold flex flex-col justify-between items-center relative ${
          theme === "light" ? "bg-white" : "bg-gray-500"
        }`}
      >
        <img
          src={Info}
          alt="image details"
          className="absolute cursor-pointer top-2 left-2 w-7"
          onClick={() => setShowImageData(!showImageData)}
        />
        <img
          src={Close}
          alt="close modal"
          className="absolute cursor-pointer top-2 right-2 w-7"
          onClick={() => setShowModal(false)}
        />
        <img
          src={image.flickr_url}
          alt={image.file_name}
          className="object-cover w-full h-full"
        />
        {showImageData && <ImageDetail image={image} />}
      </div>
    </div>
  );
};

export default ImageModal;
