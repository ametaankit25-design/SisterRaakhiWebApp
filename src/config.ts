// Raksha Bandhan Gift Challenge Configuration
// Configured with your personal photos from /photos/ folder!

export interface QuizQuestion {
  id: number;
  photoUrl: string;
  question: string;
  description: string;
  options: {
    id: string;
    label: string;
  }[];
  correctAnswerId: string;
  successMessage: string;
  wrongMessages: string[];
}

export interface AppConfig {
  sisterName: string;
  brotherName: string;
  appName: string;
  tagline: string;
  
  photoQuiz: {
    title: string;
    description: string;
    questions: QuizQuestion[];
  };

  danceChallenge: {
    title: string;
    subtitle: string;
    songTitle: string;
    songArtist: string;
    songUrl: string; // URL or path to mp3 in /public/
    defaultDurationSeconds: number; // Fallback if audio metadata takes time to load
    danceMoves: {
      name: string;
      emoji: string;
      hint: string;
    }[];
    cheerMessages: string[];
  };

  giftReveal: {
    clue: string;
    locationText: string;
    personalMessageTitle: string;
    personalMessageBody: string;
    brotherSignature: string;
    giftItemHint: string;
  };
}

export const config: AppConfig = {
  sisterName: "Riya",
  brotherName: "Ankit",
  appName: "Raksha Bandhan Gift Challenge",
  tagline: "The Official Sibling Verification & Gift Quest 🎁✨",

  photoQuiz: {
    title: "The 5-Photo Sibling Memory Trial 📸",
    description: "Look at the real photos from our memories and pick the right answer!",
    questions: [
      {
        id: 1,
        photoUrl: "/photos/IMG_20230403_165757312.jpg",
        question: "1. Ye Kaunsi Jagah ka photo hai?",
        description: "Exhibit 1: Look closely at this photo...",
        options: [
          { id: "A", label: "Irrigation Garden" },
          { id: "B", label: "Annpurna Mataji" },
          { id: "C", label: "Nau Chowki" },
          { id: "D", label: "Tiloli" },
        ],
        correctAnswerId: "B",
        successMessage: "🎉 Correct! Annpurna Mataji is the right answer!",
        wrongMessages: [
          "😂 WRONG! Seriously, sis? Look at the photo again!",
          "👀 Are you blind? Try again!",
          "🤦‍♂️ Don't make me deduct 20% of your gift value! Guess right!"
        ]
      },
      {
        id: 2,
        photoUrl: "/photos/IMG_20230524_103516594.jpg",
        question: "2. In which year was this photo taken?",
        description: "Exhibit 2: Check your memory...",
        options: [
          { id: "A", label: "2024" },
          { id: "B", label: "2021" },
          { id: "C", label: "2022" },
          { id: "D", label: "2023" },
        ],
        correctAnswerId: "D",
        successMessage: "🌟 Bingo! 2023 is correct!",
        wrongMessages: [
          "🤣 Wrong year! Think carefully!",
          "👀 Nope! Try remembering when we took this!",
          "🤦‍♀️ Wrong answer! Try again!"
        ]
      },
      {
        id: 3,
        photoUrl: "/photos/IMG_20230529_183743713.jpg",
        question: "3. Which month was this photo taken?",
        description: "Exhibit 3: Seasonal memory test...",
        options: [
          { id: "A", label: "May" },
          { id: "B", label: "April" },
          { id: "C", label: "January" },
          { id: "D", label: "December" },
        ],
        correctAnswerId: "B",
        successMessage: "😂 Correct! April it is!",
        wrongMessages: [
          "😆 Haha nice try, but wrong month!",
          "❌ Incorrect! Guess again!",
          "🤔 Recheck the memory banks, sis!"
        ]
      },
      {
        id: 4,
        photoUrl: "/photos/IMG_20230529_190348338.jpg",
        question: "4. Who came with us on this trip?",
        description: "Exhibit 4: Travel crew verification...",
        options: [
          { id: "A", label: "Only both of us" },
          { id: "B", label: "Kisu" },
          { id: "C", label: "Kushal" },
          { id: "D", label: "Himanshu" },
        ],
        correctAnswerId: "D",
        successMessage: "💰 Exactly! Himanshu came along!",
        wrongMessages: [
          "😂 Wrong person! Think who accompanied us!",
          "👀 Wrong! Try again, sis!",
          "❌ Incorrect! Guess again."
        ]
      },
      {
        id: 5,
        photoUrl: "/photos/IMG_20231129_072341931.jpg",
        question: "5. Kya is vakt papa ka hair transplant ho gya tha?",
        description: "Exhibit 5: The final observation test...",
        options: [
          { id: "A", label: "Haa" },
          { id: "B", label: "Nhi" },
        ],
        correctAnswerId: "A",
        successMessage: "🎉 5/5 PERFECT SCORE! You have conquered all 5 Photo Trials!",
        wrongMessages: [
          "💔 Look closely at the photo and guess again!",
          "🥺 Wrong! Try again!",
          "😂 Galat javab! Sahi answer choose karo!"
        ]
      }
    ]
  },

  danceChallenge: {
    title: "The Sibling Dance Trial 💃🎶",
    subtitle: "Dance to 'Bhaiya Mere Rakhi Ke Bandhan Ko' while recording your performance to unlock your gift!",
    songTitle: "Bhaiya Mere Rakhi Ke Bandhan Ko Nibhana",
    songArtist: "Lata Mangeshkar (Chhoti Bahen)",
    songUrl: "/Bhaiya Mere Rakhi Ke Bandhan Ko Chhoti Bahen 320 Kbps.mp3",
    defaultDurationSeconds: 215, // Automatically synchronizes with audio duration
    danceMoves: [
      { name: "The Thumka Twist", emoji: "💃", hint: "Show off those energetic festive steps!" },
      { name: "Bhangra Shoulder Bounce", emoji: "🕺", hint: "Balle Balle hands in the air!" },
      { name: "Desi Girl Swag", emoji: "✨", hint: "High energy waist twirls!" },
      { name: "Gift Victory Shimmy", emoji: "🎁", hint: "Dance like the gift is already in your hands!" }
    ],
    cheerMessages: [
      "🔥 KEEP GOING! That gift is getting closer!",
      "💃 Bollywood director just called — they want your dance moves!",
      "✨ Show that full sibling energy! Don't stop now!",
      "🎉 Only a true sister dances with this much passion!",
      "⭐ 10/10 choreography! The judges (Ankit) are impressed!",
      "🚀 Final stretch! The gift lock is starting to vibrate!"
    ]
  },

  giftReveal: {
    clue: "khud dhundh le",
    locationText: "Gift chahiye to poore ghar me dhundh le nhi to kisi gareeb ko de dunga!",
    personalMessageTitle: "Happy Raksha Bandhan, Riya! ❤️",
    personalMessageBody: "No matter how much we fight over the TV remote, tease each other, or argue over who is mom's favorite... you'll always be my dearest sister, and I will always have your back no matter where life takes us. Thank you for always tying the most precious Rakhi on my wrist!",
    brotherSignature: "With all my love & protection,\nYour Brother, Ankit ❤️",
    giftItemHint: "A shiny package wrapped with a golden ribbon is waiting for you! 🎀"
  }
};
