module.exports = (pluginConfig, context) => {
  if (!pluginConfig.NOTIFY_WEBHOOK_URL && !process.env.NOTIFY_WEBHOOK_URL) {
    throw new Error("Notify Webhook URL is missing.");
  }
};
