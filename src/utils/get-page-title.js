import defaultSettings from "@/settings";

const title = defaultSettings.title || "在线快递件破损程度检测";

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`;
  }
  return `${title}`;
}
