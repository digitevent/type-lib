# type-lib

A library of utility types used across Digitevent repositories.

## Installation

```sh
npm i @digitevent/type-lib
```

## Development

To run all test suites:

```sh
npm run test
```

To run tests in watch mode in development:

```sh
npm run test:dev
```

To generate a code coverage report:

```sh
npm run test:cov
```

Refer to `"scripts"` section of `package.json` for all the available scripts to help you in development.

## Publishing

The package is published to GitHub Packages' npm registry.

The steps for building and publishing the package are automated inside our CD (see [`.github/workflows/publish.yml`](.github/workflows/publish.yml)).

Starting this process requires a human action. Simply go to the [releases page](https://github.com/digitevent/type-lib/releases) and create a new release from the latest tag. The workflow will then be triggered automatically.

### Workflow

- on merge into `master`, triggers `Bump package version` workflow
- `Bump package version` commits a version bump (1.2.3 -> 1.3.0) and pushes the new tag for that version
- on manual release of the tagged version, triggers `Publish package` workflow
- `Publish package` runs the CI (lint, test and typecheck) then builds and publishes the package to the registry

### How to mark a commit for patch, minor or major version bump

`Bump version` workflow uses [phips28/gh-action-bump-version](https://github.com/phips28/gh-action-bump-version). It follows [semantic versioning](https://semver.org/). Refer to the project's readme for me details. The short version is:

- suffix the type of the commit message with `!` (ie `refactor!: change the api`) to bump the **major**
- use anywhere inside the commit message's body the string ("BREAKING CHANGE") to bump the **major**
- use `feat` or `feature` as the type of the commit message to bump the `minor`
- anything else bumps the **minor**

### How `Publish package` authtenticates to GitHub Packages

To publish the package, the workflow needs to known which registry to target and have authenticate with a token.

We declare the registry in `package.json`:

```json
{
  "repository": {
    "type": "git",
    "url": "git@github.com:digitevent/type-lib.git"
  },
  "publishConfig": {
    "registry": "https://npm.pkg.github.com"
  }
}
```

We authenticate with the auto-generated and single-use `GITHUB_TOKEN` belonging to the "github-action" machine user. Permissions are set to the strict minimum (read contents and write packages).

See the [docs for publishing from a workflow](https://docs.github.com/en/actions/publishing-packages/publishing-nodejs-packages#publishing-packages-to-github-packages) and the [docs for the underlying authentication method](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#authenticating-to-github-packages).
