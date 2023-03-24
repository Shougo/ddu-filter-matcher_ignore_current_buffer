# ddu-filter-matcher_ignore_current_buffer

Ignore current buffer matcher for ddu.vim

This matcher filters ignored current buffer.

## Required

### denops.vim

https://github.com/vim-denops/denops.vim

### ddu.vim

https://github.com/Shougo/ddu.vim

## Configuration

```vim
call ddu#custom#patch_global(#{
    \   sourceOptions: #{
    \     _: #{
    \       matchers: ['matcher_ignore_current_buffer'],
    \     },
    \   }
    \ })
```
