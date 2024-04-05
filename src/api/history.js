import request from "@/utils/request";

export function getImageHist() {
  return request({
    url: "/api/image-hist",
    method: "get",
  });
}

export function getVideoHist() {
  return request({
    url: "/api/video-hist",
    method: "get",
  });
}
