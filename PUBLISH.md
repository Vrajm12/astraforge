# Publishing AstraForge

This source tree is prepared for a GitHub repository and an npm CLI release. Publishing has **not** been performed by this build.

## Before publishing

1. Choose the canonical GitHub owner/repository name.
2. Replace `REPLACE_WITH_GITHUB_OWNER` in `package.json` with the real owner.
3. Confirm `astraforge-skillkit` is available on npm, or choose another available package name and update `package.json` and the README/INSTALL commands consistently.
4. Review the license and skill contents.
5. Ensure GitHub and npm credentials are configured on the machine that will publish.

## Create and push the GitHub repository

Create an empty repository on GitHub first, then run from this directory:

```bash
git init
git add .
git commit -m "chore: prepare AstraForge skill system v0.1.0"
git branch -M main
git remote add origin https://github.com/OWNER/astraforge.git
git push -u origin main
```

The GitHub Actions workflow runs Node tests, the CLI validator, and the Python structural validator on pushes and pull requests.

## Publish to npm

```bash
npm test
npm run validate
python scripts/validate.py
npm pack --dry-run
npm login
npm publish --access public
```

If publishing under an npm scope, use the scoped package name and `npm publish --access public` for a public scoped package.

## Install after publication

```bash
npx astraforge-skillkit list
npx astraforge-skillkit install --all
npx astraforge-skillkit install --all --global
npx astraforge-skillkit doctor
```

`npx` installation only works after the chosen package name has actually been published to npm. GitHub hosting alone does not register a package name on npm.

## Optional GitHub Releases

After pushing, create a `v0.1.0` tag and push it to publish a source release:

```bash
git tag v0.1.0
git push origin v0.1.0
```

Do not create a release tag until the repository metadata and package name have been finalized.
