import CDP from "devtools-protocol";
import { expect } from "chai";

describe("setUserAgentOverride", () => {
  it("Network.setUserAgentOverride should work with then", (done: Mocha.Done) => {
    const overrideRequest: CDP.Network.SetUserAgentOverrideRequest = {
      userAgent: "test user agent done"
    };
    browser.cdp("Network", "setUserAgentOverride", overrideRequest).then(() =>
      browser.cdp("Browser", "getVersion").then((version: CDP.Browser.GetVersionResponse) => {
        // Browser.getVersion() works if not in an async block
        expect(version.userAgent, "version.userAgent").to.equal(overrideRequest.userAgent);
      }).catch((error) => done(error))
    ).catch((error) => done(error));
  });

  it("Network.setUserAgentOverride should work with async", async () => {
    const overrideRequest: CDP.Network.SetUserAgentOverrideRequest = {
      userAgent: "test user agent async"
    };
    await browser.cdp("Network", "setUserAgentOverride", overrideRequest);
    await browser.url("http://whatsmyuseragent.org/");
    const text = await browser.$(".intro-text").getText();
    // The user agent does get updated in an async block
    expect(text, "text").to.equal(overrideRequest.userAgent);
    const version: CDP.Browser.GetVersionResponse = await browser.cdp("Browser", "getVersion");
    // but Browser.getVersion() does not work if in an async block
    expect(version.userAgent, "version.userAgent").to.equal(overrideRequest.userAgent);
  });

  it("Emulation.setUserAgentOverride should work with then", (done: Mocha.Done) => {
    const overrideRequest: CDP.Emulation.SetUserAgentOverrideRequest = {
      userAgent: "test user agent done"
    };
    browser.cdp("Emulation", "setUserAgentOverride", overrideRequest).then(() =>
      browser.cdp("Browser", "getVersion").then((version: CDP.Browser.GetVersionResponse) => {
        // Browser.getVersion() works if not in an async block
        expect(version.userAgent, "version.userAgent").to.equal(overrideRequest.userAgent);
      }).catch((error) => done(error))
    ).catch((error) => done(error));
  });

  it("Emulation.setUserAgentOverride should work with async", async () => {
    const overrideRequest: CDP.Emulation.SetUserAgentOverrideRequest = {
      userAgent: "test user agent async"
    };
    await browser.cdp("Emulation", "setUserAgentOverride", overrideRequest);
    await browser.url("http://whatsmyuseragent.org/");
    const text = await browser.$(".intro-text").getText();
    // The user agent does get updated in an async block
    expect(text, "text").to.equal(overrideRequest.userAgent);
    const version: CDP.Browser.GetVersionResponse = await browser.cdp("Browser", "getVersion");
    // but Browser.getVersion() does not work if in an async block
    expect(version.userAgent, "version.userAgent").to.equal(overrideRequest.userAgent);
  });

  it("Network.setUserAgentOverride should work with mixed top async", async () => {
    const overrideRequest: CDP.Network.SetUserAgentOverrideRequest = {
      userAgent: "test user agent mixed top async"
    };
    await browser.cdp("Network", "setUserAgentOverride", overrideRequest)
    .then(() => browser.cdp("Browser", "getVersion").then((version: CDP.Browser.GetVersionResponse) => {
        // The top level is async so this fails
        expect(version.userAgent, "version.userAgent").to.equal(overrideRequest.userAgent);
      })
    );
  });

  it("Network.setUserAgentOverride should work with mixed async", (done: Mocha.Done) => {
    const overrideRequest: CDP.Network.SetUserAgentOverrideRequest = {
      userAgent: "test user agent mixed async"
    };
    browser.cdp("Network", "setUserAgentOverride", overrideRequest).then(async () => {
      const version: CDP.Browser.GetVersionResponse = await browser.cdp("Browser", "getVersion");
      // The top level is not async so this works
      expect(version.userAgent, "version.userAgent").to.equal(overrideRequest.userAgent);
      done();
    }).catch((error) => done(error));
  });

  const asyncWrapper = async () => {
    const overrideRequest: CDP.Emulation.SetUserAgentOverrideRequest = {
      userAgent: "test user agent async wrapper"
    };
    await browser.cdp("Emulation", "setUserAgentOverride", overrideRequest);
    const version: CDP.Browser.GetVersionResponse = await browser.cdp("Browser", "getVersion");
    expect(version, "version").to.not.equal(undefined);
    expect(version.userAgent, "version.userAgent").to.equal(overrideRequest.userAgent);
  };

  it("Network.setUserAgentOverride should work with async wrapper", (done: Mocha.Done) => {
    // The top level is not async so this works even though everything downstream is async
    asyncWrapper().then(() => done()).catch((error) => done(error));
  });
});