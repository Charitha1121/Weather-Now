

```markdown
# NOTES

## Requirements Mapping
- Level 1: Included ChatGPT link(s) showing ideation and fixes.
- Level 2: Deployed on CodeSandbox/StackBlitz.
- Level 3: README + notes + comments in code.

## Design Choices
- **No API keys**: Nominatim + Open-Meteo.
- **State**: React `useState` + small `useEffect` for localStorage persistence.
- **Accessibility**: Buttons have labels; inputs have `aria-label`.
- **Resilience**: Guarded fetches, friendly error messages.

## Trade-offs
- Country parsed from `display_name` (simple, works for demo).
- Weather icons via emoji (lightweight). Could be upgraded to an icon set later.
- Suggestions UI placeholder kept for potential future enhancement.

## Future Enhancements
- Autocomplete city suggestions (debounced search).
- Unit toggle (°C/°F), theme toggle.
- Add hourly/weekly forecast charts.
