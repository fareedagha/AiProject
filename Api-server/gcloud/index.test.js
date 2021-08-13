const rewire = require("rewire")
const index = rewire("./index")
const speecgController = index.__get__("speecgController")
// @ponicode
describe("speecgController", () => {
    test("0", () => {
        let callFunction = () => {
            speecgController("Www.GooGle.com", 200, -5.48)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            speecgController("Www.GooGle.com", 200, 1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            speecgController("Www.GooGle.com", 500, -100)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            speecgController("Www.GooGle.com", 404, 1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            speecgController("Www.GooGle.com", 400, -5.48)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            speecgController("", NaN, NaN)
        }
    
        expect(callFunction).not.toThrow()
    })
})
