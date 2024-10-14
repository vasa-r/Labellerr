import { useEffect, useRef, useState } from "react";
import { useApp } from "../../context/AppContext";
import SingleFolder from "../SingleFolder/SingleFolder";
import { getAllCategories } from "../../api/categories";
import { catTypes } from "../../types/types";

const GroupArea = () => {
  const { theme, filteredData } = useApp();
  const [categories, setCategories] = useState<catTypes[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const scrollableAreaRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setCategories([]);
    setPage(1);
    setHasMore(true);
  }, [filteredData]);

  useEffect(() => {
    getCategories();
    console.log(filteredData);
  }, [page, filteredData]);

  const getCategories = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const response = await getAllCategories(
        page,
        filteredData.length > 0 ? filteredData : []
      );
      const { data } = response.data;

      if (data.length > 0) {
        setCategories((prev) => [...prev, ...data]);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = () => {
    const target = scrollableAreaRef.current;
    if (target) {
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

  return (
    <div
      ref={scrollableAreaRef}
      className={`grid h-full grid-cols-5 gap-5 justify-items-start items-start overflow-y-scroll scroll-smooth ${
        theme === "light" ? "text-black" : ""
      }`}
    >
      {categories.map(({ _id, category_name, count }) => (
        <SingleFolder key={_id} name={category_name} count={count} />
      ))}
    </div>
  );
};

export default GroupArea;
