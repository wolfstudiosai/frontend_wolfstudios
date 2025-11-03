"use client";

import React from "react";
import BlogHeader from "./_components/blog-header";
import { BlogList } from "./_components/blog-list";

export const BlogView = () => {
  return (
    <>
      <BlogHeader />
      <BlogList />
    </>
  );
};
