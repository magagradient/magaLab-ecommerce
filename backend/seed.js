const {
    sequelize,
    Categories,
    Series,
    Colors,
    Styles,
    Keywords,
    Themes,
    Products,
    ProductImages,
    ProductColors,
    ProductStyles,
    ProductThemes,
    ProductKeywords
} = require('./src/database/indexModels');

const seed = async () => {
    try {
        console.log('Conectando a la base de datos...');
        await sequelize.authenticate();
        await sequelize.sync({ force: true, alter: false });

        console.log('Cargando datos de prueba sin resetear la base de datos...');


        const categories = await Categories.bulkCreate([
            { name: "Arte Digital" },
            { name: "Ilustración" },
            { name: "Diseño Gráfico" },
            { name: "Fotografía" },
            { name: "Collage" }
        ]);

        // Crear una serie para los productos
        const serie = await Series.create({ title: "Serie Básica", description: "Una serie cargada por seed" });

        const [rojo, azul, verde, amarillo, morado] = await Colors.bulkCreate([
            { name: "Rojo" }, { name: "Azul" }, { name: "Verde" }, { name: "Amarillo" }, { name: "Morado" }
        ]);
        const [minimalista, abstracto, moderno, futurista, clásico] = await Styles.bulkCreate([
            { name: "Minimalista" }, { name: "Abstracto" }, { name: "Moderno" }, { name: "Futurista" }, { name: "Clásico" }
        ]);
        const [oscuro, claro, neutro, brillante, suave] = await Themes.bulkCreate([
            { name: "Oscuro" }, { name: "Claro" }, { name: "Neutro" }, { name: "Brillante" }, { name: "Suave" }
        ]);
        const [digitalArt, arteAbstracto, naturaleza, retro, surrealista] = await Keywords.bulkCreate([
            { name: "Digital Art" }, { name: "Arte Abstracto" }, { name: "Naturaleza" }, { name: "Retro" }, { name: "Surrealista" }
        ]);

        const productos = [
            {
                title: "Portada Minimalista",
                description: "Una portada minimalista para tu álbum.",
                price: 25.99,
                stock: 10,
                colors: [rojo, azul],
                styles: [minimalista],
                themes: [oscuro],
                keywords: [digitalArt],
                image: "https://miweb.com/img1.jpg"
            },
            {
                title: "Portada Abstracta",
                description: "Una portada con diseño abstracto.",
                price: 35.99,
                stock: 15,
                colors: [rojo],
                styles: [abstracto],
                themes: [claro],
                keywords: [arteAbstracto],
                image: "https://miweb.com/img2.jpg"
            },
            {
                title: "Portada Colorida",
                description: "Una portada con muchos colores y formas.",
                price: 45.99,
                stock: 20,
                colors: [verde],
                styles: [moderno],
                themes: [neutro],
                keywords: [naturaleza],
                image: "https://miweb.com/img3.jpg"
            },
            {
                title: "Portada Vibrante",
                description: "Una portada con un diseño vibrante y dinámico.",
                price: 50.99,
                stock: 25,
                colors: [azul, verde],
                styles: [abstracto],
                themes: [oscuro],
                keywords: [digitalArt],
                image: "https://miweb.com/img4.jpg"
            },
            {
                title: "Portada Retro",
                description: "Una portada con un estilo retro y nostálgico.",
                price: 30.99,
                stock: 30,
                colors: [rojo, verde],
                styles: [minimalista],
                themes: [claro],
                keywords: [arteAbstracto],
                image: "https://miweb.com/img5.jpg"
            },
            {
                title: "Portada Futurista",
                description: "Portada con estilo futurista y elementos de ciencia ficción.",
                price: 55.99,
                stock: 35,
                colors: [amarillo],
                styles: [futurista],
                themes: [brillante],
                keywords: [retro],
                image: "https://miweb.com/img6.jpg"
            },
            {
                title: "Portada Clásica",
                description: "Portada con un diseño clásico y atemporal.",
                price: 40.99,
                stock: 40,
                colors: [morado],
                styles: [clásico],
                themes: [suave],
                keywords: [surrealista],
                image: "https://miweb.com/img7.jpg"
            },
            {
                title: "Portada Abstracta Moderna",
                description: "Portada moderna con un estilo abstracto y colores vibrantes.",
                price: 60.99,
                stock: 50,
                colors: [rojo, azul],
                styles: [abstracto, moderno],
                themes: [oscuro],
                keywords: [digitalArt],
                image: "https://miweb.com/img8.jpg"
            },
            {
                title: "Portada Surrealista",
                description: "Una portada surrealista que desafía la realidad.",
                price: 70.99,
                stock: 60,
                colors: [verde, amarillo],
                styles: [abstracto, moderno],
                themes: [neutro],
                keywords: [surrealista],
                image: "https://miweb.com/img9.jpg"
            },
            {
                title: "Portada Geométrica",
                description: "Portada con un diseño geométrico y minimalista.",
                price: 80.99,
                stock: 75,
                colors: [morado],
                styles: [minimalista],
                themes: [suave],
                keywords: [naturaleza],
                image: "https://miweb.com/img10.jpg"
            }
        ];

        for (const p of productos) {
            const randomCategory = categories[Math.floor(Math.random() * categories.length)];
            if (!randomCategory) {
                throw new Error('La categoría seleccionada no existe.');
            }

            // Crear el producto
            const producto = await Products.create({
                title: p.title,
                description: p.description,
                price: p.price,
                stock: p.stock,
                id_category: randomCategory.id_category,
                id_series: serie.id_series
            });

            // Asociar colores, estilos, temas, keywords e imágenes
            await producto.addColors(p.colors);
            await producto.addStyles(p.styles);
            await producto.addThemes(p.themes);
            await producto.addKeywords(p.keywords);
            await ProductImages.create({ id_product: producto.id_product, image_url: p.image });
        }

        console.log("Datos de prueba cargados con éxito.");
    } catch (error) {
        console.error("Error al cargar los datos:", error.message);
    } finally {
        await sequelize.close();
    }
};

seed();
