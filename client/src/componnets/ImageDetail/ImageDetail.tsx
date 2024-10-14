import { ImageDetailType } from "../../types/types";

const ImageDetail = ({ image }: ImageDetailType) => {
  const { file_name, height, width, date_captured, flickr_url, categories } =
    image;
  return (
    <div className="absolute top-0 z-20 max-w-sm p-4 m-4 overflow-hidden bg-white rounded shadow-lg left-5">
      <div className="px-6 py-4">
        <div className="mb-2 text-xl font-bold text-gray-700">{file_name}</div>
        <p className="text-base text-gray-700">Height: {height}px</p>
        <p className="text-base text-gray-700">Width: {width}px</p>
        <p className="text-base text-gray-700">
          Date Captured: {new Date(date_captured).toLocaleDateString()}
        </p>
        <p className="text-base text-gray-700">
          <a
            href={flickr_url}
            target="_blank"
            className="text-blue-500 hover:underline"
          >
            View on Flickr
          </a>
        </p>
        <div className="mt-4">
          <h3 className="font-semibold">Categories:</h3>
          <ul className="list-disc list-inside">
            {categories.map((category, index) => (
              <li key={index} className="text-gray-700">
                {category}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ImageDetail;
