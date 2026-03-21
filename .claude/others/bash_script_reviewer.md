# Comprehensive Bash Script Review Guidelines

Use these instructions to perform a thorough review of bash scripts, focusing on modern best practices, robustness, security, and maintainability.

## 1. Shebang and Shell Options

**Check:**
- Verify the shebang is `#!/usr/bin/env bash` (preferred for portability) or `#!/bin/bash`
- Confirm `set -euo pipefail` is present and understand its implications:
  - `-e`: Exit on error
  - `-u`: Exit on undefined variable
  - `-o pipefail`: Return exit status of last failed command in a pipeline
- Consider if `set -x` (debug mode) should be mentioned for development/troubleshooting

**Review for:**
- Whether stricter error handling is needed (e.g., trap handlers for cleanup)
- If `-e` might cause issues with commands expected to fail (use `if` statements)

## 2. Documentation and Usage

**Check:**

- Presence of clear usage documentation/comments at the top for function and main code (explain the why, not the how)
- Parameter descriptions with defaults clearly stated
- Example invocations provided
- Script purpose and high-level workflow explained

**Review for:**
- Completeness: Are all parameters documented?
- Accuracy: Do examples match actual parameter order?
- Clarity: Can a new user understand how to use the script?

## 3. Variable Handling

**Check:**
- Use of `${VAR}` syntax instead of `$VAR` for clarity and safety
- Proper quoting of variables: `"$VAR"` to prevent word splitting and globbing
- UPPERCASE for environment/global variables, lowercase for local variables
- `readonly` for constants that shouldn't change
- `local` keyword for function-scoped variables

**Review for:**
```bash
# Good practices:
readonly CONSTANT_VALUE="fixed"
local function_var="value"
variable_name="${1:-default}"  # Parameter with default
path_to_file="${HOME}/documents"

# Issues to flag:
unquoted_var=$1  # Missing quotes
$variable  # Unbraced variable reference
globalVar="value"  # Should be local in function
```

## 4. Parameter and Input Validation

**Check:**
- Validation of required parameters
- Type checking (file exists, directory exists, numeric values, etc.)
- Range validation (positive numbers, specific allowed values)
- Early exit on validation failures with clear error messages

**Review for:**
```bash
# Good validation examples:
if [[ ! -d "$WORKING_DIR" ]]; then
    echo "Error: Working directory '$WORKING_DIR' does not exist." >&2
    exit 1
fi

if [[ -z "$REQUIRED_PARAM" ]]; then
    echo "Error: Required parameter missing." >&2
    exit 1
fi

# Check for numeric values:
if ! [[ "$PORT" =~ ^[0-9]+$ ]]; then
    echo "Error: PORT must be numeric." >&2
    exit 1
fi
```

## 5. Error Handling and Logging

**Check:**
- Error messages written to stderr: `>&2`
- Meaningful exit codes (0 for success, non-zero for failures)
- Use of `trap` for cleanup on exit/error
- Consistent error message format
- Warnings vs errors appropriately distinguished

**Review for:**
```bash
# Good error handling:
cleanup() {
    rm -f "$temp_file"
}
trap cleanup EXIT ERR

if [[ ! -f "$config_file" ]]; then
    echo "Error: Configuration file not found: $config_file" >&2
    exit 1
fi

# Warning (continue execution):
if [[ ! -s "$optional_file" ]]; then
    echo "Warning: Optional file empty or missing: $optional_file" >&2
fi
```

## 6. Command Execution and Pipelines

**Check:**
- Proper handling of command substitution: `$(command)` instead of backticks
- Array usage for commands with multiple arguments
- Checking command availability: `command -v tool_name`
- Proper quoting in command arguments

**Review for:**
```bash
# Good practices:
if ! command -v gracebat &> /dev/null; then
    echo "Error: gracebat not found in PATH" >&2
    exit 1
fi

# Use arrays for complex commands:
cmd_args=(
    --input "$input_file"
    --output "$output_file"
    --verbose
)
some_command "${cmd_args[@]}"

# Bad practice to flag:
for file in $(find . -name "*.txt")  # Breaks on spaces!
# Should be:
while IFS= read -r -d '' file; do
    # process "$file"
done < <(find . -name "*.txt" -print0)
```

## 7. File and Path Operations

**Check:**
- Use of `-type f` or `-type d` in find commands
- Proper null-terminated input handling with `-print0` and `read -d ''`
- Testing file/directory existence before operations
- Handling of paths with spaces, special characters
- Use of `basename`, `realpath`, and `dirname` correctly

**Review for:**
```bash
# Problematic loop (breaks on spaces):
for file in $(find . -name "*.xtc"); do
    process "$file"  # ISSUE: word splitting on spaces
done

# Better approaches:
# Option 1: Use while read with process substitution
while IFS= read -r -d '' file; do
    process "$file"
done < <(find . -name "*.xtc" -print0)

# Option 2: Use find -exec
find . -name "*.xtc" -exec process {} \;

# Option 3: Simple glob (if no recursion needed)
for file in ./*.xtc; do
    [[ -e "$file" ]] || continue  # Handle no matches
    process "$file"
done
```

## 8. Conditionals and Test Expressions

**Check:**
- Use of `[[ ]]` instead of `[ ]` (bash builtin, more features, safer)
- Proper operators: `-eq` for numbers, `=` or `==` for strings
- Quoting in test expressions
- Logical operators: `&&` and `||` vs `-a` and `-o`

**Review for:**
```bash
# Preferred (bash):
if [[ "$var" == "value" ]]; then
    # ...
fi

if [[ -f "$file" && -r "$file" ]]; then
    # ...
fi

# Avoid (old style):
if [ "$var" = "value" -a -f "$file" ]; then  # Flag for modernization
    # ...
fi
```

## 9. Security Considerations

**Check:**
- No unquoted variable expansion (can lead to command injection)
- Avoiding `eval` unless absolutely necessary
- Sanitizing user input
- Secure temp file creation: `mktemp`
- Minimal use of `sudo` or running as root
- No hardcoded passwords or secrets

**Review for:**
```bash
# Security issues:
rm -rf $user_input/*  # DANGEROUS: unquoted variable
eval "$user_command"   # DANGEROUS: arbitrary code execution

# Secure alternatives:
rm -rf "${user_input:?}/"*  # Quoted + fail if empty
# Avoid eval; restructure code

# Secure temp files:
temp_file=$(mktemp) || exit 1
trap 'rm -f "$temp_file"' EXIT
```

## 10. Modern Bash Features and Idioms

**Check:**
- Use of arrays for lists of items
- Parameter expansion for string manipulation
- Process substitution: `<()` and `>()`
- Here-documents and here-strings
- `mapfile`/`readarray` for reading into arrays

**Review for:**
```bash
# Modern parameter expansion:
filename="${path##*/}"      # basename
extension="${filename##*.}" # get extension
name="${filename%.*}"       # remove extension
upper="${var^^}"            # uppercase
lower="${var,,}"            # lowercase

# Arrays:
declare -a files
mapfile -t files < <(find . -name "*.txt")
for file in "${files[@]}"; do
    process "$file"
done

# Default values:
variable="${1:-default_value}"
variable="${1:?Error: parameter required}"
```

## 11. Performance and Efficiency

**Check:**
- Avoiding unnecessary subshells
- Minimizing external command calls in loops
- Using built-in string operations instead of `sed`/`awk` when possible
- Parallel processing opportunities (`xargs -P`, `GNU parallel`)

**Review for:**
```bash
# Inefficient:
for file in "${files[@]}"; do
    count=$(cat "$file" | wc -l)  # Useless use of cat
done

# Better:
for file in "${files[@]}"; do
    count=$(wc -l < "$file")
done

# Or even better with built-ins:
count=$(wc -l < "$file")
```

## 12. Code Organization and Functions

**Check:**
- Breaking complex logic into functions
- Functions have single, clear responsibilities
- Function parameters properly documented
- Return values vs exit codes appropriately used
- Main execution logic at bottom of script

**Review for:**
```bash
# Good structure:
#!/usr/bin/env bash
set -euo pipefail

# Function definitions
validate_input() {
    local input="$1"
    # validation logic
    return 0
}

process_file() {
    local file="$1"
    # processing logic
}

main() {
    validate_input "$@"
    # main logic
}

# Script execution
main "$@"
```

## 13. Portability

**Check:**
- Bash-specific features when shebang is `#!/bin/bash`
- POSIX compliance if needed (shebang: `#!/bin/sh`)
- External command availability (GNU vs BSD tools)
- Path assumptions (hardcoded `/usr/local/bin`, etc.)

**Review for:**
- Are bash-specific features used with bash shebang?
- Are tools checked for availability before use?
- Will script work on different systems (Linux, macOS, BSD)?

## 14. Code Style and Readability

**Check:**
- Consistent indentation (2 or 4 spaces, not tabs)
- Meaningful variable and function names
- Comments explaining "why", not "what"
- Logical grouping of related code
- Whitespace for readability

**Review for:**
- Is the code self-documenting?
- Are complex operations commented?
- Is the flow easy to follow?

## 15. Testing and Maintainability

**Check:**
- Testable structure (functions that can be sourced)
- Edge cases considered
- Input validation comprehensive
- Exit codes consistent and documented
- Script behavior predictable

**Review for:**
- Can this script be tested easily?
- Are there obvious edge cases not handled?
- Is the script maintainable by others?

---

## Specific Review Template for the Provided Script

When reviewing a specific script, address each section:

### ✅ Strengths
- List what the script does well

### ⚠️ Issues and Improvements
- **Critical**: Issues that could cause failures or security problems
- **Important**: Best practice violations or robustness issues
- **Suggestions**: Style improvements and optimizations

### 🔧 Recommended Changes
- Provide specific code examples for fixes

### 📋 Summary
- Overall assessment
- Priority recommendations

---

Your task is to review the following:
