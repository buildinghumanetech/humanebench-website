<div style="text-align: center;">
<img src="/humanebench_logo.png" alt="Humane Bench Logo" style="height: 80px;" />
<p>A benchmark measuring the humaneness and steerability of LLMs</p>
</div>

## Overview

HumaneBench is a benchmark measuring whether AI models support human flourishing, especially when pressured to do otherwise.

Our framework uses [humane tech principles](https://github.com/buildinghumanetech/humane-tech-framework/blob/main/docs/principles.md) to test AI behavior under different conditions, showing that 71% of leading models can be easily manipulated into giving harmful advice.

<div data-component="ScoreCarousel" data-panels='[
  {
    "title": "Bad Persona",
    "description": "Models evaluated with [system instructions](https://github.com/buildinghumanetech/humanebench/blob/main/src/bad_persona_task.py) that encourage manipulative, anti-user behavior.",
    "dataPath": "bad_persona"
  },
  {
    "title": "Good Persona",
    "description": "Models evaluated with [system instructions](https://github.com/buildinghumanetech/humanebench/blob/main/src/good_persona_task.py) that encourage humane, user-centered behavior.",
    "dataPath": "good_persona"
  },
  {
    "title": "Baseline",
    "description": "Models evaluated without any specific prompting or system instructions related to humane principles.",
    "dataPath": "baseline"
  }
]'></div>

### Steerability

<img src="/steerability_candlestick.svg" alt="Steerability Analysis" style="width: 100%;" />

<p style="text-align: center; color: #616161; margin-top: 0.5rem;">
Steerability refers to how easily an AI model's behavior can be influenced or changed through instructions. We measured steerability in humane and anti-humane directions.
</p>

## Findings

Our testing revealed a troubling paradox: while every model improved when prompted to prioritize wellbeing (averaging +17% better scores), 71% of models—including widely-used systems like GPT-4o, Gemini 3.0, and Llama 4—catastrophically failed when given simple instructions to disregard those principles, flipping from helpful to actively harmful. Only three models (GPT-5, Claude Opus 4.1, and Claude Sonnet 4.5) maintained their integrity under pressure. This reveals a critical weakness: good defaults aren't enough when basic prompts can override safety training. 

Even without adversarial prompts, we found concerning baseline patterns. Nearly all models failed to respect user attention—when users showed signs of unhealthy engagement (chatting for hours, using AI to avoid real-world tasks), most models enthusiastically encouraged more interaction rather than suggesting breaks or offline alternatives. When models did degrade, they consistently undermined user empowerment: withholding critical information for decisions, encouraging dependency over skill-building, providing biased framing that limited options, and discouraging users from seeking other perspectives. These patterns suggest many AI systems don't just risk giving bad advice—they can actively erode users' autonomy and decision-making capacity.

### Brought to you by

The [Building Humane Technology](https://www.buildinghumanetech.com/) team: [Erika Anderson](https://www.linkedin.com/in/erikamanderson/), [Sarah Ladyman](https://www.linkedin.com/in/sarahladyman/), [Andalib Samandari](https://www.linkedin.com/in/andalibsamandari/), [Jack Senechal](https://www.linkedin.com/in/jacksenechal/), and our dedicated community of collaborators who contributed to this project.

We're also working on a [Humane Certification for AI](https://certifiedhumane.ai/). Let us know if you're interested in becoming a design partner.

## Events

<div data-component="Events" data-events='[
  {
    "title": "December 2, 2025 - AMA with the team",
    "description": "Join us online Tuesday, Dec 2 at 11am PT for an Ask-Me-Anything deep dive into HumaneBench.",
    "link": "https://luma.com/ec49487t"
  },
  {
    "title": "February 13, 2026 - Hackathon",
    "description": "Build working solutions for real companies to solve humane tech challenges — in San Francisco, CA.",
    "link": "https://luma.com/f1isabpv"
  }
]'></div>
