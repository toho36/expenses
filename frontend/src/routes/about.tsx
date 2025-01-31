import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/about')({
  component: About,
});

function About() {
  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center text-blue-600">
        About Expense Tracker
      </h1>
      <p className="text-lg text-gray-700">
        Welcome to the{' '}
        <span className="font-semibold text-blue-500">Expense Tracker</span>{' '}
        app! Our mission is to help you manage your finances efficiently by
        tracking your income and expenses effortlessly.
      </p>
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Why Use This App?</h2>
        <ul className="list-disc list-inside text-gray-600">
          <li>Track your expenses with ease</li>
          <li>Visualize spending patterns</li>
          <li>Plan and budget efficiently</li>
          <li>Secure and user-friendly</li>
        </ul>
      </div>
      <div className="flex justify-center">
        <Link
          to="/"
          className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
