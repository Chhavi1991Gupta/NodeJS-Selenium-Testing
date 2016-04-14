var By = require('selenium-webdriver').By,
    until = require('selenium-webdriver').until,
    firefox = require('selenium-webdriver/firefox'),
    test = require('selenium-webdriver/testing');

test.describe('Google Search', function() {
  var driver;

  test.before(function() {
    driver = new firefox.Driver();
  });

  test.after(function() {
    driver.quit();
  });

  test.it('should append query to title', function() {
    driver.get('http://localhost:3000');
    driver.findElement(By.name('fname')).sendKeys('webdriver');
    driver.findElement(By.name('lname')).sendKeys('webdriver');
    driver.findElement(By.name('submit')).click();
    driver.wait(until.titleIs('fuck'), 1000);
  });
});