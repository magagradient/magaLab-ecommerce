import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSeries } from "../../services/api";

function Series() {
  const [series, setSeries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getSeries()
      .then((data) => {
        console.log("SERIES DATA:", data);
        setSeries(data);
      })
      .catch((error) => {
        console.error("ERROR SERIES:", error);
      });
  }, []);

  const handleClick = (title) => {
    navigate(`/products?series=${encodeURIComponent(title)}`);
  };

  return (
    <section className="py-16 px-6 text-center">
      <h1 className="text-4xl font-bold mb-6">Series</h1>

      <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
        Cada serie es una colección conceptual de obras digitales que exploran
        una misma estética, tema o narrativa visual.
      </p>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {series.map((serie) => (
          <div
            key={serie.id_series}
            onClick={() => handleClick(serie.title)}
            className="border rounded-xl p-6 cursor-pointer hover:bg-neutral-100 transition"
          >
            <h2 className="text-xl font-semibold">{serie.title}</h2>
            {serie.description && (
              <p className="text-sm text-gray-500 mt-2">
                {serie.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Series;