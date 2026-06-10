# Design Documentation

This folder is the design-side source of truth for the agent translation lane.

The goal is to describe what a component means before any agent tries to implement it in another framework. These docs should stay product and design focused. Ember, Discourse, plugin ownership, and generated-code rules belong in `cafemedia/community/design`.

## Structure

```text
design/
  accessibility/
    standards.md
  components/
    _component-spec-template.yml
    badge.yml
    button.yml
  decisions/
    0001-agent-translation-lane.md
  patterns/
  tokens/
    canonical-token-language.md
  automation.md
  README.md
  system-usage.md
```

## Ownership

Miguel owns the design language, component behavior, variants, states, and token intent documented here.

Josh owns the engineering translation constraints in the Community monolith. These docs should give Josh and agents enough design context to produce a faithful Ember implementation without treating React source as portable code.

## What Belongs Here

- Component specs that define purpose, anatomy, variants, states, content rules, token intent, and accessibility requirements.
- Pattern specs that define multi-component user flows such as the creator application.
- Canonical token language used when talking across React, Figma, and Community.
- Design decisions that explain why the translation lane exists.
- Automation notes for syncing repo-managed design context into Figma.

## What Does Not Belong Here

- Ember implementation details.
- Discourse plugin ownership decisions.
- Generated monolith code.
- Tailwind classes as a handoff contract.
- One-off notes that only matter to a single implementation task.

## Current Pilot

The first proof should use:

1. Button
2. Badge
3. Modal, after Button and Badge validate the process

Button and Badge are intentionally small enough to prove the translation loop. Modal should come after Josh confirms how strictly generated code should wrap Discourse `DModal`.
