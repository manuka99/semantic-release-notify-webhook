module.exports = (data) => {
  const { packageName, version, repoInfo } = data;
  return {
    text: `Failed to release ${packageName} v${version}!\n\nView the issue on GitHub\n${repoInfo.URL}`,
  };
};
