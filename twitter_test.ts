import { TwitterClient, TwitterError, TwitterErrorList } from "./twitter.ts";

import {
  assert,
  assertEquals,
  assertExists,
} from "https://deno.land/std@0.97.0/testing/asserts.ts";

const twitter = new TwitterClient("twitter-guest-client (test)");

Deno.test("getVideos#basic", async () => {
  let videos;

  // Actual Video
  videos = await twitter.getVideos(
    "1395363681790136323",
  );
  assertExists(videos);

  // No videos
  videos = await twitter.getVideos(
    "1395032697597087746",
  );
  assertEquals(videos, null);

  // Invalid
  try {
    videos = await twitter.getVideos(
      "0",
    );
    assert(false, "Expected error.");
  } catch (err) {
    assertEquals(err instanceof TwitterErrorList, true);
    assertEquals(err.errors[0] instanceof TwitterError, true);
  }
});