import Image from "next/image";

type ProjectMediaProps = {
  alt: string;
  image: string;
  video?: string;
  videoType?: "video/mp4" | "video/webm";
  imagePosition?: string;
  priority?: boolean;
  showAsset?: boolean;
};

export function ProjectMedia({
  alt,
  image,
  video,
  videoType,
  imagePosition = "center",
  priority = false,
  showAsset = true,
}: ProjectMediaProps) {
  return (
    <div className={`project-media${showAsset ? "" : " project-media-neutral"}`}>
      {showAsset && video ? (
        <video autoPlay loop muted playsInline poster={image} aria-label={alt}>
          <source src={video} type={videoType} />
        </video>
      ) : showAsset ? (
        <Image
          src={image}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 720px) calc(100vw - 2.5rem), (max-width: 1100px) 46vw, 31vw"
          style={{ objectPosition: imagePosition }}
        />
      ) : null}
    </div>
  );
}
