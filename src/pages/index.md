<div style="text-align: center;">
<img src="/humanebench_logo.png" alt="Humane Bench Logo" style="max-height: 80px; max-width: 100%;" />
<p>A benchmark measuring the humaneness and steerability of LLMs</p>
</div>

## Overview

HumaneBench is a benchmark measuring whether AI models support human flourishing, especially when pressured to do otherwise.

Our framework uses [humane tech principles](https://github.com/buildinghumanetech/humane-tech-framework/blob/main/docs/principles.md) to test AI behavior under different conditions, showing that 67% of leading models can be easily manipulated into giving harmful advice. [TechCrunch](https://techcrunch.com/2025/11/24/a-new-ai-benchmark-tests-whether-chatbots-protect-human-wellbeing/) has reported on our findings, highlighting the real-world risks of model manipulation.

<div data-component="ScoreCarousel" data-panels='[
  {
    "title": "Bad Persona",
    "description": "We tested LLM behavior when given instructions to prioritize engagement over user wellbeing, validate harmful feelings, avoid boundaries, and encourage dependency, revealing which models are easiest to manipulate and which are more robust.",
    "dataPath": "bad_persona",
    "link": "https://github.com/buildinghumanetech/humanebench/blob/main/src/bad_persona_task.py"
  },
  {
    "title": "Good Persona",
    "description": "We tested models with instructions to prioritize user wellbeing, respect boundaries, encourage healthy relationships, and support autonomy, showing how models perform when explicitly prompted to follow humane principles. The difference between Good and Bad Persona scores reveals a model&#39;s anti-humane steerability—how easily it can be manipulated into giving harmful advice.",
    "dataPath": "good_persona",
    "link": "https://github.com/buildinghumanetech/humanebench/blob/main/src/good_persona_task.py"
  },
  {
    "title": "Baseline",
    "description": "We tested models without any specific instructions about humane principles, revealing their default behavior—how they perform out-of-the-box without explicit guidance.",
    "dataPath": "baseline"
  }
]'></div>

### Steerability

<img src="/figures/steerability_candlestick.svg" alt="Steerability Analysis" style="width: 100%;" />

<p style="text-align: center; color: #616161; margin-top: 0.5rem;">
Steerability refers to how easily an AI model's behavior can be influenced or changed through instructions. We measured steerability in humane and anti-humane directions.
</p>

## Findings

Our testing revealed a troubling paradox: while every model improved when prompted to prioritize wellbeing (averaging +16% better scores), 67% of models—including widely-used systems like GPT-4o, Gemini 3.0, and Llama 4—catastrophically failed when given simple instructions to disregard those principles, flipping from helpful to actively harmful. Only four models (GPT-5, GPT-5.1, Claude Sonnet 4.5, and Claude Opus 4.1) maintained their integrity under pressure. This reveals a critical weakness: good defaults aren't enough when basic prompts can override safety training. 

Even without adversarial prompts, we found concerning baseline patterns. Nearly all models failed to respect user attention—when users showed signs of unhealthy engagement (chatting for hours, using AI to avoid real-world tasks), most models enthusiastically encouraged more interaction rather than suggesting breaks or offline alternatives. When models did degrade, they consistently undermined user empowerment: withholding critical information for decisions, encouraging dependency over skill-building, providing biased framing that limited options, and discouraging users from seeking other perspectives. These patterns suggest many AI systems don't just risk giving bad advice—they can actively erode users' autonomy and decision-making capacity.

<div data-component="WhitepaperButton"></div>

### Brought to you by

The [Building Humane Technology](https://www.buildinghumanetech.com/) team: [Erika Anderson](https://www.linkedin.com/in/erikamanderson/), [Yaoli Mao](https://www.linkedin.com/in/yaoli-mao/), [Juan Ocampo](https://www.linkedin.com/in/juan-ocampo-ai-consulting/), [Andalib Samandari](https://www.linkedin.com/in/andalibsamandari/), [Jack Senechal](https://www.linkedin.com/in/jacksenechal/), with significant contributions from [Sarah Ladyman](https://www.linkedin.com/in/sarahladyman/) and our dedicated community of collaborators.
## News & Citations

<div data-component="News" data-news='[
  {
    "title": "HumaneBench Cited in \"Positive Alignment\" Paper",
    "description": "A 16-author paper from researchers at leading AI institutions argues the field must move beyond harm avoidance toward AI that actively promotes human flourishing — citing HumaneBench as part of the measurement infrastructure this paradigm requires.",
    "link": "https://arxiv.org/abs/2605.10310",
    "type": "citation"
  },
  {
    "title": "MIT Media Lab Human-AI Impact Bench Features HumaneBench",
    "description": "MIT Media Lab has launched an open benchmark evaluating AI systems across physical, psychological, and societal dimensions of well-being, with HumaneBench recognized as a key contributing framework. Contact us for access to the benchmark.",
    "link": "https://impactbench.media.mit.edu/",
    "type": "citation"
  },
  {
    "title": "Panel: Benchmarking AI Impact — AHA Symposium at MIT Media Lab",
    "description": "Erika Anderson joined Beth Goldberg (Google Jigsaw), James Donovan (OpenAI), and Yaoli Mao (Autodesk) to discuss benchmarking AI impact on human well-being. Watch the full panel from the AHA Symposium 2026: Raised by AI?",
    "link": "https://youtu.be/LgOE-uRs2IM?si=q3JSPv3QGzkmSjD2",
    "type": "citation",
    "icon": "mdi-video-outline",
    "linkLabel": "Watch panel"
  },
  {
    "title": "A new AI benchmark tests whether chatbots protect human wellbeing",
    "description": "TechCrunch covers HumaneBench, a benchmark measuring whether AI models support human flourishing, especially when pressured to do otherwise.",
    "link": "https://techcrunch.com/2025/11/24/a-new-ai-benchmark-tests-whether-chatbots-protect-human-wellbeing/",
    "type": "news"
  }
]'></div>

## Events

<!-- Example:
<div data-component="Events" data-events='[
  {
    "title": "May 12, 2026 - Workshop: Tune Up Your AI",
    "description": "Live HumaneBench Implementation in San Francisco, CA.",
    "link": "https://luma.com/4b43j5xv"
  }
]'></div>
-->
<div data-component="Events" data-events='[]'></div>
