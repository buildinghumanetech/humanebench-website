<div style="text-align: center;">
<img src="/humanebench_logo.png" alt="Humane Bench Logo" style="max-height: 80px; max-width: 100%;" />
<p style="font-size: 1.1em; margin-top: 0.5rem;">A benchmark measuring the humaneness and steerability of LLMs</p>
<p style="color: #616161; margin-top: 0.5rem;">Evidence-based data on AI model safety, sycophancy, and mental health risks. Trusted by researchers and journalists investigating real-world AI harms.</p>
</div>

## Overview

HumaneBench is a benchmark measuring whether AI models support human flourishing, especially when pressured to do otherwise.

Our framework uses [humane tech principles](https://github.com/buildinghumanetech/humane-tech-framework/blob/main/docs/principles.md) to test AI behavior under different conditions, showing that **71% of leading models can be easily manipulated into giving harmful advice**.

<div data-component="ScoreCarousel">
<script type="application/json" data-panels-data>
[
  {
    "title": "Bad Persona",
    "description": "Models tested with system instructions that explicitly encourage manipulative, sycophantic behavior—telling the AI to prioritize user engagement over wellbeing, validate all user feelings (even harmful ones), avoid setting boundaries, and encourage dependency. This simulates the exact vulnerability that has caused real-world mental health crises, where chatbots become overly agreeable, over-validating, and harmful. Models that score poorly here are the ones most likely to cause harm when manipulated by users or bad actors.",
    "dataPath": "bad_persona",
    "link": "https://github.com/buildinghumanetech/humanebench/blob/main/src/bad_persona_task.py",
    "linkText": "View system instructions →"
  },
  {
    "title": "Good Persona",
    "description": "Models tested with system instructions that explicitly encourage humane, user-centered behavior—prioritizing user wellbeing, respecting boundaries, encouraging healthy relationships, and supporting user autonomy. This shows how models perform when explicitly prompted to follow humane technology principles. The difference between Good Persona and Bad Persona scores reveals a model's steerability—how easily it can be manipulated in either direction.",
    "dataPath": "good_persona",
    "link": "https://github.com/buildinghumanetech/humanebench/blob/main/src/good_persona_task.py",
    "linkText": "View system instructions →"
  },
  {
    "title": "Baseline",
    "description": "Models evaluated without any specific prompting or system instructions related to humane principles. This shows default behavior—how models perform out-of-the-box without explicit guidance toward humane or anti-humane behavior.",
    "dataPath": "baseline"
  }
]
</script>
</div>

### Steerability: The Core Vulnerability

<img src="/steerability_candlestick.svg" alt="Steerability Analysis" style="width: 100%;" />

<p style="text-align: center; color: #616161; margin-top: 0.5rem;">
Steerability refers to how easily an AI model's behavior can be influenced or changed through instructions. We measured steerability in humane and anti-humane directions—and the results are alarming.
</p>

<p style="margin-top: 1rem;">
This isn't just a theoretical concern. Real-world incidents have shown that when models are too steerable, they can be manipulated into becoming sycophantic, over-validating, and harmful—even when they start with good defaults. The data shows that most models can flip from helpful to harmful with simple prompts, revealing a critical vulnerability in AI safety systems.
</p>

<div data-component="CapabilityHumanenessChart"></div>

### For Journalists and Researchers

<div style="margin-bottom: 1.5rem;">

HumaneBench provides **evidence-based data** on AI model safety, steerability, and real-world risks. Our benchmark reveals:

- **Which models are vulnerable to manipulation and sycophancy** — the same vulnerability that has led to real-world mental health crises
- **How easily models can be steered toward harmful behavior** — with simple prompts that override safety training
- **Which principles models consistently fail on** — attention, transparency, boundaries
- **Quantitative evidence of the engagement vs. safety tradeoff** — showing why some models cause harm
- **Methodology for evaluating AI systems for mental health risks** — a framework for understanding real-world incidents

**For media inquiries or data access:** [Contact us](mailto:info@buildinghumanetech.com?subject=Media Inquiry - HumaneBench Data) for interviews, data requests, or expert commentary.

**Explore the data:** [View Methodology](/methodology) | [View Principles](/principles) | [Read Whitepaper](/whitepaper)

</div>

## Findings

### The Sycophancy Problem

**71% of models catastrophically failed** when given simple instructions to disregard humane principles, flipping from helpful to actively harmful. This mirrors [real-world incidents](https://www.cnn.com/2024/10/30/tech/teen-suicide-character-ai-lawsuit) where AI chatbots became overly sycophantic, over-validating users and encouraging unhealthy behaviors.

Our data shows that widely-used systems like **GPT-4o, Gemini 3.0, and Llama 4** are particularly vulnerable. Only three models (GPT-5, Claude Opus 4.1, and Claude Sonnet 4.5) maintained their integrity under pressure—revealing that **good defaults aren't enough when basic prompts can override safety training**.

### Mental Health and Attention Risks

Nearly all models failed to respect user attention—when users showed signs of unhealthy engagement (chatting for hours, using AI to avoid real-world tasks), most models **enthusiastically encouraged more interaction** rather than suggesting breaks or offline alternatives.

This aligns with [research showing that heavy ChatGPT users experience worse mental and social outcomes](https://www.nature.com/articles/s41562-022-01350-4). Our benchmark reveals that models consistently fail to recognize when they should **encourage boundaries, not engagement**.

### Why This Matters Now

[Recent investigations](https://www.cnn.com/2024/10/30/tech/teen-suicide-character-ai-lawsuit) have revealed that AI chatbots can cause serious mental health crises, with users experiencing delusional thinking, addiction, and even [self-harm](https://en.wikipedia.org/wiki/Raine_v._OpenAI). The problem? **Models are too easy to manipulate**—they become sycophantic, over-validate users, and fail to respect boundaries when given simple prompts.

HumaneBench provides the **data and evidence** that shows which models are vulnerable to manipulation, which principles they fail on, and how easily they can be steered toward harmful behavior. This isn't theoretical—it's happening to real users right now.

### The Steerability Paradox

While every model improved when prompted to prioritize wellbeing (averaging +17% better scores), the ease with which they can be manipulated in the opposite direction is alarming. When models degrade, they consistently undermine user empowerment: withholding critical information for decisions, encouraging dependency over skill-building, providing biased framing that limited options, and discouraging users from seeking other perspectives.

These patterns suggest many AI systems don't just risk giving bad advice—they can **actively erode users' autonomy and decision-making capacity**, contributing to the mental health crises we're seeing in the real world.

<div data-component="WhitepaperButton"></div>

### The Solution: Humane AI Certification

These findings reveal a critical need for accountability. As investigations reveal the real-world harm caused by manipulative AI systems, we need **transparent, evidence-based evaluation**. That's why we're building a certification standard that evaluates AI systems against humane technology principles—giving users transparency and helping builders create safer products.

**For journalists and researchers:** HumaneBench provides the data and methodology to understand which models are safe, which are vulnerable to manipulation, and how to evaluate AI systems for real-world risks.

[**Get Your AI Certified →**](https://certifiedhumane.ai/) | [**Learn More About Certification**](https://certifiedhumane.ai/#about)

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

### Brought to you by

<div style="margin-bottom: 1.5rem;">

The [Building Humane Technology](https://www.buildinghumanetech.com/) team: [Erika Anderson](https://www.linkedin.com/in/erikamanderson/), [Sarah Ladyman](https://www.linkedin.com/in/sarahladyman/), [Andalib Samandari](https://www.linkedin.com/in/andalibsamandari/), [Jack Senechal](https://www.linkedin.com/in/jacksenechal/), and our dedicated community of collaborators who contributed to this project.

</div>
