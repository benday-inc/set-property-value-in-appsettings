import * as core from '@actions/core'
import {JsonEditor} from './JsonEditor'

async function run(): Promise<void> {
  try {
    // debug is only output if you set the secret `ACTIONS_RUNNER_DEBUG` to true

    core.debug(`Reading inputs...`)

    const name: string = core.getInput('name')
    core.debug(`Connection string name: ${name} ...`)

    const pathToSettingsFile: string = core.getInput(
      'PATHTOSETTINGSFILE'.toLowerCase()
    )
    core.debug(`Settings file: ${pathToSettingsFile} ...`)

    const valueToSet: string = core.getInput('valuetoset')
    core.debug(`Value to set: ${valueToSet} ...`)

    const keyname1: string = core.getInput('keyname1')
    core.debug(`key name 1: ${keyname1} ...`)

    let keyname2: string = core.getInput('keyname2')

    if (keyname2 === '') {
      keyname2 = null
    }

    core.debug(`key name 2: ${keyname2} ...`)

    let keyname3: string = core.getInput('keyname3')

    if (keyname3 === '') {
      keyname3 = null
    }

    core.debug(`key name 3: ${keyname3} ...`)

    core.debug('Creating instance of json editor...')
    const editor = new JsonEditor()
    core.debug('Json editor created.')

    core.debug('Opening file...')
    editor.open(pathToSettingsFile)
    core.debug('File opened.')

    core.debug('Setting property value value...')
    editor.setValue(valueToSet, keyname1, keyname2, keyname3)
    core.debug('Property value set.')

    core.debug('Saving changes...')
    editor.save(pathToSettingsFile)
    core.debug('Changes saved.')
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
