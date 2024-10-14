import Close from "../../assets/close.svg";
import { ChipProps } from "../../types/types";

const TextChips = ({ value, onRemove }: ChipProps) => {
  return (
    <div className="inline-flex text-white bg-[#65CDE3] p-1 px-2 rounded-2xl m-1 items-center gap-2 ">
      <p>{value}</p>
      <img
        src={Close}
        alt="remove filter"
        className="w-5 cursor-pointer"
        onClick={onRemove}
      />
    </div>
  );
};

export default TextChips;
