// import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: "a4a56f5a-d52e-49cd-b2c2-45461fd79a88",
    firstName: "Kevin",
    lastName: "De Bruyne",
    username: "kevindebruyne",
    password: "kevindebruyne123",
    avatar: "https://res.cloudinary.com/ddqytua2y/image/upload/v1686999578/Social-media-app-assets/1482478136_kwvt0w.jpg",
    followers: [],
    following: [],
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: "db8fdf2a-fcb4-479a-9fae-cb150e555ce1",
    firstName: "Yashwanth",
    lastName: "A M",
    username: "yashwantham",
    password: "yashwantham123",
    avatar: "https://res.cloudinary.com/ddqytua2y/image/upload/v1686999901/Social-media-app-assets/mans-silhouette-on-sunset-mountains-backdrop_c9dhaw.jpg",
    followers: [],
    following: [],
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: "d309cd5c-dbdd-4b03-a87d-f2b59ea1ffd8",
    firstName: "Nikhil",
    lastName: "Kamath",
    username: "nikhilkamath",
    password: "nikhilkamath123",
    avatar: "https://res.cloudinary.com/ddqytua2y/image/upload/v1686999970/Social-media-app-assets/LTrhAhR6_400x400_rlfadf.jpg",
    followers: [],
    following: [],
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
 
  {
    _id: "fae96f0a-928a-433e-bdf5-2036429646cc",
    firstName: "Evelyn",
    lastName: "Clark",
    username: "evelynclark",
    password: "evelynclark123",
    avatar: "https://res.cloudinary.com/ddqytua2y/image/upload/v1687002020/Social-media-app-assets/341835630_152371267512780_7379959529228480656_n.jpg_rat9uc.jpg",
    followers: [],
    following: [],
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: "64d9a619-b9dd-45af-9fbe-e3054ed024ae",
    firstName: "Kane",
    lastName: "Williamson",
    username: "kanewilliamson",
    password: "kanewilliamson123",
    avatar: "https://res.cloudinary.com/ddqytua2y/image/upload/v1687001105/Social-media-app-assets/kane_rftngq.jpg",
    followers: [],
    following: [],
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: "ed15ba5c-668e-462e-9d23-85d158a42ce5",
    firstName: "Lily",
    lastName: "Carter",
    username: "lilycarter",
    password: "lilycarter123",
    avatar: "https://res.cloudinary.com/ddqytua2y/image/upload/v1687001884/Social-media-app-assets/4Z78HHO9_400x400_n4z7nj.jpg",
    followers: [],
    following: [],
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
