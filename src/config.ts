// Raksha Bandhan Gift Challenge Configuration
// You can customize all texts, photos, dance challenge duration, and gift location here!

export interface QuizQuestion {
  id: number;
  photoUrl: string;
  question: string;
  description: string;
  options: {
    id: string;
    label: string;
    subtitle?: string;
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
    durationSeconds: number; // 600s = 10 minutes (or quick demo test mode)
    videoUrl?: string; // YouTube embed or custom video
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
  sisterName: "Rakshi",
  brotherName: "Ankit",
  appName: "Raksha Bandhan Gift Challenge",
  tagline: "The Official Sibling Verification & Gift Quest 🎁✨",

  photoQuiz: {
    title: "The 5-Photo Sibling Memory Trial 📸",
    description: "Answer all 5 photo questions correctly to prove you're the real sister!",
    questions: [
      {
        id: 1,
        photoUrl: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1000&q=80",
        question: "1. Who is this handsome mastermind in this memory?",
        description: "Exhibit 1: Look closely at this legendary photo...",
        options: [
          { id: "A", label: "Your favorite & most generous brother (Ankit)", subtitle: "The one who always saves you from scoldings" },
          { id: "B", label: "A Bollywood superstar on vacation", subtitle: "Looks like one, but guess again!" },
          { id: "C", label: "A random handsome stranger with high IQ", subtitle: "Flattering, but pick the official title!" },
          { id: "D", label: "Your personal 24/7 snack delivery agent", subtitle: "True, but pick option A!" },
        ],
        correctAnswerId: "A",
        successMessage: "🎉 Correct! Okay, maybe you actually recognize your brother.",
        wrongMessages: [
          "😂 WRONG! Seriously, sis? Your gift is judging you right now.",
          "👀 Are you blind? That's your one and only brother! Try again.",
          "🤦‍♂️ Don't make me deduct 20% of your gift value! Guess right!"
        ]
      },
      {
        id: 2,
        photoUrl: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1000&q=80",
        question: "2. What is brother Ankit's #1 superpower when you are in trouble?",
        description: "Exhibit 2: Sibling emergency defense protocol...",
        options: [
          { id: "A", label: "Secretly bringing snacks & backing you up against mom", subtitle: "The ultimate sibling shield!" },
          { id: "B", label: "Saying 'I told you so' exactly 50 times", subtitle: "He might tease, but he saves you first" },
          { id: "C", label: "Blaming the innocent house cat", subtitle: "A good tactic, but not the main superpower" },
          { id: "D", label: "Disappearing into thin air", subtitle: "Never! He's always there" },
        ],
        correctAnswerId: "A",
        successMessage: "🌟 Bingo! That's what brothers are for!",
        wrongMessages: [
          "🤣 Wrong! Have some faith in your brother!",
          "👀 Nope! Think about who always saves your back!",
          "🤦‍♀️ Wrong answer! Try again before mom finds out!"
        ]
      },
      {
        id: 3,
        photoUrl: "https://images.unsplash.com/photo-1489710437720-ebb67ec84dd2?auto=format&fit=crop&w=1000&q=80",
        question: "3. Who always ends up winning the TV remote / snack battle at home?",
        description: "Exhibit 3: The eternal household battle...",
        options: [
          { id: "A", label: "Obviously Sis (because she complains to mom & dad!)", subtitle: "Undefeated champion with parental backup" },
          { id: "B", label: "Brother (through sheer intellectual dominance)", subtitle: "He lets you win to keep peace!" },
          { id: "C", label: "The WiFi Router", subtitle: "When internet goes down, everyone loses" },
          { id: "D", label: "Nobody, TV stays on news channel", subtitle: "Dad's favorite trick" },
        ],
        correctAnswerId: "A",
        successMessage: "😂 100% True! Sibling drama at its finest!",
        wrongMessages: [
          "😆 Haha nice try, but we all know who cries to mom!",
          "❌ Incorrect! You always steal the remote!",
          "🤔 Recheck the memory banks, sis!"
        ]
      },
      {
        id: 4,
        photoUrl: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1000&q=80",
        question: "4. What is the official Rakhi tax rate Ankit owes you today?",
        description: "Exhibit 4: Financial negotiations under section 420...",
        options: [
          { id: "A", label: "100% of his love + an awesome secret gift! 🎁", subtitle: "Fair trade for a sacred Rakhi thread!" },
          { id: "B", label: "Just 10 rupees and a half-eaten chocolate", subtitle: "Inflation is real, but not that bad!" },
          { id: "C", label: "A warm handshake and best wishes", subtitle: "Zero chance you'd accept this!" },
          { id: "D", label: "A promise to do all your chores for a year", subtitle: "Dream on, sis!" },
        ],
        correctAnswerId: "A",
        successMessage: "💰 Approved! Your gift package is fully sponsored!",
        wrongMessages: [
          "😂 Don't sell yourself cheap! Pick the real deal!",
          "👀 Wrong! Think bigger, sis!",
          "❌ Tax calculation error! Try again."
        ]
      },
      {
        id: 5,
        photoUrl: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=1000&q=80",
        question: "5. No matter how much we tease each other, who is your forever protector & favorite brother?",
        description: "Exhibit 5: The final bond verification...",
        options: [
          { id: "A", label: "My brother Ankit ❤️ (The best brother in the universe!)", subtitle: "Forever and always, no matter what!" },
          { id: "B", label: "Google AI Chatbot", subtitle: "AI is cool, but cannot give physical gifts!" },
          { id: "C", label: "The delivery guy with pizza", subtitle: "Close second, but brother ranks #1!" },
          { id: "D", label: "My favorite bedroom pillow", subtitle: "Comfy, but not family!" },
        ],
        correctAnswerId: "A",
        successMessage: "🎉 5/5 PERFECT SCORE! You have officially conquered the Photo Trial!",
        wrongMessages: [
          "💔 Ouch! That hurt brother's feelings! Pick the right one!",
          "🥺 Seriously? After all these years? Try again!",
          "😂 Nice joke! Now choose your brother!"
        ]
      }
    ]
  },

  danceChallenge: {
    title: "The 10-Minute Dance Challenge 💃",
    subtitle: "The 5 photo tests were passed. Now let's see your real Rakhi celebration moves!",
    durationSeconds: 600, // 10 minutes (600 seconds)
    videoUrl: "https://www.youtube-nocookie.com/embed/HqUeS3m5igI?autoplay=1&mute=0&loop=1&playlist=HqUeS3m5igI",
    danceMoves: [
      { name: "The Thumka Twist", emoji: "💃", hint: "Show off those energetic wedding steps!" },
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
    clue: "Where your warm winter jackets sleep and childhood memories hide...",
    locationText: "📍 Look inside the top cupboard in Mom & Dad's bedroom, hidden behind the royal blue winter bag!",
    personalMessageTitle: "Happy Raksha Bandhan, Sis! ❤️",
    personalMessageBody: "No matter how much we fight over the TV remote, tease each other, or argue over who is mom's favorite... you'll always be my dearest sister, and I will always have your back no matter where life takes us. Thank you for always tying the most precious Rakhi on my wrist!",
    brotherSignature: "With all my love & protection,\nYour Brother, Ankit ❤️",
    giftItemHint: "A shiny package wrapped with a golden ribbon is waiting for you! 🎀"
  }
};
