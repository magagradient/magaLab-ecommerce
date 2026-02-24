import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProductList from "../../components/ProductList";
import { getColors, getKeywords, getSeries } from "../../services/api";

export default function Products() {
  const location = useLocation();
  const navigate = useNavigate();

  const [colorsList, setColorsList] = useState([]);
  const [keywordsList, setKeywordsList] = useState([]);
  const [seriesList, setSeriesList] = useState([]);

  useEffect(() => {
    getColors().then(setColorsList).catch(console.error);
    getKeywords().then(setKeywordsList).catch(console.error);
    getSeries().then(setSeriesList).catch(console.error);
  }, []);

  const params = new URLSearchParams(location.search);

  const series = params.get("series") || "";
  const category = params.get("category") || "all";
  const query = params.get("q") || "";
  const colors = params.get("colors") || "";
  const keywords = params.get("keywords") || "";

  const updateFilter = (key, value) => {
    const newParams = new URLSearchParams(location.search);

    if (newParams.get(key) === value) {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }

    navigate(`/products?${newParams.toString()}`);
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-12 text-black">
      <h1 className="text-3xl font-bold mb-8">
        Catálogo de productos
      </h1>

      <div className="grid md:grid-cols-4 gap-10">

        {/* SIDEBAR */}
        <aside className="md:col-span-1 space-y-8">

          {/* COLORES */}
          <div>
            <h2 className="font-semibold mb-3">Colores</h2>
            <div className="max-h-48 overflow-y-auto pr-2 space-y-1">
              {colorsList.map((color) => (
                <button
                  key={color.id_color}
                  onClick={() => updateFilter("colors", color.name)}
                  className="block text-left hover:text-gray-500"
                >
                  {color.name}
                </button>
              ))}
            </div>
          </div>

          {/* KEYWORDS */}
          <div>
            <h2 className="font-semibold mb-3">Keywords</h2>
            <div className="max-h-48 overflow-y-auto pr-2 space-y-1">
              {keywordsList.map((keyword) => (
                <button
                  key={keyword.id_keyword}
                  onClick={() => updateFilter("keywords", keyword.name)}
                  className="block text-left hover:text-gray-500"
                >
                  {keyword.name}
                </button>
              ))}
            </div>
          </div>

          {/* SERIES */}
          <div>
            <h2 className="font-semibold mb-3">Series</h2>
            <div className="max-h-48 overflow-y-auto pr-2 space-y-1">
              {seriesList.map((serie) => (
                <button
                  key={serie.id_series}
                  onClick={() => updateFilter("series", serie.title)}
                  className="block text-left hover:text-gray-500"
                >
                  {serie.title}
                </button>
              ))}
            </div>
          </div>

        </aside>

        {/* PRODUCT GRID */}
        <div className="md:col-span-3">
          <ProductList 
            filter={category} 
            searchQuery={query}
            colors={colors}
            keywords={keywords}
            series={series}
          />
        </div>

      </div>
    </section>
  );
}