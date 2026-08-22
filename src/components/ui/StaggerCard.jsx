export default function StaggerCard({ inView, delay, children }) {
  return (
    <div
      className={`opacity-100 transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:translate-y-0 ${
        inView ? "translate-y-0" : "translate-y-5"
      }`}
      style={{ transitionDelay: inView ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}
