import expect from "expect";
import { uploadFile, GEOTOUR_UPLOAD_FILE } from "@js/actions/geotour";

describe("geotour actions tests", () => {


    it("uploadFile test", () => {
        const file = {};
        expect(uploadFile(
            file
        )).toEqual({
            type: GEOTOUR_UPLOAD_FILE,
            file
        });

    });
});
