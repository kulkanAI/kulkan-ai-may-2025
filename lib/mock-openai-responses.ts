// Mock OpenAI responses for development and testing

export const sampleAnalysis = {
  marketFit: {
    score: 6.5,
    analysis:
      "Your idea shows potential in the current market landscape, but there are some areas that need refinement.",
    conditional: "Conditional Go",
  },
  idealCustomer: {
    score: 3,
    analysis: "We've identified several customer segments that would benefit from your solution.",
  },
  productMarketFit: {
    score: 6,
    analysis: "Your product has a reasonable fit with the market, but some adjustments could improve adoption.",
    conditional: "Conditional Go",
  },
}

export const mockQuestions = [
  "Tell me about your business idea in a few sentences.",
  "Who is your target customer?",
  "What problem does your product or service solve?",
  "Who are your main competitors?",
  "What makes your solution unique?",
  "How do you plan to make money?",
  "What is your go-to-market strategy?",
  "What resources do you need to get started?",
  "What are the biggest risks to your business?",
  "What milestones have you achieved so far?",
  "What are your growth plans for the next 12 months?",
  "What keeps you up at night about this business?",
]

export const mockResponses = {
  greeting:
    "Hi there! I'm Kulkan, your AI validation assistant. I'll help you validate your business idea by asking a series of questions. Let's get started!",
  followUp: "Thanks for sharing that. Let's dig a bit deeper.",
  completion:
    "Thank you for answering all my questions. I'm now analyzing your responses to provide you with a comprehensive validation report. This will take just a moment...",
}
