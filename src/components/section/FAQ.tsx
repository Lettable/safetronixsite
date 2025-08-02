"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import SpotlightCard from "../layout/SpotlightCard";

const faqs = [
  {
    question: "Who runs NoCSAM?",
    answer: "NoCSAM is run by a decentralized team of volunteer security researchers, digital rights advocates, and former NGO professionals. We operate independently and are not affiliated with any government agency."
  },
  {
    question: "Are you affiliated with any government?",
    answer: "No, we are completely independent. We work as a bridge between the public and official reporting channels, but we maintain our autonomy to ensure unbiased operations and protect reporter privacy."
  },
  {
    question: "How do you report content?",
    answer: "We forward all verified reports to established hotlines like INHOPE, NCMEC's CyberTipline, and other official channels. We do not investigate directly but ensure reports reach the appropriate authorities quickly and securely."
  },
  {
    question: "Do you collect personal data?",
    answer: "We collect minimal data necessary for report processing. All submissions are anonymized, and we follow strict data protection protocols. We never store personal information longer than necessary for report verification."
  },
  {
    question: "Is your reporting automated?",
    answer: "We use a combination of automated detection systems and human verification. All reports are reviewed by trained volunteers before being forwarded to ensure accuracy and prevent false positives."
  },
  {
    question: "How can NGOs partner with you?",
    answer: "NGOs and law enforcement agencies can contact us through our partnership form. We offer API integration, bulk reporting capabilities, and custom intelligence feeds for verified organizations."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="px-4 py-20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-300">
            Everything you need to know about our mission and operations
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <SpotlightCard
              key={index}
              className="custom-spotlight-card border border-white/20 bg-white/5 backdrop-blur-md shadow-lg overflow-hidden"
              spotlightColor="rgba(59, 130, 246, 0.1)"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full p-6 text-left flex justify-between items-center hover:bg-white/5 transition-colors"
              >
                <h3 className="text-lg font-semibold text-white pr-4">{faq.question}</h3>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-blue-400 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-blue-400 flex-shrink-0" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6">
                  <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}