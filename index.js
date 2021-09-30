// TODO - get the functions that read these inputs to validate them
// I've already done a few typos :face-palm:
const CARDS = {
  '0011': 'B4/q, D5/h, B4/q',
  '0021': 'G4/q, D5/8, C5/8, B4/q, G4/q',
  '0031': 'B4/q, A4/8, A4/8, B4/8, B4/8, G4/q',
  '0041': 'B4/8, C5/8, D5/h, C5/8, B4/8',
  '0051': 'A4/8, B4/8, C5/h, B4/q',
  '0061': 'G4/8, D5/8, B4/8, G4/8, G4/h',
  '0071': 'G4/q, A4/q, B4/q, G4/q',
  '0081': 'G4/q, D5/q, C5/8, B4/8, A4/q',
  '0091': 'A4/q, C5/q, B4/8, C5/8, A4/9, G4/8',
  '0101': 'B4/8, B4/8, A4/8, B4/8, C5/q, B4/q',
  '0111': 'G4/8, D5/8, B4/8, G4/8, A4/8, C5/8, A4/q', 
  '0121': 'A4/h, C5/8, B4/8, A4/8, G5/8',
  '0131': 'G4/8, B4/8, D5/8, B4/8, G4/8, A4/8, B4/q',
  '0141': 'B4/q, D5/q, C5/q, B4/q',
  '0151': 'B4/q, B4/8, C5/8, B4/q, B4/8, G4/8',
  '0161': 'B4/8, A4/8, G4/q, A4/q, G4/q',
  '0171': 'C5/q, B4/8, A4/8, B4/q, G4/q',
  '0181': 'C5/h, G4/q, C5/q',
  '0191': 'B4/8, D5/8, B4/8, D5/8, B4/8, G4/8, B4/q',
  '0201': 'B4/q, G4/q, G4/h',
  '0211': 'B4/q, A4/8, A4/8, C5/8, C5/8, A4/q',
  '0221': 'A4/q, C5/8, B4/8, G4/q, G4/q',
  '0231': 'F4/8, G4/8, A4/8, G4/8, F4/q, C5/q',
  '0241': 'F4/8, A4/8, C5/8, F5/8, E5/q, C5/q',
  '0251': 'D5/q, C5/8, A4/8, G4/8, A4/8, F4/q',
  '0261': 'C5/h, E5/8, F5/8, F4/q',
  '0271': 'F4/q, G4/8, A4/8, C5/8, D5/8, F5/q',
  '0281': 'F4/q, C5/q, F4/h',
  '0291': 'C5/q, A4/8, A4/8, E5/h',
  '0301': 'C5/q, G4/q, F4/h'
};

// The cards have a limited range
const MIDI_RANGE = ['A3','B3','C4','D4','E4','F4','G4','A4','B4','C5','D5','E5','F5','G5','A5','B5','C6','D6','E6','F6','G6'];

const B5_INDEX = MIDI_RANGE.indexOf('B4'); // index 8

// Flip vertically through B5 on the stave
const flipPitch = (pitch) => {
  const index = MIDI_RANGE.indexOf(pitch); // D4 is 3 // G5 is 13
  const diff = B5_INDEX - index; // D4 diff is 5 // G4 diff is -5
  return MIDI_RANGE[B5_INDEX + diff];
};

// Forward slash is optional in vexflow easy score, 
// each note in sequence takes duration from previous
// note unless specified
// const extractPitch = (note) => {
//   const pair = note.split('/');
//   if (pair.length === 1) {
//     return pair[0];
//   }
// };

const flipNotes = (seq) => seq
  .split(', ')
  .map((note) => {
    // Split, keep both (latter optional)
    const [pitch, duration] = note.split('/');

    // Flip pitch
    const newPitch = flipPitch(pitch);

    // Stitch together (latter optional)
    return `${newPitch}${duration?'/':''}${duration?duration:''}`;
  })
  .join(', ');

// Flip horizontally through beats 2-3
const reverse = (seq) => seq.split(', ').reverse().join(', ');

const rotate = (seq) => flipNotes(reverse(seq));

const inc = (codeIntAsStr, incr) => `${parseInt(codeIntAsStr, 10) + incr}`.padStart(4, '0');

const ALL_CARDS = {};

Object.keys(CARDS).forEach((cardCode) => {
  ALL_CARDS[cardCode] = CARDS[cardCode];
  ALL_CARDS[inc(cardCode, 1)] = rotate(CARDS[cardCode]),
  ALL_CARDS[inc(cardCode, 2)] = reverse(CARDS[cardCode]),
  ALL_CARDS[inc(cardCode, 3)] = flipNotes(CARDS[cardCode]);
  // console.log(cardCode, '->', {
  //   [cardCode]: CARDS[cardCode],
  //   [inc(cardCode, 1)]: rotate(CARDS[cardCode]),
  //   [inc(cardCode, 2)]: reverse(CARDS[cardCode]),
  //   [inc(cardCode, 3)]: flipNotes(CARDS[cardCode])
  // });
});

if (window) {
  window.compose_ys = {
    CARDS: CARDS,
    ALL_CARDS: ALL_CARDS
  };
}
