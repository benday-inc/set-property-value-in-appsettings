import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'
import * as fs from 'fs'
import {JsonEditor} from '../src/JsonEditor'
import {countReset} from 'console'

// shows how the runner will run a javascript action with env / stdout protocol
test('set single level value in completely empty appsettings.json file', () => {
  var pathToTempConfigFile = createCopyOfSampleFile(
    'completely-empty-sample-appsettings.json'
  )

  const expectedKeyForLevel1 = 'dingdong'
  process.env['INPUT_KEYNAME1'] = expectedKeyForLevel1
  const expectedValueToSet = 'bing bong'
  process.env['INPUT_VALUETOSET'] = expectedValueToSet
  process.env['INPUT_PATHTOSETTINGSFILE'] = pathToTempConfigFile
  process.env['ACTIONS_RUNNER_DEBUG'] = 'true'

  const systemUnderTest = path.join(__dirname, '..', 'lib', 'main.js')
  const options: cp.ExecSyncOptions = {
    env: process.env
  }

  assertValueIsNot(
    pathToTempConfigFile,
    expectedKeyForLevel1,
    expectedValueToSet
  )

  console.log('end of arrange')

  console.log('start of act')
  let temp = cp.execSync(`node ${systemUnderTest}`, options).toString()
  console.log(temp)
  console.log('end of act')

  console.log('start of assert')
  assertValue(pathToTempConfigFile, expectedKeyForLevel1, expectedValueToSet)
  console.log('end of assert')
})

test('set connection string in empty json appsettings.json file', () => {
  var pathToTempConfigFile = createCopyOfSampleFile(
    'empty-json-sample-appsettings.json'
  )

  const expectedKeyForLevel1 = 'dingdong'
  process.env['INPUT_KEYNAME1'] = expectedKeyForLevel1
  const expectedValueToSet = 'bing bong'
  process.env['INPUT_VALUETOSET'] = expectedValueToSet
  process.env['INPUT_PATHTOSETTINGSFILE'] = pathToTempConfigFile
  process.env['ACTIONS_RUNNER_DEBUG'] = 'true'

  const systemUnderTest = path.join(__dirname, '..', 'lib', 'main.js')
  const options: cp.ExecSyncOptions = {
    env: process.env
  }

  assertValueIsNot(
    pathToTempConfigFile,
    expectedKeyForLevel1,
    expectedValueToSet
  )

  let temp = cp.execSync(`node ${systemUnderTest}`, options).toString()
  console.log(temp)

  assertValue(pathToTempConfigFile, expectedKeyForLevel1, expectedValueToSet)
})

test('set new connection string in an appsettings.json file with existing level 1 value', () => {
  var pathToTempConfigFile = createCopyOfSampleFile(
    'sample-appsettings-with-connection-strings.json'
  )

  const expectedKeyForLevel1 = 'level1'
  process.env['INPUT_KEYNAME1'] = expectedKeyForLevel1
  const expectedValueToSet = 'bing bong'
  process.env['INPUT_VALUETOSET'] = expectedValueToSet
  process.env['INPUT_PATHTOSETTINGSFILE'] = pathToTempConfigFile
  process.env['ACTIONS_RUNNER_DEBUG'] = 'true'

  const systemUnderTest = path.join(__dirname, '..', 'lib', 'main.js')
  const options: cp.ExecSyncOptions = {
    env: process.env
  }

  assertValueIsNot(
    pathToTempConfigFile,
    expectedKeyForLevel1,
    expectedValueToSet
  )

  let temp = cp.execSync(`node ${systemUnderTest}`, options).toString()
  console.log(temp)

  assertValue(pathToTempConfigFile, expectedKeyForLevel1, expectedValueToSet)
})

test('modify existing level1 property in an appsettings.json file', () => {
  var pathToTempConfigFile = createCopyOfSampleFile(
    'sample-appsettings-with-connection-strings.json'
  )

  const expectedKeyForLevel1 = 'key1'
  process.env['INPUT_KEYNAME1'] = expectedKeyForLevel1
  const expectedValueToSet = 'new value'
  process.env['INPUT_VALUETOSET'] = expectedValueToSet
  process.env['INPUT_PATHTOSETTINGSFILE'] = pathToTempConfigFile
  process.env['ACTIONS_RUNNER_DEBUG'] = 'true'

  const systemUnderTest = path.join(__dirname, '..', 'lib', 'main.js')
  const options: cp.ExecSyncOptions = {
    env: process.env
  }

  assertValueIsNot(
    pathToTempConfigFile,
    expectedKeyForLevel1,
    expectedValueToSet
  )

  let temp = cp.execSync(`node ${systemUnderTest}`, options).toString()
  console.log(temp)

  assertValue(pathToTempConfigFile, expectedKeyForLevel1, expectedValueToSet)
})

test('modify level2 property in an appsettings.json file', () => {
  var pathToTempConfigFile = createCopyOfSampleFile(
    'sample-appsettings-with-connection-strings.json'
  )

  const expectedKeyForLevel1 = 'key1'
  process.env['INPUT_KEYNAME1'] = expectedKeyForLevel1
  const expectedKeyForLevel2 = 'key2'
  process.env['INPUT_KEYNAME2'] = expectedKeyForLevel2
  const expectedValueToSet = 'new value'
  process.env['INPUT_VALUETOSET'] = expectedValueToSet
  process.env['INPUT_PATHTOSETTINGSFILE'] = pathToTempConfigFile
  process.env['ACTIONS_RUNNER_DEBUG'] = 'true'

  const systemUnderTest = path.join(__dirname, '..', 'lib', 'main.js')
  const options: cp.ExecSyncOptions = {
    env: process.env
  }

  assertValueIsNot(
    pathToTempConfigFile,
    expectedKeyForLevel1,
    expectedValueToSet,
    expectedKeyForLevel2
  )

  let temp = cp.execSync(`node ${systemUnderTest}`, options).toString()
  console.log(temp)

  assertValue(
    pathToTempConfigFile,
    expectedKeyForLevel1,
    expectedValueToSet,
    expectedKeyForLevel2
  )
})

test('modify level3 property in an appsettings.json file', () => {
  var pathToTempConfigFile = createCopyOfSampleFile(
    'sample-appsettings-with-connection-strings.json'
  )

  const expectedKeyForLevel1 = 'key1'
  process.env['INPUT_KEYNAME1'] = expectedKeyForLevel1
  const expectedKeyForLevel2 = 'key2'
  process.env['INPUT_KEYNAME2'] = expectedKeyForLevel2
  const expectedKeyForLevel3 = 'key3'
  process.env['INPUT_KEYNAME3'] = expectedKeyForLevel3
  const expectedValueToSet = 'new value'
  process.env['INPUT_VALUETOSET'] = expectedValueToSet
  process.env['INPUT_PATHTOSETTINGSFILE'] = pathToTempConfigFile
  process.env['ACTIONS_RUNNER_DEBUG'] = 'true'

  const systemUnderTest = path.join(__dirname, '..', 'lib', 'main.js')
  const options: cp.ExecSyncOptions = {
    env: process.env
  }

  assertValueIsNot(
    pathToTempConfigFile,
    expectedKeyForLevel1,
    expectedValueToSet,
    expectedKeyForLevel2,
    expectedKeyForLevel3
  )

  let temp = cp.execSync(`node ${systemUnderTest}`, options).toString()
  console.log(temp)

  assertValue(
    pathToTempConfigFile,
    expectedKeyForLevel1,
    expectedValueToSet,
    expectedKeyForLevel2,
    expectedKeyForLevel3
  )
})

function assertValue(
  pathToTempConfigFile: string,
  expectedKeyForLevel1: string,
  expectedValueToSet: string,
  expectedKeyForLevel2: string = null,
  expectedKeyForLevel3: string = null
) {
  const editor = new JsonEditor()
  editor.open(pathToTempConfigFile)

  let actual: string = null

  if (
    expectedKeyForLevel3 === null &&
    expectedKeyForLevel2 === null &&
    expectedKeyForLevel1 === null
  ) {
    fail('no keys are set')
  } else if (expectedKeyForLevel3 !== null && expectedKeyForLevel2 !== null) {
    actual = editor.getValue(
      expectedKeyForLevel1,
      expectedKeyForLevel2,
      expectedKeyForLevel3
    )
  } else if (expectedKeyForLevel2 !== null) {
    actual = editor.getValue(expectedKeyForLevel1, expectedKeyForLevel2)
  } else {
    actual = editor.getValue(expectedKeyForLevel1)
  }

  expect(actual).toBe(expectedValueToSet)
}

function assertValueIsNot(
  pathToTempConfigFile: string,
  expectedKeyForLevel1: string,
  expectedValueToSet: string,
  expectedKeyForLevel2: string = null,
  expectedKeyForLevel3: string = null
) {
  const editor = new JsonEditor()

  editor.open(pathToTempConfigFile)

  let actual: string = null

  if (
    expectedKeyForLevel3 === null &&
    expectedKeyForLevel2 === null &&
    expectedKeyForLevel1 === null
  ) {
    fail('no keys are set')
  } else if (expectedKeyForLevel3 !== null && expectedKeyForLevel2 !== null) {
    actual = editor.getValue(
      expectedKeyForLevel1,
      expectedKeyForLevel2,
      expectedKeyForLevel3
    )
  } else if (expectedKeyForLevel2 !== null) {
    actual = editor.getValue(expectedKeyForLevel1, expectedKeyForLevel2)
  } else {
    actual = editor.getValue(expectedKeyForLevel1)
  }

  expect(actual).not.toBe(expectedValueToSet)
}

function createCopyOfSampleFile(sampleFilename: string) {
  const now = Date.now().toString()

  var pathToFile = path.join(__dirname, sampleFilename)
  var pathToTempDir = path.join(__dirname, 'temp')
  var pathToTempDirForThisRun = path.join(pathToTempDir, now)

  if (!fs.existsSync(pathToTempDir)) {
    fs.mkdirSync(pathToTempDir)
  }

  if (!fs.existsSync(pathToTempDirForThisRun)) {
    fs.mkdirSync(pathToTempDirForThisRun)
  }

  var pathToTempConfigFile = path.join(pathToTempDirForThisRun, sampleFilename)

  fs.copyFileSync(pathToFile, pathToTempConfigFile)

  console.log('Created sample file at: ' + pathToTempConfigFile)

  return pathToTempConfigFile
}
