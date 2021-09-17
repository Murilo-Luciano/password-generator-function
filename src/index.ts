// 33 ... 126
// 48 ... 57 -> number
// 65 ... 90 -> uppercase alphabetic
// 97 ... 122 -> lowercase alphabetic
// 33 ... 47 -> symbol
// 58 ... 64 -> symbol
// 91 ... 96 -> symbol

interface OptionProps {
  hasNumber: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasSymbols: boolean;
}

function passwordGenerator(
  length: number,
  options: OptionProps = {
    hasNumber: true,
    hasUppercase: true,
    hasLowercase: true,
    hasSymbols: false,
  }
) {
  // let possibility = range(33, 127);
  const possibility = handleOptions(range(33, 127), options);

  function charGenerator(): string {
    const char = String.fromCharCode(
      possibility[Math.floor(Math.random() * (max - min) + min)]
    );

    return char === "\x00" ? charGenerator() : char;
  }

  const min = Math.ceil(0);
  const max = Math.floor(possibility[possibility.length - 1]);
  const password = [];
  for (let i = 0; i < length; i++) {
    password.push(charGenerator());
  }
  return password.join("");
}

function range(start: number, stop?: number, step?: number) {
  if (typeof stop == "undefined") {
    // one param defined
    stop = start;
    start = 0;
  }

  if (typeof step == "undefined") {
    step = 1;
  }

  if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
    return [];
  }

  var result = [];
  for (var i = start; step > 0 ? i < stop : i > stop; i += step) {
    result.push(i);
  }

  return result;
}

function removePossibilities(possibility: number[], removeOptions: number[]) {
  return possibility.filter((element) => removeOptions.indexOf(element) == -1);
}

function handleOptions(possibility: number[], options: OptionProps) {
  const symbolRanges = [
    range(33, 48),
    range(58, 65),
    range(91, 97),
    range(123, 127),
  ];

  if (options.hasNumber === false) {
    possibility = removePossibilities(possibility, range(48, 58));
  }
  if (options.hasLowercase === false) {
    possibility = removePossibilities(possibility, range(97, 123));
  }
  if (options.hasUppercase === false) {
    possibility = removePossibilities(possibility, range(65, 91));
  }
  if (options.hasSymbols === false) {
    symbolRanges.forEach(
      (range) => (possibility = removePossibilities(possibility, range))
    );
  }

  return possibility;
}

for (let i = 0; i < 20; i++) {
  const a = passwordGenerator(20);
  console.log(a, " -> ", a.length);
}
