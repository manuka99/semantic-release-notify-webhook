const getData = require("../common/getData");
const defaultSuccessMessage = require("../common/defaultSuccessMessage");
const sendMessageToWebhook = require("../common/sendMessageToWebhook");

module.exports = async (pluginConfig, context) => {
  const { logger } = context;
  const data = getData(pluginConfig, context);
  let successMessage = defaultSuccessMessage(data);
  const onSuccessFunction = pluginConfig.onSuccessFunction;
  if (onSuccessFunction) {
    successMessage = onSuccessFunction(pluginConfig, context, data);
  }
  try {
    await sendMessageToWebhook(pluginConfig, successMessage);
    logger.log(`Success message sent to webhook for release v${data.version}`);
  } catch (error) {
    logger.error("Failed to send success notification to webhook:", error);
  }
};
