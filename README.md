![build-test](https://github.com/benday-inc/set-property-value-in-appsettings/workflows/build-test/badge.svg)

# Edit a property value in JSON file

Written by Benjamin Day  
Pluralsight Author | Microsoft MVP | Scrum.org Professional Scrum Trainer  
https://www.benday.com  
https://www.honestcheetah.com  
info@benday.com  
YouTube: https://www.youtube.com/@_benday  

*Got ideas for GitHub Actions you'd like to see? Found a bug? Let us know by submitting an issue https://github.com/benday-inc/set-property-value-in-appsettings/issues. Want to contribute? Submit a pull request.*

This action helps you to edit property values in a JSON file.  For example, if you're using .NET Core, you can use this action to edit your appsettings.json file.

## What's new in v3

- Action now runs on **Node 24** (was Node 20). Self-hosted runners must have Node 24 available; GitHub-hosted runners are unaffected.
- Modernized dependencies: `@actions/core` 2.x, `jest` 30, `prettier` 3, `eslint` 9 (flat config), `@typescript-eslint` 8.
- 0 npm vulnerabilities.

**Migration:** consumers should switch from `uses: benday-inc/set-property-value-in-appsettings@v1` to `@v3`.

## Usage

To edit a connection string inside of an appsettings.json file:  
```yaml
- name: Edit property string value in appsettings.json
  uses: benday-inc/set-property-value-in-appsettings@v3
  with:
    pathtosettingsfile: '${{ github.workspace }}/Benday.Demo123/src/Benday.Demo123.WebUi/appsettings.json'
    keyname1: 'level1'
    keyname2: 'level2'
    keyname3: 'level3'
    valuetoset: 'the new value'
```

The yaml sample above would set the following value in a json file:
```json
{
  "level1": {
    "level2": {
      "level3": "the new value"
    }
  }
}
```
----
## Action Spec:

### Environment variables
- None

### Inputs
- `pathtosettingsfile` - Path to the json (ex: appsettings.json) file
- `valuetoset` - The string value to set
- `keyname1` - Name for the root level property
- `keyname2` - [optional] Name for the second level property
- `keyname3` - [optional] Name for the third level property

### Outputs
- None

## Development Notes

### Dependency overrides

`package.json` includes an `overrides` entry for `undici` to force the patched version (`^6.25.0`). This resolves several security advisories (GHSA-g9mf-h72j-4rw9, GHSA-2mjp-6q6p-2qxm, GHSA-vrm6-8vpv-qv8q, GHSA-v9p9-hfj2-hcw8, GHSA-4992-7rv2-5pvq) that were present in the transitive dependency chain via `@actions/http-client`.

### Releasing a new version

Run the [release workflow](https://github.com/benday-inc/set-property-value-in-appsettings/actions/workflows/release.yml) manually from GitHub Actions, providing the new version number (e.g. `3.1.0`). The workflow will:
1. Run the full build, lint, test, and package pipeline
2. Bump the version in `package.json` and commit the updated `dist/` folder
3. Push a versioned tag (e.g. `v3.1.0`) and update the floating major-version tag (e.g. `v3`)
4. Create a GitHub Release
