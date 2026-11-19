const assert = require('node:assert/strict');
const { after, before, test } = require('node:test');
const app = require('./server');

let server;
let base;
before(async () => {
    server = app.listen(0, '127.0.0.1');
    await new Promise(resolve => server.once('listening', resolve));
    base = `http://127.0.0.1:${server.address().port}`;
});
after(() => new Promise(resolve => server.close(resolve)));

test('a fresh checkout serves the existing homepage and creates its log directory', async () => {
    const response = await fetch(base);
    assert.equal(response.status, 200);
    assert.match(await response.text(), /EcoNest/i);
});

test('the cart endpoint accepts JSON', async () => {
    const response = await fetch(`${base}/api/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item: 'fixture item' })
    });
    assert.equal(response.status, 200);
    assert.equal((await response.json()).item, 'fixture item');
});

test('server source is not exposed as a static asset', async () => {
    assert.equal((await fetch(`${base}/server.js`)).status, 404);
});
