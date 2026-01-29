import { useCallback, useEffect, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [char, setChar] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let generated = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (number) str += "0123456789";
    if (char) str += "!@#$%^&*()|}{[]~`?/";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * str.length);
      generated += str[randomIndex];
    }

    setPassword(generated);
  }, [length, number, char]);

  // auto-generate when options change
  useEffect(() => {
    passwordGenerator();
  }, [passwordGenerator]);

  return (
    <div className="bg-[#313131] min-h-screen text-white flex flex-col items-center justify-center gap-4">
      <h1 className="text-red-500 text-2xl font-bold">
        Password Generator
      </h1>

      <input
        type="text"
        value={password}
        readOnly
        className="px-3 py-2 rounded w-64 b-1 border border-gray-400"
      />

      <div className="flex gap-4">
        <label>
          <input
            type="checkbox"
            checked={number}
            onChange={() => setNumber(prev => !prev)}
          />{" "}
          Numbers
        </label>

        <label>
          <input
            type="checkbox"
            checked={char}
            onChange={() => setChar(prev => !prev)}
          />{" "}
          Symbols
        </label>
      </div>

      <input
        type="range"
        min={6}
        max={20}
        value={length}
        onChange={(e) => setLength(Number(e.target.value))}
      />

      <p>Password Length: {length}</p>
    </div>
  );
}

export default App;
