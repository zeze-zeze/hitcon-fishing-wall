export default function CtfPage() {
  return (
    <div className="absolute inset-0 h-[calc(100vh-6rem)]">
      <iframe
        className="w-full h-full"
        src="https://rectf.hitcon2023.online/scoreboard_iframe"
      />
    </div>
  );
}
