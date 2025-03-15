import './App.css';
import TextScrambler from './scramble';

// Main App Component
function App() {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-white font-custom">
      <div className="grid content-center justify-items-center">
        <div className='absolute top-[10%] md:top-[25%] text-5xl md:text-6xl'>"ANTI-MONEY"</div>
        <TextScrambler />
      </div>
    </div>
  );
}

export default App;