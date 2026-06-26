export default function PageLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-sm dark:bg-[#101450]/60">
      <div className="loader" />
      <style>
        {`
.loader {
  width: 60px;
  aspect-ratio: 2;
  --_g: no-repeat radial-gradient(circle closest-side, #2D35D4 90%, #0000);
  background:
    var(--_g) 0%   50%,
    var(--_g) 50%  50%,
    var(--_g) 100% 50%;
  background-size: calc(100% / 3) 50%;
  animation: l3 1s infinite ease-in-out;
  filter: blur(0.3px);
}
@keyframes l3 {
  0%   { background-position: 0%  50%, 50%  50%, 100%  50%; }
  20%  { background-position: 0%   0%, 50%  50%, 100%  50%; }
  40%  { background-position: 0% 100%, 50%   0%, 100%  50%; }
  60%  { background-position: 0%  50%, 50% 100%, 100%   0%; }
  80%  { background-position: 0%  50%, 50%  50%, 100% 100%; }
  100% { background-position: 0%  50%, 50%  50%, 100%  50%; }
}
`}
      </style>
    </div>
  );
}
