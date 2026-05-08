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
})
