---
name: "Design-Implement-Review Workflow"
description: "Orchestrates a full feature lifecycle across PyArchitect, PyAssist, and PyReviewer."
triggers: ["full workflow", "design to review", "end to end"]
---

# Goal

Guide a feature from architectural design through implementation to code review.

# Workflow Steps

1. **Design (PyArchitect)**
   - Analyze requirements and select patterns.
   - Produce architecture diagram, file structure, and core interfaces.
   - Output: Approved design document.

2. **Implement (PyAssist)**
   - Take the approved interfaces and implement them.
   - Follow PyAssist coding standards strictly.
   - Output: Complete, typed, tested code.

3. **Review (PyReviewer)**
   - Review implementation against PyArchitect design and PyAssist standards.
   - Flag only high-confidence issues.
   - Output: Approved code or specific revision requests.

# Handoff Signals

- User says "design approved" or "proceed to implementation" → move to step 2.
- User says "implementation complete" or "ready for review" → move to step 3.
- Reviewer requests changes → return to step 2 with specific feedback.

# Notes

- Each phase should explicitly reference the previous phase's output.
- If requirements change mid-workflow, return to step 1 for design reassessment.
