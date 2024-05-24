const { Builder, By, Key, until } = require('selenium-webdriver');

async function timkiem() {
    let driver;
    try {
        // Khởi tạo trình duyệt Chrome
        driver = await new Builder().forBrowser('chrome').build();

        // Truy cập URL localhost:8000/danhmuc
        await driver.get('http://localhost:8000/');

        // Click vào thể loại "Âm nhạc"
        let searchBox = await driver.findElement(By.xpath("/html/body/header/nav/ul/li[3]"));
        await searchBox.click();

        let box = await driver.wait(until.elementLocated(By.id('search-input')), 10000);
        await box.sendKeys('BOCCHI');

        let searchBtn = await driver.findElement(By.xpath('//*[@id="search-button"]'));
        await searchBtn.click();



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

// Gọi hàm để thực hiện bộ lọc
timkiem();
