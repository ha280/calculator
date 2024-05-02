import { useRef, useState } from "react";
import Button from "../components/Button";
import { calculate } from "~/api/provider";

export default function Calculator() {
  const [input, setInput] = useState("");
  const [openBracketCount, setOpenBracketCount] = useState(0);
  const inputRef = useRef(null);
  const handleInput = (value: string) => {
    setInput((input) => input + value);
  };

  const calculateResult = async () => {
    try {
      const result = await calculate(input);
      setInput(result.result);
    } catch (error) {
      setInput("Error");
    }
  };

  const clearInput = () => {
    setInput("");
    setOpenBracketCount(0);
  };

  const handleBack = () => {
    if (input.length === 0) return;
    const lastLetter = input.charAt(input.length - 1);
    setInput(input.substring(0, input.length - 1));
    if (lastLetter === "(") {
      setOpenBracketCount((openBracketCount) => openBracketCount - 1);
    }
    if (lastLetter === ")") {
      setOpenBracketCount((openBracketCount) => openBracketCount + 1);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
    let openBracket = 0;
    for (let i = 0; i < event.target.value.length; i++) {
      if (event.target.value[i] === "(") {
        openBracket = openBracket + 1;
      }
      if (event.target.value[i] === ")") {
        openBracket--;
      }
    }
    setOpenBracketCount(openBracket);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col gap-1 w-64 border p-2">
        <h1 style={{ gridColumn: "1 / -1", textAlign: "center" }}>
          Calculator
        </h1>

        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => handleInputChange(e)}
          className="w-60 border rounded-full my-2 px-2"
          style={{ fontSize: "1.5rem" }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              calculateResult();
            }
          }}
        />
        <div className="flex gap-2">
          <Button
            onClick={() => {
              clearInput();
              inputRef.current.focus();
            }}
          >
            AC
          </Button>
          <Button
            onClick={() => {
              if (openBracketCount === 0) {
                handleInput("(");
                setOpenBracketCount((openBracketCount) => openBracketCount + 1);
              } else {
                setOpenBracketCount((openBracketCount) => openBracketCount - 1);
                handleInput(")");
              }
              inputRef.current.focus();
            }}
          >
            ()
          </Button>
          <Button
            onClick={() => {
              handleInput("/");
              inputRef.current.focus();
            }}
          >
            /
          </Button>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => {
              handleInput("7");
              inputRef.current.focus();
            }}
          >
            7
          </Button>
          <Button
            onClick={() => {
              handleInput("8");
              inputRef.current.focus();
            }}
          >
            8
          </Button>
          <Button
            onClick={() => {
              handleInput("9");
              inputRef.current.focus();
            }}
          >
            9
          </Button>
          <Button
            onClick={() => {
              handleInput("*");
              inputRef.current.focus();
            }}
          >
            *
          </Button>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => {
              handleInput("4");
              inputRef.current.focus();
            }}
          >
            4
          </Button>
          <Button
            onClick={() => {
              handleInput("5");
              inputRef.current.focus();
            }}
          >
            5
          </Button>
          <Button
            onClick={() => {
              handleInput("6");
              inputRef.current.focus();
            }}
          >
            6
          </Button>
          <Button
            onClick={() => {
              handleInput("-");
              inputRef.current.focus();
            }}
          >
            -
          </Button>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => {
              handleInput("1");
              inputRef.current.focus();
            }}
          >
            1
          </Button>
          <Button
            onClick={() => {
              handleInput("2");
              inputRef.current.focus();
            }}
          >
            2
          </Button>
          <Button
            onClick={() => {
              handleInput("3");
              inputRef.current.focus();
            }}
          >
            3
          </Button>
          <Button
            onClick={() => {
              handleInput("+");
              inputRef.current.focus();
            }}
          >
            +
          </Button>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => {
              handleInput("0");
              inputRef.current.focus();
            }}
          >
            0
          </Button>
          <Button
            onClick={() => {
              handleInput(".");
              inputRef.current.focus();
            }}
          >
            .
          </Button>
          <Button
            onClick={() => {
              handleBack();
              inputRef.current.focus();
            }}
          >
            {"<="}
          </Button>
          <Button
            onClick={() => {
              calculateResult();
              inputRef.current.focus();
            }}
          >
            =
          </Button>
        </div>
      </div>
    </div>
  );
}
