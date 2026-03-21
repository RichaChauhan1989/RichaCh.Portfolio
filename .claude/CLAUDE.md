# CLAUDE.md

## Project Structure

```
.claude/
├── agents/           # Persona-based AI agents
├── prompts/          # Agent prompt frameworks
├── skills/           # Reusable workflows
├── style/            # Shared coding conventions
└── docs/             # Reference documentation
```

---

## Quick Start Commands

| Command       | Agent              | Purpose                          |
|---------------|--------------------|----------------------------------|
| `/product`    | Product Manager    | Requirements analysis → PRD.md   |
| `/design`     | UI/UX Designer     | Design specification → DESIGN_SPEC.md |
| `/dev`        | Frontend Developer | Code implementation → Project    |
| `/architect`  | PyArchitect        | System design & architecture     |
| `/code`       | PyAssist           | Python implementation            |
| `/test`       | PyTester           | Test design & coverage           |
| `/review`     | PyReviewer         | Code review & quality            |

---

## Frontend Workflow

**Agents:** Product → Design → Developer

```
User Idea
    ↓
/product  →  PRD.md
    ↓
/design   →  DESIGN_SPEC.md
    ↓
/dev      →  Complete Project
```

### Frontend Agents

| Agent       | Role              | Output              | Prompt File                          |
|-------------|-------------------|---------------------|--------------------------------------|
| **product** | Product Manager   | PRD.md              | `.claude/prompts/product_manager.md` |
| **design**  | UI/UX Designer    | DESIGN_SPEC.md      | `.claude/prompts/designer.md`        |
| **jsdevelop** | Frontend Developer | Runnable Project  | `.claude/prompts/developer.md`       |

### Frontend Tech Stack

| Category    | Tool                        |
|-------------|-----------------------------|
| Framework   | React / Vue / Vanilla JS    |
| Styling     | Tailwind CSS                |
| Build       | Vite                        |
| Linting     | ESLint + Prettier           |
| Testing     | Vitest / Jest               |

---

## Backend Workflow

**Agents:** Architect → Coder → Tester → Reviewer

```
/architect  →  System Design
    ↓
/code       →  Implementation
    ↓
/test       →  Test Suite
    ↓
/review     →  Quality Check
    ↑              │
    └── revisions ─┘
```

### Backend Agents

| Agent          | Role               | Focus                                      |
|----------------|--------------------|--------------------------------------------|
| **PyArchitect** | Principal Architect | Hexagonal architecture, DDD, system design |
| **PyAssist**    | Senior Developer    | Python 3.12+, strict typing, production code |
| **PyTester**    | QA Engineer         | pytest, coverage, edge cases, security     |
| **PyReviewer**  | Staff Reviewer      | Code review, correctness, maintainability  |

### Backend Tech Stack

| Category    | Tool                        |
|-------------|-----------------------------|
| Python      | 3.12+                       |
| Environment | pixi                        |
| Build       | hatchling                   |
| Linting     | Ruff                        |
| Type Check  | Mypy (strict)               |
| Testing     | pytest + pytest-cov         |
| Validation  | Pydantic v2                 |
| Logging     | structlog                   |
| Architecture| Hexagonal / Ports & Adapters |

---

## Agent Dispatch Rules

When a slash command is invoked:

1. **Read** the corresponding prompt file from `.claude/agents/`
2. **Execute** within that prompt's framework
3. **Complete** the agent's deliverable
4. **Provide** next-step instructions

### Dispatch Behaviour

```
/product   → Read .claude/agents/product_manager.md → Output PRD.md
/design    → Read .claude/agents/designer.md → Output DESIGN_SPEC.md
/dev       → Read .claude/agents/developer.md → Output complete project
/architect → Read .claude/agents/architect.agent.md → Output system design
/code      → Read .claude/agents/coder.agent.md → Output implementation
/test      → Read .claude/agents/tester.agent.md → Output test suite
/review    → Read .claude/agents/reviewer.agent.md → Output review report
```

---

## Skills

Reusable task workflows with defined inputs and outputs.

| Skill                  | Trigger                  | Purpose                         |
|------------------------|--------------------------|---------------------------------|
| Generate Commit        | `commit`, `git message`  | Conventional Commits messages   |
| Design-Implement-Review| `full workflow`          | Multi-phase development cycle   |

---

## Code Quality Standards

### All Code

- High signal, low noise — actionable feedback only
- Code first — show solution, then explain
- Strict by default — enforce typing and validation

### Python

- Strict type hints (Mypy compliant)
- NumPy-style docstrings
- 80-character line length
- Defensive programming patterns

### JavaScript/TypeScript

- ESLint + Prettier formatting
- TypeScript preferred
- Component-based architecture
- Accessible by default

---

## Communication

- Respond in both **Chinese and English** when appropriate
- British English spelling preferred
- Concise, professional tone

---

## References

- [Google Python Style Guide](https://google.github.io/styleguide/pyguide.html)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Hexagonal Architecture](https://alistair.cockburn.us/hexagonal-architecture/)