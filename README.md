# embalses_nestjs_demo

Session demo Lemoncode para api de embalses con Nestjs

## Para iniciar el proyecto

```bash
cd embalses_nestjs
npm run start:dev
```

Para mas info: [https://docs.nestjs.com](https://docs.nestjs.com)

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
