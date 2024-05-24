const {By, Builder, until} = require('selenium-webdriver');
const assert = require('assert');

(async function homeTest() {
    let driver;
    try {
        // Khởi tạo trình duyệt Chrome
        driver = await new Builder().forBrowser('chrome').build();
        
        // Truy cập URL
        await driver.get('http://localhost:8000/');
        
        // Đợi đến khi phần tử với id 'user-link' xuất hiện và sẵn sàng để tương tác
        let userLink = await driver.wait(until.elementLocated(By.id('user-link')), 10000);
        await driver.wait(until.elementIsVisible(userLink), 10000);

        // Click vào phần tử với id 'user-link'
        await userLink.click();

        // Đợi đến khi phần tử với class 'login-box' xuất hiện và sẵn sàng để tương tác
        let loginBox = await driver.wait(until.elementLocated(By.className('login-box')), 10000);

        // Đảm bảo phần tử loginBox hiển thị
        await driver.wait(until.elementIsVisible(loginBox), 10000);

        // Điền vào ô input cho tài khoản
        let usernameField = await driver.wait(until.elementLocated(By.id('uname')), 10000);
        let passwordField = await driver.wait(until.elementLocated(By.id('pass')), 10000);

        await driver.wait(until.elementIsVisible(usernameField), 10000);
        await driver.wait(until.elementIsVisible(passwordField), 10000);

        await usernameField.sendKeys('11');
        await passwordField.sendKeys('11');

        // Click vào nút đăng nhập
        let loginButton = await driver.wait(until.elementLocated(By.id('login-button')), 10000);
        await driver.wait(until.elementIsVisible(loginButton), 10000);
        await loginButton.click();
        
        userLink = await driver.wait(until.elementLocated(By.id('user-link')), 10000);
        await driver.wait(until.elementIsVisible(userLink), 10000);
        await userLink.click();

        await new Promise(resolve => setTimeout(resolve, 2000));
        
    } catch (error) {
        console.error(`Error: ${error}`);
    } finally {
        // Đóng trình duyệt
        if (driver) {
            await driver.quit();
        }
    }
})();
