/// /////////////////////////////////////////////////////////////
// For authoring Nightwatch tests, see
// https://nightwatchjs.org/guide
//
// For more information on working with page objects see:
//   https://nightwatchjs.org/guide/working-with-page-objects/
/// /////////////////////////////////////////////////////////////

module.exports = {
  beforeEach: (browser) => browser.init(),

  'open a file from GitHub': (browser) => {
    const homepage = browser.page.homepage();
    homepage.waitForElementVisible('@appContainer');

    const { contentWrapper } = homepage.section.app.section;
    contentWrapper.waitForElementPresent('@owner');
    contentWrapper.waitForElementVisible('@owner');
    contentWrapper.setValue('@owner', 'ahus1');
    contentWrapper.setValue('@repo', 'asciidoc-editor');
    contentWrapper.setValue('@branch', 'master');
    contentWrapper.setValue('@path', 'README.adoc');
    contentWrapper.waitForElementPresent('@load');
    contentWrapper.waitForElementVisible('@load');
    contentWrapper.click('@load');

    contentWrapper.expect.element('@editor').to.be.visible;
    contentWrapper.expect.element('@editor').text.to.contain('= AsciiDoc Web Editor');
    contentWrapper.expect.element('@adoc').text.to.contain('This is a web-browser only proof-of concent for an editor.');

    browser.end();
  },
};
