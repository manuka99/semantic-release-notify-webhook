const fetch = require("node-fetch");
const semanticReleaseNotifyWebhook = require("../src/index");

jest.mock("node-fetch", () => jest.fn());
// todo - mock onSuccessFunction and onFailFunction

describe("semantic-release-notify-webhook", () => {
  const REPOSITORY_URL = "https://github.com/manuka99/test-repo";
  const NOTIFY_WEBHOOK_URL = "https://webhook.site/";

  const logger = {
    log: jest.fn(),
    error: jest.fn(),
  };
  const context = {
    nextRelease: {
      version: "1.0.0",
      notes: "Release notes for version 1.0.0",
    },
    logger,
    options: {
      repositoryUrl: REPOSITORY_URL,
    },
    env: {
      SEMANTIC_RELEASE_PACKAGE: "test-package",
      npm_package_name: "test-package-npm",
    },
  };
  const pluginConfig = { NOTIFY_WEBHOOK_URL };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("verifyConditions", () => {
    it("should throw an error if NOTIFY_WEBHOOK_URL is not provided", () => {
      expect(() =>
        semanticReleaseNotifyWebhook.verifyConditions({}, context)
      ).toThrow("Notify Webhook URL is missing.");
    });

    it("should not throw an error if NOTIFY_WEBHOOK_URL is provided", () => {
      expect(
        semanticReleaseNotifyWebhook.verifyConditions(pluginConfig, context)
      ).toBeUndefined();
    });
  });

  describe("success", () => {
    it("should send success message to webhook and log success", async () => {
      fetch.mockResolvedValue({ ok: true });
      await semanticReleaseNotifyWebhook.success(pluginConfig, context);
      expect(fetch).toHaveBeenCalledWith(
        NOTIFY_WEBHOOK_URL,
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
        })
      );
      expect(logger.log).toHaveBeenCalledWith(
        "Success message sent to webhook for release v1.0.0"
      );
    });

    it("should log an error if sending success message fails", async () => {
      fetch.mockRejectedValue(new Error("Webhook error"));
      await semanticReleaseNotifyWebhook.success(pluginConfig, context);
      expect(logger.error).toHaveBeenCalledWith(
        "Failed to send success notification to webhook:",
        expect.any(Error)
      );
    });
  });

  describe("fail", () => {
    it("should send failure message to webhook and log success", async () => {
      fetch.mockResolvedValue({ ok: true });
      await semanticReleaseNotifyWebhook.fail(pluginConfig, context);
      expect(fetch).toHaveBeenCalledWith(
        NOTIFY_WEBHOOK_URL,
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
        })
      );
      expect(logger.log).toHaveBeenCalledWith(
        "Failure message sent to webhook"
      );
    });

    it("should log an error if sending failure message fails", async () => {
      fetch.mockRejectedValue(new Error("Webhook error"));
      await semanticReleaseNotifyWebhook.fail(pluginConfig, context);
      expect(logger.error).toHaveBeenCalledWith(
        "Failed to send failure notification to webhook:",
        expect.any(Error)
      );
    });
  });
});
