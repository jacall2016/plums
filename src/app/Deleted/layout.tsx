'use client';
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "PLuMS",
    description: "Personal Learning Management System",
  };


  export default function DeletedLayout({
    children,
  }:{

    children: React.ReactNode;
  }){
    return children;
  }
