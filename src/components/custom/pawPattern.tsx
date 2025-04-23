export function PawPattern() {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none z-0">
      <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="paw-pattern"
            patternUnits="userSpaceOnUse"
            width="80"
            height="70"
            patternTransform="rotate(10)"
          >
            <image
              href="/images/path/paw.svg"
              x="0"
              y="0"
              width="40"
              height="35"
              preserveAspectRatio="xMidYMid meet"
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#paw-pattern)" />
      </svg>
    </div>
  );
}
