import CDP from "devtools-protocol";
import { expect } from "chai";

describe("setUserAgentOverride", () => {
  it("Network.setUserAgentOverride should work with then", (done: Mocha.Done) => {
    const overrideRequest: CDP.Network.SetUserAgentOverrideRequest = {
      userAgent: "test user agent done"
    };
    browser.cdp("Network", "setUserAgentOverride", overrideRequest).then(() => {
      browser.cdp("Browser", "getVersion").then((version: CDP.Browser.GetVersionResponse) => {
        expect(version, "version").to.not.equal(undefined);
        expect(version.userAgent, "version.userAgent").to.equal(overrideRequest.userAgent);
      }).catch((error) => done(error));
    }).catch((error) => done(error));
  });

  it("Network.setUserAgentOverride should work with async", async () => {
    const overrideRequest: CDP.Network.SetUserAgentOverrideRequest = {
      userAgent: "test user agent async"
    };
    await browser.cdp("Network", "setUserAgentOverride", overrideRequest);
    const version: CDP.Browser.GetVersionResponse = await browser.cdp("Browser", "getVersion");
    expect(version, "version").to.not.equal(undefined);
    expect(version.userAgent, "version.userAgent").to.equal(overrideRequest.userAgent);
  });

  it("Emulation.setUserAgentOverride should work with then", (done: Mocha.Done) => {
    const overrideRequest: CDP.Emulation.SetUserAgentOverrideRequest = {
      userAgent: "test user agent done"
    };
    browser.cdp("Emulation", "setUserAgentOverride", overrideRequest).then(() => {
      browser.cdp("Browser", "getVersion").then((version: CDP.Browser.GetVersionResponse) => {
        expect(version, "version").to.not.equal(undefined);
        expect(version.userAgent, "version.userAgent").to.equal(overrideRequest.userAgent);
      }).catch((error) => done(error));
    }).catch((error) => done(error));
  });

  it("Emulation.setUserAgentOverride should work with async", async () => {
    const overrideRequest: CDP.Emulation.SetUserAgentOverrideRequest = {
      userAgent: "test user agent async"
    };
    await browser.cdp("Emulation", "setUserAgentOverride", overrideRequest);
    const version: CDP.Browser.GetVersionResponse = await browser.cdp("Browser", "getVersion");
    expect(version, "version").to.not.equal(undefined);
    expect(version.userAgent, "version.userAgent").to.equal(overrideRequest.userAgent);
  });
});