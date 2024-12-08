const getRepoInfo = require("./getRepoInfo");
const { default: removeMarkdown } = require("markdown-to-text");
module.exports = (pluginConfig, context) => {
  const {
    nextRelease,
    options,
    branch,
    lastRelease,
    errors,
    commits,
    env: { SEMANTIC_RELEASE_PACKAGE, npm_package_name },
  } = context;
  const repoUrl = options.repositoryUrl;
  const version = nextRelease.version;
  const repoInfo = getRepoInfo(repoUrl);
  let releaseNotes = nextRelease.notes;

  if (pluginConfig.removeMarkdown === true) {
    releaseNotes = removeMarkdown(releaseNotes);
  }

  const packageName =
    pluginConfig.packageName || SEMANTIC_RELEASE_PACKAGE || npm_package_name;

  return {
    packageName,
    repoUrl,
    version,
    releaseNotes,
    repoInfo,
    branch,
    lastRelease,
    errors,
    commits,
  };
};
