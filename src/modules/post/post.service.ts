import { Post, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const insertIntoDb = async (data: Post): Promise<Post> => {
  const result = await prisma.post.create({
    data,
    include: {
      author: true,
      category: true,
    },
  });
  return result;
};

/* const insertOrUpdateProfile = async (data: Profile): Promise<Profile> => {
  const isExist = await prisma.profile.findUnique({
    where: {
      userId: data.userId,
    },
  });

  if (isExist) {
    const result = await prisma.profile.update({
      where: {
        userId: data.userId,
      },
      data: {
        bio: data.bio,
      },
    });
    return result;
  }

  const result = await prisma.profile.create({
    data,
  });
  return result;
};
 */

const getPosts = async () => {
  const result = await prisma.post.findMany({
    include: {
      category: true, // this category and author is the table relationship name
      author: true,
    },
  });
  return result;
};

const getSinglePost = async (id: number) => {
  const result = await prisma.post.findUnique({
    where: {
      id: id,
    },
    include: {
      category: true, // this category and author is the table relationship name
      author: true,
    },
  });
  console.log("My result", result);
  return result;
};

export const PostService = {
  insertIntoDb,
  getPosts,
  getSinglePost,
};
