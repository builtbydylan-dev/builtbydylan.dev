export type Testimonial = {
  quote: string;
  name: string;
  /** Role and organization, e.g. "Owner, MAVON Beauty". */
  role: string;
};

/**
 * Add quotes from people you've built for. The Testimonials section
 * appears automatically once this list has at least one entry.
 *
 * Example:
 * { quote: "Dylan made the whole process easy…", name: "Shane Wellman", role: "The Well Productions" },
 */
export const testimonials: Testimonial[] = [];
