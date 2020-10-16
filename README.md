![build-test](https://github.com/benday/action-set-property-value-in-appsettings/workflows/build-test/badge.svg)

# Edit a property value in JSON file

This action helps you to edit property values in a JSON file.  For example, if you're using .NET Core, you can use this action to edit your appsettings.json file.

## Usage

To edit a connection string inside of an appsettings.json file:  
```yaml
- name: Edit property string value in appsettings.json
  uses: benday/action-set-property-value-in-appsettings@main
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

