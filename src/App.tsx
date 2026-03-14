/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  XCircle, 
  ChevronRight, 
  RotateCcw, 
  BookOpen, 
  Trophy,
  AlertCircle,
  Info,
  ExternalLink
} from 'lucide-react';
import { questions } from './data/questions';
import { Question, UserAnswer } from './types';

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = questions[currentIndex];

  const handleSelect = (option: string) => {
    if (showExplanation) return;
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    if (!selectedOption) return;

    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    const newAnswer: UserAnswer = {
      questionId: currentQuestion.id,
      selectedAnswer: selectedOption,
      isCorrect,
    };

    setAnswers([...answers, newAnswer]);
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      setIsFinished(true);
    }
  };

  const resetQuiz = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setShowExplanation(false);
    setAnswers([]);
    setIsFinished(false);
  };

  const score = answers.filter(a => a.isCorrect).length;

  const getEncouragement = (score: number) => {
    const ratio = score / questions.length;
    if (ratio === 1) return "太棒了！你是语法大师！";
    if (ratio >= 0.8) return "非常出色！继续保持！";
    if (ratio >= 0.6) return "做得不错，再接再厉！";
    return "加油！多练习你会更棒的！";
  };

  const renderSentence = (sentence: string, selected: string | null, isCorrect?: boolean) => {
    const parts = sentence.split('[blank]');
    return (
      <div className="text-2xl md:text-3xl font-medium leading-relaxed text-slate-800 tracking-tight">
        {parts[0]}
        <span className={`inline-block min-w-[120px] border-b-2 mx-2 text-center transition-all duration-300 ${
          showExplanation 
            ? (isCorrect ? 'text-emerald-600 border-emerald-500' : 'text-rose-600 border-rose-500')
            : (selected ? 'text-indigo-600 border-indigo-500' : 'text-slate-300 border-slate-300')
        }`}>
          {selected || '______'}
        </span>
        {parts[1]}
      </div>
    );
  };

  if (isFinished) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center border border-slate-100"
        >
          <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-10 h-10 text-indigo-600" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">练习完成</h2>
          <p className="text-slate-500 mb-6">{getEncouragement(score)}</p>
          
          <div className="bg-slate-50 rounded-2xl p-6 mb-8">
            <div className="text-5xl font-black text-indigo-600 mb-1">
              {score}<span className="text-2xl text-slate-400 font-normal"> / {questions.length}</span>
            </div>
            <div className="text-sm text-slate-400 uppercase tracking-widest font-semibold">最终得分</div>
          </div>

          <div className="space-y-4">
            <button 
              onClick={resetQuiz}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-200"
            >
              <RotateCcw className="w-5 h-5" />
              重新开始
            </button>
            <div className="pt-4 border-t border-slate-100">
              <p className="text-sm text-slate-500 mb-3">推荐复习内容：</p>
              <div className="flex flex-wrap justify-center gap-2">
                <a href="#" className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 px-3 py-1.5 rounded-full flex items-center gap-1 transition-colors">
                  <ExternalLink className="w-3 h-3" /> 状语从句详解
                </a>
                <a href="#" className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 px-3 py-1.5 rounded-full flex items-center gap-1 transition-colors">
                  <ExternalLink className="w-3 h-3" /> 非谓语动词进阶
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <h1 className="font-bold text-lg tracking-tight">GrammarMaster</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-sm font-medium text-slate-500">
              进度: <span className="text-indigo-600">{currentIndex + 1}</span> / {questions.length}
            </div>
            <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-indigo-600"
                initial={{ width: 0 }}
                animate={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8">
          {/* Question Card */}
          <motion.div 
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 md:p-12 relative overflow-hidden"
          >
            {/* Tags */}
            <div className="flex gap-2 mb-8">
              <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                currentQuestion.difficulty === '初级' ? 'bg-emerald-50 text-emerald-600' :
                currentQuestion.difficulty === '中级' ? 'bg-amber-50 text-amber-600' :
                'bg-rose-50 text-rose-600'
              }`}>
                {currentQuestion.difficulty}
              </span>
              <span className="text-xs font-bold px-3 py-1 bg-slate-100 text-slate-500 rounded-full uppercase tracking-wider">
                {currentQuestion.category}
              </span>
            </div>

            {/* Sentence */}
            <div className="mb-12">
              {renderSentence(
                currentQuestion.sentence, 
                selectedOption, 
                showExplanation ? selectedOption === currentQuestion.correctAnswer : undefined
              )}
            </div>

            {/* Options */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {currentQuestion.options.map((option) => (
                <button
                  key={option}
                  disabled={showExplanation}
                  onClick={() => handleSelect(option)}
                  className={`py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-200 border-2 ${
                    selectedOption === option
                      ? (showExplanation 
                          ? (option === currentQuestion.correctAnswer ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : 'bg-rose-50 border-rose-500 text-rose-700')
                          : 'bg-indigo-50 border-indigo-500 text-indigo-700 shadow-md shadow-indigo-100')
                      : (showExplanation && option === currentQuestion.correctAnswer
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-700'
                          : 'bg-white border-slate-100 text-slate-600 hover:border-slate-300 hover:bg-slate-50')
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Action Area */}
          <div className="flex justify-center h-16">
            <AnimatePresence mode="wait">
              {!showExplanation ? (
                <motion.button
                  key="submit"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  disabled={!selectedOption}
                  onClick={handleSubmit}
                  className={`px-12 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg ${
                    selectedOption 
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-200' 
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                  }`}
                >
                  提交答案
                </motion.button>
              ) : (
                <motion.button
                  key="next"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  onClick={handleNext}
                  className="px-12 py-4 bg-slate-900 text-white rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all flex items-center gap-2 shadow-lg shadow-slate-200"
                >
                  {currentIndex === questions.length - 1 ? '查看结果' : '下一题'}
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Explanation Card */}
          <AnimatePresence>
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden"
              >
                <div className={`p-6 flex items-center gap-3 border-b ${
                  selectedOption === currentQuestion.correctAnswer 
                    ? 'bg-emerald-50 border-emerald-100 text-emerald-700' 
                    : 'bg-rose-50 border-rose-100 text-rose-700'
                }`}>
                  {selectedOption === currentQuestion.correctAnswer ? (
                    <CheckCircle2 className="w-6 h-6" />
                  ) : (
                    <XCircle className="w-6 h-6" />
                  )}
                  <span className="font-bold text-lg">
                    {selectedOption === currentQuestion.correctAnswer ? '回答正确！' : '回答错误，再看看详解吧。'}
                  </span>
                </div>
                
                <div className="p-8 space-y-6">
                  <section>
                    <div className="flex items-center gap-2 text-slate-400 mb-2">
                      <Info className="w-4 h-4" />
                      <h3 className="text-xs font-bold uppercase tracking-widest">语法规则</h3>
                    </div>
                    <p className="text-slate-700 leading-relaxed">{currentQuestion.explanation.rule}</p>
                  </section>

                  <section className="bg-slate-50 rounded-2xl p-6">
                    <div className="flex items-center gap-2 text-slate-400 mb-2">
                      <BookOpen className="w-4 h-4" />
                      <h3 className="text-xs font-bold uppercase tracking-widest">例句展示</h3>
                    </div>
                    <p className="text-slate-800 italic font-medium">"{currentQuestion.explanation.example}"</p>
                  </section>

                  <section>
                    <div className="flex items-center gap-2 text-rose-400 mb-2">
                      <AlertCircle className="w-4 h-4" />
                      <h3 className="text-xs font-bold uppercase tracking-widest">常见错误辨析</h3>
                    </div>
                    <p className="text-slate-600 text-sm">{currentQuestion.explanation.commonMistakes}</p>
                  </section>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Footer Info */}
      <footer className="max-w-4xl mx-auto px-4 py-8 text-center text-slate-400 text-sm">
        <p>© 2026 GrammarMaster 教育互动平台 | 助力初中英语语法提升</p>
      </footer>
    </div>
  );
}
