import { useEffect, useRef, useState } from "react";
import { useApp } from "../../context/AppContext";
import { filterData } from "../../utils/constants";
import TextChips from "../TextChips/TextChips";

const FilterImage = () => {
  const [filteredData, setFilteredData] = useState<string[]>([]);
  const { theme } = useApp();
  const [showFilters, setShowFilters] = useState(false);
  const [filterInput, setFilterInput] = useState("");

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFilters = (val: string) => {
    if (!filteredData.includes(val)) {
      setFilteredData((prev) => [...prev, val]);
    }
    setFilterInput("");
    setShowFilters(false);
  };

  const removeFilter = (val: string) => {
    setFilteredData((prev) => prev.filter((item) => item !== val));
  };

  // to filter options based on search
  const filteredOptions = filterData.filter(({ name }) =>
    name.toLowerCase().includes(filterInput.toLowerCase())
  );

  // to close filter options when we click outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowFilters(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full">
      {filteredData.length > 0 && (
        <div className="flex flex-wrap p-2 rounded-[4px] border border-gray-500 mb-4">
          {filteredData.map((item) => (
            <TextChips
              key={item}
              value={item}
              onRemove={() => removeFilter(item)}
            />
          ))}
        </div>
      )}

      <div className="w-full">
        <label
          htmlFor="filter"
          className={`${theme === "light" ? "text-black" : "text-white"}`}
        >
          Filter Image
        </label>
        <input
          type="text"
          id="filter"
          ref={inputRef}
          value={filterInput}
          placeholder="Filter here"
          className={`${
            theme === "light" ? "text-black" : "text-white"
          } border border-gray-300 rounded-md p-2`}
          onFocus={() => setShowFilters(true)}
          onChange={(e) => setFilterInput(e.target.value)}
        />
      </div>

      {showFilters && filteredOptions.length > 0 && (
        <div
          ref={dropdownRef}
          className="flex flex-col p-2 mt-4 border border-gray-500 rounded-md"
          style={{ maxHeight: "200px", overflowY: "auto", minWidth: "200px" }}
        >
          {filteredOptions.map(({ id, name, filterKey }) => (
            <p
              key={id}
              className={`p-1 pl-2 m-1 hover:rounded-md cursor-pointer ${
                theme === "light"
                  ? "text-black hover:bg-gray-200"
                  : "text-white hover:bg-slate-500"
              }`}
              onClick={() => handleFilters(filterKey)}
            >
              {name}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterImage;
