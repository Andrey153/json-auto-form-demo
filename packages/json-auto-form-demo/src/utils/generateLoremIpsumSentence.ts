export function generateLoremIpsumSentence(): string {
  const words: string[] = [
    'Lorem',
    'ipsum',
    'dolor',
    'sit',
    'amet,',
    'consectetur',
    'adipiscing',
    'elit,',
    'sed',
    'do',
    'eiusmod',
    'tempor',
    'incididunt',
    'ut',
    'labore',
    'et',
    'dolore',
    'magna',
    'aliqua.',
    'Ut',
    'enim',
    'ad',
    'minim',
    'veniam,',
    'quis',
    'nostrud',
    'exercitation',
    'ullamco',
    'laboris',
    'nisi',
    'ut',
    'aliquip',
    'ex',
    'ea',
    'commodo',
    'consequat.',
    'Duis',
    'aute',
    'irure',
    'dolor',
    'in',
    'reprehenderit',
    'in',
    'voluptate',
    'velit',
    'esse',
    'cillum',
    'dolore',
    'eu',
    'fugiat',
    'nulla',
    'pariatur.',
    'Excepteur',
    'sint',
    'occaecat',
    'cupidatat',
    'non',
    'proident,',
    'sunt',
    'in',
    'culpa',
    'qui',
    'officia',
    'deserunt',
    'mollit',
    'anim',
    'id',
    'est',
    'laborum.',
  ];

  let sentence = '';

  // Randomly select words and build the sentence
  for (let i = 0; i < 10; i++) {
    const randomIndex: number = Math.floor(Math.random() * words.length);
    const word: string = words[randomIndex];

    if (i === 0) {
      sentence += word.charAt(0).toUpperCase() + word.slice(1); // Capitalize the first word
    } else {
      sentence += ' ' + word;
    }
  }

  // Add a period at the end of the sentence
  sentence += '.';

  return sentence;
}

export function generateRandomSentenceArray(numRows: number, numCols: number): string[][] {
  const sentences: string[][] = [];

  for (let i = 0; i < numRows; i++) {
    const row: string[] = [];

    for (let j = 0; j < numCols; j++) {
      row.push(generateLoremIpsumSentence());
    }

    sentences.push(row);
  }

  return sentences;
}

type ColumnType = 'boolean' | 'number' | 'string';

type RandomValueArray = Array<Array<boolean | number | string>>;

export function generateRandomValueArray(
  numRows: number,
  columnTypes: ColumnType[],
): RandomValueArray {
  const values: RandomValueArray = [];

  for (let i = 0; i < numRows; i++) {
    const row: Array<boolean | number | string> = [];

    for (let j = 0; j < columnTypes.length; j++) {
      const columnType = columnTypes[j];
      let randomValue: boolean | number | string;

      switch (columnType) {
        case 'boolean':
          randomValue = Math.random() < 0.5;
          break;
        case 'number':
          randomValue = Math.floor(Math.random() * 100);
          break;
        case 'string':
          randomValue = generateLoremIpsumSentence();
          break;
        default:
          throw new Error(`Invalid column type: ${columnType}`);
      }

      row.push(randomValue);
    }

    values.push(row);
  }

  return values;
}
