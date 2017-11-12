import wd, {
    TouchAction
} from 'wd';
import {
    expect
} from 'chai'
const config = {
    platformName: "iOS",
    platformVersion: "11.1",
    deviceName: "iPhone 6",
    app: "/Users/fernandolafuentesaiz/Desktop/htdocs/ListDemo/ios/build/Build/Products/Debug-iphonesimulator/ListDemo.app"
};

const port = 4723;
const driver = wd.promiseChainRemote('localhost', port);
jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

beforeAll(async() => {
    await driver.init(config);
    await driver.sleep(2000); // wait for app to load
});
beforeEach(async() => {
    await driver.setImplicitWaitTimeout(20000);
});
describe('List search interactions', () => {
    it('should load searchbar', async() => {
        expect(await driver.hasElementByName('searchBar')).to.be.true;
    });
    it('should fill searchBar with name', async() => {
        await tr('Matt', 'nameText');
    });
    it('should fill searchBar with email', async() => {
        await tr('mattmcc@glofox.net', 'emailText');
    });
    it('should fill searchBar with full name', async() => {
        await tr('Matt Dyer', 'nameText');
    });
    it('should fill searchBar with surname', async() => {
        await tr('Dyer', 'nameText');
    });

});

describe('Default List interactions', () => {
    it('should load first 10 elements', async() => {
        // Change to wait for element
        // await driver.sleep(4000);

        const elements = await driver.elementsByName('nameText');
        expect(elements.length).to.equal(10);
    });
    it('should load 20 elements after scrolling', async() => {
        const action = new TouchAction(driver);
        const scrollDown = action.press({
                y: 300
            })
            .moveTo({
                y: -1000
            }) // drag finger up
            .release(); // release finger

        await driver.performTouchAction(scrollDown);
        await driver.performTouchAction(scrollDown);
        const elements = await driver.elementsByName('nameText');
        expect(elements.length).to.equal(20);
    });
});

async function tr(param, id) {
    const TEXT = param + '\n\n';
    await driver.elementByName('searchBar')
        .type(TEXT);

    // Change to wait for element
    // await driver.sleep(4000);

    const ele = await driver.elementByName(id).text();
    expect(ele).to.have.string(param);
    //Clear
    await driver.elementByName('clearButton').click();
}