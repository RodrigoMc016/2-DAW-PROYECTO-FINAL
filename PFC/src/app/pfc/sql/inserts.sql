

#INSERT INTO roles (role_name) VALUES ('Admin'), ('User');
#INSERT INTO categories(name) values('BURGERS'), ('COMPLEMENTOS'),('VEGANOS'),('PARA NIÑOS'),('BEBIDAS'),('POSTRES');
-- Para la categoría "BEBIDAS" 
INSERT INTO products(category_id, name, description, price_real, price_points, image_url) VALUES
    ((SELECT id FROM categories WHERE name = 'BEBIDAS'), 
    'Botella de agua Solán de Cabras',
    'Botella de medio litro de agua mineral de Solán de Cabras',
    1.5, 15, 'images/products/product1.jpeg'),
    
    ((SELECT id FROM categories WHERE name = 'BEBIDAS'), 
    'Nestea',
    'Refresco de té al limón de tamaño mediano',
    2.0, 20, 'images/products/product2.jpeg'),
    
	((SELECT id FROM categories WHERE name = 'BEBIDAS'), 
    'Sierra Nevada Pale Ale',
    'Cerveza americana que se caracteriza por su sabor fresco y equilibrado, con notas de cítricos y pino.',
    2.5, 25, 'images/products/product3.jpeg'),
	((SELECT id FROM categories WHERE name = 'BEBIDAS'), 
    'Coca-cola',
    'Refresco de cola tamaño mediano',
	 2.0, 20, 'images/products/product4.jpeg'),
    
	((SELECT id FROM categories WHERE name = 'BEBIDAS'), 
    'Dr Pepper',
    'Refresco parecido a la coca-cola tamaño mediano y muy famoso en EEUU',
     2.0, 20, 'images/products/product5.jpeg'),
     
     ((SELECT id FROM categories WHERE name = 'BEBIDAS'), 
    'Sprite',
    'Refresco gaseoso con notas a limón de tamaño mediano',
     2.0, 20, 'images/products/product6.jpeg');
    
    


-- Para la categoría "BURGERS"
INSERT INTO products (category_id, name, description, price_real, price_points, image_url) VALUES
    ((SELECT id FROM categories WHERE name = 'BURGERS'), 
     'Hamburguesa de Queso Brie y Cebolla Caramelizada', 
     'Una combinación cremosa y dulce con queso Brie, cebolla caramelizada y mermelada de higos en un suave pan brioche.', 
     8.00, 80, 'images/products/product7.jpeg'),
     
    ((SELECT id FROM categories WHERE name = 'BURGERS'), 
     'Hamburguesa de Jamón Serrano y Pimientos Asados', 
     'Exquisita mezcla de jamón serrano, pimientos asados y queso manchego en un pan de semillas tostado.', 
     9.00, 90, 'images/products/product8.jpeg'),
     
    ((SELECT id FROM categories WHERE name = 'BURGERS'), 
     'Hamburguesa de Champiñones y Trufa', 
     'Sabor intenso de champiñones al ajo y trufa negra, enriquecido con queso suizo en un pan rústico integral.', 
     9.50, 95, 'images/products/product9.jpeg'),
     
    ((SELECT id FROM categories WHERE name = 'BURGERS'), 
     'Hamburguesa Mediterránea con Queso de Cabra', 
     'Inspirada en el Mediterráneo, esta hamburguesa destaca por el sabor del queso de cabra y los tomates secos.', 
     8.50, 85, 'images/products/product10.jpeg'),
     
    ((SELECT id FROM categories WHERE name = 'BURGERS'), 
     'Hamburguesa BBQ con Bacon y Aros de Cebolla', 
     'Los sabores ahumados del cheddar y la salsa BBQ se combinan con bacon crujiente y aros de cebolla.', 
     7.0, 70, 'images/products/product11.jpeg'),

    ((SELECT id FROM categories WHERE name = 'BURGERS'), 
     'Hamburguesa de Aguacate y Chipotle', 
     'Aguacate fresco y salsa de chipotle cremosa en un pan brioche, ideal para quienes buscan un toque picante.', 
     8.00, 80, 'images/products/product12.jpeg'),

    ((SELECT id FROM categories WHERE name = 'BURGERS'), 
     'Hamburguesa de Pollo al Pesto', 
     'Ligera y fresca con pollo al pesto, espinacas y tomate en pan artesanal de avena.', 
     7.50, 75, 'images/products/product13.jpeg');
     
     
-- Para la categoría "COMPLEMENTOS"
INSERT INTO products (category_id, name, description, price_real, price_points, image_url) VALUES
    ((SELECT id FROM categories WHERE name = 'COMPLEMENTOS'), 
	'French fries',
    'Patatas fritas clásicas crujientes y doradas, acompañada de una salsa a elegir.',
    1.00, 10, 'images/products/product14.jpeg'),
    
     ((SELECT id FROM categories WHERE name = 'COMPLEMENTOS'), 
	   'Classic Batata',
		'Batata dulce troceada en finas tiras, acompañada de una salsa a elegir.',
        1.50, 15, 'images/products/product15.jpeg'),
        
	((SELECT id FROM categories WHERE name = 'COMPLEMENTOS'), 
    'NASHVILLE WINGS',
    'Alitas de pollo especiadas y fritas, con un moderado toque picante',
    2.5,25, 'images/products/product16.jpeg'),
    
     ((SELECT id FROM categories WHERE name = 'COMPLEMENTOS'), 
     'Californian Nuggets',
     'Crujientes nuggets de pollo con especias y salsa dulce carolina',
     2.5, 25, 'images/products/product17.jpeg');
        
    
     
     

-- Para la categoría "PARA NIÑOS"
INSERT INTO products (category_id, name, description, price_real, price_points, image_url) VALUES
    ((SELECT id FROM categories WHERE name = 'PARA NIÑOS'), 
     'Mini-Hamburguesa de Pollo y Queso', 
     'Ideal para los pequeños, con un sabor suave y delicioso que pueden disfrutar sin sabores fuertes.', 
     5.50, 55, 'images/products/product18.jpeg'),

    ((SELECT id FROM categories WHERE name = 'PARA NIÑOS'), 
     'Mini-Hamburguesa Clásica de Ternera con Pepinillos', 
     'Clásica y divertida, con ternera y queso americano en tamaño pequeño.', 
     5.50, 55, 'images/products/product19.jpeg');



-- Para la categoría "POSTRES"
INSERT INTO products (category_id, name, description, price_real, price_points, image_url) VALUES
    ((SELECT id FROM categories WHERE name = 'POSTRES'), 
     'Brownie de Chocolate con Helado', 
     'Un postre clásico, con brownie de chocolate caliente acompañado de una bola de helado de vainilla.', 
	4.50, 45, 'images/products/product20.jpeg'),

    ((SELECT id FROM categories WHERE name = 'POSTRES'), 
     'Cheesecake de Fresa', 
     'Suave y cremoso cheesecake con una capa de fresas frescas en su punto.', 
     4.50, 45, 'images/products/product21.jpeg'),

    ((SELECT id FROM categories WHERE name = 'POSTRES'), 
     'Tarta de Manzana con Crumble', 
     'Una tarta de manzana caliente con crumble de canela, ideal para los amantes de los postres caseros.', 
     5.00, 50, 'images/products/product22.jpeg');
     
     
     -- Para la categoría "VEGANOS"
INSERT INTO products (category_id, name, description, price_real, price_points, image_url) VALUES
    ((SELECT id FROM categories WHERE name = 'VEGANOS'), 
     'Hamburguesa Veggie de Garbanzos y Espinacas', 
     'Un estilo veggie refrescante con patty de garbanzos y espinacas, pepino y salsa de yogurt con menta.', 
     8.00, 80, 'images/products/product23.jpeg'),

    ((SELECT id FROM categories WHERE name = 'VEGANOS'), 
     'Hamburguesa Veggie de Quinoa y Kale', 
     'Nutritiva y sabrosa, hecha de quinoa y kale, aguacate y salsa de pimiento asado en pan integral con semillas.', 
     7.00, 70, 'images/products/product24.jpeg'),

    ((SELECT id FROM categories WHERE name = 'VEGANOS'), 
     'Hamburguesa de Berenjena a la Parrilla con Hummus', 
     'Inspirada en sabores mediterráneos, la berenjena y hummus le dan un toque único y refrescante.', 
     7.50, 75, 'images/products/product25.jpeg');
