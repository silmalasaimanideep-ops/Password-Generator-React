import { useCallback, useEffect, useState } from "react";
import { RefreshCcw, Copy, Eye, EyeOff } from "lucide-react";

function App() {
  const [length, setLength] = useState(12);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [number, setNumber] = useState(true);
  const [char, setChar] = useState(true);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const [show, setShow] = useState(false);

  const passwordGenerator = useCallback(() => {
    let generated = "";
    let str = "";

    if (uppercase) str += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (lowercase) str += "abcdefghijklmnopqrstuvwxyz";
    if (number) str += "0123456789";
    if (char) str += "!@#$%^&*()_+[]{}|";

    if (!str) return;

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * str.length);
      generated += str[randomIndex];
    }

    setPassword(generated);
  }, [length, uppercase, lowercase, number, char]);

  useEffect(() => {
    passwordGenerator();
  }, [passwordGenerator]);

  const copyPassword = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const getStrength = () => {
    if (length > 14 && number && char && uppercase && lowercase) return "Strong";
    if (length > 10) return "Medium";
    return "Weak";
  };

  return (
    <div className="min-h-screen bg-[#f5f6f8] flex items-center justify-center px-4">
      <div className="w-full max-w-2xl">

        {/* HEADER */}
        <h1 className="text-4xl font-bold text-center mb-3">
        Password Generator
        </h1>

        <p className="text-gray-600 text-center mb-8">
          Create safe and unpredictable passwords to protect your accounts.
        </p>

        {/* CARD */}
        <div className="bg-white border rounded-xl shadow-md p-6">

          {/* PASSWORD FIELD */}
          <div className="flex items-center gap-3 border rounded-lg px-4 py-3 mb-4">
            <input
              type={show ? "text" : "password"}
              value={password}
              readOnly
              className="flex-1 outline-none text-lg"
            />

            {/* SHOW/HIDE */}
            <button
              onClick={() => setShow(!show)}
              className="text-gray-500 hover:text-black"
            >
              {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>

            {/* REFRESH */}
            <button
              onClick={passwordGenerator}
              className="text-gray-500 hover:text-black"
            >
              <RefreshCcw size={18} />
            </button>

            {/* COPY */}
            <button
              onClick={copyPassword}
              className="bg-black text-white px-3 py-1 rounded-md text-sm hover:opacity-80"
            >
              {copied ? "Copied" : "Copy"}
            </button>
          </div>

          {/* STRENGTH BAR */}
          <div className="mb-6">
            <div className="w-full h-2 bg-gray-200 rounded">
              <div
                className={`h-2 rounded ${
                  getStrength() === "Strong"
                    ? "bg-green-500 w-full"
                    : getStrength() === "Medium"
                    ? "bg-yellow-500 w-2/3"
                    : "bg-red-500 w-1/3"
                }`}
              ></div>
            </div>
            <p className="text-sm mt-2 text-gray-600">
              Strength: <span className="font-semibold">{getStrength()}</span>
            </p>
          </div>

          {/* LENGTH */}
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span>Password Length</span>
              <span>{length}</span>
            </div>

            <input
              type="range"
              min={6}
              max={25}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full"
            />
          </div>

          {/* OPTIONS */}
          <div className="grid grid-cols-2 gap-4 text-sm">

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={uppercase}
                onChange={() => setUppercase(!uppercase)}
              />
              Uppercase (A-Z)
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={lowercase}
                onChange={() => setLowercase(!lowercase)}
              />
              Lowercase (a-z)
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={number}
                onChange={() => setNumber(!number)}
              />
              Numbers (0-9)
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={char}
                onChange={() => setChar(!char)}
              />
              Symbols (!@#$)
            </label>

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
