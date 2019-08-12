const sum = data => data.reduce((a, e) => a + e, 0);

const round = (n, precision = 1) => {
    const m = Math.pow(10, precision);
    return Math.round(n * m) / m;
};

function decompose(data) {
    const k = data.length;
    const total = sum(data);
    const result = [];

    let freq = Array.from(data);

    for (let index = 0; index < k; index++) {
        const lowestNonZero = freq.filter(e => e > 0).sort((a, b) => a - b)[0];
        const layer = [];
        const pattern = [];
        let nonZeroCount = 0;

        for (let idx = 0; idx < freq.length; idx++) {
            const n = freq[idx];

            if (n >= lowestNonZero) {
                layer.push(lowestNonZero);
                pattern.push(1);
                nonZeroCount++;
            } else {
                layer.push(0);
                pattern.push(0);
            }
        }

        if (nonZeroCount) {
            const weight = (lowestNonZero * nonZeroCount) / total;
            result.push({ layer, pattern, weight });
            freq = layer.map((e, i) => freq[i] - e);
        }
    }

    return result;
}

function triples(data) {
    let tu = 0;
    let tdu = 0;

    for (let i = 0; i < data.length - 2; i++) {
        for (let j = i + 1; j < data.length - 1; j++) {
            for (let k = j + 1; k < data.length; k++) {
                if (data[i] === 1 && data[j] === 0 && data[k] === 1) {
                    // 101 = bimodal (TDU)
                    tdu++;
                } else if (data[i] === 1 && data[j] === 1 && data[k] === 0) {
                    // 110 = unimodal (TU)
                    tu++;
                } else if (data[i] === 0 && data[j] === 1 && data[k] === 1) {
                    // 110 = unimodal (TU)
                    tu++;
                }
            }
        }
    }

    return { tu, tdu };
}

function patternAgreement(pattern) {
    const s = sum(pattern); // non-empty
    const k = pattern.length; // total number -of categories

    let u = 1;

    if (s !== k) {
        const { tu, tdu } = triples(pattern);

        if (tu > 0 || tdu > 0) {
            u = ((k - 2) * tu - (k - 1) * tdu) / ((k - 2) * (tu + tdu));
        }
    }

    return u * (1 - (s - 1) / (k - 1));
}

function agreement(data) {
    return round(
        sum(
            decompose(data).map(
                layer => layer.weight * patternAgreement(layer.pattern)
            )
        ),
        5
    );
}

module.exports = {
    agreement,
    patternAgreement,
    decompose,
    triples,
};
