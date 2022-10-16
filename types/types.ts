import { ReactNode } from "react";
import { ParsedUrlQuery } from "querystring";

export type LayoutProps = {
  children: ReactNode;
};

export type CardProps = {
  page: {
    slug: string;
    name: string;
    author: string;
    cover: string;
    published: string;
    tags: string[];
    content: string;
  };
};

export type Params = ParsedUrlQuery & {
  slug: string
}
