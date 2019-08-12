const { agreement, patternAgreement, decompose, triples } = require('./');

describe('ordinal-rating-agreement', () => {
    it('scores complete agreement', () => {
        expect(agreement([10, 0, 0, 0, 0])).toEqual(1);
        expect(agreement([0, 10, 0, 0, 0])).toEqual(1);
        expect(agreement([0, 0, 10, 0, 0])).toEqual(1);
        expect(agreement([0, 0, 0, 10, 0])).toEqual(1);
        expect(agreement([0, 0, 0, 0, 10])).toEqual(1);
    });

    it('scores a uniform distribution', () => {
        const data = [10, 10, 10, 10, 10];
        expect(agreement(data)).toEqual(0);
    });

    it('scores complete disagreement distribution', () => {
        const data = [10, 0, 0, 0, 10];
        expect(agreement(data)).toEqual(-1);
    });

    it('scores a semi-uniform distribution', () => {
        expect(patternAgreement([0, 0, 0, 0, 1, 1, 1])).toBeCloseTo(0.667, 3);
        expect(patternAgreement([0, 0, 0, 1, 1, 1, 0])).toBeCloseTo(0.667, 3);
        expect(patternAgreement([0, 0, 1, 1, 1, 0, 0])).toBeCloseTo(0.667, 3);
        expect(patternAgreement([0, 1, 1, 1, 0, 0, 0])).toBeCloseTo(0.667, 3);
        expect(patternAgreement([1, 1, 1, 0, 0, 0, 0])).toBeCloseTo(0.667, 3);
    });

    it('counts triples', () => {
        expect(triples([1, 1, 0, 0, 0, 0, 0])).toEqual({ tu: 5, tdu: 0 });
        expect(triples([1, 0, 1, 0, 0, 0, 0])).toEqual({ tu: 4, tdu: 1 });
        expect(triples([1, 0, 0, 1, 0, 0, 0])).toEqual({ tu: 3, tdu: 2 });
        expect(triples([1, 0, 0, 0, 1, 0, 0])).toEqual({ tu: 2, tdu: 3 });
        expect(triples([1, 0, 0, 0, 0, 1, 0])).toEqual({ tu: 1, tdu: 4 });
        expect(triples([1, 0, 0, 0, 0, 0, 1])).toEqual({ tu: 0, tdu: 5 });
    });

    it('scores multi-modal distributions', () => {
        expect(patternAgreement([1, 1, 0, 0, 0, 0, 0])).toBeCloseTo(0.83, 2);
        expect(patternAgreement([1, 0, 1, 0, 0, 0, 0])).toBeCloseTo(0.47, 2);
        expect(patternAgreement([1, 0, 0, 1, 0, 0, 0])).toBeCloseTo(0.1, 2);
        expect(patternAgreement([1, 0, 0, 0, 1, 0, 0])).toBeCloseTo(-0.26, 1);
        expect(patternAgreement([1, 0, 0, 0, 0, 1, 0])).toBeCloseTo(-0.63, 2);
        expect(patternAgreement([1, 0, 0, 0, 0, 0, 1])).toEqual(-1);
    });

    it('calculates agreement', () => {
        expect(agreement([30, 40, 210, 130, 530, 50, 10])).toBeCloseTo(0.61, 2);
    });

    it('decomposes into layers', () => {
        const result = decompose([30, 40, 210, 130, 530, 50, 10]);

        expect(result).toEqual([
            {
                layer: [10, 10, 10, 10, 10, 10, 10],
                pattern: [1, 1, 1, 1, 1, 1, 1],
                weight: 0.07,
            },
            {
                layer: [20, 20, 20, 20, 20, 20, 0],
                pattern: [1, 1, 1, 1, 1, 1, 0],
                weight: 0.12,
            },
            {
                layer: [0, 10, 10, 10, 10, 10, 0],
                pattern: [0, 1, 1, 1, 1, 1, 0],
                weight: 0.05,
            },
            {
                layer: [0, 0, 10, 10, 10, 10, 0],
                pattern: [0, 0, 1, 1, 1, 1, 0],
                weight: 0.04,
            },
            {
                layer: [0, 0, 80, 80, 80, 0, 0],
                pattern: [0, 0, 1, 1, 1, 0, 0],
                weight: 0.24,
            },
            {
                layer: [0, 0, 80, 0, 80, 0, 0],
                pattern: [0, 0, 1, 0, 1, 0, 0],
                weight: 0.16,
            },
            {
                layer: [0, 0, 0, 0, 320, 0, 0],
                pattern: [0, 0, 0, 0, 1, 0, 0],
                weight: 0.32,
            },
        ]);
    });
});
