import { useEffect, useRef, useState } from "react";
import { getImagesUrl } from "../../api/images";
import { useApp } from "../../context/AppContext";
import { imagesUrl } from "../../types/types";
import ImageModal from "../ImageModal/ImageModal";

const FilesArea = () => {
  const { filteredData } = useApp();
  const [images, setImages] = useState<imagesUrl[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [imageId, setImageId] = useState(0);
  const scrollableAreaRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Resetting images and pagination when filteredData changes
    setImages([]);
    setPage(1);
    setHasMore(true);
    getUrl(); // Fetch the new data immediately when filters change
  }, [filteredData]);

  useEffect(() => {
    getUrl();
  }, [page]);

  const getUrl = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const response = await getImagesUrl(
        page,
        filteredData.length > 0 ? filteredData : []
      );
      const { data } = response.data;

      if (data.length > 0) {
        setImages((prev) => [...prev, ...data]);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = () => {
    const target = scrollableAreaRef.current;
    if (target) {
      // Check if we need to load more images
      if (
        target.scrollHeight - target.scrollTop <= target.clientHeight + 50 &&
        hasMore &&
        !loading
      ) {
        setPage((prev) => prev + 1);
      }
    }
  };

  useEffect(() => {
    const scrollableArea = scrollableAreaRef.current;

    if (scrollableArea) {
      scrollableArea.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollableArea) {
        scrollableArea.removeEventListener("scroll", handleScroll);
      }
    };
  }, [hasMore, loading]);

  const handleImageClick = (id: number) => {
    setImageId(id);
    setShowModal(true);
  };

  if (showModal) {
    return (
      <ImageModal
        showModal={showModal}
        setShowModal={setShowModal}
        id={imageId}
      />
    );
  }

  return (
    <div
      ref={scrollableAreaRef}
      className="grid items-start h-full grid-cols-10 gap-2 overflow-y-scroll justify-items-start scroll-smooth"
    >
      {images.map(({ coco_url, id }, index) => (
        <img
          key={index}
          src={coco_url}
          alt="thumb image"
          className="w-full h-[170px] cursor-pointer"
          onClick={() => handleImageClick(id)}
        />
      ))}
    </div>
  );
};

export default FilesArea;
