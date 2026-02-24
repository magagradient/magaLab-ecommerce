import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getKeywords } from "../../services/api";

export default function Keywords() {
  const [keywords, setKeywords] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const activeKeyword = params.get("keywords");

  useEffect(() => {
    getKeywords()
      .then(setKeywords)
      .catch(console.error);
  }, []);

  const handleClick = (name) => {
    const newParams = new URLSearchParams(location.search);
    newParams.set("keywords", name);
    navigate(`/products?${newParams.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {keywords.map((k) => (
        <span
          key={k.id_keyword}
          onClick={() => handleClick(k.name)}
          className={`cursor-pointer px-3 py-1 rounded-full text-sm transition
            ${
              activeKeyword === k.name
                ? "bg-white text-black"
                : "bg-gray-700 text-white hover:bg-gray-500"
            }`}
        >
          {k.name}
        </span>
      ))}
    </div>
  );
}