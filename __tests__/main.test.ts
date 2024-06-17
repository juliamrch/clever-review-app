import * as core from '@actions/core'
import * as exec from '@actions/exec'
import { run } from '../src/main'

jest.mock('@actions/core')
jest.mock('@actions/exec', () => ({
  getExecOutput: jest.fn()
}))

describe('run function', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should call getExecOutput with the correct parameters', async () => {
    const testInput = 'version'
    ;(core.getInput as jest.Mock).mockReturnValue(testInput)
    ;(exec.getExecOutput as jest.Mock).mockResolvedValue({
      stdout: 'output',
      stderr: ''
    })

    await run()

    expect(exec.getExecOutput).toHaveBeenCalledWith(
      '"../node_modules/.bin/clever"',
      [testInput]
    )
    expect(core.debug).toHaveBeenCalledWith(`Command Output: output`)
  })

  it('should handle errors correctly', async () => {
    const errorMessage = 'Error executing command'
    ;(core.getInput as jest.Mock).mockReturnValue('test-command')
    ;(exec.getExecOutput as jest.Mock).mockRejectedValue(
      new Error(errorMessage)
    )

    await run()

    expect(core.setFailed).toHaveBeenCalledWith(errorMessage)
  })
})
