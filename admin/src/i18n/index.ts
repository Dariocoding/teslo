import { MessageFormatElement } from "react-intl";
import { ValidLocales } from "./locales";
import { EnTranslation } from "./en";
import { EsTranslation } from "./es";

interface Messages {
  [key: string]: Record<string, string>;
}

export const i18nTranslate: Messages = {
  [ValidLocales.ENGLISH.locale]: EnTranslation,
  [ValidLocales.SPANISH.locale]: EsTranslation,
};

export * from "./locales";
export * from "./translate";
