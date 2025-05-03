import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/audio.css";
import "@vidstack/react/player/styles/default/layouts/video.css";

import {
  MediaPlayer,
  MediaPlayerInstance,
  MediaProvider,
  PlayerSrc,
  Poster,
} from "@vidstack/react";
import {
  DefaultVideoLayout,
  defaultLayoutIcons,
} from "@vidstack/react/player/layouts/default";
import {
  InferComponentCSSVars,
  ThumbnailSrc,
} from "@vidstack/react/types/vidstack.js";
import { CSSProperties } from "react";
import { Optional } from "@prisma/client/runtime/binary";

export const VideoPlayer = ({
  src,
  poster,
  thumbnails,
  className,
  style,
}: {
  src: PlayerSrc;
  poster?: string | null;
  thumbnails?: ThumbnailSrc | null;
  className?: string;
  style?:
    | (CSSProperties & {
        [name: `--${string}`]: string | number | null | undefined;
      } & Optional<InferComponentCSSVars<MediaPlayerInstance>>)
    | undefined;
}) => (
  <MediaPlayer
    src={src}
    viewType="video"
    streamType="on-demand"
    logLevel="warn"
    crossOrigin
    playsInline
    poster={poster ?? ""}
    className={className}
    style={style}
  >
    <MediaProvider>
      <Poster className="vds-poster" />
    </MediaProvider>
    {thumbnails && (
      <DefaultVideoLayout
        thumbnails={thumbnails ?? ""}
        icons={defaultLayoutIcons}
      />
    )}
  </MediaPlayer>
);
