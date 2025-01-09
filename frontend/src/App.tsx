import { useState } from 'react';
import { Button } from '@/components/ui/button';
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="flex flex-col bg-background max-w-md m-auto gap-y-5">
        <Button onClick={() => setCount((count) => count + 1)}>Up</Button>
        <Button onClick={() => setCount((count) => count - 1)}>Downs</Button>
        <div className="text-center">{count}</div>
      </div>
    </>
  );
}

export default App;
