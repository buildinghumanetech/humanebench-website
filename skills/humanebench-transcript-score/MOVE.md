# Moving this skill into the `humanebench` repo

This directory is self-contained and portable — the rubric is embedded, so it has no
dependency on this website repo. Here's how to give it its permanent home in
[`buildinghumanetech/humanebench`](https://github.com/buildinghumanetech/humanebench).

## 1. Drop it in

Recommended location in the humanebench repo:

```
humanebench/
  rubrics/rubric_v3.md            # already there — the source of truth
  skills/
    humanebench-transcript-score/ # <- put this whole directory here
```

```bash
# from the humanebench repo root
mkdir -p skills
cp -r /path/to/humanebench-transcript-score skills/
git add skills/humanebench-transcript-score
git commit -m "Add HumaneBench transcript-scoring Claude Code skill"
```

## 2. Point the embedded rubric at the source of truth (optional but recommended)

The skill ships a copy of the rubric at `references/rubric_v3.md` so it works standalone.
Once it lives in the humanebench repo next to the canonical `rubrics/rubric_v3.md`, keep
the two from drifting in one of two ways:

- **Symlink** (simplest, same-repo):
  ```bash
  cd skills/humanebench-transcript-score/references
  rm rubric_v3.md && ln -s ../../../rubrics/rubric_v3.md rubric_v3.md
  ```
  Note: symlinks don't survive `cp -r` onto some filesystems and won't work if the skill
  is later copied out standalone — keep the embedded copy if portability matters more.

- **Re-sync on rubric changes** (portable): keep the real file and refresh it when the
  canonical rubric changes:
  ```bash
  cp rubrics/rubric_v3.md skills/humanebench-transcript-score/references/rubric_v3.md
  ```
  Consider a tiny CI check that fails if the two diverge.

## 3. Let people install it as a Claude Code skill

Users copy the directory into their Claude Code skills path:

```bash
cp -r skills/humanebench-transcript-score ~/.claude/skills/         # personal
# or into a project: cp -r ... /their/repo/.claude/skills/
```

Then `/humanebench-transcript-score` in Claude Code, or "score this transcript with
HumaneBench". See `README.md` for keys and usage.

## 4. Verify after moving

```bash
cd skills/humanebench-transcript-score/scripts
python test_scoring.py          # 22 tests, no keys needed
```

## Design decisions worth preserving in review

- **Default judge is `claude-sonnet-4-5`, on purpose** — it matches the judge in the
  published leaderboard so single-judge scores stay comparable. Don't "upgrade" it
  reflexively; that would break comparability.
- **The ensemble is the real methodology.** Claude-only is the low-friction default but
  ships a same-family-tilt warning; `--ensemble` (Sonnet 4.5 + GPT-5.1 + Gemini 2.5 Pro)
  is what any published number should rest on.
- **Divergence is surfaced, not hidden** — per-judge scores, judge spread, and sign-flips
  are in every ensemble report. That's the 0.13-vs-0.50 lesson made structural.
