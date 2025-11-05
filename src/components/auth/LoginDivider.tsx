"use client";

import React from 'react';

interface LoginDividerProps {
  text?: string;
}

export default function LoginDivider({ text = "หรือ" }: LoginDividerProps) {
  return (
    <div className="relative my-4 lg:my-6">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
      </div>
      <div className="relative flex justify-center text-xs sm:text-sm">
        <span className="px-2 sm:px-3 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400 font-medium">
          {text}
        </span>
      </div>
    </div>
  );
}