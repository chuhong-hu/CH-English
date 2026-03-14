export type Difficulty = '初级' | '中级' | '高级';

export interface Question {
  id: string;
  sentence: string; // Use [blank] as placeholder
  options: string[];
  correctAnswer: string;
  explanation: {
    rule: string;
    example: string;
    commonMistakes: string;
  };
  category: string;
  difficulty: Difficulty;
}

export interface UserAnswer {
  questionId: string;
  selectedAnswer: string;
  isCorrect: boolean;
}
