import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      q: "Is Uplift free?",
      a: "We’re currently free for early access students. Some advanced features may become paid later, but scanning your portfolio and basic guidance will always have a free option."
    },
    {
      q: "Will this guarantee I get into my dream school?",
      a: "No tool can guarantee that (run from anyone who says they can). Uplift helps you understand your strengths, fill gaps, and tell a more honest, powerful story – which is what every good application needs."
    },
    {
      q: "Do I need straight As to use this?",
      a: "No. Uplift is designed for real students with real lives – including imperfect grades, late starts, and complicated situations."
    },
    {
      q: "Will my parents or school see this?",
      a: "By default, no. You choose if you want to share your plan with a counselor, teacher, or parent."
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-muted-foreground">Answering the anxious late-night questions.</p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">{faq.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;

