import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { QUIZ_QUESTIONS } from "@shared/constants";
import { useToast } from "@/hooks/use-toast";

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const { toast } = useToast();

  const handleAnswer = () => {
    if (!selectedAnswer) {
      toast({
        title: "Please select an answer",
        variant: "destructive",
      });
      return;
    }

    if (selectedAnswer === QUIZ_QUESTIONS[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer("");
    } else {
      setIsComplete(true);
    }
  };

  if (isComplete) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-lg mx-auto text-center"
      >
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
            <p className="text-xl mb-4">
              Your score: {score} out of {QUIZ_QUESTIONS.length}
            </p>
            <Button
              onClick={() => {
                setCurrentQuestion(0);
                setScore(0);
                setIsComplete(false);
                setSelectedAnswer("");
              }}
            >
              Try Again
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  const question = QUIZ_QUESTIONS[currentQuestion];

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">
        Solar System Quiz
      </h1>

      <Card>
        <CardContent className="p-6">
          <div className="mb-6">
            <p className="text-sm text-muted-foreground mb-2">
              Question {currentQuestion + 1} of {QUIZ_QUESTIONS.length}
            </p>
            <h2 className="text-xl font-semibold">
              {question.question}
            </h2>
          </div>

          <RadioGroup
            value={selectedAnswer}
            onValueChange={setSelectedAnswer}
            className="space-y-4"
          >
            {question.options.map((option) => (
              <div key={option} className="flex items-center">
                <RadioGroupItem value={option} id={option} />
                <Label htmlFor={option} className="ml-2">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>

          <Button
            className="w-full mt-6"
            onClick={handleAnswer}
          >
            {currentQuestion === QUIZ_QUESTIONS.length - 1 ? "Finish" : "Next"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
