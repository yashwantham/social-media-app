import { v4 as uuid } from "uuid";
// import { formatDate } from "../utils/authUtils";

/**
 * Posts can be added here.
 * You can add default posts of your wish with different attributes
 * */

/*
export const posts = [
  {
    _id: uuid(),
    content:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "adarshbalika",
    createdAt: "2023-06-19T14:13:57+05:30",
    updatedAt: "2023-06-19T14:13:57+05:30",
  },
  {
    _id: uuid(),
    content:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "shubhamsoni",
    createdAt: "2023-06-19T14:13:57+05:30",
    updatedAt: "2023-06-19T14:13:57+05:30",
  },
];
*/






export const posts = [
  {
    _id: uuid(),
    content: "Belief is a beautiful gift!",
    mediaURL: "",
    likes: {
      likeCount: 5,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    name: "Yashwanth A M", 
    username: "yashwantham",
    createdAt: "2023-06-11T14:13:57+05:30",
    updatedAt: "2023-06-11T14:13:57+05:30",
  },
  {
    _id: uuid(),
    content: "Sunset from NYC!",
    mediaURL:
      "https://res.cloudinary.com/ddqytua2y/image/upload/v1686988311/Social-media-app-assets/nyc_kjcdsh.jpg",
    likes: {
      likeCount: 1,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    name: "Nikhil Kamath",
    username: "nikhilkamath",
    createdAt: "2023-06-14T14:13:57+05:30",
    updatedAt: "2023-06-14T14:13:57+05:30",
  },
  {
    _id:  uuid(),
    content:
      "You are never too old to set another goal or to dream a new dream.",
    mediaURL: "",
    likes: {
      likeCount: 5,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    name: "Lily Carter",
    username: "lilycarter",
    createdAt: "2023-05-29T14:13:57+05:30",
    updatedAt: "2023-05-29T14:13:57+05:30",
  },
  {
    _id:  uuid(),
    content: "Yayy! Its my Birthday Today. Made this cake for myself!",
    mediaURL:
      "https://res.cloudinary.com/dtrjdcrme/image/upload/v1647014336/ecommerce/chocolatecake4.webp",
    likes: {
      likeCount: 2,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [
      {
        _id:  uuid(),
        name: "Nikhil Kamath",
        username: "nikhilkamath",
        text: "Happy Birthday! Enjoy your Day!!",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
      {
        _id:  uuid(),
        name: "Kane Williamson",
        username: "kanewilliamson",
        text: "Wow! Looks Amazzing! Happy Birthday!",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
    ],
    name: "Evelyn Clark",
    username: "evelynclark",
    createdAt: "2023-06-09T14:13:57+05:30",
    updatedAt: "2023-06-09T14:13:57+05:30",
  },
  {
    _id:  uuid(),
    content:
      "Life has got all those twists and turns. You’ve got to hold on tight and off you go.",
    mediaURL: "",
    likes: {
      likeCount: 2,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    name: "Kane Williamson",
    username: "kanewilliamson",
    createdAt: "2023-06-14T14:13:57+05:30",
    updatedAt: "2023-06-14T14:13:57+05:30",
  },
  {
    _id:  uuid(),
    content: "Treble Winners!!",
    mediaURL: "https://res.cloudinary.com/ddqytua2y/image/upload/v1688936832/Social-media-app-assets/lqbvpvqic32ymdegxpnx.jpg",
    likes: {
      likeCount: 2,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    name: "Kevin De Bruyne",
    username: "kevindebruyne",
    createdAt: "2023-06-13T14:13:57+05:30",
    updatedAt: "2023-06-13T14:13:57+05:30",
  },
  {
    _id:  uuid(),
    content:
      "No matter what people tell you, words and ideas can change the world.",
    mediaURL: "",
    likes: {
      likeCount: 2,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    name: "Nikhil Kamath",
    username: "nikhilkamath",
    createdAt: "2023-06-17T14:13:57+05:30",
    updatedAt: "2023-06-17T14:13:57+05:30",
  },
  {
    _id: uuid(),
    content: "Stunning goa.",
    mediaURL:
      "https://res.cloudinary.com/ddqytua2y/image/upload/v1686985902/Social-media-app-assets/20220409_165934_vimd3z.jpg",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [ {
      _id: uuid(),
      name: "Yashwanth A M",
      username: "yashwantham",
      text: "That's a cool picture",
      votes: {
        upvotedBy: [],
        downvotedBy: [],
      },
    },],
    name: "Kane Williamson",
    username: "kanewilliamson",
    createdAt: "2023-06-12T14:13:57+05:30",
    updatedAt: "2023-06-12T14:13:57+05:30",
  },
  {
    _id:  uuid(),
    content: "When you have a dream, you’ve got to grab it and never let go. ",
    mediaURL:
      "",
    likes: {
      likeCount: 10,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    name: "Lily Carter",
    username: "lilycarter",
    createdAt: "2023-06-22T14:13:57+05:30",
    updatedAt: "2023-06-22T14:13:57+05:30",
  },
  {
    _id:  uuid(),
    content:
      "Cubbon Park mornings",
    mediaURL: "https://res.cloudinary.com/ddqytua2y/image/upload/v1686988952/Social-media-app-assets/FyTeekAWAAATvzf_kpq6xn.jpg",
    likes: {
      likeCount: 1,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    name: "Evelyn Clark",
    username: "evelynclark",
    createdAt: "2023-06-20T14:13:57+05:30",
    updatedAt: "2023-06-20T14:13:57+05:30",
  },
  {
    _id:  uuid(),
    content: "Believe in yourself! Rest all will fall in place.",
    mediaURL: "",
    likes: {
      likeCount: 2,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [
      {
        _id:  uuid(),
        name: "Nikhil Kamath",
        username: "nikhilkamath",
        text: "So True!!",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
    ],
    name: "Yashwanth A M",
    username: "yashwantham",
    createdAt: "2023-06-19T14:13:57+05:30",
    updatedAt: "2023-06-19T14:13:57+05:30",
  },
  {
    _id:  uuid(),
    content:
      "You can get everything in life you want if you will just help enough other people get what they want.",
    mediaURL: "",
    likes: {
      likeCount: 5,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    name: "Kane Williamson",
    username: "kanewilliamson",
    createdAt: "2023-06-19T14:13:57+05:30",
    updatedAt: "2023-06-19T14:13:57+05:30",
  },

  {
    _id:  uuid(),
    content:
      "If you believe something needs to exist, if it's something you want to use yourself, don't let anyone ever stop you from doing it.",
    mediaURL: "",
    likes: {
      likeCount: 5,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    name: "Nikhil Kamath",
    username: "nikhilkamath",
    createdAt: "2023-06-19T14:13:57+05:30",
    updatedAt: "2023-06-19T14:13:57+05:30",
  },

  {
    _id:  uuid(),
    content: "More is lost by indecision than wrong decision.",
    mediaURL: "",
    likes: {
      likeCount: 5,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    name: "Evelyn Clark",
    username: "evelynclark",
    createdAt: "2023-06-19T14:13:57+05:30",
    updatedAt: "2023-06-19T14:13:57+05:30",
  },

  {
    _id:  uuid(),
    content:
      "The reason we struggle with insecurity is because we compare our behind-the-scenes with everyone else’s highlight reel.",
    mediaURL: "",
    likes: {
      likeCount: 7,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    name: "Evelyn Clark",
    username: "evelynclark",
    createdAt: "2023-06-19T14:13:57+05:30",
    updatedAt: "2023-06-19T14:13:57+05:30",
  },

  {
    _id:  uuid(),
    content: "If you don’t risk anything, you risk even more.",
    mediaURL: "",
    likes: {
      likeCount: 6,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    name: "Nikhil Kamath",
    username: "nikhilkamath",
    createdAt: "2023-06-19T14:13:57+05:30",
    updatedAt: "2023-06-19T14:13:57+05:30",
  },

  {
    _id:  uuid(),
    content: "What a match we just had here at Lord's! Some scenes.",
    mediaURL: "https://res.cloudinary.com/ddqytua2y/image/upload/v1686983765/Social-media-app-assets/u5gsmi6bbvh71_jvjlri.jpg",
    likes: {
      likeCount: 12,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [{
      _id:  uuid(),
      name: "Nikhil Kamath",
      username: "nikhilkamath",
      text: "an absolute treat for cricket fans.",
      votes: {
        upvotedBy: [],
        downvotedBy: [],
      },
    }],
    name: "Yashwanth A M",
    username: "yashwantham",
    createdAt: "2023-06-19T14:13:57+05:30",
    updatedAt: "2023-06-19T14:13:57+05:30",
  },

  {
    _id: uuid(),
    content:
      "I learned a long time ago that there is something worse than missing the goal, and that’s not pulling the trigger.",
    mediaURL: "",
    likes: {
      likeCount: 9,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    name: "Kevin De Bruyne",
    username: "kevindebruyne",
    createdAt: "2023-06-19T14:13:57+05:30",
    updatedAt: "2023-06-19T14:13:57+05:30",
  },

  {
    _id:  uuid(),
    content:
      "Success is stumbling from failure to failure with no loss of enthusiasm. Love this quote by Winston Churchill.",
    mediaURL: "",
    likes: {
      likeCount: 12,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    name: "Lily Carter",
    username: "lilycarter",
    createdAt: "2023-06-19T14:13:57+05:30",
    updatedAt: "2023-06-19T14:13:57+05:30",
  },

  {
    _id:  uuid(),
    content:
      "Optimism is the faith that leads to achievement. Nothing can be done without hope and confidence.",
    mediaURL: "",
    likes: {
      likeCount: 8,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    name: "Kane Williamson",
    username: "kanewilliamson",
    createdAt: "2023-06-19T14:13:57+05:30",
    updatedAt: "2023-06-19T14:13:57+05:30",
  },

  {
    _id:  uuid(),
    content:
      "Life is like riding a bicycle. To keep your balance you must keep moving.",
    mediaURL: "",
    likes: {
      likeCount: 5,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    name: "Evelyn Clark",
    username: "evelynclark",
    createdAt: "2023-06-19T14:13:57+05:30",
    updatedAt: "2023-06-19T14:13:57+05:30",
  },

  {
    _id:  uuid(),
    content:
      "“Do not wait for the perfect time and place to enter, for you are already onstage.",
    mediaURL: "",
    likes: {
      likeCount: 25,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    name: "Nikhil Kamath",
    username: "nikhilkamath",
    createdAt: "2023-06-19T14:13:57+05:30",
    updatedAt: "2023-06-19T14:13:57+05:30",
  },

  {
    _id:  uuid(),
    content: "It is a rough road that leads to the heights of greatness.",
    mediaURL: "",
    likes: {
      likeCount: 8,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    name: "Kevin De Bruyne",
    username: "kevindebruyne",
    createdAt: "2023-06-19T14:13:57+05:30",
    updatedAt: "2023-06-19T14:13:57+05:30",
  },
];