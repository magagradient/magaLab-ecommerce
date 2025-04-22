const { sequelize,
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
    ProductKeywords } = require('./src/database/indexModels');

const seed = async () => {
    try {
        console.log('Conectando a la base de datos...');
        await sequelize.authenticate();

        console.log('Reseteando base de datos...');

        // Resetear las tablas relacionadas
        await ProductImages.destroy({ where: {}, force: true });
        await ProductColors.destroy({ where: {}, force: true });
        await ProductStyles.destroy({ where: {}, force: true });
        await ProductThemes.destroy({ where: {}, force: true });
        await ProductKeywords.destroy({ where: {}, force: true });
        await Products.destroy({ where: {}, force: true });
        await Categories.destroy({ where: {}, force: true });
        await Series.destroy({ where: {}, force: true });
        await Colors.destroy({ where: {}, force: true });
        await Styles.destroy({ where: {}, force: true });
        await Keywords.destroy({ where: {}, force: true });
        await Themes.destroy({ where: {}, force: true });

        // Crear datos de prueba
        const cat = await Categories.create({ name: "Arte Digital" });
        const serie = await Series.create({ title: "Serie Básica", description: "Una serie cargada por seed" });

        // Crear colores, estilos, temas, etc.
        const [rojo, azul, verde, amarillo, morado] = await Colors.bulkCreate([{ name: "Rojo" }, { name: "Azul" }, { name: "Verde" }, { name: "Amarillo" }, { name: "Morado" }]);
        const [minimalista, abstracto, moderno, futurista, clásico] = await Styles.bulkCreate([{ name: "Minimalista" }, { name: "Abstracto" }, { name: "Moderno" }, { name: "Futurista" }, { name: "Clásico" }]);
        const [oscuro, claro, neutro, brillante, suave] = await Themes.bulkCreate([{ name: "Oscuro" }, { name: "Claro" }, { name: "Neutro" }, { name: "Brillante" }, { name: "Suave" }]);
        const [digitalArt, arteAbstracto, naturaleza, retro, surrealista] = await Keywords.bulkCreate([{ name: "Digital Art" }, { name: "Arte Abstracto" }, { name: "Naturaleza" }, { name: "Retro" }, { name: "Surrealista" }]);

        // Crear productos y asignar relaciones
        const product1 = await Products.create({
            title: "Portada Minimalista",
            description: "Una portada minimalista para tu álbum.",
            price: 25.99,
            stock: 10,
            id_category: cat.id_category,
            id_series: serie.id_series
        });
        await product1.addColors([rojo, azul]);
        await product1.addStyles([minimalista]);
        await product1.addThemes([oscuro]);
        await product1.addKeywords([digitalArt]);

        const product2 = await Products.create({
            title: "Portada Abstracta",
            description: "Una portada con diseño abstracto.",
            price: 35.99,
            stock: 15,
            id_category: cat.id_category,
            id_series: serie.id_series
        });
        await product2.addColors([rojo]);
        await product2.addStyles([abstracto]);
        await product2.addThemes([claro]);
        await product2.addKeywords([arteAbstracto]);

        const product3 = await Products.create({
            title: "Portada Colorida",
            description: "Una portada con muchos colores y formas.",
            price: 45.99,
            stock: 20,
            id_category: cat.id_category,
            id_series: serie.id_series
        });
        await product3.addColors([verde]);
        await product3.addStyles([moderno]);
        await product3.addThemes([neutro]);
        await product3.addKeywords([naturaleza]);

        const product4 = await Products.create({
            title: "Portada Vibrante",
            description: "Una portada con un diseño vibrante y dinámico.",
            price: 50.99,
            stock: 25,
            id_category: cat.id_category,
            id_series: serie.id_series
        });
        await product4.addColors([azul, verde]);
        await product4.addStyles([abstracto]);
        await product4.addThemes([oscuro]);
        await product4.addKeywords([digitalArt]);

        const product5 = await Products.create({
            title: "Portada Retro",
            description: "Una portada con un estilo retro y nostálgico.",
            price: 30.99,
            stock: 30,
            id_category: cat.id_category,
            id_series: serie.id_series
        });
        await product5.addColors([rojo, verde]);
        await product5.addStyles([minimalista]);
        await product5.addThemes([claro]);
        await product5.addKeywords([arteAbstracto]);

        // Productos adicionales para llegar a 10
        const product6 = await Products.create({
            title: "Portada Futurista",
            description: "Portada con estilo futurista y elementos de ciencia ficción.",
            price: 55.99,
            stock: 35,
            id_category: cat.id_category,
            id_series: serie.id_series
        });
        await product6.addColors([amarillo]);
        await product6.addStyles([futurista]);
        await product6.addThemes([brillante]);
        await product6.addKeywords([retro]);

        const product7 = await Products.create({
            title: "Portada Clásica",
            description: "Portada con un diseño clásico y atemporal.",
            price: 40.99,
            stock: 40,
            id_category: cat.id_category,
            id_series: serie.id_series
        });
        await product7.addColors([morado]);
        await product7.addStyles([clásico]);
        await product7.addThemes([suave]);
        await product7.addKeywords([surrealista]);

        const product8 = await Products.create({
            title: "Portada Abstracta Moderna",
            description: "Portada moderna con un estilo abstracto y colores vibrantes.",
            price: 60.99,
            stock: 50,
            id_category: cat.id_category,
            id_series: serie.id_series
        });
        await product8.addColors([rojo, azul]);
        await product8.addStyles([abstracto, moderno]);
        await product8.addThemes([oscuro]);
        await product8.addKeywords([digitalArt]);

        const product9 = await Products.create({
            title: "Portada Surrealista",
            description: "Una portada surrealista que desafía la realidad.",
            price: 70.99,
            stock: 60,
            id_category: cat.id_category,
            id_series: serie.id_series
        });
        await product9.addColors([verde, amarillo]);
        await product9.addStyles([abstracto, moderno]);
        await product9.addThemes([neutro]);
        await product9.addKeywords([surrealista]);

        const product10 = await Products.create({
            title: "Portada Geométrica",
            description: "Portada con un diseño geométrico y minimalista.",
            price: 80.99,
            stock: 75,
            id_category: cat.id_category,
            id_series: serie.id_series
        });
        await product10.addColors([morado]);
        await product10.addStyles([minimalista]);
        await product10.addThemes([suave]);
        await product10.addKeywords([naturaleza]);

        // Agregar imágenes de productos
        await ProductImages.bulkCreate([
            { id_product: product1.id_product, image_url: "https://miweb.com/img1.jpg" },
            { id_product: product2.id_product, image_url: "https://miweb.com/img2.jpg" },
            { id_product: product3.id_product, image_url: "https://miweb.com/img3.jpg" },
            { id_product: product4.id_product, image_url: "https://miweb.com/img4.jpg" },
            { id_product: product5.id_product, image_url: "https://miweb.com/img5.jpg" },
            { id_product: product6.id_product, image_url: "https://miweb.com/img6.jpg" },
            { id_product: product7.id_product, image_url: "https://miweb.com/img7.jpg" },
            { id_product: product8.id_product, image_url: "https://miweb.com/img8.jpg" },
            { id_product: product9.id_product, image_url: "https://miweb.com/img9.jpg" },
            { id_product: product10.id_product, image_url: "https://miweb.com/img10.jpg" }
        ]);

        console.log("Datos de prueba cargados con éxito.");

    } catch (error) {
        console.error("Error al cargar los datos:", error.message);
    } finally {
        await sequelize.close();
    }
};

seed();
