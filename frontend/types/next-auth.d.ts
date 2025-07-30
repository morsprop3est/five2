import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image?: string;
      token?: string;
      stack?: string;
      description?: string;
      linkedin?: string;
      telegram?: string;
      github?: string;
      reddit?: string;
      facebook?: string;
    };
  }

  interface JWT {
    backendToken?: string;
    id?: string;
    stack?: string;
    description?: string;
    linkedin?: string;
    telegram?: string;
    github?: string;
    reddit?: string;
    facebook?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    backendToken?: string;
    id?: string;
    stack?: string;
    description?: string;
    linkedin?: string;
    telegram?: string;
    github?: string;
    reddit?: string;
    facebook?: string;
  }
} 