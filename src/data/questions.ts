import { Question } from '../types';

export const questions: Question[] = [
  {
    id: '1',
    sentence: '[blank] tired, she still finished the report.',
    options: ['Although', 'Because', 'Unless', 'If'],
    correctAnswer: 'Although',
    explanation: {
      rule: 'Although 引导让步状语从句，表示“尽管”。句意为：尽管很累，她还是完成了报告。',
      example: 'Although it was raining, they went out for a walk.',
      commonMistakes: '容易与 but 连用。注意：although 和 but 不能在同一个句子中同时出现。'
    },
    category: '状语从句',
    difficulty: '初级'
  },
  {
    id: '2',
    sentence: 'The boy [blank] is playing football is my brother.',
    options: ['who', 'which', 'whom', 'whose'],
    correctAnswer: 'who',
    explanation: {
      rule: 'who 引导定语从句，先行词是人（The boy），且在从句中作主语。',
      example: 'The girl who is singing is my sister.',
      commonMistakes: '误用 which。which 的先行词通常是物。'
    },
    category: '定语从句',
    difficulty: '初级'
  },
  {
    id: '3',
    sentence: '[blank] more time, I could have done it better.',
    options: ['Given', 'Giving', 'To give', 'Give'],
    correctAnswer: 'Given',
    explanation: {
      rule: 'Given 是过去分词作状语，表示被动或条件。此处表示“如果被给予更多时间”。',
      example: 'Given the chance, he will succeed.',
      commonMistakes: '误用 Giving。Giving 表示主动，主语通常是动作的发出者。'
    },
    category: '非谓语动词',
    difficulty: '中级'
  },
  {
    id: '4',
    sentence: 'I don\'t know [blank] he will come back tomorrow.',
    options: ['whether', 'that', 'which', 'what'],
    correctAnswer: 'whether',
    explanation: {
      rule: 'whether 引导宾语从句，表示“是否”。',
      example: 'I wonder whether it will rain.',
      commonMistakes: '误用 that。that 引导宾语从句时不表示疑问。'
    },
    category: '宾语从句',
    difficulty: '初级'
  },
  {
    id: '5',
    sentence: 'He spoke so fast [blank] I couldn\'t follow him.',
    options: ['that', 'which', 'as', 'than'],
    correctAnswer: 'that',
    explanation: {
      rule: 'so...that... 引导结果状语从句，表示“如此...以至于...”。',
      example: 'It was so cold that the water froze.',
      commonMistakes: '误用 which。which 不能与 so 搭配引导结果状语从句。'
    },
    category: '状语从句',
    difficulty: '初级'
  },
  {
    id: '6',
    sentence: 'The reason [blank] he was late was that he missed the bus.',
    options: ['why', 'because', 'that', 'which'],
    correctAnswer: 'why',
    explanation: {
      rule: 'why 引导定语从句，先行词是 reason，且在从句中作原因状语。',
      example: 'That is the reason why I like English.',
      commonMistakes: '误用 because。The reason is that... 是固定搭配，但在定语从句中先行词是 reason 时常用 why。'
    },
    category: '定语从句',
    difficulty: '中级'
  },
  {
    id: '7',
    sentence: '[blank] the homework, the boy went out to play.',
    options: ['Having finished', 'Finished', 'To finish', 'Finish'],
    correctAnswer: 'Having finished',
    explanation: {
      rule: 'Having finished 是现在分词的完成式作状语，表示动作发生在主句动作之前。',
      example: 'Having seen the film, I don\'t want to see it again.',
      commonMistakes: '误用 Finished。Finished 表示被动，而此处 boy 是完成作业的主动发出者。'
    },
    category: '非谓语动词',
    difficulty: '高级'
  },
  {
    id: '8',
    sentence: 'It is important [blank] we should protect the environment.',
    options: ['that', 'which', 'what', 'whether'],
    correctAnswer: 'that',
    explanation: {
      rule: 'It is + adj. + that... 是主语从句的常用句型，it 是形式主语，that 引导真正的主语从句。',
      example: 'It is certain that he will win.',
      commonMistakes: '误用 which。which 引导主语从句时通常表示“哪一个”。'
    },
    category: '主语从句',
    difficulty: '中级'
  }
];
