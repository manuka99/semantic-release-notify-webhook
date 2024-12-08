module.exports = (data) => {
  const { packageName, version, repoInfo } = data;
  return {
    text: `New release of ${packageName} v${version} is available!\n\nView the release on GitHub\n${repoInfo.URL}/releases/tag/v${version}`,
  };
};
