import expect from 'expect';

import { geotourFileSelector, geotourEnabledSelector } from '@js/selectors/geotour';

describe("geotour selectors tests", () => {

    it("geotourFileSelector test", () => {

        expect(geotourFileSelector({})).toEqual(undefined);

    });
    it("geotourEnabledSelector test", () => {

        expect(geotourEnabledSelector({})).toEqual(undefined);

    });
});
