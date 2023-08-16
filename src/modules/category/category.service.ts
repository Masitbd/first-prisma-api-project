import { Category, PrismaClient, Profile, User } from "@prisma/client";
import { CallTrackerCall } from "assert";
import { resourceLimits } from "worker_threads";

const prisma = new PrismaClient();

const insertIntoDb = async (data: Category): Promise<Category> => {
  const result = await prisma.category.create({
    data,
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

/* const getUsers = async () => {
  const result = await prisma.user.findMany({
    include: {
      profile: true,
    },
  });
  return result;
};
 */
export const CategoryService = {
  insertIntoDb,
};
