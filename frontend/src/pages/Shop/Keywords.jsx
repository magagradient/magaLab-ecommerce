import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getKeywords } from "../../services/api";

export default function Keywords() {
  const [keywords, setKeywords] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getKeywords()
      .then(setKeywords)
      .catch(console.error);
  }, []);

  return (
    <div className="flex flex-wrap gap-2">
      {keywords.map(k => (
        <span
          key={k.id_keyword}
          className="cursor-pointer px-3 py-1 rounded-full bg-gray-700 text-white hover:bg-gray-500"
          onClick={() => navigate(`/products?keywords=${encodeURIComponent(k.name)}`)}
        >
          {k.name}
        </span>
      ))}
    </div>
  );
}