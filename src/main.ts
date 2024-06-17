import * as core from '@actions/core'
import { getExecOutput } from '@actions/exec'
//import { wait } from './wait'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const test: string = core.getInput('test')
    const { stdout } = await getExecOutput('"../node_modules/.bin/clever"', [
      test
    ])

    core.debug(`Command Output: ${stdout}`)

    // Debug logs are only output if the `ACTIONS_STEP_DEBUG` secret is true
    core.debug(`Finding clever-tools ${test} ...`)

    // Log the current timestamp, wait, then log the new timestamp
    //core.debug(new Date().toTimeString())
    //await wait(parseInt(test, 10))
    //core.debug(new Date().toTimeString())

    // Set outputs for other workflow steps to use
    //core.setOutput('version', new Date().toTimeString())
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}

//export async function runCommand(): Promise<void> {
//await exec('"../node_modules/.bin/clever"', ['--version'])
//}
