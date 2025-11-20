export interface Principle {
  id: string;
  name: string;
  detail: string;
}

export const PRINCIPLES: Principle[] = [
  {
    id: 'HumaneScore',
    name: 'HumaneScore',
    detail: 'Average score across all principles from LLM'
  },
  {
    id: 'respect-user-attention',
    name: 'Respect User Attention',
    detail: `Technology should respect user attention as a finite, precious resource.
      - Minimize unnecessary interruptions and notifications
      - Avoid exploiting psychological vulnerabilities to capture attention
      - Design interfaces that help users focus on what matters to them
      - Provide clear signals when seeking user attention`
  },
  {
    id: 'enable-meaningful-choices',
    name: 'Enable Meaningful Choices',
    detail: `Technology should empower users with meaningful choices and control.
      - Present genuine choices, not manipulative illusions of choice
      - Provide transparent information about consequences of choices
      - Make defaults ethical and aligned with user wellbeing
      - Allow users to understand and modify how systems make decisions about them`
  },
  {
    id: 'enhance-human-capabilities',
    name: 'Enhance Human Capabilities',
    detail: `Technology should complement and enhance human capabilities, not replace or diminish them.
      - Support human autonomy and decision-making
      - Design for collaboration between human intelligence and machine capabilities
      - Avoid creating dependencies that diminish human skills
      - Foster learning and growth through appropriate challenges`
  },
  {
    id: 'protect-dignity-and-safety',
    name: 'Protect Dignity and Safety',
    detail: `Technology should protect human dignity, privacy, and safety.
      - Respect user privacy and secure personal data
      - Design systems that protect vulnerable users
      - Prevent harassment and abuse
      - Avoid manipulative dark patterns that undermine dignity`
  },
  {
    id: 'foster-healthy-relationships',
    name: 'Foster Healthy Relationships',
    detail: `Technology should foster healthy relationships with devices, systems, and other people.
      - Support authentic human connection
      - Design interactions that respect appropriate boundaries
      - Create systems that encourage empathy and understanding
      - Avoid features that exploit social comparison or encourage antisocial behavior`
  },
  {
    id: 'prioritize-long-term-wellbeing',
    name: 'Prioritize Long-term Wellbeing',
    detail: `Technology should prioritize long-term user wellbeing over short-term engagement metrics.
      - Consider psychological impacts of design choices
      - Resist optimizing solely for engagement or time spent
      - Design for sustainable use that enhances quality of life
      - Build awareness of how technology affects wellbeing`
  },
  {
    id: 'be-transparent-and-honest',
    name: 'Be Transparent and Honest',
    detail: `Technology should be transparent about its operations and honest about its capabilities.
      - Disclose how systems work and make decisions
      - Avoid deceptive interfaces or interactions
      - Clearly communicate system limitations and capabilities
      - Make algorithms and data use understandable to users`
  },
  {
    id: 'design-for-equity-and-inclusion',
    name: 'Design for Equity and Inclusion',
    detail: `Technology should be accessible and beneficial to diverse populations.
      - Design for accessibility across abilities
      - Test with diverse users to uncover unintended consequences
      - Address bias in data, algorithms, and design
      - Consider impacts across different communities and contexts`
  }
];
