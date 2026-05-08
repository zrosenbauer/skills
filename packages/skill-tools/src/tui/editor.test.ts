import { describe, expect, it } from 'vitest'

import { parseEditorEnv } from './editor.js'

describe('parseEditorEnv', () => {
  it('splits a command with extra args', () => {
    expect(parseEditorEnv('code --wait')).toEqual({ cmd: 'code', args: ['--wait'] })
  })

  it('returns no args for a bare command', () => {
    expect(parseEditorEnv('vim')).toEqual({ cmd: 'vim', args: [] })
  })

  it('handles multiple args and collapses runs of whitespace', () => {
    expect(parseEditorEnv('nvim   --noplugin  -R')).toEqual({
      cmd: 'nvim',
      args: ['--noplugin', '-R'],
    })
  })

  it('returns null for whitespace-only input', () => {
    expect(parseEditorEnv('  ')).toBeNull()
  })

  it('returns null for empty input', () => {
    expect(parseEditorEnv('')).toBeNull()
  })

  it('keeps a double-quoted command with spaces as one token', () => {
    expect(parseEditorEnv('"Visual Studio Code" --wait')).toEqual({
      cmd: 'Visual Studio Code',
      args: ['--wait'],
    })
  })

  it('keeps a single-quoted command with spaces as one token', () => {
    expect(parseEditorEnv("'My Editor' -R")).toEqual({
      cmd: 'My Editor',
      args: ['-R'],
    })
  })

  it('handles a quoted argument after the command', () => {
    expect(parseEditorEnv('code --user-data-dir "/Users/zac/Code Profile"')).toEqual({
      cmd: 'code',
      args: ['--user-data-dir', '/Users/zac/Code Profile'],
    })
  })

  it('strips empty quoted segments', () => {
    expect(parseEditorEnv('vim "" -R')).toEqual({ cmd: 'vim', args: ['', '-R'] })
  })
})
