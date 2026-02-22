import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../../services/api";

function Categories() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(console.error);
  }, []);

  return (
    <section className="py-16 px-6 text-center text-white">
      <h1 className="text-4xl font-bold mb-6">Categorías</h1>

      <p className="text-gray-400 mb-10 max-w-2xl mx-auto">
        Explorá las obras según su tipo o formato.
      </p>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {categories.map((cat) => (
          <div
            key={cat.id_category}
            onClick={() => navigate(`/products?category=${cat.name}`)}
            className="cursor-pointer rounded-2xl h-48 flex items-center justify-center font-semibold text-xl bg-neutral-800 hover:bg-neutral-700 transition"
          >
            {cat.name}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Categories;