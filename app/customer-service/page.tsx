import AccordionFaq from "@/components/customer-service/AccordionFaq";
import PrivacyPolicy from "@/components/customer-service/PrivacyPolicy";
import ShippingReturns from "@/components/customer-service/ShippingReturns";
import TermsOfService from "@/components/customer-service/TermsOfService";

export default function CustomerServicePage() {
  return (
    <main className="container mb-12">
      <div className="text-center my-12 ">
        <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900">
          Support Center — Everything You Need to Know
        </h1>
        <p className="mt-4 text-base lg:text-lg text-gray-600">
          Need help? Browse FAQs or contact our team.
        </p>
      </div>
      <div className="my-12 flex flex-col gap-y-8">
        <AccordionFaq />
        <ShippingReturns />
        <PrivacyPolicy />
        <TermsOfService />
      </div>
    </main>
  );
}
