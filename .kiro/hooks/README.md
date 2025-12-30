# Kiro Hooks for InvoLogs

## Overview
This directory contains automated workflow hooks for the InvoLogs hackathon project. These hooks help maintain code quality and catch issues early during development.

## Installed Hooks

### 1. Python Dependency Check (`python-dependency-check.json`)

**Trigger**: Fires when any `.py` file is saved  
**Purpose**: Reminds you to update `requirements.txt` when new imports are added  
**Action**: Sends a message to Kiro asking it to check for new imports

**Why This Helps:**
- Prevents "ModuleNotFoundError" when deploying
- Keeps dependencies documented
- Essential for hackathon where you're moving fast and might forget to update requirements.txt

**Example Scenario:**
```python
# You add this to backend/services/invoice_processor.py
import cv2
from groq import Groq
```
→ Hook triggers → Kiro reminds you to add `opencv-python` and `groq` to requirements.txt

---

### 2. React Component Linter (`react-component-lint.json`)

**Trigger**: Fires when any `.jsx`, `.tsx`, `.js`, or `.ts` file in `frontend/` is saved  
**Purpose**: Catches common React issues and suggests improvements  
**Action**: Sends a message to Kiro to review the component for best practices

**Checks Performed:**
1. ✅ Unused imports
2. ✅ Missing useEffect dependencies
3. ✅ Prop type definitions (TypeScript)
4. ✅ Leftover console.log statements
5. ✅ React best practices (hooks rules, performance)

**Why This Helps:**
- Catches bugs before they cause runtime errors
- Improves code quality during rapid development
- Helps you learn React best practices

**Example Scenario:**
```jsx
// You save this component with issues
function InvoiceUpload() {
  const [file, setFile] = useState(null);
  
  useEffect(() => {
    processFile(file); // Missing 'file' in dependency array!
  }, []); // ← Hook will catch this
  
  console.log('Debug:', file); // ← Hook will suggest removing this
  
  return <div>...</div>;
}
```
→ Hook triggers → Kiro points out the missing dependency and debug statement

---

## How to Use

### Viewing Hooks
1. Open the **Explorer** view in Kiro
2. Look for the **"Agent Hooks"** section
3. You'll see both hooks listed with enable/disable toggles

### Enabling/Disabling Hooks
- **Via UI**: Toggle the switch next to each hook in the Agent Hooks section
- **Via File**: Edit the `.json` file and change `"enabled": true` to `"enabled": false`

### Testing Hooks
1. Create a test Python file: `backend/test.py`
2. Add some code and save it
3. Watch for Kiro's message about checking dependencies
4. Do the same with a React component in `frontend/`

---

## Customizing Hooks

### Changing File Patterns

**Python Hook** - To watch only specific directories:
```json
"filePattern": "backend/**/*.py"  // Only backend Python files
```

**React Hook** - To watch only components:
```json
"filePattern": "frontend/src/components/**/*.{jsx,tsx}"  // Only components
```

### Changing Messages

Edit the `"message"` field in each hook to customize what Kiro checks for.

**Example**: Add API key security check to Python hook:
```json
"message": "A Python file was saved. Check for: 1) New imports needing requirements.txt updates, 2) Hardcoded API keys or secrets (should use environment variables)"
```

---

## Advanced Hook Ideas (Future)

### Hook 3: Pre-Commit Test Runner
```json
{
  "name": "Run Tests Before Commit",
  "trigger": { "type": "onCommit" },
  "action": {
    "type": "executeCommand",
    "command": "pytest backend/tests && npm test --prefix frontend"
  }
}
```

### Hook 4: API Documentation Sync
```json
{
  "name": "Update API Docs",
  "trigger": { 
    "type": "onSave",
    "filePattern": "backend/routes/**/*.py"
  },
  "action": {
    "type": "sendMessage",
    "message": "An API route was modified. Check if API documentation needs updating."
  }
}
```

### Hook 5: Environment Variable Validator
```json
{
  "name": "Check Environment Variables",
  "trigger": { "type": "onSave", "filePattern": "**/.env.example" },
  "action": {
    "type": "sendMessage",
    "message": "Verify all variables in .env.example are documented in README.md"
  }
}
```

---

## Troubleshooting

### Hook Not Firing
1. Check if hook is enabled in the UI
2. Verify file pattern matches your file path
3. Check Kiro output panel for errors

### Too Many Messages
- Disable hooks temporarily when doing bulk edits
- Adjust file patterns to be more specific

### Hook Slowing Down Workflow
- These hooks use "sendMessage" which is non-blocking
- If you find them distracting, disable during intense coding sessions
- Re-enable before committing code

---

## Best Practices for Hackathons

### When to Enable Hooks
✅ **Enable during**:
- Feature development
- Bug fixing
- Code review
- Final polish phase

❌ **Disable during**:
- Initial scaffolding (lots of file creation)
- Bulk refactoring
- Experimenting with new ideas

### Recommended Workflow
1. **Hour 0-3** (Setup): Hooks disabled (too many files being created)
2. **Hour 3-16** (Development): Hooks enabled (catch issues early)
3. **Hour 16-20** (Polish): Hooks enabled (maintain quality)
4. **Hour 20-24** (Demo prep): Hooks disabled (focus on presentation)

---

## Hook Configuration Reference

### Trigger Types
- `onSave`: Fires when a file matching the pattern is saved
- `onCommit`: Fires before a git commit
- `onMessage`: Fires when a message is sent to Kiro
- `onSessionStart`: Fires when a new Kiro session starts

### Action Types
- `sendMessage`: Sends a message to Kiro (non-blocking)
- `executeCommand`: Runs a shell command (blocking)

### File Pattern Syntax
- `**/*.py`: All Python files recursively
- `backend/**/*.py`: Python files only in backend/
- `*.{js,ts}`: JavaScript or TypeScript files in root
- `frontend/src/components/**/*.jsx`: JSX files in components/

---

## Contributing

Feel free to add more hooks as you identify repetitive tasks during the hackathon!

**Quick Add Process:**
1. Create new `.json` file in `.kiro/hooks/`
2. Copy structure from existing hooks
3. Customize trigger and action
4. Test by saving a matching file
5. Adjust as needed

---

## Questions?

Use the command palette in Kiro:
- **"Open Kiro Hook UI"** - Visual hook builder
- **"Reload Hooks"** - Refresh after manual edits

Good luck with the hackathon! 🚀
