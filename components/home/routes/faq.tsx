"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconPlus, IconMinus } from "@tabler/icons-react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQItem: React.FC<
  FAQItem & { isOpen: boolean; toggleOpen: () => void }
> = ({ question, answer, isOpen, toggleOpen }) => {
  return (
    <motion.div
      initial={false}
      animate={{
        backgroundColor: isOpen ? "var(--theme-200)" : "var(--theme-100)",
      }}
      className="border-b border-theme-300 dark:border-theme-600 transition-colors duration-300"
    >
      <button
        className="flex justify-between items-center w-full py-5 px-4 text-left"
        onClick={toggleOpen}
      >
        <span className="text-lg font-semibold text-theme-800 dark:text-theme-100">
          {question}
        </span>
        {isOpen ? (
          <IconMinus className="flex-shrink-0 text-theme-500" />
        ) : (
          <IconPlus className="flex-shrink-0 text-theme-500" />
        )}
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <div className="px-4 pb-5 text-theme-600 dark:text-theme-200">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqData: FAQItem[] = [
    {
      question: "How do solar panels work?",
      answer:
        "Solar panels convert sunlight into electricity through photovoltaic cells. These cells absorb solar energy and create an electric field, generating a flow of electricity.",
    },
    {
      question: "What are the benefits of solar energy?",
      answer:
        "Solar energy offers numerous benefits including reduced electricity bills, lower carbon footprint, increased energy independence, and potential increase in property value.",
    },
    {
      question: "How long do solar panels last?",
      answer:
        "Most solar panels come with a 25-30 year warranty and can continue to generate electricity for even longer. Their efficiency may decrease slightly over time, but they're designed for long-term use.",
    },
    {
      question: "Do solar panels work on cloudy days?",
      answer:
        "Yes, solar panels can still generate electricity on cloudy days, although at a reduced efficiency. They work best with direct sunlight but can still produce power from diffused light.",
    },
    {
      question: "How much does a solar panel system cost?",
      answer:
        "The cost of a solar panel system varies depending on factors like system size, location, and installation complexity. However, prices have decreased significantly in recent years, making solar more accessible.",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-theme-50 via-theme-100 to-theme-200 dark:from-theme-900 dark:via-theme-800 dark:to-theme-700 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-theme-800 dark:text-theme-100">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto bg-white dark:bg-theme-800 rounded-2xl shadow-xl overflow-hidden transition-colors duration-300">
          {faqData.map((item, index) => (
            <FAQItem
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={index === openIndex}
              toggleOpen={() =>
                setOpenIndex(index === openIndex ? null : index)
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
