import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

type VimCommand = {
  key: string;
  description: string;
};

type VimCategory = {
  category: string;
  commands: VimCommand[];
};

const CATEGORIZED_CHEATSHEET: VimCategory[] = [
  {
    category: 'Global',
    commands: [
      { key: ':h[elp] keyword', description: 'Open help for keyword' },
      { key: ':sav[eas] file', description: 'Save file as' },
      { key: ':clo[se]', description: 'Close current pane' },
      { key: ':ter[minal]', description: 'Open a terminal window' },
      { key: 'K', description: 'Open man page for word under the cursor' },
    ],
  },
  {
    category: 'Marks and Positions',
    commands: [
      { key: ':marks', description: 'List of marks' },
      { key: 'ma', description: 'Set current position for mark a' },
      { key: '`a', description: 'Jump to position of mark a' },
      { key: 'y`a', description: 'Yank text to position of mark a' },
      { key: '`0', description: 'Go to the position where Vim was previously exited' },
      { key: '`"', description: 'Go to the position when last editing this file' },
      { key: '`.', description: 'Go to the position of the last change in this file' },
      { key: '``', description: 'Go to the position before the last jump' },
      { key: ':ju[mps]', description: 'List of jumps' },
      { key: 'Ctrl + i', description: 'Go to newer position in jump list' },
      { key: 'Ctrl + o', description: 'Go to older position in jump list' },
      { key: ':changes', description: 'List of changes' },
      { key: 'g,', description: 'Go to newer position in change list' },
      { key: 'g;', description: 'Go to older position in change list' },
      { key: 'Ctrl + ]', description: 'Jump to the tag under cursor' },
    ],
  },
  {
    category: 'Macros',
    commands: [
      { key: 'qa', description: 'Record macro a' },
      { key: 'q', description: 'Stop recording macro' },
      { key: '@a', description: 'Run macro a' },
      { key: '@@', description: 'Rerun last run macro' },
    ],
  },
  {
    category: 'Cut and Paste',
    commands: [
      { key: 'yy', description: 'Yank (copy) a line' },
      { key: '2yy', description: 'Yank (copy) 2 lines' },
      { key: 'yw', description: 'Yank (copy) characters of word to next word' },
      { key: 'yiw', description: 'Yank (copy) word under the cursor' },
      { key: 'yaw', description: 'Yank (copy) word under cursor and space' },
      { key: 'y$', description: 'Yank (copy) to end of line' },
      { key: 'Y', description: 'Yank (copy) to end of line' },
      { key: 'p', description: 'Put (paste) clipboard after cursor' },
      { key: 'P', description: 'Put (paste) before cursor' },
      { key: 'gp', description: 'Paste after cursor and leave cursor after text' },
      { key: 'gP', description: 'Paste before cursor and leave cursor after text' },
      { key: 'dd', description: 'Delete (cut) a line' },
      { key: '2dd', description: 'Delete (cut) 2 lines' },
      { key: 'dw', description: 'Delete (cut) word from cursor to start of next word' },
      { key: 'diw', description: 'Delete (cut) word under cursor' },
      { key: 'daw', description: 'Delete (cut) word and space around it' },
      { key: ':3,5d', description: 'Delete lines 3 through 5' },
      { key: ':.,$d', description: 'Delete from current line to end of file' },
      { key: ':.,1d', description: 'Delete from current line to beginning of file' },
      { key: ':10,1d', description: 'Delete from 10th line to beginning of file' },
      { key: ':g/{pattern}/d', description: 'Delete all lines containing pattern' },
      { key: ':g!/{pattern}/d', description: 'Delete all lines NOT containing pattern' },
      { key: 'd$', description: 'Delete to end of line' },
      { key: 'D', description: 'Delete to end of line' },
      { key: 'x', description: 'Delete character' },
    ],
  },
    {
      category: 'Indent Text',
      commands: [
        { key: '>>', description: 'Indent line one shiftwidth' },
        { key: '<<', description: 'De-indent line one shiftwidth' },
        { key: '>%', description: 'Indent a block with () or {} (cursor on brace)' },
        { key: '<%', description: 'De-indent a block with () or {} (cursor on brace)' },
        { key: '>ib', description: 'Indent inner block with ()' },
        { key: '>at', description: 'Indent a block with <> tags' },
        { key: '3==', description: 'Re-indent 3 lines' },
        { key: '=%', description: 'Re-indent a block with () or {} (cursor on brace)' },
        { key: '=iB', description: 'Re-indent inner block with {}' },
        { key: 'gg=G', description: 'Re-indent entire buffer' },
        { key: ']p', description: 'Paste and adjust indent to current line' },
      ],
    },
  {
    category: 'Exiting',
    commands: [
      { key: ':w', description: 'Write (save) the file, but don’t exit' },
      { key: ':w !sudo tee %', description: 'Write out the current file using sudo' },
      { key: ':wq', description: 'Write (save) and quit' },
      { key: ':x', description: 'Write (save) and quit' },
      { key: 'ZZ', description: 'Write (save) and quit' },
      { key: ':q', description: 'Quit (fails if there are unsaved changes)' },
      { key: ':q!', description: 'Quit and throw away unsaved changes' },
      { key: 'ZQ', description: 'Quit and throw away unsaved changes' },
      { key: ':wqa', description: 'Write (save) and quit on all tabs' },
    ],
  },
  {
    category: 'Cursor Movement',
    commands: [
      { key: 'h', description: 'Move cursor left' },
      { key: 'j', description: 'Move cursor down' },
      { key: 'k', description: 'Move cursor up' },
      { key: 'l', description: 'Move cursor right' },
      { key: 'gj', description: 'Move cursor down (multi-line text)' },
      { key: 'gk', description: 'Move cursor up (multi-line text)' },
      { key: 'H', description: 'Move to top of screen' },
      { key: 'M', description: 'Move to middle of screen' },
      { key: 'L', description: 'Move to bottom of screen' },
      { key: 'w', description: 'Jump forwards to the start of a word' },
      { key: 'W', description: 'Jump forwards to the start of a word (with punctuation)' },
      { key: 'e', description: 'Jump forwards to the end of a word' },
      { key: 'E', description: 'Jump forwards to the end of a word (with punctuation)' },
      { key: 'b', description: 'Jump backwards to the start of a word' },
      { key: 'B', description: 'Jump backwards to the start of a word (with punctuation)' },
      { key: 'ge', description: 'Jump backwards to the end of a word' },
      { key: 'gE', description: 'Jump backwards to the end of a word (with punctuation)' },
      { key: '%', description: 'Move to matching character (bracket, brace, etc.)' },
      { key: '0', description: 'Jump to start of line' },
      { key: '^', description: 'Jump to first non-blank character of line' },
      { key: '$', description: 'Jump to end of line' },
      { key: 'g_', description: 'Jump to last non-blank character of line' },
      { key: 'gg', description: 'Go to first line of document' },
      { key: 'G', description: 'Go to last line of document' },
      { key: '5gg or 5G', description: 'Go to line 5' },
      { key: 'gd', description: 'Go to local declaration' },
      { key: 'gD', description: 'Go to global declaration' },
      { key: 'fx', description: 'Jump to next occurrence of x' },
      { key: 'tx', description: 'Jump before next occurrence of x' },
      { key: 'Fx', description: 'Jump to previous occurrence of x' },
      { key: 'Tx', description: 'Jump after previous occurrence of x' },
      { key: ';', description: 'Repeat previous f/t/F/T movement' },
      { key: ',', description: 'Repeat previous f/t/F/T movement backwards' },
      { key: '}', description: 'Jump to next paragraph/block' },
      { key: '{', description: 'Jump to previous paragraph/block' },
      { key: 'zz', description: 'Center cursor on screen' },
      { key: 'zt', description: 'Position cursor on top of screen' },
      { key: 'zb', description: 'Position cursor on bottom of screen' },
      { key: 'Ctrl + e', description: 'Scroll screen down one line' },
      { key: 'Ctrl + y', description: 'Scroll screen up one line' },
      { key: 'Ctrl + b', description: 'Page up' },
      { key: 'Ctrl + f', description: 'Page down' },
      { key: 'Ctrl + d', description: 'Half-page down' },
      { key: 'Ctrl + u', description: 'Half-page up' },
    ],
  },
  {
    category: 'Insert Mode',
    commands: [
      { key: 'i', description: 'Insert before the cursor' },
      { key: 'I', description: 'Insert at the beginning of the line' },
      { key: 'a', description: 'Insert (append) after the cursor' },
      { key: 'A', description: 'Insert (append) at the end of the line' },
      { key: 'o', description: 'Append (open) a new line below the current line' },
      { key: 'O', description: 'Append (open) a new line above the current line' },
      { key: 'ea', description: 'Insert (append) at the end of the word' },
      { key: 'Ctrl + h', description: 'Delete the character before the cursor during insert mode' },
      { key: 'Ctrl + w', description: 'Delete word before the cursor during insert mode' },
      { key: 'Ctrl + j', description: 'Add a line break at the cursor position during insert mode' },
      { key: 'Ctrl + t', description: 'Indent line one shiftwidth during insert mode' },
      { key: 'Ctrl + d', description: 'De-indent line one shiftwidth during insert mode' },
      { key: 'Ctrl + n', description: 'Auto-complete next match before the cursor during insert mode' },
      { key: 'Ctrl + p', description: 'Auto-complete previous match before the cursor during insert mode' },
      { key: 'Ctrl + rx', description: 'Insert the contents of register x' },
      { key: 'Ctrl + ox', description: 'Temporarily enter normal mode to issue one normal-mode command x' },
      { key: 'Esc / Ctrl + c', description: 'Exit insert mode' },
    ],
  },
  {
    category: 'Editing',
    commands: [
      { key: 'r', description: 'Replace a single character' },
      { key: 'R', description: 'Replace more than one character until ESC' },
      { key: 'J', description: 'Join line below to the current one with one space in between' },
      { key: 'gJ', description: 'Join line below to the current one without space in between' },
      { key: 'gwip', description: 'Reflow paragraph' },
      { key: 'g~', description: 'Switch case up to motion' },
      { key: 'gu', description: 'Change to lowercase up to motion' },
      { key: 'gU', description: 'Change to uppercase up to motion' },
      { key: 'cc', description: 'Change (replace) entire line' },
      { key: 'c$', description: 'Change (replace) to the end of the line' },
      { key: 'C', description: 'Change (replace) to the end of the line' },
      { key: 'ciw', description: 'Change (replace) entire word' },
      { key: 'cw', description: 'Change (replace) to the end of the word' },
      { key: 'ce', description: 'Change (replace) to the end of the word' },
      { key: 's', description: 'Delete character and substitute text (same as cl)' },
      { key: 'S', description: 'Delete line and substitute text (same as cc)' },
      { key: 'xp', description: 'Transpose two letters (delete and paste)' },
      { key: 'u', description: 'Undo' },
      { key: 'U', description: 'Restore (undo) last changed line' },
      { key: 'Ctrl + r', description: 'Redo' },
      { key: '.', description: 'Repeat last command' },
    ],
  },
  {
    category: 'Visual Mode',
    commands: [
      { key: 'v', description: 'Start visual mode, mark lines, then do a command (like y-yank)' },
      { key: 'V', description: 'Start linewise visual mode' },
      { key: 'o', description: 'Move to other end of marked area' },
      { key: 'Ctrl + v', description: 'Start visual block mode' },
      { key: 'O', description: 'Move to other corner of block' },
      { key: 'aw', description: 'Mark a word' },
      { key: 'ab', description: 'A block with ()' },
      { key: 'aB', description: 'A block with {}' },
      { key: 'at', description: 'A block with <> tags' },
      { key: 'ib', description: 'Inner block with ()' },
      { key: 'iB', description: 'Inner block with {}' },
      { key: 'it', description: 'Inner block with <> tags' },
      { key: 'Esc / Ctrl + c', description: 'Exit visual mode' },
    ],
  },
  {
    category: 'Visual Commands',
    commands: [
      { key: '>', description: 'Shift text right' },
      { key: '<', description: 'Shift text left' },
      { key: 'y', description: 'Yank (copy) marked text' },
      { key: 'd', description: 'Delete marked text' },
      { key: '~', description: 'Switch case' },
      { key: 'u', description: 'Change marked text to lowercase' },
      { key: 'U', description: 'Change marked text to uppercase' },
    ],
  },
  {
    category: 'Registers',
    commands: [
      { key: ':reg[isters]', description: 'Show registers content' },
      { key: '"xy', description: 'Yank into register x' },
      { key: '"xp', description: 'Paste contents of register x' },
      { key: '"+y', description: 'Yank into the system clipboard register' },
      { key: '"+p', description: 'Paste from the system clipboard register' },
      { key: '"0', description: 'Last yank' },
      { key: '"\\"', description: 'Unnamed register (last delete or yank)' },
      { key: '"%', description: 'Current file name' },
      { key: '"#', description: 'Alternate file name' },
      { key: '"*', description: 'Clipboard contents (X11 primary)' },
      { key: '"+', description: 'Clipboard contents (X11 clipboard)' },
      { key: '"/', description: 'Last search pattern' },
      { key: '":', description: 'Last command-line' },
      { key: '".', description: 'Last inserted text' },
      { key: '"-', description: 'Last small (less than a line) delete' },
      { key: '"=', description: 'Expression register' },
      { key: '"_', description: 'Black hole register' },
    ],
  },
  {
    category: 'Search in Multiple Files',
    commands: [
      { key: ':vim[grep] /pattern/ {file}', description: 'Search for pattern in multiple files' },
      { key: ':cn[ext]', description: 'Jump to the next match' },
      { key: ':cp[revious]', description: 'Jump to the previous match' },
      { key: ':cope[n]', description: 'Open a window with list of matches' },
      { key: ':ccl[ose]', description: 'Close the quickfix window' },
    ],
  },
  {
    category: 'Tabs',
    commands: [
      { key: ':tabnew', description: 'Open a new tab' },
      { key: ':tabnew {file}', description: 'Open a file in a new tab' },
      { key: 'Ctrl + wT', description: 'Move the current split window into its own tab' },
      { key: 'gt', description: 'Move to the next tab' },
      { key: ':tabn[ext]', description: 'Move to the next tab' },
      { key: 'gT', description: 'Move to the previous tab' },
      { key: ':tabp[revious]', description: 'Move to the previous tab' },
      { key: '#gt', description: 'Move to tab number #' },
      { key: ':tabm[ove] #', description: 'Move current tab to the #th position (indexed from 0)' },
      { key: ':tabc[lose]', description: 'Close the current tab and all its windows' },
      { key: ':tabo[nly]', description: 'Close all tabs except for the current one' },
      { key: ':tabdo command', description: 'Run a command on all tabs (e.g., :tabdo q)' },
    ],
  },
  {
    category: 'Working with Multiple Files',
    commands: [
      { key: ':e[dit] file', description: 'Edit a file in a new buffer' },
      { key: ':bn[ext]', description: 'Go to the next buffer' },
      { key: ':bp[revious]', description: 'Go to the previous buffer' },
      { key: ':bd[elete]', description: 'Delete a buffer (close a file)' },
      { key: ':b[uffer]#', description: 'Go to a buffer by index #' },
      { key: ':b[uffer] file', description: 'Go to a buffer by file' },
      { key: ':ls', description: 'List all open buffers' },
      { key: ':buffers', description: 'List all open buffers' },
      { key: ':sp[lit] file', description: 'Open file in a new buffer and split window' },
      { key: ':vs[plit] file', description: 'Open file in new buffer and vertically split window' },
      { key: ':vert[ical] ba[ll]', description: 'Edit all buffers as vertical windows' },
      { key: ':tab ba[ll]', description: 'Edit all buffers as tabs' },
      { key: 'Ctrl + ws', description: 'Split window' },
      { key: 'Ctrl + wv', description: 'Split window vertically' },
      { key: 'Ctrl + ww', description: 'Switch windows' },
      { key: 'Ctrl + wq', description: 'Quit a window' },
      { key: 'Ctrl + wx', description: 'Exchange current window with next one' },
      { key: 'Ctrl + w=', description: 'Make all windows equal height and width' },
      { key: 'Ctrl + wh', description: 'Move cursor to left window' },
      { key: 'Ctrl + wl', description: 'Move cursor to right window' },
      { key: 'Ctrl + wj', description: 'Move cursor to window below' },
      { key: 'Ctrl + wk', description: 'Move cursor to window above' },
      { key: 'Ctrl + wH', description: 'Make window full height on far left' },
      { key: 'Ctrl + wL', description: 'Make window full height on far right' },
      { key: 'Ctrl + wJ', description: 'Make window full width on bottom' },
      { key: 'Ctrl + wK', description: 'Make window full width on top' },
    ],
  },
  {
    category: 'Diff',
    commands: [
      { key: 'zf', description: 'Manually define a fold up to motion' },
      { key: 'zd', description: 'Delete fold under the cursor' },
      { key: 'za', description: 'Toggle fold under the cursor' },
      { key: 'zo', description: 'Open fold under the cursor' },
      { key: 'zc', description: 'Close fold under the cursor' },
      { key: 'zr', description: 'Reduce (open) all folds by one level' },
      { key: 'zm', description: 'Fold more (close) all folds by one level' },
      { key: 'zi', description: 'Toggle folding functionality' },
      { key: ']c', description: 'Jump to start of next change' },
      { key: '[c', description: 'Jump to start of previous change' },
      { key: 'do', description: 'Obtain (get) difference from other buffer' },
      { key: ':diffg[et]', description: 'Obtain (get) difference from other buffer' },
      { key: 'dp', description: 'Put difference to other buffer' },
      { key: ':diffpu[t]', description: 'Put difference to other buffer' },
      { key: ':diffthis', description: 'Make current window part of diff' },
      { key: ':dif[fupdate]', description: 'Update differences' },
      { key: ':diffo[ff]', description: 'Switch off diff mode for current window' },
    ],
  },
];

export default function VimCheatSheet() {
  const [search, setSearch] = useState('');

  const filtered = CATEGORIZED_CHEATSHEET.map(category => {
    const searchWords = search.toLowerCase().split(/\s+/).filter(Boolean);
    const commands = category.commands.filter(cmd => {
      const keyText = cmd.key.toLowerCase();
      const descText = cmd.description.toLowerCase();
      return searchWords.every(word => keyText.includes(word) || descText.includes(word));
    });
    return { category: category.category, commands };
  }).filter(c => c.commands.length > 0);

  return (
    <Card className="w-full h-full p-6 overflow-y-auto">
      <CardHeader className="sticky top-0 z-20 bg-background/80 backdrop-blur-md border px-6 py-6 mb-4 shadow-sm rounded-md">
        <CardTitle className="text-2xl font-bold mb-2 whitespace-nowrap overflow-hidden text-ellipsis">Vim Cheat Sheet</CardTitle>
        <Input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search key or description..."
          className="w-full"
        />
      </CardHeader>
      <CardContent className="p-0">
        {filtered.map((section, i) => (
          <div key={i} className="mb-6">
            <h3 className="text-xl font-bold bg-secondary text-secondary-foreground px-4 py-2 rounded-md shadow mb-4">
              {section.category}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {section.commands.map((cmd, idx) => (
                <Card key={idx} className="flex flex-col items-start gap-1 p-4 transform transition-transform duration-200 hover:scale-[1.02] hover:shadow-lg">
                  <Badge variant="secondary" className="px-2 py-1 text-xs font-semibold whitespace-nowrap">
                    {cmd.key}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {cmd.description.split(new RegExp(`(${search.split(/\s+/).filter(Boolean).join('|')})`, 'gi')).map((part, i) =>
                      search.toLowerCase().split(/\s+/).includes(part.toLowerCase()) ? (
                        <mark key={i} className="bg-yellow-200 rounded">{part}</mark>
                      ) : (
                        part
                      )
                    )}
                  </span>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}