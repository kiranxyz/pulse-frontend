import CountUp from "react-countup";

interface StatCardProps {
  title: string;
  value: number | string;
  subtitle?: string;
  gradientClass?: string;
  icon?: React.ReactNode;
}

export function StatCard({
  title,
  value,
  subtitle,
  gradientClass,
  icon,
}: StatCardProps) {
  return (
    <article
      className={`card transform rounded-xl p-4 text-center shadow-sm transition-transform hover:scale-105 hover:shadow-lg ${
        gradientClass || "bg-white"
      }`}
    >
      <div className="mb-2 flex items-center justify-center space-x-2 text-2xl">
        {icon && <span>{icon}</span>}
        <h3 className="md:text-md text-sm font-semibold text-gray-800">
          {title}
        </h3>
      </div>
      <p className="mt-1 text-2xl font-bold text-gray-900 md:text-3xl">
        {typeof value === "number" ? (
          <CountUp end={value} duration={1.5} />
        ) : (
          value
        )}
      </p>
      {subtitle && (
        <p className="mt-1 text-xs text-gray-700 md:text-sm">{subtitle}</p>
      )}
    </article>
  );
}
