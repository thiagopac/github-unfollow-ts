// @ts-nocheck
import axios from "axios";
import { AxiosResponse } from "axios";

class GitHub {
  private token: string;
  private headers: { Authorization: string; Accept: string };
  private username: string;

  constructor(token: string) {
    this.token = token;
    this.headers = {
      Authorization: `Bearer ${this.token}`,
      Accept: "application/vnd.github.v3+json",
    };
  }

  async profile(): Promise<any> {
    const url = "https://api.github.com/user";
    const response: AxiosResponse = await axios.get(url, {
      headers: this.headers,
    });
    this.username = response.data.login;
    return response.data;
  }

  async followedUsers(currentPage: number = 1): Promise<any[]> {
    const url = `https://api.github.com/user/following?page=${currentPage}`;
    const response: AxiosResponse = await axios.get(url, {
      headers: this.headers,
    });
    return response.data;
  }

  async unfollowUser(target: string): Promise<void> {
    const url = `https://api.github.com/user/following/${target}`;
    await axios.delete(url, { headers: this.headers });
    console.log(`Unfollowed ${target}`);
  }

  async checkFollowBack(target: string): Promise<boolean> {
    await this.profile();
    const url = `https://api.github.com/users/${target}/following/${this.username}`;
    try {
      await axios.get(url, { headers: this.headers });
      return true;
    } catch (error) {
      return false;
    }
  }
}

export default GitHub;
