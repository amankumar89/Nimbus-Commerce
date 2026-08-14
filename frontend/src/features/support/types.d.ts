interface Faq {
  id: string;
  category: string;
  question: string;
  answer: string;
}

interface ContactFormPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}