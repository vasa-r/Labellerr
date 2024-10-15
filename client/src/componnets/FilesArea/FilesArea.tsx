import { useEffect, useRef, useState } from "react";
import { getImagesUrl } from "../../api/images";
import { useApp } from "../../context/AppContext";
import { imagesUrl } from "../../types/types";
import ImageModal from "../ImageModal/ImageModal";
import PageLoader from "../LoadingComponents/PageLoader";
import ShimmerLoader from "../LoadingComponents/ShimmerLoader";
import Back from "../../assets/left-arrow.svg";

const FilesArea = () => {
  const { filteredData, category, setCategory } = useApp();
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
        filteredData?.length > 0 ? filteredData : [],
        category
      );
      const { data } = response.data;
      console.log(data);
      if (data?.length > 0) {
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

  const handleBack = () => {
    setCategory(null);
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
      {category && (
        <div className="relative w-full h-8 bg-transparent">
          <img
            src={Back}
            alt="back"
            className="absolute top-0 left-0 w-6 cursor-pointer"
            onClick={handleBack}
          />
        </div>
      )}
      <div
        ref={scrollableAreaRef}
        className="grid items-start h-full grid-cols-10 gap-2 overflow-y-scroll justify-items-start scroll-smooth"
        style={{ maxHeight: "95%" }}
      >
        {images.map(({ flickr_url, id }, index) => (
          <img
            key={index}
            src={flickr_url}
            alt="thumb image"
            className="w-full h-[170px] cursor-pointer"
            onClick={() => handleImageClick(id)}
            title="Go back to group view"
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
