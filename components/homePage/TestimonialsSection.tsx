import { testimonialsArr } from "@/utils/static-db";

export default function Testimonials() {
  const testimonials = testimonialsArr;

  const displayTestimonials = testimonials.map((testimonial) => {
    return (
      <div
        className="flex flex-col bg-white p-6 rounded-lg shadow-md border-t-4 border-yellow-400"
        key={testimonial.id}
      >
        <blockquote className="text-gray-700 italic text-base flex-grow">
          {testimonial.review}
        </blockquote>
        <p className="mt-2 text-gray-900 font-semibold">
          {testimonial.name}, {testimonial.role}
        </p>
      </div>
    );
  });
  return (
    <section className="bg-white shadow-sm overflow-hidden">
      <h2 className=" pl-6 py-4 bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-400 text-3xl font-bold text-gray-900">
        What Our Readers Think
      </h2>
      <div className="py-8 px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
        {displayTestimonials}
      </div>
    </section>
  );
}
