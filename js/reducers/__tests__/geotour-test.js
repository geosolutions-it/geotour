import expect from 'expect';
import { uploadFile } from '@js/actions/geotour';
import geotour from '@js/reducers/geotour';


describe("geotour actions tests", () => {


    it("uploadFile test", () => {
        const file = {
            type: "FeatureCollection"
        };
        const initialState = {};
        let state = geotour(initialState, uploadFile(file));
        expect(state).toBeTruthy();

        expect(state).toEqual({
            file
        });

    });

    it.skip("TODO SHOW_REVERSE_GEOCODE test", () => {
        // complete this test autonomously
        const file = {
            type: "FeatureCollection"
        };
        const initialState = {};
        let state = geotour(initialState, uploadFile(file));
        expect(state).toBeTruthy();

        expect(state).toEqual({
            file
        });

    });
});
