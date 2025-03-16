import TextScrambler from './scramble';

// Main App Component
function App() {
  return (
    <div className="h-[100dvh] w-screen flex justify-center items-center bg-white font-custom">
      <div className="grid content-center justify-items-center">
        <div className="absolute top-[5%] md:top-[25%] left-1/2 transform -translate-x-1/2 text-5xl md:text-6xl whitespace-nowrap">
          "ANTI-MONEY"
        </div>
        <TextScrambler />
      </div>
    </div>
  );
}

export default App;