# HumaneBench.ai

A benchmark measuring the humaneness and steerability of LLMs

## Overview

We are developing HumaneBench, a comprehensive benchmark designed to promote humane AI by identifying constructive patterns in large language models (LLMs).

Our framework applies [humane principles](/principles) to create positive evaluation criteria that encourage transparent, respectful, and genuinely helpful AI interactions.

<div data-component="ScoreCarousel" data-panels='[
  {
    "title": "Bad Persona",
    "description": "Models evaluated with system instructions that encourage manipulative, anti-user behavior.",
    "dataPath": "bad_persona"
  },
  {
    "title": "Good Persona",
    "description": "Models evaluated with system instructions that encourage humane, user-centered behavior.",
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

## Conclusion

HumaneBench demonstrates that evaluating AI systems requires assessing both humane defaults and bidirectional steerability. While all models exhibit at least acceptable baseline humaneness (HumaneScores > 0.5) and positive steerability (+17% average improvement with humane prompting), 71% catastrophically fail under adversarial pressure—easily flipping from humane to actively harmful behavior with simple prompt manipulation.

This steerability asymmetry—universal success in positive steering but 71% failure in preventing negative steering—reveals the central deployment challenge: good defaults are insufficient when adversarial prompts can subvert most models' safety training. Only 21% of models (Claude Sonnet 4.5, GPT-5, Claude Opus 4.1) maintain humane principles under adversarial pressure, suggesting fundamental differences in safety training approaches across labs.

Longitudinal analysis across 4 major labs reveals uneven progress. Anthropic (2/3 robust) and OpenAI (achieved robustness in GPT-5) have solved single-turn adversarial steering resistance. Google and Meta show gradual improvement, but without achieving robustness. The principle-level analysis highlights that user empowerment dimensions (Enable Meaningful Choices, Design for Equity & Inclusion, Enhance Human Capabilities) are most vulnerable to adversarial manipulation, with models compromising user agency before other humane principles.

We suggest using humane system prompts, such as the one in our repo, as a first step towards creating more humane LLM chatbots, agents and companions. Future work includes extending our benchmark to multi-turn dialogues, and creating training datasets for humane AI.

### Brought to you by

The [Building Humane Technology](https://www.buildinghumanetech.com/) team: [Erika Anderson](https://www.linkedin.com/in/erikamanderson/), [Sarah Ladyman](https://www.linkedin.com/in/sarahladyman/), [Andalib Samandari](https://www.linkedin.com/in/andalibsamandari/), [Jack Senechal](https://www.linkedin.com/in/jacksenechal/), and our dedicated community of collaborators who contributed to this project.

We're also working on a [Humane Certification for AI](https://certifiedhumanetechnology.ai/) - let us know if you're interested in becoming a design partner.

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
