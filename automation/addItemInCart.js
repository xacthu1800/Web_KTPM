const { By, Builder, until, WebElement, Actions} = require('selenium-webdriver');

async function addItemInCart() {
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
        await driver.wait(until.elementIsVisible(loginBox), 10000);

        // Điền vào ô input cho tài khoản và mật khẩu
        let usernameField = await driver.findElement(By.id('uname'));
        let passwordField = await driver.findElement(By.id('pass'));
        await usernameField.sendKeys('11');
        await passwordField.sendKeys('11');

        // Click vào nút đăng nhập
        let loginButton = await driver.findElement(By.id('login-button'));
        await loginButton.click();


        let imSP = await driver.findElement(By.xpath("/html/body/div[3]/div/div/div/div[1]/div[1]/div"));
        
        // Thực hiện hover vào phần tử imSP
        await driver.actions().move({origin: imSP}).perform();

         // Đợi cho button xuất hiện
         let addButton = await driver.wait(until.elementLocated(By.className('add-btn')), 10000);
        
         // Click vào nút
         await addButton.click();
         
         // Chờ một khoảng thời gian trước khi đóng trình duyệt
         await driver.sleep(3000);
    } catch (error) {
        console.error(`Error: ${error}`);
    } finally {
        // Đóng trình duyệt
        if (driver) {
            await driver.quit();
        }
    }
}

addItemInCart();
