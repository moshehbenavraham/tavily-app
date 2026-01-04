# CONVENTIONS.md

## Guiding Principles

- Optimize for readability over cleverness
- Code is written once, read many times
- Consistency beats personal preference
- If it can be automated, automate it
- When writing code: Make NO assumptions. Do not be lazy. Pattern match precisely. Do not skim when you need detailed info from documents. Validate systematically.

## Naming

- Be descriptive over concise: `getUserById` > `getUser` > `fetch`
- Booleans read as questions: `isActive`, `hasPermission`, `shouldRetry`
- Functions describe actions: `calculateTotal`, `validateInput`, `sendNotification`
- Avoid abbreviations unless universally understood (`id`, `url`, `config` are fine)
- Match domain language--use the same terms as product/design/stakeholders

## Files & Structure

- One concept per file where practical
- File names reflect their primary export or purpose
- Group by feature/domain, not by type (prefer `/orders/api.ts` over `/api/orders.ts`)
- Keep nesting shallow--if you're 4+ levels deep, reconsider

## Functions & Modules

- Functions do one thing
- If a function needs a comment explaining what it does, consider renaming it
- Keep functions short enough to read without scrolling
- Avoid side effects where possible; be explicit when they exist

## Comments

- Explain *why*, not *what*
- Delete commented-out code--that's what git is for
- TODOs include context: `// TODO(name): reason, ticket if applicable`
- Update or remove comments when code changes

## Error Handling

- Fail fast and loud in development
- Fail gracefully in production
- Errors should be actionable--include context for debugging
- Don't swallow errors silently

## Testing

- Test behavior, not implementation
- A test's name should describe the scenario and expectation
- If it's hard to test, the design might need rethinking
- Flaky tests get fixed or deleted--never ignored

## Git & Version Control

- Commit messages: imperative mood, concise (`Add user validation` not `Added some validation stuff`)
- One logical change per commit
- Branch names: `type/short-description` (e.g., `feat/user-auth`, `fix/cart-total`)
- Keep commits atomic enough to revert safely

## Pull Requests

- Small PRs get better reviews
- Description explains the *what* and *why*--reviewers can see the *how*
- Link relevant tickets/context
- Review your own PR before requesting others

## Code Review

- Critique code, not people
- Ask questions rather than make demands
- Approve when it's good enough, not perfect
- Nitpicks are labeled as such

## Dependencies

- Fewer dependencies = less risk
- Justify additions; prefer well-maintained, focused libraries
- Pin versions; update intentionally

## Local Dev Tools

| Category | Tool | Config |
|----------|------|--------|
| Formatter | Black/Ruff (Python) | pyproject.toml |
| Linter | Ruff (Python), ESLint (TS) | - |
| Type Safety | Pydantic (Python), TypeScript | - |
| Testing | pytest (Python) | - |
| Observability | not configured | - |
| Git Hooks | not configured | - |

## When In Doubt

- Ask
- Leave it better than you found it
- Ship, learn, iterate
