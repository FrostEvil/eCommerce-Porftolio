import { faqsArr } from "@/utils/static-db";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

export default function AccordionFaq() {
  const accordionContent = faqsArr.map((faq, i) => {
    return (
      <AccordionItem value={`item-${i}`} key={faq.question}>
        <AccordionTrigger>{faq.question}</AccordionTrigger>
        <AccordionContent>{faq.asnwer}</AccordionContent>
      </AccordionItem>
    );
  });
  return (
    <section className="bg-white shadow-sm" id="faq">
      <h2 className="pl-6 py-4 bg-gray-100 text-3xl font-bold text-gray-900">
        FAQs
      </h2>
      <div className="mx-6 my-4">
        <Accordion type="single" collapsible className="w-full">
          {accordionContent}
        </Accordion>
      </div>
    </section>
  );
}
