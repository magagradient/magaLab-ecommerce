import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getColors } from "../../services/api";

function Colors() {
  const [colors, setColors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getColors()
      .then(setColors)
      .catch(console.error);
  }, []);

  return (
    <section className="py-16 px-6 text-center text-white">
      <h1 className="text-4xl font-bold mb-6">Colores</h1>

      <p className="text-gray-400 mb-10 max-w-2xl mx-auto">
        Seleccioná las obras por paleta de color o composición cromática.
      </p>

      <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {colors.map((color) => (
          <div
            key={color.id_color}
            onClick={() => navigate(`/products?colors=${color.id_color}`)}
            className="cursor-pointer rounded-xl h-40 flex items-center justify-center font-medium text-black"
            style={{ backgroundColor: color.name.toLowerCase() }}
          >
            {color.name}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Colors;