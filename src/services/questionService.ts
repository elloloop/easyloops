import completedQuestionsData from '../data/completed-questions.json';

export interface CompletedQuestion {
  id: string;
  title: string;
  description: string;
  completedAt: string;
  difficulty: string;
  category: string;
  score: number;
}

export const getCompletedQuestions = async (): Promise<CompletedQuestion[]> => {
  // In a real application, this would be an API call to your backend
  // For now, we're returning the static JSON data
  return completedQuestionsData.completedQuestions;
};

export const calculateStats = (questions: CompletedQuestion[]) => {
  if (questions.length === 0) {
    return {
      totalCompleted: 0,
      averageScore: 0,
      streak: 0,
    };
  }

  const totalCompleted = questions.length;
  const averageScore = Math.round(
    questions.reduce((sum, q) => sum + q.score, 0) / totalCompleted
  );

  // Calculate streak based on consecutive days
  const today = new Date().toDateString();
  const uniqueDates = [
    ...new Set(questions.map((q) => new Date(q.completedAt).toDateString())),
  ].sort();
  let streak = 0;

  if (uniqueDates[uniqueDates.length - 1] === today) {
    streak = 1;
    let prevDate = new Date(today);
    for (let i = uniqueDates.length - 2; i >= 0; i--) {
      const currentDate = new Date(uniqueDates[i]);
      const diffDays = Math.floor(
        (prevDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)
      );
      if (diffDays === 1) {
        streak++;
        prevDate = currentDate;
      } else {
        break;
      }
    }
  }

  return {
    totalCompleted,
    averageScore,
    streak,
  };
};
