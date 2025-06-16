# embalses_nestjs_demo

Session demo Lemoncode para api de embalses con Nestjs

## Configurar el proyecto

Crear un fichero .env en la raiz del proeycto con estos valores

```bash
PORT=3000
MONGO_URI=mongodb://localhost:27017/embalses
USE_MONGO=false
npm run start:dev
```

## Arrancar el proyecto

```bash
npm install
npm run start:dev
```

## Para importar en Insomnia

Usar el fichero embalses_insomnia.yaml para importar la coleccion y poder testear con Insomnia: [https://insomnia.rest/download](https://insomnia.rest/download)

## MongoDB

Si alguien quiere levantar el mongodb para hacer pruebas con un repository y conectarlo al modelo de embalse:

Para arrancar en segundo plano

```bash
docker-compose up -d
```

Para parar el servicio

```bash
docker-compose down
```

configurar el .env con este valor:

```bash
USE_MONGO=true
```

y arrancar!

Si necesitas conectarte a mongo para ver la BBDD, usar por ejemplo la app NoSQLBooster: [https://nosqlbooster.com/downloads](https://nosqlbooster.com/downloads)

Y usar esta cadena de conexion:

```bash
mongodb://localhost:27017
```

## Mas info

Para mas info sobre NestJs: [https://docs.nestjs.com](https://docs.nestjs.com)
