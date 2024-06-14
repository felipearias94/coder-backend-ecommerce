# Coder-Ecommerce

## Descripción
Coder-Ecommerce es un proyecto de comercio electrónico sencillo, construido con ExpressJS, Mongoose y MongoDB. Permite realizar operaciones CRUD sobre productos y carritos de compras.

## Requisitos
- Node.js
- MongoDB

## Instalación y configuración
1. Clonar el repositorio:
    ```bash
    git clone https://github.com/usuario/coder-ecommerce.git
    cd coder-ecommerce
    ```

2. Instalar dependencias:
    ```bash
    npm install
    ```

3. Configurar las variables de entorno (si es necesario), creando un archivo `.env` con el contenido adecuado para la conexión a MongoDB, por ejemplo:
    ```
    MONGODB_URI=mongodb://localhost:27017/coder-ecommerce
    ```

## Dependencias principales
- [Express](https://expressjs.com/)
- [Mongoose](https://mongoosejs.com/)
- [mongoose-paginate-v2](https://www.npmjs.com/package/mongoose-paginate-v2)

## Scripts de NPM
- Iniciar el servidor en modo desarrollo:
    ```bash
    npm run dev
    ```

## Estructura del proyecto
El proyecto sigue una estructura básica de un servidor Express, con rutas y controladores para manejar las operaciones CRUD de productos y carritos.

## Endpoints

### Productos

- `GET /api/products` - Retorna todos los productos.
- `GET /api/products/:pid` - Retorna el producto por ID pasado por parámetro.
- `POST /api/products` - Crea y retorna un nuevo producto.
- `PUT /api/products/:pid` - Actualiza y retorna el producto por ID pasado por parámetro con los nuevos valores pasados por el cuerpo de la solicitud.
- `DELETE /api/products/:pid` - Actualiza la propiedad 'state' y retorna el producto con ID pasado por parámetro.

### Carritos

- `GET /api/carts/:cid` - Retorna un carrito con sus productos.
- `POST /api/carts` - Crea y retorna un carrito vacío.
- `POST /api/carts/:cid/products/:pid` - Agrega un producto con ID pasado por parámetros y retorna el carrito actualizado.
- `PUT /api/carts/:cid/products/:pid` - Actualiza el carrito con ID pasado por parámetro y actualiza según la cantidad pasada por el cuerpo de la solicitud (`{quantity:10}`) el producto con ID pasado por parámetro.
- `DELETE /api/carts/:cid/products/:pid` - Elimina el producto con ID pasado por parámetro del carrito con ID pasado por parámetro.
- `DELETE /api/carts/:cid` - Elimina todos los productos del carrito con ID pasado por parámetro.

## Autor
Felipe Arias
