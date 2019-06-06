# Code challenge for Nordsense

Authored 2019-06-06 by [Deividas Jackus](https://github.com/deividasjackus).

## Installation

```bash
npm i
```

## Usage

Once run, the server will start on port 3000 unless specified otherwise using the environment variable `PORT`.

### Running in development mode

Auto-reload is enabled by default using [Nodemon](https://nodemon.io/).

```bash
npm run dev
```

### Running in development with debugging enabled

Debugging is achieved using [debug](https://www.npmjs.com/package/debug).

```bash
DEBUG=app npm run dev
```

### Running in production

```bash
NODE_ENV=production npm start
```

## API

The API exposed is a single endpoint.

Unless specified otherwise, all handlers return a HTTP status code of 2xx upon success and a 4xx error upon user input error.

### `GET /api/nearestIntersection?latitude=<...>&longitude=<...>`

**Finds the intersection closest to the point provided along with angle & cardinal direction of the point in relation to the intersection.**

Intersection data is loaded from `intersections.csv` (extracted from sheet originally provided as part of the challenge).

Response format:
```js
 {
   id, // GISObjectID of the intersection
   name, // Name of the intersection
   distance, // Distance between the provided point & the intersection
   angle, // Angle of the provided point in relation to the intersection
   direction, // Cardinal direction of the provided point in relation to the intersection
 }
```
