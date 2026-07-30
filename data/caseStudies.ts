export interface CaseStudy {
  slug: string;
  aliases?: string[];
  title: string;
  category: string;
  role: string;
  duration: string;
  videoUrl: string;
  thumbnailUrl: string;
  challenge: string;
  solution: string;
  technicalTools: string[];
  results: string;
  nextSlug: string;
  nextTitle: string;
  nextCategory: string;
  nextThumbnailUrl: string;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "showreel",
    aliases: [
      "editing-showreel",
      "professional-editing-showreel",
      "post-production-reel",
      "high-velocity-post-production-reel",
    ],
    title: "HIGH-VELOCITY POST-PRODUCTION REEL",
    category: "SHOWREEL",
    role: "Lead Editor & Colorist",
    duration: "1 MIN 02 SEC",
    videoUrl:
      "https://b6yk0mmj0fw8dfck.private.blob.vercel-storage.com/2026%20Video%20Editor%20Showreel%20COMPRESSED.mp4?vercel-blob-delegation=eyJzdG9yZUlkIjoic3RvcmVfYjZ5SzBtTWowRnc4ZGZDayIsIm93bmVySWQiOiJ0ZWFtX1VaNFdoQW5tVDdNQ0NmdloxNDFxZHNKNiIsInBhdGhuYW1lIjoiKiIsIm9wZXJhdGlvbnMiOlsiZ2V0IiwiaGVhZCJdLCJ2YWxpZFVudGlsIjoxNzg1NDQ1NjA3MzExLCJpYXQiOjE3ODU0MDI0MDc0ODV9.MCxp-wGT9nOXh7fu8AoeS2got4SFRdL84w3slvxP2_c&vercel-blob-signature=5S1oxLGNQrtHRDOl33stMgGMcohpMeDQKjKRPIeZZPQ",
    thumbnailUrl: "/images/projects/showreel.png",
    challenge:
      "The task involved blending various formats, including quick social media cuts, brand advertisements, and wedding films, into a cohesive showcase. We needed to captivate viewers instantly and maintain their engagement throughout the 1 minute and 2 seconds runtime.",
    solution:
      "We edited exclusively on the beat of a high-energy audio track, selecting the best frames from previous projects. Instead of organizing by project type, clips were grouped by visual mood or theme, creating a seamless flow throughout the reel.",
    technicalTools: [
      "DaVinci Resolve 21",
      "AutoSubs",
      "Fusion Transitions",
      "Beat-Sync Editing",
      "Sound Design",
      "Color Grading",
    ],
    results:
      "The final 62-second “visual CV” is well-paced and effective at converting cold leads into clients willing to invest more. It serves as solid evidence of both technical skill and creative range.",
    nextSlug: "premium-real-estate-tour",
    nextTitle: "HIGH-IMPACT PROPERTY TOUR",
    nextCategory: "REAL ESTATE",
    nextThumbnailUrl: "/images/projects/real-estate.jpg",
  },
  {
    slug: "premium-real-estate-tour",
    aliases: [
      "real-estate",
      "high-impact-property-tour",
      "real-estate-tour",
      "cinematic-real-estate-edit",
    ],
    title: "HIGH-IMPACT PROPERTY TOUR",
    category: "REAL ESTATE",
    role: "Editor, Colorist & Motion Graphics",
    duration: "1 MIN 30 SEC",
    videoUrl:
      "https://b6yk0mmj0fw8dfck.private.blob.vercel-storage.com/Cinematic%20Real%20Estate%20Edit%20COMPRESSED.mp4?vercel-blob-delegation=eyJzdG9yZUlkIjoic3RvcmVfYjZ5SzBtTWowRnc4ZGZDayIsIm93bmVySWQiOiJ0ZWFtX1VaNFdoQW5tVDdNQ0NmdloxNDFxZHNKNiIsInBhdGhuYW1lIjoiKiIsIm9wZXJhdGlvbnMiOlsiZ2V0IiwiaGVhZCJdLCJ2YWxpZFVudGlsIjoxNzg1NDQ1NjI0NTQ1LCJpYXQiOjE3ODU0MDI0MjQ3Mzh9.d24Sgd6DsMV5jWF7OQkd21oq3GGdivX3USg9FUiVkOo&vercel-blob-signature=mv9_6SiWm7Rx--53ByG9iFuyHkvM5AaPI9LhGMeBnI0",
    thumbnailUrl: "/images/projects/real-estate.jpg",
    challenge:
      "Architectural footage can often appear static, leading to a flat and repetitive viewing experience. We aimed to create a warm, welcoming, and immersive environment that felt more than just “staring at walls.”",
    solution:
      "We implemented controlled speed ramping and smooth transitions to guide the viewer naturally from one room to another. Adjustments to ambient lighting and color made the interiors feel warm and inviting, enhancing the sense of space.",
    technicalTools: [
      "DaVinci Resolve 21",
      "Fusion Motion Graphics",
      "Speed Ramping",
      "Color Correction",
      "Sound Design",
      "Property Callouts",
    ],
    results:
      "The final product became a high-retention marketing asset that enhances the property’s perceived value. For real estate agents, it's a powerful visual tool that can expedite sales and attract international buyers.",
    nextSlug: "cinematic-color-grading",
    nextTitle: "NATURE & ATMOSPHERE GRADING",
    nextCategory: "COLOR GRADING",
    nextThumbnailUrl: "/images/projects/color-grading.jpg",
  },
  {
    slug: "cinematic-color-grading",
    aliases: [
      "color-grading",
      "nature-and-atmosphere-grading",
      "nature-color-grading",
      "cinematic-color-grading-for-nature-footage",
    ],
    title: "NATURE & ATMOSPHERE GRADING",
    category: "COLOR GRADING",
    role: "Lead Colorist",
    duration: "45 SEC",
    videoUrl:
      "https://b6yk0mmj0fw8dfck.private.blob.vercel-storage.com/Color%20Correction%20&%20Grading%20Before%20&%20After%20Edit%20COMPRESSED.mp4?vercel-blob-delegation=eyJzdG9yZUlkIjoic3RvcmVfYjZ5SzBtTWowRnc4ZGZDayIsIm93bmVySWQiOiJ0ZWFtX1VaNFdoQW5tVDdNQ0NmdloxNDFxZHNKNiIsInBhdGhuYW1lIjoiKiIsIm9wZXJhdGlvbnMiOlsiZ2V0IiwiaGVhZCJdLCJ2YWxpZFVudGlsIjoxNzg1NDQ1NjM5OTU0LCJpYXQiOjE3ODU0MDI0NDAxMjV9.xMI72iXsDjsIOzzxkKnQmfyD1g8NUIMIjFRe1VdwuYM&vercel-blob-signature=aFibqEl3J9gRbFZ0gRkaoqA55vjn7qxzagqSJzwneFo",
    thumbnailUrl: "/images/projects/color-grading.jpg",
    challenge:
      "Working with varying natural light conditions throughout the day posed a challenge. We needed to ensure the final result felt cohesive and stylish while preserving the beauty of the setting.",
    solution:
      "A custom node tree was constructed to isolate and enhance the natural colors of the sky, water, and foliage. We made targeted adjustments in the shadows and midtones to add depth, strengthen contrast, and maintain a consistent cinematic mood across all clips.",
    technicalTools: [
      "DaVinci Resolve 21",
      "Custom Node Tree",
      "HDR Color Wheels",
      "Color Theory",
      "Contrast & Saturation Mapping",
      "Broadcast Standards",
    ],
    results:
      "The outcome was visually striking, broadcast-ready imagery that demonstrates a solid understanding of color theory. This capability is particularly valuable for documentary filmmakers and commercial directors seeking premium visuals.",
    nextSlug: "cinematic-wedding-teaser",
    nextTitle: "CINEMATIC EMOTIONAL TEASER",
    nextCategory: "WEDDING FILM",
    nextThumbnailUrl: "/images/projects/wedding.png",
  },
  {
    slug: "cinematic-wedding-teaser",
    aliases: [
      "wedding",
      "wedding-film",
      "cinematic-emotional-teaser",
      "wedding-teaser",
      "the-wedding-teaser-film",
    ],
    title: "CINEMATIC EMOTIONAL TEASER",
    category: "WEDDING FILM",
    role: "Lead Editor & Colorist",
    duration: "1 MIN 15 SEC",
    videoUrl:
      "https://b6yk0mmj0fw8dfck.private.blob.vercel-storage.com/The%20Wedding%20Teaser%20Film%20COMPRESSED.mp4?vercel-blob-delegation=eyJzdG9yZUlkIjoic3RvcmVfYjZ5SzBtTWowRnc4ZGZDayIsIm93bmVySWQiOiJ0ZWFtX1VaNFdoQW5tVDdNQ0NmdloxNDFxZHNKNiIsInBhdGhuYW1lIjoiKiIsIm9wZXJhdGlvbnMiOlsiZ2V0IiwiaGVhZCJdLCJ2YWxpZFVudGlsIjoxNzg1NDQ1NjY1NDUzLCJpYXQiOjE3ODU0MDI0NjU2MjJ9.ExLCJvmDPSzJUnajAmqbiAyONofPMRTwvA5cSxHictE&vercel-blob-signature=k2IR4EuXF8a8Uh4PKBts930UjqyOEvYlpY-LuB-mmGA",
    thumbnailUrl: "/images/projects/wedding.png",
    challenge:
      "The goal was to transform hours of multi-camera coverage into a cohesive, fast-paced teaser without sacrificing the intimate feel of the ceremony. We needed to maintain the heartfelt moments without feeling rushed.",
    solution:
      "We centered the edit around a story-driven rhythm, anchored by audio cues such as vows, speeches, and poignant pauses, matched with striking visuals. Careful pacing was applied to gradually build emotion, culminating in a climactic, celebratory montage at the end—like a slow burn that finally releases.",
    technicalTools: [
      "DaVinci Resolve 21",
      "Cut & Edit Pages",
      "Fairlight Audio Sync",
      "Story-Driven Pacing",
      "Multi-Cam Workflow",
      "Color Grading",
    ],
    results:
      "The final teaser is easy to share, impactful, and serves as a genuine emotional keepsake for the clients. Additionally, it stands as a strong portfolio piece, showcasing our ability to handle high-end event coverage with finesse.",
    nextSlug: "showreel",
    nextTitle: "HIGH-VELOCITY POST-PRODUCTION REEL",
    nextCategory: "SHOWREEL",
    nextThumbnailUrl: "/images/projects/showreel.png",
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  const normalized = slug.trim().toLowerCase();
  return CASE_STUDIES.find(
    (study) =>
      study.slug.toLowerCase() === normalized ||
      study.aliases?.some((alias) => alias.toLowerCase() === normalized)
  );
}

export function getAllCaseStudies(): CaseStudy[] {
  return CASE_STUDIES;
}
