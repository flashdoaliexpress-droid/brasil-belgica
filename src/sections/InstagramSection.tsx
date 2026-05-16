import { instagramPosts } from "../data/instagramPosts";

export function InstagramSection() {
  return (
    <section
      id="instagram"
      className="relative"
      style={{
        backgroundImage: "url('/images/players-bg.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-[#1a1558]/70" aria-hidden="true" />

      {/* Separador estiloso entre Players e Instagram */}
      <div
        className="relative z-10 w-full h-5"
        style={{
          background: "linear-gradient(90deg, #FDDE00 0%, #1F185F 60%, #D12209 100%)",
          transform: "skewY(-1.5deg)",
          transformOrigin: "left",
        }}
      />

      <div className="relative z-10 w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {instagramPosts.map((post) => (
          <div key={post.id} className="overflow-hidden">
            <img
              src={post.src}
              alt={post.alt}
              loading="lazy"
              className="w-full h-auto block"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
