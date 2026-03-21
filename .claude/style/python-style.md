name: "Python Style Reference"

description: "Shared Python style conventions derived from Google  Python Style Guide, adapted for PyAssist/PyArchitect standards."

# Python Style Reference

This document captures style conventions shared across all Python agents.  
It supplements (does **not** override) agent-specific rules.

---

## Docstrings

Use **NumPy-style docstrings** for all public APIs.  
This differs from Google style but is standard for scientific Python and our
codebase.

---

## Comprehensions & Generators

- Each comprehension must fit conceptually on one line:
  - mapping expression
  - single `for` clause
  - optional single filter
- **No** multiple `for` clauses or multiple filters in comprehensions.
- Use explicit loops when logic is complex.

```python
# Yes
result = [transform(x) for x in items if x.is_valid()]

# No — multiple for clauses
result = [(x, y) for x in range(10) for y in range(5) if x * y > 10]

# Yes — use a loop instead
result = []
for x in range(10):
    for y in range(5):
        if x * y > 10:
            result.append((x, y))
````

---

## Default Arguments

Never use mutable objects as default argument values.

```python
# Yes
def process(items: list[str] | None = None) -> list[str]:
    if items is None:
        items = []
    ...
```

```python
# No
def process(items: list[str] = []) -> list[str]:
    ...
```

---

## Lambda Functions

* Lambdas should fit on one line (≤ 80 chars for the lambda itself).
* If longer, define a named function instead.
* Prefer `operator` module functions over trivial lambdas
  (`operator.mul` instead of `lambda x, y: x * y`).

---

## Boolean Expressions

* Use implicit truthiness:

  * `if items:`
  * not `if len(items) > 0:`
* Always use:

  * `is None`
  * `is not None`
* Never compare booleans with:

  * `== True`
  * `== False`

---

## Line Length

Maximum line length is **80 characters**.

**Exceptions:**

* Long import statements
* URLs or file paths in comments
* String constants that would be awkward to split

Use implicit line continuation inside parentheses, brackets, and braces.
Avoid backslash continuation except for `with` statements with 3+ context
managers.

---

## Threading & Concurrency

* Do not rely on atomicity of built-in types (`dict`, `list`).
* Use `queue.Queue` for thread communication.
* Use `threading.Lock` or `threading.Condition` for synchronization.

---

## Power Features to Avoid

Unless there is a compelling, documented reason:

* No custom metaclasses
* No `exec()` or `eval()` with dynamic input
* No bytecode manipulation
* No dynamic inheritance or object reparenting
* No import hacks or `sys.path` manipulation

Standard library utilities that use these internally
(e.g. `dataclasses`, `abc.ABCMeta`, `enum`) are fine.

---

## TODO Comments

Use a consistent format for searchability.

```python
# TODO(username): Brief explanation of what needs to be done.
# TODO(username): Fix by 2025-Q2 — migrate to new API.
```

---

## Ternary Expressions

* Each part (condition, true-expr, false-expr) should fit on one line.
* If it doesn’t fit cleanly, use a full `if / else` block.

```python
# Yes
status = "active" if user.is_active else "inactive"
```

```python
# No — too long, use if/else
status = (
    "This is a very long active status message"
    if user.is_active and user.has_permissions
    else "inactive"
)
```

---

## String Formatting

* Prefer **f-strings** for all new code.
* Use `.format()` or `%` only when f-strings are not possible
  (e.g. logging with lazy evaluation).
* Never use `+` for building strings in loops;
  use `"".join(parts)` instead.

```

---

如果你愿意，下一步我可以帮你：

- 🔹 合并进 **PyAssist 总规范**（你前面那份大 prompt）
- 🔹 精简成 **Cursor / Kilo 专用短规则**
- 🔹 拆成 **lint / typing / design 三个子文档**
- 🔹 直接生成一个 **`AGENTS.md` 最终版**

你现在这份已经是**工程级可直接用**的了。
```
