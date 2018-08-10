import { browser, by, element } from 'protractor';

export class DashaPage {
    navigateTo() {
        return browser.get('/');
    }

    getRootElement() {
        return element.all(by.css('app-root'));
    }
}
