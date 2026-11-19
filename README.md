# econest-living

Run the local prototype with Node.js 22 or 24:

```sh
npm ci
npm test
npm start
```

Open `http://localhost:3000`. The server serves the existing `index.html`, accepts JSON at `POST /api/cart`, and creates its ignored `logs` directory automatically. Set `PORT` to choose another port.

The storefront remains a prototype: the linked secondary pages, stylesheet, images, and external product catalog are not included. Checkout, reviews, and AI responses are not production integrations. The tests cover the local HTTP server; they do not certify those unfinished features.
