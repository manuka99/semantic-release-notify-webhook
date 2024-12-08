const getData = require("../common/getData");
const defaultFailMessage = require("../common/defaultFailMessage");
const sendMessageToWebhook = require("../common/sendMessageToWebhook");

module.exports = async (pluginConfig, context) => {
  const { logger } = context;
  const data = getData(pluginConfig, context);
  let failMessage = defaultFailMessage(data);
  const onFailFunction = pluginConfig.onFailFunction;
  if (onFailFunction) {
    failMessage = onFailFunction(pluginConfig, context, data);
  }
  try {
    await sendMessageToWebhook(pluginConfig, failMessage);
    logger.log("Failure message sent to webhook");
  } catch (error) {
    logger.error("Failed to send failure notification to webhook:", error);
  }
};
