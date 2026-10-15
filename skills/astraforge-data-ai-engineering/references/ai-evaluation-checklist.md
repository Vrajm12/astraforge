# AI and Data Evaluation Checklist

- Define intended users, supported use cases, out-of-scope use cases
- Build representative evaluation cases before tuning
- Include normal, edge, ambiguous, adversarial, and malformed inputs
- Establish a baseline and measurable pass criteria
- Test factual grounding and source attribution for retrieval-based features
- Test prompt injection and untrusted retrieved content
- Measure quality, latency, cost, failure rate, and privacy implications
- Check data leakage, train/test contamination, and sensitive-data handling
- Use deterministic validators for structured output where possible
- Document known failure modes and human escalation paths
