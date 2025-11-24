import AppLayout from "./components/layout/AppLayout";

function App() {
  return (
    <AppLayout>
      {/* Main content goes here */}
      <div className="mt-10 text-center">
        <h1 className="text-3xl font-bold">Welcome to Pulse App</h1>
        <p className="mt-2 text-gray-600">
          Use the Login/Register buttons in the header to get started.
        </p>
      </div>
    </AppLayout>
  );
}

export default App;
