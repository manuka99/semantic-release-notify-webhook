# semantic-release-notify-webhook

The `semantic-release-notify-webhook` plugin allows you to send notifications to a specified webhook whenever a release is successfully published or when a failure occurs during the semantic release process. This plugin helps you integrate custom messaging or notification systems with the semantic release lifecycle.

## Table of Contents
- [Install](#install)
- [Usage](#usage)
  - [Configuration Options](#configuration-options)
- [Functions](#functions)
  - [onSuccessFunction](#onsuccessfunction)
  - [onFailFunction](#onfailfunction)
- [Example](#example)
- [License](#license)

---

## Install

To install the `semantic-release-notify-webhook` plugin, run the following command:

```bash
npm install semantic-release-notify-webhook --save-dev
```

---

## Usage

Once installed, you can use the `semantic-release-notify-webhook` plugin in your `.releaserc` or `release.config.js` configuration file.

Here's an example of how to configure the plugin:

### Configuration Options

| Option                 | Type     | Description                                                                                                                                   | Default   |
|------------------------|----------|-----------------------------------------------------------------------------------------------------------------------------------------------|-----------|
| `NOTIFY_WEBHOOK_URL`    | string   | **Required**: The URL of the webhook where the notification/message should be sent.                                                           |           |
| `packageName`           | string   | **Optional**: The name of the package being released.                                                                                         |           |
| `removeMarkdown`        | boolean  | **Optional**: Set to `true` to remove markdown from release notes and only send plain text. Defaults to `false`.                               | false     |
| `onSuccessFunction`     | function | **Optional**: A custom function to generate a success message. This function will receive `pluginConfig`, `context`, and `data` as inputs. |           |
| `onFailFunction`        | function | **Optional**: A custom function to generate a failure message. This function will receive `pluginConfig`, `context`, and `data` as inputs. |           |

---

### Functions

#### onSuccessFunction

The `onSuccessFunction` allows you to define a custom success message when a release is successfully published. It receives three arguments: `pluginConfig`, `context`, and `data`.

- `pluginConfig`: The configuration for the plugin (includes your webhook URL, package name, etc.).
- `context`: The context of the release process (as defined in the official [semantic-release documentation](https://semantic-release.gitbook.io/semantic-release/)).
- `data`: An object containing relevant data for the release. The `data` object includes:
  - `packageName`: The name of the package being released.
  - `repoUrl`: The URL of the repository.
  - `version`: The version of the release.
  - `releaseNotes`: The notes of the release (markdown format).
  - `repoInfo`: Information about the repository (path, URL & hostname). 
  - `branch`: The Git branch that the release is associated with.
  - `lastRelease`: Information about the last release.
  - `errors`: An array of errors that occurred during the release process (if any).
  - `commits`: The commits included in the release.

Example usage:

```js
onSuccessFunction: (pluginConfig, context, data) => {
  return `Release of ${data.packageName} ${data.version} is successful! Check out the release notes: ${data.releaseNotes}`;
}
```

#### onFailFunction

The `onFailFunction` allows you to define a custom failure message when a release process fails. Like `onSuccessFunction`, it receives `pluginConfig`, `context`, and `data` as arguments. The arguments are similar, providing the data relevant to the failed release.

Example usage:

```js
onFailFunction: (pluginConfig, context, data) => {
  return `Release of ${data.packageName} failed at version ${data.version}. Please check the errors: ${data.errors.join(', ')}`;
}
```

---

## Example

Here is an example configuration using the `semantic-release-notify-webhook` plugin in `.releaserc`:

```json
{
  "plugins": [
    [
      "semantic-release-notify-webhook",
      {
        "NOTIFY_WEBHOOK_URL": "https://your-webhook-url.com/notify",
        "packageName": "my-package",
        "removeMarkdown": true,
        "onSuccessFunction": "function(pluginConfig, context, data) { return `Release ${data.version} was successful!`; }",
        "onFailFunction": "function(pluginConfig, context, data) { return `Release ${data.version} failed. Errors: ${data.errors.join(', ')}`; }"
      }
    ]
  ]
}
```

In this example:
- `NOTIFY_WEBHOOK_URL` is required and should be the URL of your notification endpoint.
- The optional `packageName` is set to `"my-package"`.
- `removeMarkdown` is set to `true` to strip markdown from the release notes.
- Custom `onSuccessFunction` and `onFailFunction` are defined to generate success and failure messages.

---

## License

MIT License. See [LICENSE](LICENSE) for more details.