# Composing Cards

We bought these cards from ThinkFun via Amazon a while back.
They have musical notes on them and a card code in the corner.
They can be flipped and rotated.

The idea is to arrange them into phrases and / or compositions.
There was a website you could type the codes into, press a button and hear your composition played back from composed prerecorded hi fidelity orchestral and percussion recordings. Really cool. My kid loved it. You could also download/email PDFs and MP3s of your compositions.

Sadly they got shut down due to California's equivalent of GDPR.

* https://www.thinkfun.com/compose-yourself-apology/

So some years later, with kid number 2 now getting interested in music and kid number 1 interested in music and programming, kid number 1 suggests we could just build it again. So here we are...

I don't have the wonderful orchestral / percussion samples that match the cards but web browsers have a basic synthesizer in their audio APIs and they can play samples loaded from a server and I have a piano so maybe we can come close to the original. We'll see.

## Cards

There are 60 transparent cards.
30 different.
2 of each.
4 digit code represents each card.
e.g. 0021
Rotate 0021 180 degrees to get 0022
Flip 0021 along the beats 2/3 axis to get 0023
Flip 0021 along the B4 axis to get 0024
So there are 30x4 different 4/4 bar phrases.
Featuring combinations of only minim, crochet, quaver durations.

Rotation operation is a composition of:

* Flip along beats 2/3 axis
* Flip along B5 axis

### Card Code Range

* 0011 - 0091 in incremements of 10 e.g. 0011, 0021, 0031, ... 0091
* 0101 - 0191 in increments of 10 e.g. 0101, 0121, 0131, ... 0191
* 0201 - 0291 in increments of 10 e.g. 0201, 0221, 0231, ... 0291
* 0301 alone

Again, there are 2 of each card and each card has 4 codes e.g.

* 0231
* 0232
* 0233
* 0234

## Milestones / Tasks

1. Create card code to music data structure
2. Rotate and flip the cards as described above to build out all variations.
This may benefit from a music library that understands a bit of music theory.
3. Play a card - web midi
4. Type in a card code to play a card
5. Type in a list of cards to play several in a row, smoothly
6. Render a card
7. Type in a card code to render a card
8. Type in a list of cards to render several cards

* Name a project - Save, List, Load, Rename, Delete
* Drag cards around, buttons to flip and rotate
* Render all the cards in a pallete/drawer, drag and drop into composition
* Restore original Compose Yourself functionality:
** Email a PDF to yourself - requires account creation and email confirmation etc.
** Download a fully stitched together mp3 from samples of each card.
*** Can I get the wonderful orchestral and marimba samples?

#### 1. Create card code to music data structure

I need a native JS DS that I can use to play midi from and render notes from.

- Will start with vexflow's easyscore
- I only need treble clef notes without accidentals and very limited durations:
  - Minim - /h
  - Crochet - /q
  - Quaver - /8
- It uses midi notation so C4 is middle C

