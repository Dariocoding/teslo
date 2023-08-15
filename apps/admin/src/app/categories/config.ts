import { Category } from "@teslo/interfaces";
import React from "react";

export interface CategoryDataTable extends Category {
  actions: React.ReactNode;
  dateFormatted: string;
  titleFormatted: React.ReactNode;
}
