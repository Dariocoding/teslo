import { Brand } from "@teslo/interfaces";
import React from "react";

export interface BrandTable extends Brand {
  actions: React.ReactNode;
  dateFormatted: string;
}
