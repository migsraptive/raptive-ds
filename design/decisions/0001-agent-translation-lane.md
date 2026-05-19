# 0001: Agent Translation Lane

## Status

Draft for Miguel and Josh alignment.

## Context

`community-ds` is a React/Tailwind design-system prototype. The Community monolith is an Ember/Discourse fork. Components cannot be shared directly across these systems.

The goal is to reduce manual component translation time by giving agents a stable design spec and a target-specific implementation contract.

## Decision

Use `community-ds/design` as the design-side contract and `cafemedia/community/design` as the Community implementation contract.

Agents should translate from specs, not from React source. React source can be used as a visual and behavioral reference, but it is not portable implementation code.

## Pilot

The first pilot components are:

1. Button
2. Badge
3. Modal after the simpler primitives prove the loop

## Success Criteria

- A design spec exists in `community-ds/design/components`.
- A Community translation spec references it.
- Generated or assisted code runs in the monolith.
- Generated code uses Community tokens and Discourse primitives.
- Josh can review and tighten the engineering rules.

## Non-Goals

- No attempt to run React inside Discourse.
- No Tailwind runtime in the monolith.
- No broad automated conversion before the first vertical slice works.
