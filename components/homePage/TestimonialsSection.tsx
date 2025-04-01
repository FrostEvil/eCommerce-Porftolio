import { testimonialsArr } from "@/utils/static-db";

export default function Testimonials() {
  const testimonials = testimonialsArr;

  const displayTestimonials = testimonials.map((testimonial) => {
    return (
      <div
        className="bg-white p-6 rounded-lg shadow-md border-t-4 border-yellow-400"
        key={testimonial.id}
      >
        <blockquote className="text-gray-700 italic text-base">
          {testimonial.review}
        </blockquote>
        <p className="mt-2 text-gray-900 font-semibold">
          {testimonial.name}, {testimonial.role}
        </p>
      </div>
    );
  });
  return (
    <section className="bg-gray-100 py-12 px-6 container">
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
        What Our Readers Think
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
        {displayTestimonials}
      </div>
    </section>
  );
}
