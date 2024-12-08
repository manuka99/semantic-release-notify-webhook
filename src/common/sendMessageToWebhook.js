const fetch = require('node-fetch');

module.exports = async (pluginConfig, message) => {
  const NOTIFY_WEBHOOK_URL =
    pluginConfig.NOTIFY_WEBHOOK_URL || process.env.NOTIFY_WEBHOOK_URL;

  const response = await fetch(NOTIFY_WEBHOOK_URL, {
    method: "POST",
    body: JSON.stringify(message),
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to send message to webhook: ${response.statusText}`
    );
  }
};
