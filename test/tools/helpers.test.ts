import {describe, expect, test} from '@jest/globals';
import {convertDateIsoByZone, generateKeyFormDate, getMondayDateCurrent} from '../../src/tools/helpers'

describe('Test helpers', () => {
    test('Generate format Date', () => {
        const date = new Date('2023/02/05');
        const res = generateKeyFormDate(date);
        expect(res).toBe('2023/02/05');
    })

    test('Get Monday of Date in week', () => {
        ['2023/12/05', '2023/12/06', '2023/12/07', '2023/12/08', '2023/12/09', '2023/12/10'].forEach((date) => {
            const res = getMondayDateCurrent(new Date(date));
            expect(res.toUTCString()).toBe('Mon, 04 Dec 2023 05:00:00 GMT');
        })
        const date = new Date('2023/12/11');
        const res = getMondayDateCurrent(date);
        expect(res.toUTCString()).toBe('Mon, 11 Dec 2023 05:00:00 GMT');
    })

    test('Convert Date iso by zone', () => {
        // const date = new Date('2023/12/07');
        const res = convertDateIsoByZone('2023-12-05T17:01:33.034Z', 1);
        console.log(res);
        expect(res.toUTCString()).toBe('Tue, 05 Dec 2023 18:01:33 GMT');
    })
})