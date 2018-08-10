import { DashaPage } from './app.po';
import { browser } from 'protractor';

describe('dasha App', () => {
    let page: DashaPage;
    browser.ignoreSynchronization = true;

    beforeEach(() => {
        page = new DashaPage();
    });

    it('should perform a basic test', () => {
        page.navigateTo();
        let root = page.getRootElement();
        expect(root.count()).toEqual(1);
    });

});
