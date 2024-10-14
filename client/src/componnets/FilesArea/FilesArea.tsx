import { useEffect, useRef, useState } from "react";
import { getImagesUrl } from "../../api/images";
import { useApp } from "../../context/AppContext";
import { imagesUrl } from "../../types/types";
import ImageModal from "../ImageModal/ImageModal";
import PageLoader from "../LoadingComponents/PageLoader";
import ShimmerLoader from "../LoadingComponents/ShimmerLoader";

const FilesArea = () => {
  const { filteredData } = useApp();
  const [images, setImages] = useState<imagesUrl[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [imageId, setImageId] = useState(0);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const scrollableAreaRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setImages([]);
    setPage(1);
    setHasMore(true);
    getUrl(1);
  }, [filteredData]);

  useEffect(() => {
    if (page > 1) {
      getUrl(page);
    }
  }, [page]);

  const getUrl = async (page: number) => {
    if (loading || !hasMore) return;
    if (!isFirstLoad) {
      setLoading(true);
    }
    try {
      const response = await getImagesUrl(
        page,
        filteredData.length > 0 ? filteredData : []
      );
      const { data } = response.data;
      // console.log(data);
      if (data.length > 0) {
        setImages((prev) => [...prev, ...data]);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log("Error fetching images:", error);
    } finally {
      setLoading(false);
      setIsFirstLoad(false);
    }
  };

  const handleScroll = () => {
    const target = scrollableAreaRef.current;
    if (target) {
      const isAtBottom =
        target.scrollHeight - target.scrollTop <= target.clientHeight + 50;
      if (isAtBottom && hasMore && !loading) {
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

  return (
    <>
      {isFirstLoad && <PageLoader />}
      {showModal && (
        <ImageModal
          showModal={showModal}
          setShowModal={setShowModal}
          id={imageId}
        />
      )}
      <div
        ref={scrollableAreaRef}
        className="grid items-start h-full grid-cols-10 gap-2 overflow-y-scroll justify-items-start scroll-smooth"
        style={{ maxHeight: "95%" }}
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
        {loading &&
          Array.from({ length: 30 }).map((_, index) => (
            <ShimmerLoader key={index} />
          ))}
      </div>
    </>
  );
};

export default FilesArea;
