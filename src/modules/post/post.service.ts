import { Post, Prisma, PrismaClient } from "@prisma/client";

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

const getPosts = async (options: any) => {
  const { sortBy, sortOrder, searchTerm, page, limit } = options;

  const skip = parseInt(limit) * parseInt(page) - parseInt(limit) || 0;
  const take = parseInt(limit) || 0;

  return await prisma.$transaction(async (tx) => {
    const result = await tx.post.findMany({
      skip,
      take,
      include: {
        category: true, // this category and author is the table relationship name
        author: true,
      },
      orderBy:
        sortBy && sortOrder
          ? {
              //createAt: "desc",
              [sortBy]: sortOrder,
            }
          : {
              createAt: "desc",
            },

      where: {
        OR: [
          {
            title: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
          {
            author: {
              name: {
                contains: searchTerm,
                mode: "insensitive",
              },
            },
          },
        ],
      },
    });

    const total = await tx.post.count();
    return { data: result, total };
  });
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

const updatePost = async (
  id: number,
  payload: Partial<Post>
): Promise<Post> => {
  const result = await prisma.post.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};
const deletePost = async (id: number): Promise<Post> => {
  const result = await prisma.post.delete({
    where: {
      id,
    },
  });
  return result;
};

export const PostService = {
  insertIntoDb,
  getPosts,
  getSinglePost,
  updatePost,
  deletePost,
};

/*
 limit = 5
 page number = 2
 total = 10

 take = limit = 5
 skip = limit*page -limit
      = 5*2 -5 = 5 
      means skip first 5 and then take next 5

 1 2 3 4 5 6 7 8 9 10
*/
