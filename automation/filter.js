const { Builder, By, Key, until } = require('selenium-webdriver');

async function filter() {
    let driver;
    try {
        // Khởi tạo trình duyệt Chrome
        driver = await new Builder().forBrowser('chrome').build();

        // Truy cập URL localhost:8000/danhmuc
        await driver.get('http://localhost:8000/danhmuc');

        // Click vào thể loại "Âm nhạc"
        let amNhacCheckbox = await driver.findElement(By.xpath("/html/body/main/div[1]/div/div[2]/ul/li[5]/label/a"));
        await amNhacCheckbox.click();

        // Click vào khoảng giá "Nhỏ hơn 50.000đ"
        let nhoHon50kCheckbox = await driver.findElement(By.xpath("/html/body/main/div[1]/div/ul/li[1]/label/a"));
        await nhoHon50kCheckbox.click();

        // Click vào nút "Lọc"
        let locButton = await driver.findElement(By.xpath("/html/body/main/div[1]/div/ul/form/button[1]"));
        await locButton.click();

        // Chờ cho trang tải hoàn tất
        await driver.wait(until.stalenessOf(locButton));

        // In ra URL hiện tại để kiểm tra xem bộ lọc đã được áp dụng thành công chưa
        console.log("Current URL:", await driver.getCurrentUrl());
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
filter();
