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
        
        let imSP = await driver.findElement(By.xpath("/html/body/div[3]/div/div/div/div[1]/div[1]/div"));
        await driver.actions().move({origin: imSP}).perform();
        let addButton = await driver.wait(until.elementLocated(By.className('add-btn')), 10000);
        await addButton.click();

        let gioHang = await driver.findElement(By.xpath('//*[@id="cart-container"]'));
        await gioHang.click();


        let thanhToanNgay = await driver.findElement(By.xpath('/html/body/main/div[2]/div/div[5]/a/button'));
        await thanhToanNgay.click();

        let tienHanhDatHang = await driver.findElement(By.xpath('/html/body/div[3]/button'));
        await tienHanhDatHang.click();


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