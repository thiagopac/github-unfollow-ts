import GitHub from "./github";

const gitHub = new GitHub(process.argv[2]);
const whiteList: string[] = process.argv.slice(3);

async function unfollow(): Promise<void> {
  let currentPage: number = 1;
  let followed: any[];

  do {
    followed = await gitHub.followedUsers(currentPage);
    currentPage++;

    for (const user of followed) {
      const targetUser: string = user.login;
      if (!whiteList.includes(targetUser)) {
        const followsBack: boolean = await gitHub.checkFollowBack(targetUser);
        if (!followsBack) {
          await gitHub.unfollowUser(targetUser);
        }
      }
    }
  } while (followed.length > 0);
}

unfollow().then(() => console.log("Unfollow script completed."));
