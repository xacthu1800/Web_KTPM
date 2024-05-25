const { dataUser, dataProduct, delivery, record } = require('./src/config.js');

async function multiple(times) {
    let totalTime = 0;

    for (let i = 0; i < times; i++) {
        const start = performance.now();
        await dataProduct.find().sort({ _id: -1 }).limit(12);
        const end = performance.now();
        totalTime += (end - start);
    }

    const averageTime = totalTime / times;
    console.log(`Average time for ${times} runs: ${averageTime.toFixed(2)} ms`);
    return averageTime;
}

async function multiple2(times) {
    let totalTime = 0;

    for (let i = 0; i < times; i++) {
        const start = performance.now();
        await dataProduct.find()
        const end = performance.now();
        totalTime += (end - start);
    }

    const averageTime = totalTime / times;
    console.log(`Average time for ${times} runs: ${averageTime.toFixed(2)} ms`);
    return averageTime;
}

multiple2(1);
multiple2(1);

