# Contributing to Capibarismo

Thank you for your interest in contributing to **Capibarismo** — a civic technology platform built for Peru's 2026 presidential elections. This project turns candidate comparison into an engaging, gamified experience so that every Peruvian voter can make an informed choice. Your contributions directly support democratic transparency for millions of people. That matters.

---

## Welcome

Capibarismo is an open-source, non-partisan Civil-Tech project. We present verifiable information about presidential candidates using a unique 90s fighting game aesthetic that makes civic engagement accessible and fun. We believe democracy works better when citizens are well-informed — and we are building tools to make that possible.

We take contributions seriously. We expect the same from you.

---

## Core Maintainers

| Maintainer | Role |
|---|---|
| [@SanGoku95](https://github.com/SanGoku95) | Project lead & core maintainer |
| [@ditodamaster](https://github.com/ditodamaster) | Core maintainer |
| [@Railly](https://github.com/Railly) | Core maintainer |
| [@crafter-station/maintainers](https://github.com/orgs/crafter-station/teams/maintainers) | Core maintainers team |

For questions about the project direction or significant changes, reach out to the maintainers via [GitHub Issues](https://github.com/SanGoku95/capibarismo/issues) or [GitHub Discussions](https://github.com/SanGoku95/capibarismo/discussions).

---

## How to Contribute

1. **Fork** the repository on GitHub
2. **Create a feature branch** from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```
3. **Make your changes** following the guidelines below
4. **Test locally** to make sure nothing is broken
5. **Push your branch** and open a **Pull Request** against `main`

For large changes or new features, please open an issue first to discuss the approach with the maintainers before investing time in implementation.

---

## Development Setup

```bash
# Clone your fork and install dependencies
git clone https://github.com/YOUR_USERNAME/capibarismo.git
cd capibarismo
npm install

# Copy environment variables (optional for basic development)
cp .env.example .env.local

# Start the development server
npm run dev
# → http://localhost:8080
```

### Useful Commands

| Command | Description |
|---|---|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Production build (runs data validation) |
| `npm run preview` | Preview the production build locally |
| `npm test` | Run the test suite |
| `npm run lint` | Run ESLint code linting |
| `npm run typecheck` | TypeScript type checking (no emit) |

See [ENVIRONMENT.md](./ENVIRONMENT.md) for environment variable configuration and [dev.md](./dev.md) for comprehensive technical documentation.

---

## PR Guidelines

### Commit Message Format

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>: <short description>

[optional body]
[optional footer]
```

**Types:**
- `feat:` — A new feature
- `fix:` — A bug fix
- `docs:` — Documentation changes only
- `chore:` — Maintenance tasks (dependencies, config, etc.)
- `refactor:` — Code restructuring without behavior change
- `test:` — Adding or updating tests
- `perf:` — Performance improvements

**Examples:**
```
feat: add candidate comparison for R1 bracket round
fix: correct vote count display on podium screen
docs: update CONTRIBUTING.md with PR guidelines
chore: upgrade vite to 5.2.0
```

### Pull Request Requirements

- **Title**: Follow conventional commit format
- **Description**: Explain *what* changed and *why*
- **Scope**: Keep PRs focused — one concern per PR
- **Tests**: Add or update tests for any logic changes
- **Data changes**: Must follow the Facts Protocol (see below)

### Facts Protocol for Data Contributions

Capibarismo holds itself to strict standards for candidate data. If your PR modifies candidate information:

1. **Atomic facts only** — each item must be a record, quote, official document, or dated event. No analysis.
2. **Primary sources required** — every fact needs ≥1 primary source (official list, law PDF, candidate's official site)
3. **Timestamped** — include `observed_at` and the jurisdiction/role it applies to
4. **No adjectives** — no intensifiers ("massive", "controversial"), no modal speculation. Numbers, units, attribution.
5. **Uncertainty flag** — if two credible primary sources conflict, mark `status: "contested"` and show both values
6. **Symmetry rule** — if you add data for one candidate on a topic, attempt equivalent data for peers (mark "no disponible" if unavailable)
7. **Verification step** — include a 1–2 line "How to verify" instruction with each fact

---

## Code of Conduct

Capibarismo is a Civil-Tech project built on the principle that **verified information strengthens democracy**. We hold contributors to a high standard of conduct consistent with that mission.

**We expect:**
- Respectful, professional communication in all interactions
- Good faith engagement: assume positive intent, ask for clarification before assuming bad intent
- Honest acknowledgment of uncertainty — "I don't know" is a valid answer
- Focus on the technical and civic merits of contributions, not personalities

**We do not tolerate:**
- Partisan advocacy or promotion of any candidate or party through contributions
- Introducing unverified or misleading information under any framing
- Harassment, personal attacks, or discriminatory language
- Attempts to circumvent the Facts Protocol for ideological reasons

Violations may result in contributions being rejected and contributors being blocked from the project. If you witness a violation, report it via [GitHub Issues](https://github.com/SanGoku95/capibarismo/issues).

---

## License

By contributing to Capibarismo, you agree that your contributions will be licensed under the **Apache License 2.0**, consistent with the project's [LICENSE](./LICENSE) file.

Copyright for the project remains with the original authors:

> Copyright 2025 Sangoku and Contributors

You retain copyright over your own contributions, but you grant the project and its users the rights described in the Apache 2.0 license. Please do not contribute code that you do not have the right to license under these terms.

---

*Built by [@SanGoku95](https://github.com/SanGoku95), [@ditodamaster](https://github.com/ditodamaster), and [@crafter-station/maintainers](https://github.com/orgs/crafter-station/teams/maintainers)*
