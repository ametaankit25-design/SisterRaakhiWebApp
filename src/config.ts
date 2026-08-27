// Raksha Bandhan Gift Challenge Configuration
// You can customize all texts, photos, dance challenge duration, and gift location here!

export interface AppConfig {
  sisterName: string;
  brotherName: string;
  appName: string;
  tagline: string;
  
  photoQuiz: {
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
    // High-res festive Raksha Bandhan sibling memory illustration / photo
    photoUrl: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1000&q=80",
    question: "Who is this handsome mastermind in this memory?",
    description: "Look closely at this legendary photo before you answer...",
    options: [
      { id: "A", label: "Your favorite & most generous brother (Ankit)", subtitle: "The one who always saves you from scoldings" },
      { id: "B", label: "A Bollywood superstar on holiday", subtitle: "Looks like one, but not quite!" },
      { id: "C", label: "A random handsome stranger with high IQ", subtitle: "Flattering, but try again" },
      { id: "D", label: "Your personal ATM & snack delivery agent", subtitle: "True, but pick the official title!" },
    ],
    correctAnswerId: "A",
    successMessage: "🎉 Correct! Okay, maybe you actually love and recognize your brother.",
    wrongMessages: [
      "😂 WRONG! Seriously, sis?! Your gift is judging you right now.",
      "👀 Are you blind? That's your one and only brother! Try again.",
      "🤦‍♂️ Don't make me deduct 50% of your gift value! Guess right!",
      "🤣 Nice try! But you can't deny brotherhood that easily."
    ]
  },

  danceChallenge: {
    title: "The 10-Minute Dance Challenge 💃",
    subtitle: "The photo quiz was too easy. Now let's see your real Rakhi celebration moves!",
    durationSeconds: 600, // 10 minutes (600 seconds)
    // Upbeat celebratory dance tutorial / Bollywood dance medley track
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
